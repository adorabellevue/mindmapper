"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InputBox({ onSubmit, onStartRequest }) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (input.trim() === "") return;
    onStartRequest();
    onSubmit(input);     // send input to parent
    setInput("");        // clear the input box
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Break down Newton’s three laws of motion with real-world examples..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-3 py-2 h-12 rounded w-full"
      />
      <Button onClick={handleClick}>Send</Button>
    </div>
  );
}