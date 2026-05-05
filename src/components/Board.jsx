import { useSelector } from "react-redux";
import Column from "./Column";

export default function Board({
  searchText,
  simulateError,
  setSelectedCard,
  selectedLabels,
}) {
  const { columns, columnOrder } = useSelector((state) => state.board.present);

  return (
    <div className="board">
      {columnOrder.map((colId) => (
        <Column
          key={colId}
          column={columns[colId]}
          searchText={searchText}
          simulateError={simulateError}
          setSelectedCard={setSelectedCard}
          selectedLabels={selectedLabels}
        />
      ))}
    </div>
  );
}
