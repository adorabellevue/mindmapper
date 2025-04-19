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
    <div className="mt-3 p-4">
      <p className={`whitespace-pre-wrap ${status !== "done" ? "text-gray-800 italic" : ""}`}>
        {displayText}
      </p>
    </div>
  );
}