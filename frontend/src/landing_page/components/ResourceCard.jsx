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
    <div className="res-card">
      <div className="res-card-body">
        <h5 className="res-title">{title}</h5>
        {description && <p className="res-desc">{description}</p>}
      </div>

      <div className="res-card-actions">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="btn res-open"
          title="Explore inside"
        >
          Open
        </a>
      </div>
    </div>
  );
}

export default ResourceCard;

