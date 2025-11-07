const Chat = require("../models/AIChat");

const {GoogleGenAI} = require("@google/genai");
const genai = new GoogleGenAI({apikey: process.env.GEMINI_API_KEY});

const SYSTEM_PROMPT = `You are a kind, empathetic assistant for basic emotional support.
You are NOT a therapist. Provide gentle, practical coping suggestions (breathing, grounding).
If the user expresses self-harm intent, encourage contacting local emergency services or a crisis helpline.
`;

const RISK_REGEX = /(kill myself|suicide|end my life|hurt myself|self-?harm)/i;

exports.chatWithAI = async (req, res) => {
      try{
        const {message, mood, history} = req.body || {};
         if (!message || !message.trim()) {
         return res.status(400).json({ error: "Message is required." });
        }

        const shortHistory = Array.isArray(history) ? history.slice(-6) : [];
        const contents = [];
        for (const m of shortHistory) {
      contents.push({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }], // <-- IMPORTANT: use parts.text
      });
    }
      
     const userText = (mood ? `My mood: ${mood}\n` : "") + message;
    contents.push({ role: "user", parts: [{ text: userText }] });

    const result = await genai.models.generateContent({
      model: "gemini-2.5-flash",    
      contents,
      systemInstruction: { text: SYSTEM_PROMPT },
      generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
     });
    // console.log("🧠 Gemini raw response:", JSON.stringify(result, null, 2));

      const reply =
        (result?.candidates?.[0]?.content?.parts || [])
        .map(p => p?.text)
        .filter(Boolean)
         .join("") ||
        "Sorry, I couldn’t generate a reply.";


      const risky = RISK_REGEX.test(message);
       const crisis =
      "\n\nIf you're thinking about harming yourself, please contact local emergency services or a crisis helpline now: https://findahelpline.com";

    return res.json({ reply: risky ? reply + crisis : reply });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: "Failed to connect to AI." });
  }
}









// Save chat history
exports.saveChat = async (req, res) => {
  try {
    const userId = req.user?._id; // comes from protect middleware
    const { messages } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!messages || !messages.length)
      return res.status(400).json({ message: "No messages to save" });

    const chat = await Chat.create({ user: userId, messages });
    return res.status(201).json({ message: "Chat saved successfully", chat });
  } catch (err) {
    console.error("Error saving chat:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Fetch all saved chats for the logged-in user
exports.getUserChats = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });
    return res.json({ chats });
  } catch (err) {
    console.error("Error fetching chats:", err);
    return res.status(500).json({ message: "Server error" });
  }
};