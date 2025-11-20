import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import "./PeerSupport.css";
import { Link } from "react-router-dom";

function AuthModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="ps-modal-backdrop" onClick={onClose}>
      <div className="ps-modal" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">Login required</h5>
        <p className="text-muted mb-3">
          Please log in to post, reply, upvote, or report. We keep communities
          safe with basic moderation.
        </p>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-plain w-100">
            Login
          </Link>
          <Link to="/signup" className="btn btn-accent w-100">
            Sign up
          </Link>
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
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState({});

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/peer-support");
      setThreads(res.data?.threads ?? res.data ?? []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //sort logic
  const sorted = useMemo(() => {
    const t = [...threads];
    if (sort === "new")
      t.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else t.sort((a, b) => b.upvotes - a.upvotes);
    return t;
  }, [threads, sort]);

  // create post
  const postThread = async () => {
    if (!isLoggedIn) return setShowAuth(true);
    const text = newPost.trim();
    if (!text) return;

    try {
      const res = await api.post("/peer-support", { content: text });
      setThreads((p) => [res.data, ...p]);
      setNewPost("");
    } catch (err) {
      console.error("Error posting:", err);
      alert(err.response?.data?.message || "Failed to post");
    }
  };

  // upvote
  const upvote = async (id) => {
    if (!isLoggedIn) return setShowAuth(true);
    try {
      const res = await api.post(`/peer-support/${id}/upvote`);
      setThreads((p) => p.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };

  // Report
  const report = async (id) => {
    if (!isLoggedIn) return setShowAuth(true);
    try {
      await api.post(`/peer-support/${id}/report`);
      alert("Reported. Our moderators will review this thread.");
    } catch (err) {
      console.error("Error reporting:", err);
    }
  };

  // Add comment
  const addComment = async (id) => {
    if (!isLoggedIn) return setShowAuth(true);
    const text = (reply[id] || "").trim();
    if (!text) return;
    try {
      const res = await api.post(`/peer-support/${id}/comment`, {
        content: text,
      });
      const newComment = res.data?.comment ?? res.data; // adjust to your API shape
      setThreads((prev) =>
        prev.map((t) =>
          t._id === id
            ? { ...t, comments: [...(t.comments || []), newComment] }
            : t
        )
      );
      setReply((prev) => ({ ...prev, [id]: "" }));
      alert("Comment added!");
    } catch (err) {
      console.error("Error commenting:", err);
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  // Fetch comments for a specific thread
  const fetchComments = async (id) => {
    try {
      const res = await api.get(`/peer-support/${id}/comments`);
      const list = res.data?.comments ?? res.data ?? [];
      setThreads((prev) =>
        prev.map((t) => (t._id === id ? { ...t, comments: list } : t))
      );
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const timeAgo = (ts) => {
    const mins = Math.floor((Date.now() - new Date(ts)) / 60000);
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
            Share, listen, and learn together. Browse publicly. Log in to post
            or interact.
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
              placeholder={
                isLoggedIn
                  ? "How are you feeling today?"
                  : "Log in to start chat..."
              }
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              disabled={!isLoggedIn}
              rows={3}
            />
            <button
              className="btn ps-btn"
              onClick={postThread}
              disabled={!isLoggedIn || !newPost.trim()}
            >
              Post
            </button>
          </div>

          {!isLoggedIn && (
            <div className="ps-anon-note mt-2">
              Browsing is public.{" "}
              <button className="link-plain" onClick={() => setShowAuth(true)}>
                Log in
              </button>{" "}
              to post, reply, upvote, or report.
            </div>
          )}
        </div>

        {/* Threads */}
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : (
          <div className="d-grid gap-3">
            {sorted.map((t) => (
              <article key={t._id} className="ps-card p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className={`ps-author ${
                        t.authorType?.includes("Moderator") ? "mod" : ""
                      }`}
                    >
                      {t.authorType || "User"}
                    </span>
                    <small className="text-muted">
                      • {timeAgo(t.createdAt)}
                    </small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm ps-btn-outline"
                      onClick={() => upvote(t._id)}
                    >
                      <i className="bi bi-hand-thumbs-up"></i> {t.upvotes}
                    </button>
                    <button
                      className="btn btn-sm ps-btn-outline"
                      onClick={() => report(t._id)}
                    >
                      <i className="bi bi-flag"></i> Report
                    </button>
                    <button
                      className="btn btn-sm ps-btn-outline"
                      onClick={() => fetchComments(t._id)}
                    >
                      View comments
                    </button>
                  </div>
                </div>

                <p className="mb-2 ps-content">{t.content}</p>

                {t.tags?.length > 0 && (
                  <div className="d-flex flex-wrap gap-1">
                    {t.tags.map((tag) => (
                      <span key={tag} className="ps-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Comments list */}
                {Array.isArray(t.comments) && t.comments.length > 0 && (
                  <div className="ps-comments mt-3">
                    <div className="mb-2 small text-muted">
                      {t.comments.length}{" "}
                      {t.comments.length === 1 ? "reply" : "replies"}
                    </div>
                    <div className="d-grid gap-2">
                      {t.comments.map((c) => (
                        <div key={c._id} className="ps-comment">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span
                              className={`ps-author ${
                                c.authorType?.includes("Moderator") ? "mod" : ""
                              }`}
                            >
                              {c.authorType || "User"}
                            </span>
                            <small className="text-muted">
                              • {timeAgo(c.createdAt)}
                            </small>
                          </div>
                          <div className="ps-comment-text">{c.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Box (gated) */}
                <div className="ps-reply mt-3">
                  <input
                    type="text"
                    className="form-control ps-reply-input"
                    placeholder={isLoggedIn ? "Write a kind reply…" : "Log in to reply…"}
                    disabled={!isLoggedIn}
                    value={reply[t._id] || ""}
                    onChange={(e) => 
                    setReply(prev => ({...prev, [t._id]: e.target.value}))
                    }
                    onKeyDown={(e) =>{
                      if (e.key === "Enter"&& e.target.value.trim()){
                          addComment(t._id, e.target.value);
                      } 
                    }}
                  />
                  <button className="btn ps-btn" disabled={!isLoggedIn || !(reply[t._id] || " ").trim()}
                  onClick={() => addComment(t._id)}>
                    Reply
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

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
