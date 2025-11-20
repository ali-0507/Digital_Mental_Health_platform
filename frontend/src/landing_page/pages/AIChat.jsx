import { useState } from "react";
import AIChatBox from "../components/AIChatBox";
import MyChatsInline from "../components/AIChat.Mychat";
import ChatDetailModal from "../components/AIChat.ChatDetails";
import "./AIChat.css";

function AIChat() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

    const [tab, setTab] = useState("chat"); // "chat" | "my-chats"
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailId, setDetailId] = useState(null);

  const openDetail = (id) => {
    setDetailId(id);
    setDetailOpen(true);
  };

  return (
    <div className="ai-bg py-5">
      <div className="container" style={{ maxWidth: 980 }}>
        <header className="text-center mb-3">
          <h2 className="ai-title mb-1">AI First-Aid Support</h2>
          <p className="ai-subtitle">
            A gentle assistant for basic coping strategies and reflection.
          </p>
        </header>

        <div className="ai-disclaimer mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          This chatbot offers general emotional support. It is <strong>not</strong> a substitute
          for professional therapy or emergency care. If you feel unsafe, please contact your local helpline.
        </div>


            {/* Tabs */}
        <ul className="nav nav-pills mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "chat" ? "active" : ""}`}
              onClick={() => setTab("chat")}
            >
              Chat
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "my-chats" ? "active" : ""}`}
              onClick={() => setTab("my-chats")}
              disabled={!isLoggedIn}
              title={!isLoggedIn ? "Login to see your saved chats" : ""}
            >
              My Chats
            </button>
          </li>
        </ul>

         {/* Panels */}
        {tab === "chat" && <AIChatBox isLoggedIn={isLoggedIn} />}

         {tab === "my-chats" && (
          <div className="ai-card p-3">
            {!isLoggedIn ? (
              <div className="alert alert-info">
                Please log in to view your saved chats.
              </div>
            ) : (
              <MyChatsInline onView={openDetail} />
            )}
          </div>
        )}

        <p className="ai-helpline mt-4 text-center">
          Need urgent help?{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
            Find mental-health helplines near you
          </a>
        </p>
      </div>

        {/* Detail modal */}
      <ChatDetailModal
        open={detailOpen}
        chatId={detailId}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
export default AIChat;

