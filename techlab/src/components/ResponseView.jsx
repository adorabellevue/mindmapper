"use client";

export default function ResponseView({ response }) {
  return (
    <div className="mt-6 p-4 border rounded">
      {response ? (
        <p className="whitespace-pre-wrap">{response}</p>
      ) : (
        <p className="text-gray-500 italic">Awaiting Gemini response...</p>
      )}
    </div>
  );
}