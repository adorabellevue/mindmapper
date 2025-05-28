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
  const [status, setStatus] = useState("idle");
  const [selectedIndex, setSelectedIndex] = useState(null);

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

    // Sanitize result before parsing
    const cleaned = result.trim().replace(/^```json\n/, "").replace(/```$/, "").trim();

    // Parse Gemini output as JSON
    try {
      const parsed = JSON.parse(cleaned);
      setJsonTree(parsed); // pass to mind map
      setStatus("done");
    } catch (e) {
      console.warn("❌ Failed to parse JSON:", e);
      setJsonTree(null);
      setStatus("error");
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
    setStatus("idle");
  }, []);

  return (
    <div className="flex">
      <Sidebar 
        history={history}
        setHistory={setHistory}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        // When past entry is selected
        onSelect={(item, index) => {
          try {
            const parsed = JSON.parse(
              item.response.trim().replace(/^```json\n/, "").replace(/```$/, "").trim()
            );
            setJsonTree(parsed); // Renders new diagram
            setResponse(item.prompt); // Shows user prompt
            // setResponse(item.response); // Shows raw response (JSON code)
            setStatus("done");
            setSelectedIndex(index);
          } catch (e) {
            console.warn("❌ Failed to parse saved JSON:", e);
            setJsonTree(null);
            setStatus("error");
          }
        }}
      />
      <main className="flex-1 p-6 max-w-screen-lg mx-auto">
        <InputBox onSubmit={handleSubmit} onStartRequest={() => {
          setStatus("loading");
          setResponse(""); // clear old response
        }} />
        {/* Status messages */}
        <ResponseView response={response} status={status} />
        {/* Mind map appears once JSON tree is parsed */}
        {jsonTree && (
          <div className="p-4 rounded-lg bg-white shadow-md flex-1 overflow-auto">
            <MindMapView key={JSON.stringify(jsonTree)} jsonTree={jsonTree} />
          </div>
        )}
      </main>
    </div>
  );
}