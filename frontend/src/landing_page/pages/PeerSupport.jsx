 import React, { useMemo, useState } from "react";
import "./PeerSupport.css";
import { Link } from "react-router-dom";

function AuthModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="ps-modal-backdrop" onClick={onClose}>
      <div className="ps-modal" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-1">Login required</h5>
        <p className="text-muted mb-3">
          Please log in to post, reply, upvote, or report. We keep communities safe with basic moderation.
        </p>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-plain w-100">Login</Link>
          <Link to="/signup" className="btn btn-accent w-100">Sign up</Link>
        </div>
        <button className="ps-modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default function PeerSupport() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const [showAuth, setShowAuth] = useState(false);
  const [sort, setSort] = useState("top");
  const [newPost, setNewPost] = useState("");

  const [threads, setThreads] = useState([
    {
      id: 1,
      authorType: "Anonymous User",
      content: "Struggling with exam stress, anyone have tips?",
      tags: ["exams", "anxiety"],
      upvotes: 12,
      createdAt: Date.now() - 1000 * 60 * 60 * 5,
    },
    {
      id: 2,
      authorType: "Volunteer Moderator",
      content: "Deep breathing exercises have helped me—happy to share a 2-min routine.",
      tags: ["breathing", "coping"],
      upvotes: 21,
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
  ]);

  const sorted = useMemo(() => {
    const t = [...threads];
    if (sort === "new") t.sort((a, b) => b.createdAt - a.createdAt);
    else t.sort((a, b) => b.upvotes - a.upvotes);
    return t;
  }, [threads, sort]);

  const postThread = () => {
    if (!isLoggedIn) return setShowAuth(true);
    const text = newPost.trim();
    if (!text) return;
    setThreads((p) => [
      {
        id: Math.random(),
        authorType: "You",
        content: text,
        tags: [],
        upvotes: 0,
        createdAt: Date.now(),
      },
      ...p,
    ]);
    setNewPost("");
  };

  const upvote = (id) => {
    if (!isLoggedIn) return setShowAuth(true);
    setThreads((p) => p.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t)));
  };

  const report = (id) => {
    if (!isLoggedIn) return setShowAuth(true);
    // TODO: send to moderation queue
    alert("Reported. Our moderators will review this thread.");
  };

  const timeAgo = (ts) => {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
    };

  return (
    <div className="ps-bg py-5">
      <div className="container" style={{ maxWidth: 980 }}>
        <header className="text-center mb-3">
          <h2 className="ps-title mb-1">Peer Support</h2>
          <p className="ps-subtitle">
            Share, listen, and learn together. Browse publicly. Log in to post or interact.
          </p>
        </header>

        {/* Composer */}
        <div className="ps-card p-3 p-md-4 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2 gap-2 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <span className="badge ps-badge">Community</span>
              <small className="text-muted">
                Be kind • Respect privacy • No crisis content (use helplines)
              </small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <label className="text-muted me-1 small">Sort</label>
              <select
                className="form-select form-select-sm ps-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="top">Top</option>
                <option value="new">New</option>
              </select>
            </div>
          </div>

          <div className="ps-composer">
            <textarea
              className="form-control ps-input"
              placeholder={isLoggedIn ? "How are you feeling today?" : "Log in to start a thread..."}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              disabled={!isLoggedIn}
              rows={3}
            />
            <button className="btn ps-btn" onClick={postThread} disabled={!isLoggedIn || !newPost.trim()}>
              Post
            </button>
          </div>

          {!isLoggedIn && (
            <div className="ps-anon-note mt-2">
              Browsing is public.{" "}
              <button className="link-plain" onClick={() => setShowAuth(true)}>Log in</button> to post, reply, upvote, or report.
            </div>
          )}
        </div>

        {/* Threads */}
        <div className="d-grid gap-3">
          {sorted.map((t) => (
            <article key={t.id} className="ps-card p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center gap-2">
                  <span className={`ps-author ${t.authorType.includes("Moderator") ? "mod" : ""}`}>
                    {t.authorType}
                  </span>
                  <small className="text-muted">• {timeAgo(t.createdAt)}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm ps-btn-outline" onClick={() => upvote(t.id)}>
                    <i className="bi bi-hand-thumbs-up"></i> {t.upvotes}
                  </button>
                  <button className="btn btn-sm ps-btn-outline" onClick={() => report(t.id)}>
                    <i className="bi bi-flag"></i> Report
                  </button>
                </div>
              </div>

              <p className="mb-2 ps-content">{t.content}</p>

              {t.tags?.length > 0 && (
                <div className="d-flex flex-wrap gap-1">
                  {t.tags.map((tag) => (
                    <span key={tag} className="ps-tag">#{tag}</span>
                  ))}
                </div>
              )}

              {/* Reply (gated) */}
              <div className="ps-reply mt-3">
                <input
                  type="text"
                  className="form-control ps-reply-input"
                  placeholder={isLoggedIn ? "Write a kind reply…" : "Log in to reply…"}
                  disabled={!isLoggedIn}
                />
                <button className="btn ps-btn" disabled={!isLoggedIn}>Reply</button>
              </div>
            </article>
          ))}
        </div>

        <p className="ps-helpline mt-4 text-center">
          In crisis?{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
            Contact local helplines
          </a>
          .
        </p>
      </div>

      {/* Auth modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
