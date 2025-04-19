"use client";

export default function ResponseView({ response, status }) {
  let displayText;

  if (status === "idle") {
    displayText = "Enter a prompt and click Send to get started.";
  } else if (status === "loading") {
    displayText = "Awaiting Gemini response...";
  } else if (status === "error") {
    displayText = "Encountered error.";
  } else if (status === "done") {
    displayText = response;
  }

  return (
    <div className="mt-6 p-4 border rounded">
      <p className={`whitespace-pre-wrap ${status !== "done" ? "text-gray-500 italic" : ""}`}>
        {displayText}
      </p>
    </div>
  );
}