export async function POST(req) {
  const { prompt } = await req.json();
  console.log("Received prompt:", prompt);

  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API key exists?", !!apiKey);

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC12Bct8MAY-P6U9v92bjzF2aFvuA7sU30`;

  const geminiRes = await fetch(geminiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const result = await geminiRes.json();
  console.log("Gemini response:", result);

  const output =
    result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

  return new Response(JSON.stringify({ output }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}