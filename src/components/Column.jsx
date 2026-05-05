import { useDispatch, useSelector } from "react-redux";
import { moveCard } from "../store/boardSlice";
import Card from "./Card";
import { useState } from "react";

export default function Column({
  column,
  searchText,
  simulateError,
  setSelectedCard,
  selectedLabels = [],
}) {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.board.present.cards);

  const safeIds = column?.cardIds || [];

  const filteredCardIds = safeIds.filter((id) => {
    const card = cards?.[id];
    if (!card) return false;

    const matchSearch = card.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchLabel =
      selectedLabels.length === 0 ||
      selectedLabels.some((l) => card.labels?.includes(l));

    return matchSearch && matchLabel;
  });

  const [visibleCount] = useState(20);

  const visibleCards = filteredCardIds.slice(0, visibleCount);

  const handleMove = (payload) => {
    dispatch(moveCard(payload));

    if (simulateError) {
      setTimeout(() => {
        dispatch({ type: "board/undo" });
        alert("❌ API failed. Reverted.");
      }, 1000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const sourceCol = e.dataTransfer.getData("sourceCol");
    const sourceIndex = Number(e.dataTransfer.getData("index"));

    handleMove({
      sourceCol,
      destCol: column.id,
      sourceIndex,
      destIndex: visibleCards.length,
    });
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      role="list"
    >
      <h3>{column.title}</h3>

      {visibleCards.length === 0 && (
        <div style={{ opacity: 0.6, textAlign: "center" }}>No cards</div>
      )}

      {visibleCards.map((id, index) => {
        const card = cards[id];
        if (!card) return null;

        return (
          <Card
            key={id}
            card={card}
            columnId={column.id}
            index={index}
            searchText={searchText}
            onClick={() => setSelectedCard(card)}
          />
        );
      })}
    </div>
  );
}
