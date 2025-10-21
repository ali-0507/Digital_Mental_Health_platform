// // import React from "react";
// import ResourceCard from "../components/ResourceCard";
 
// function Resources() {
//   const resources = [
//     { title: "Relaxation Audio", type: "audio", link: "/" },
//     { title: "Stress Management Guide", type: "pdf", link: "/" },
//     { title: "Mindfulness Video", type: "video", link: "/" },
//   ];

//   return (
//     <div className="resources mb-4 p-3">
//       <h2 className="mb-4 text-center">Psychoeducational Resources</h2>
//       <p className="text-muted text-center mb-4">
//         Explore resources designed to support your mental wellness.
//       </p>

//       <div className="row g-4">
//         {resources.map((res, i) => (
//           <div className="col-md-4" key={i}>
//             <ResourceCard {...res} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Resources;



import React, { useState } from "react";
import ResourceCard from "../components/ResourceCard";
import "./Resources.css";
import { Link } from "react-router-dom";

/* small, dependency-free modal */
function AuthModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="rs-modal-backdrop" onClick={onClose}>
      <div className="rs-modal" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-1">Login required</h5>
        <p className="text-muted mb-3">
          Log in to bookmark resources or recommend them to others.
        </p>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-plain w-100">Login</Link>
          <Link to="/signup" className="btn btn-accent w-100">Sign up</Link>
        </div>
        <button className="rs-modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

function Resources() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);

  // demo local “bookmarks” (UI only)
  const [bookmarks, setBookmarks] = useState({});

  const resources = [
    {
      id: "relax-audio",
      title: "Relaxation Audio",
      type: "audio",
      link: "/",
      description: "A 10-minute guided relaxation to reduce tension.",
      meta: { source: "Connect & Evolve", author: "Clinical Team", year: "2025", length: "10 min" },
    },
    {
      id: "stress-guide",
      title: "Stress Management Guide",
      type: "pdf",
      link: "/",
      description: "Evidence-based strategies for coping with stress.",
      meta: { source: "WHO / APA summaries", year: "2024", length: "8 pages" },
    },
    {
      id: "mindfulness-video",
      title: "Mindfulness Video",
      type: "video",
      link: "/",
      description: "Learn a quick mindfulness practice you can do anywhere.",
      meta: { source: "Connect & Evolve", year: "2025", length: "6 min" },
    },
  ];

  const toggleBookmark = (id) =>
    setBookmarks((b) => ({ ...b, [id]: !b[id] }));

  const recommend = (id) => {
    if (!isLoggedIn) return setShowAuth(true);
    // TODO: wire to backend later
    alert(`Recommended “${resources.find(r => r.id === id)?.title}” (stub).`);
  };

  return (
    <div className="rs-bg py-5">
      <div className="container" style={{ maxWidth: 1100 }}>
        <header className="text-center mb-3">
          <h2 className="rs-title mb-1">Psychoeducational Resources</h2>
          <p className="rs-subtitle">
            Explore evidence-informed guides, audio practices, and videos to support your mental wellness.
          </p>
        </header>

        <div className="rs-disclaimer mb-4">
          <i className="bi bi-info-circle me-2"></i>
          Educational content only — not a substitute for professional diagnosis or treatment.
          Please check cited sources and consult a clinician if needed.
        </div>

        <div className="row g-4">
          {resources.map((res) => (
            <div className="col-12 col-md-6 col-lg-4" key={res.id}>
              <ResourceCard
                {...res}
                isLoggedIn={isLoggedIn}
                isBookmarked={!!bookmarks[res.id]}
                onBookmark={() => (isLoggedIn ? toggleBookmark(res.id) : setShowAuth(true))}
                onRecommend={() => recommend(res.id)}
                onAuthRequired={() => setShowAuth(true)}
              />
            </div>
          ))}
        </div>

        <p className="rs-helpline mt-4 text-center">
          In crisis?{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
            Contact local helplines
          </a>
          .
        </p>
      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}

export default Resources;
