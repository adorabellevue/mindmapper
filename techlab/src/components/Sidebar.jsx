"use client";

import { useEffect, useState } from "react";

export default function Sidebar({ history, setHistory, onSelect, selectedIndex }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gemini-history") || "[]");
    setItems(stored);
  }, [history]);

  const deleteItem = (indexToDelete) => {
    const updated = items.filter((_, i) => i !== indexToDelete);
    setItems(updated);
    localStorage.setItem("gemini-history", JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <aside className="w-64 border-r p-4 h-screen overflow-y-auto">
      {/* Sidebar Header */}
      <h2 className="font-bold text-lg mb-4">Recent Entries</h2>
      {/* History Items */}
      {items.length === 0 ? (
        <p className="text-gray-500">No history yet.</p>
      ) : (
        <ul className="space-y-2">
          {/* Render each history item */}
          {items.map((item, i) => (
            <li
              key={i}
              onClick={() => onSelect(item, i)}
              className={`p-2 rounded text-sm flex justify-between items-start cursor-pointer hover:bg-gray-100 ${
                i === selectedIndex ? "bg-gray-400 border border-blue-300" : "bg-slate-100"
              }`}
            >
              {/* Text content for the history item */}
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">{item.prompt}</div>
                <div className="text-xs text-gray-600 line-clamp-2">
                  {item.response}
                </div>
              </div>
              {/* Delete button for this entry */}
              <button
                className="text-red-600 text-m ml-1"
                onClick={(e) => { deleteItem(i) }}
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