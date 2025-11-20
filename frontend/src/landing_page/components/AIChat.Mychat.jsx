import { useEffect, useState } from "react";
import api from "../../api/axios";

function formatWhen(iso) {
  try { return new Date(iso).toLocaleString(); } catch { return ""; }
}

export default function MyChatsInline({ onView }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true); setErr("");
    try {
      const { data } = await api.get("/chat/my-chats");
      setChats(data?.chats || []);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to fetch chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this chat?")) return;
    try {
      await api.delete(`/chat/${id}`);
      setChats((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div>Loading chats…</div>;
  if (err) return <div className="alert alert-danger">{err}</div>;
  if (!chats.length) {
    return (
      <div className="alert alert-info">
        No saved chats yet. Start a conversation in the Chat tab, then click <b>Save</b>.
      </div>
    );
  }

  return (
    <div className="list-group">
      {chats.map((c) => {
        const firstUserMsg = c.messages?.find(m => m.sender === "user")?.text || "(No user message)";
        const preview = firstUserMsg.length > 80 ? firstUserMsg.slice(0, 80) + "…" : firstUserMsg;
        return (
          <div key={c._id} className="list-group-item d-flex align-items-center justify-content-between">
            <div>
              <div className="fw-semibold">{preview}</div>
              <div className="text-muted small">{formatWhen(c.createdAt)}</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={() => onView(c._id)}>
                View
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(c._id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
