import React from "react";

const Card = ({ card, columnId, index, searchText, onClick }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceCol", columnId);
    e.dataTransfer.setData("index", index);

    window.isDragging = true;
  };

  const handleDragEnd = () => {
    window.isDragging = false;
  };

  const highlight = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        ),
      );
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="card"
      role="listitem"
      tabIndex={0}
      onClick={onClick} 
    >
      {highlight(card.title, searchText)}
    </div>
  );
};

export default React.memo(Card);
