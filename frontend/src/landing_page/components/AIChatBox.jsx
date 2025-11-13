import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const PROMPTS = ["Breathing", "5-4-3-2-1", "Sleep tips", "Anxiety", "I feel lonely"];
const MOODS = ["🙂", "😟", "😠", "😴", "😔"];
const RISK_REGEX = /(kill myself|suicide|end my life|hurt myself|self-?harm)/i;

/* Small internal modal (no extra libs) */
function AuthModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-1">Login required</h5>
        <p className="text-muted mb-3">
          Please log in to use this feature (voice or saving chat). Your data is private and secure.
        </p>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-plain w-100">Login</Link>
          <Link to="/signup" className="btn btn-accent w-100">Sign up</Link>
        </div>
        <button className="ai-modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

function AIChatBox({ isLoggedIn }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm here to support you. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false); // UI only
  const [mood, setMood] = useState("");
  const [showRisk, setShowRisk] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const listRef = useRef(null);
  const [stickBottom, setStickBottom] = useState(true);

  useEffect(() => {
    if (stickBottom && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, stickBottom]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    setStickBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 16);
  };

  // const botReply = (text, delay = 650) => {
  //   setTyping(true);
  //   setTimeout(() => {
  //     setMessages((prev) => [...prev, { sender: "bot", text }]);
  //     setTyping(false);
  //   }, delay);
  // };


   // 🔁 Non-stream backend call to /api/chat
  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setShowRisk(RISK_REGEX.test(text));
    // botReply("I’m listening. Would you like a short coping exercise?");
    setTyping(true);

     // Build short history for context (last 6 turns), mapping to LLM roles
    const history = messages.slice(-6).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try{
       const {data} = await api.post("/chat",{message:text, mood, history});
       const aiText = data?.reply || "Sorry, I couldn’t generate a response.";
      setMessages((prev) => [...prev, { sender: "bot", text: aiText }]);
    }catch(err){
      console.error(err);
      setMessages((prev) => [...prev,
        { sender: "bot", text: "Sorry—server is busy right now. Please try again." },
      ]);
    }finally {
      setTyping(false);
    }
  };

  const usePrompt = async (p) => {
    const text =
      p === "Breathing"
        ? "Can we try box breathing?"
        : p === "5-4-3-2-1"
        ? "Let's do the 5-4-3-2-1 grounding technique."
        : p === "Sleep tips"
        ? "Any advice for better sleep?"
        : p === "Anxiety"
        ? "I'm feeling anxious."
        : "I'm feeling lonely.";

        setInput(text);
         // trigger send using the same flow
        const fakeEvent = { preventDefault: () => {} };
         await handleSend(fakeEvent);
     };
    // setMessages((prev) => [...prev, { sender: "user", text }]);
  //   botReply(
  //     p === "Breathing"
  //       ? "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat four cycles with me."
  //       : p === "5-4-3-2-1"
  //       ? "Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste."
  //       : p === "Sleep tips"
  //       ? "Try a wind-down: dim lights, stop screens 30 mins before bed, keep a consistent sleep time."
  //       : p === "Anxiety"
  //       ? "Name the feeling, breathe slowly, and try a 60-second focus on the breath."
  //       : "You're not alone. Would you like ideas to reach out or self-soothe?"
  //   );
  // };

  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Hi! I'm here to support you. How are you feeling today?" }]);
    setShowRisk(false);
  };

  const saveChat = async  () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    // // later: POST /api/chat/save {messages}
    // alert("Saved (stub). We’ll wire this to your backend.");
     try {
    const res = await api.post("/chat/save", { messages });
    alert("✅ Chat saved successfully!");
     } catch (err) {
      console.error("Save chat error:", err);
       alert("❌ Failed to save chat");
     }
  };


  const exportChat = () => {
    const text = messages
      .map((m) => (m.sender === "user" ? "You: " : "Assistant: ") + m.text)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "connect-evolve-chat.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const toggleVoice = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setRecording((s) => !s); // UI state only
  };

  return (
    <div className="ai-chat-wrap">

      <div className="ai-card big p-3 p-md-4">
        {/* mood + prompts */}
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">Mood:</span>
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                className={`btn btn-sm ai-mood ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m === mood ? "" : m)}
                aria-label={`set mood ${m}`}
              >
                {m}
              </button>
            ))}
          </div>
               
          <div className="ai-prompts">
            {PROMPTS.map((p) => (
              <button key={p} type="button" className="ai-chip" onClick={() => usePrompt(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* safety banner */}
        {showRisk && (
          <div className="ai-safety mb-3">
            If you’re thinking about harming yourself, please contact local emergency services or a crisis
            helpline immediately.{" "}
            <a href="https://findahelpline.com" target="_blank" rel="noreferrer">Find helplines</a>.
          </div>
        )}

        {/* messages */}
        <div ref={listRef} className="ai-messages" onScroll={onScroll}>
        <div className="ai-toolbar mt-5">
        <button type="button" className="ai-tbtn" onClick={saveChat} title="Save">
          <i className="bi bi-save2"></i><span>Save</span>
        </button>
        <button type="button" className="ai-tbtn" onClick={exportChat} title="Export">
          <i className="bi bi-upload"></i><span>Export</span>
        </button>

        <button type="button" className="ai-tbtn" onClick={clearChat} title="Clear">
          <i className="bi bi-eraser"></i><span>Clear</span>
        </button>
    </div>
          {messages.map((m, i) => (
            <div key={i} className={m.sender === "user" ? "msg msg-user" : "msg msg-bot"}>
              {m.sender === "user" && mood && <span className="me-1">{mood}</span>}
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="msg msg-bot">
              <span className="typing"><span className="dot" /><span className="dot" /><span className="dot" /></span>
            </div>
          )}
          {!stickBottom && (
            <button
              className="ai-scroll"
              onClick={() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })}
              aria-label="scroll to latest"
            >
              <i className="bi bi-arrow-down"></i>
            </button>
          )}
        </div>

        {/* input */}
        <form onSubmit={handleSend} className="ai-input mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="message"
          />
           <button style={{padding:"20px 5px", borderRadius:"20px"}}
          type="button"
          className={`ai-send ai-tbtn ${recording ? "rec" : ""}`}
          onClick={toggleVoice}
          title="Voice (login required)"
          aria-pressed={recording}
        >
          <i className="bi bi-mic-fill"></i><b>Voice</b>
        </button>
          <button type="submit" className="btn ai-send">Send</button>
        </form>

        {!isLoggedIn && (
          <div className="ai-anon note mt-3">
            You’re chatting anonymously.{" "}
            <Link to="/login">Log in</Link> or <Link to="/signup">sign up</Link> to save chat or use voice.
          </div>
        )}
        
      </div>

      {/* auth modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

export default AIChatBox;

