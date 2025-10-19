 function ResourceCard({
  title,
  type,         // "audio" | "video" | "pdf"
  link,
  description,
  meta = {},    // { source, author, year, length }
  isLoggedIn = false,
  isBookmarked = false,
  onBookmark,   // () => void
  onRecommend,  // () => void
  onAuthRequired, // () => void
}) {
  const icon =
    type === "audio" ? "music_note" :
    type === "video" ? "videocam" :
    "menu_book";

  const handleBookmark = () => {
    if (!isLoggedIn) return onAuthRequired?.();
    onBookmark?.();
  };
  const handleRecommend = () => {
    if (!isLoggedIn) return onAuthRequired?.();
    onRecommend?.();
  };

  return (
    <article className="res-card h-100">
      <div className="res-card-body">
        <div className="res-type">
          <span className="material-icons-round">{icon}</span>
        </div>

        <h5 className="res-title">{title}</h5>
        {description && <p className="res-desc">{description}</p>}

        {/* citation / metadata */}
        <ul className="res-meta">
          {meta.source && <li><i className="bi bi-link-45deg"></i> {meta.source}</li>}
          {meta.author && <li><i className="bi bi-person"></i> {meta.author}</li>}
          {meta.year && <li><i className="bi bi-calendar3"></i> {meta.year}</li>}
          {meta.length && <li><i className="bi bi-clock"></i> {meta.length}</li>}
        </ul>
      </div>

      <div className="res-card-actions">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="btn res-open"
          title="Open resource"
        >
          Open
        </a>

        {/* protected actions */}
        <div className="res-actions-protected">
          <button
            type="button"
            className={`btn res-outline ${isBookmarked ? "active" : ""}`}
            onClick={handleBookmark}
            title={isBookmarked ? "Bookmarked" : "Save / Bookmark"}
          >
            <i className={isBookmarked ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}></i>
          </button>

          <button
            type="button"
            className="btn res-outline"
            onClick={handleRecommend}
            title="Recommend"
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ResourceCard;

