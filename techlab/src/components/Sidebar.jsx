"use client";

import { useEffect, useState } from "react";

export default function Sidebar({ history, setHistory }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gemini-history") || "[]");
    setItems(stored);
  }, [history]);

  const deleteItem = (indexToDelete) => {
    const updated = items.filter((_, i) => i !== indexToDelete);
    setItems(updated);
    localStorage.setItem("gemini-history", JSON.stringify(updated));
    setHistory(updated); // inform parent
  };

  return (
    <aside className="w-64 border-r p-4 h-screen overflow-y-auto">
      <h2 className="font-bold text-lg mb-4">History</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No history yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="bg-gray-100 p-2 rounded text-sm flex justify-between items-start"
            >
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">{item.prompt}</div>
                <div className="text-xs text-gray-600 line-clamp-2">
                  {item.response}
                </div>
              </div>
              <button
                className="text-red-500 text-xs ml-2"
                onClick={() => deleteItem(i)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}