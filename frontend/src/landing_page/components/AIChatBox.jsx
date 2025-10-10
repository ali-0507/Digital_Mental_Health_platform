import React, { useState } from "react";

function AIChatBox() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm here to support you. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    // Simulate AI response (TODO: connect backend API /api/chat)
    setTimeout(() => {
      const reply = {
        sender: "bot",
        text: "I understand. Remember to take a deep breath. Would you like coping strategies?",
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);

    setInput("");
  };

  return (
    <div className="chat-box">
      <div className="chat-messages mb-3 p-3 border rounded bg-light" style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 text-${msg.sender === "user" ? "end" : "start"}`}>
            <span
              className={`d-inline-block p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-white border"}`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <i class="fa-solid fa-microphone"></i>
        </button>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}

export default AIChatBox;
