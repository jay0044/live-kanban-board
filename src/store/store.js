import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import { saveState, loadState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
