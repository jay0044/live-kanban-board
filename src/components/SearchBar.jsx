import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <input
      type="text"
      placeholder="Search cards..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      style={{
        padding: "10px",
        marginBottom: "20px",
        width: "300px",
      }}
    />
  );
}
