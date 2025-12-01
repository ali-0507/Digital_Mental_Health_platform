import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";

export default function ChatDetailModal({ open, chatId, onClose }) {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open || !chatId) return;
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/chat/${chatId}`);
        setChat(data?.chat || null);
      } catch (e) {
        setChat(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open, chatId]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [chat]);

  if (!open) return null;

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal wide" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Conversation</h5>
          <button className="ai-modal-close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {loading && <div>Loading…</div>}
        {!loading && !chat && <div className="alert alert-warning">Chat not found.</div>}

        {chat && (
          <div ref={boxRef} style={{ height: 420, overflow: "auto", border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
            {chat.messages.map((m, idx) => (
              <div key={idx} className={`mb-2 p-2 rounded ${m.sender === "user" ? "bg-light" : "bg-primary text-white"}`} style={{ maxWidth: "80%" }}>
                <div className="small fw-semibold mb-1">{m.sender === "user" ? "You" : "Assistant"}</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
