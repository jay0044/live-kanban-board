import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { randomMove, undo, redo } from "./store/boardSlice";
import Board from "./components/Board";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [showConflict, setShowConflict] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [simulateError, setSimulateError] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.isDragging) {
        setShowConflict(true);
        return;
      }
      dispatch(randomMove());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (showConflict) {
      const timer = setTimeout(() => {
        setShowConflict(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConflict]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "z") dispatch(undo());
      if (e.ctrlKey && e.key === "y") dispatch(redo());
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedLabels.length > 0) {
      params.set("labels", selectedLabels.join(","));
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [selectedLabels]);

  return (
    <div style={{ padding: "20px" }}>
      {showConflict && (
        <div
          style={{
            background: "#ffe5e5",
            color: "red",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          ⚠️ Conflict detected! Another user updated the board.
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        {/* TITLE */}
        <h2
          style={{
            marginBottom: "15px",
            fontWeight: "600",
          }}
        >
          📋 Live Collaborative Kanban Board
        </h2>

        {/* TOOLBAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            background: "var(--card-bg)",
            padding: "12px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* LEFT SIDE */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: "500",
              }}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="checkbox"
                checked={simulateError}
                onChange={() => setSimulateError(!simulateError)}
              />
              Error Mode
            </label>
          </div>

          {/* CENTER */}
          <div>
            <SearchBar onSearch={setSearchText} />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <select
              multiple
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value,
                );
                setSelectedLabels(values);
              }}
            >
              <option value="bug">🐞 Bug</option>
              <option value="urgent">⚡ Urgent</option>
            </select>
          </div>
        </div>
      </div>

      <Board
        searchText={searchText}
        simulateError={simulateError}
        setSelectedCard={setSelectedCard}
        selectedLabels={selectedLabels}
      />

      {selectedCard && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
            }}
          >
            <h3>Card Details</h3>

            <div
              contentEditable
              suppressContentEditableWarning
              style={{
                border: "1px solid gray",
                padding: "10px",
                minHeight: "80px",
                marginBottom: "10px",
              }}
            >
              {selectedCard.title}
            </div>

            <button onClick={() => setSelectedCard(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
