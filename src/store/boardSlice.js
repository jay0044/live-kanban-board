import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "Todo",
      cardIds: ["1", "2", "3", "4", "5"],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      cardIds: ["6", "7"],
    },
    done: {
      id: "done",
      title: "Done",
      cardIds: ["8"],
    },
  },
  cards: {
    1: { id: "1", title: "Build UI", labels: ["urgent"] },
    2: { id: "2", title: "Setup Redux", labels: ["bug"] },
    3: { id: "3", title: "Implement Drag Drop", labels: ["urgent"] },
    4: { id: "4", title: "Fix Bugs", labels: ["bug"] },
    5: { id: "5", title: "Add Search Feature", labels: [] },
    6: { id: "6", title: "Optimize Performance", labels: ["urgent"] },
    7: { id: "7", title: "Add Filters", labels: [] },
    8: { id: "8", title: "Deploy App", labels: [] },
  },
  columnOrder: ["todo", "inprogress", "done"],
};

const initialState = {
  past: [],
  present: initialData,
  future: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    moveCard: (state, action) => {
      const { sourceCol, destCol, sourceIndex, destIndex } = action.payload;

      const newPresent = JSON.parse(JSON.stringify(state.present));

      const sourceIds = newPresent.columns[sourceCol].cardIds;
      const destIds = newPresent.columns[destCol].cardIds;

      const [moved] = sourceIds.splice(sourceIndex, 1);
      destIds.splice(destIndex, 0, moved);

      state.past.push(state.present);
      state.present = newPresent;
      state.future = [];
    },

    undo: (state) => {
      if (state.past.length === 0) return;
      const prev = state.past.pop();
      state.future.unshift(state.present);
      state.present = prev;
    },

    redo: (state) => {
      if (state.future.length === 0) return;
      const next = state.future.shift();
      state.past.push(state.present);
      state.present = next;
    },

    randomMove: (state) => {
      const cols = Object.keys(state.present.columns);
      const randomCol = cols[Math.floor(Math.random() * cols.length)];
      const col = state.present.columns[randomCol];

      if (col.cardIds.length === 0) return;

      const cardId = col.cardIds[0];
      const targetCol = cols[Math.floor(Math.random() * cols.length)];

      col.cardIds = col.cardIds.filter((id) => id !== cardId);
      state.present.columns[targetCol].cardIds.push(cardId);
    },
  },
});

export const { moveCard, undo, redo, randomMove } = boardSlice.actions;
export default boardSlice.reducer;
