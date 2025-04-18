"use client";

import { useState, useEffect } from "react";
import InputBox from "@/components/InputBox";
import ResponseView from "@/components/ResponseView";
import Sidebar from "@/components/Sidebar";
import MindMapView from "@/components/MindMapView";

export default function Home() {
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [jsonTree, setJsonTree] = useState(null);

  const handleSubmit = async (userInput) => {
    const diagramPrompt = `
    Convert the following into a hierarchical JSON tree structure.
    Each node must have a "name" key and may have "children".
    Start with a top-level theme based on the input content.

    Only return valid JSON — no explanations, markdown, or extra text.

    Input:
    ${userInput}
    `;

    const res = await fetch("/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: diagramPrompt }),
    });

    const data = await res.json();
    console.log("📦 Full response from Gemini:", data);

    const result = data?.output;
    console.log("🧪 Attempted result extraction:", result);

    if (!result) {
      setResponse("⚠️ No valid response from Gemini.");
      setJsonTree(null);
      return;
    }

    // setResponse(result); // show raw JSON as text

    // Sanitize result before parsing
    let cleaned = result.trim().replace(/^```json\n/, "").replace(/```$/, "").trim();
    console.log("🧹 Cleaned JSON string:", cleaned);

    // Parse Gemini output as JSON
    let parsed = null;
    try {
      parsed = JSON.parse(cleaned);
      console.log("✅ Parsed JSON tree:", parsed);
      setJsonTree(parsed); // pass to mind map
    } catch (e) {
      console.warn("❌ Failed to parse JSON:", e);
      setJsonTree(null);
    }

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
        {jsonTree && console.log("🌳 Ready to render MindMapView:", jsonTree)}
        {jsonTree && <MindMapView jsonTree={jsonTree} />}
      </main>
    </div>
  );
}