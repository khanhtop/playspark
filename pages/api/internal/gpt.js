import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Expected an array of messages." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    let json = { words: [] };

    try {
      const parsed = JSON.parse(response.choices[0].message.content);
      json = parsed;
    } catch (e) {
      null;
    }

    const answer = json.words;
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
