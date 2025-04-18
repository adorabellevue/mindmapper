"use client";

import { useState, useEffect } from "react";
import InputBox from "@/components/InputBox";
import ResponseView from "@/components/ResponseView";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (userInput) => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await res.json();
    const result = data.output;
    setResponse(result);

    // Save to localStorage
    const newEntry = { prompt: userInput, response: result };
    const updated = [newEntry, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem("gemini-history", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gemini-history") || "[]");
    setHistory(stored);
  }, []);

  return (
    <div className="flex">
      <Sidebar history={history} setHistory={setHistory} />
      <main className="flex-1 p-6 max-w-3xl">
        <InputBox onSubmit={handleSubmit} />
        <ResponseView response={response} />
      </main>
    </div>
  );
}