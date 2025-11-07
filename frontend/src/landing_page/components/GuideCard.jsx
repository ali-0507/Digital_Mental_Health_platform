export default function GuideCard({
  title,
  type,         
  link,
  description,
  meta = {},    
  isLoggedIn = false,
  isBookmarked = false,
  onBookmark,   
  onRecommend,  
  onAuthRequired, 
}){
    const handleBookmark = () => {
    if (!isLoggedIn) return onAuthRequired?.();
    onBookmark?.();
  };
  const handleRecommend = () => {
    if (!isLoggedIn) return onAuthRequired?.();
    onRecommend?.();
  };

  return (
    <div className="guide-card">
      <div className="guide-card-body">
       <span><i className="fa-solid fa-seedling fs-5 pb-2"></i></span>
       <h5 className="guide-title">{title}</h5>
        {description && <p className="guide-desc">{description}</p>}

        <ul className="guide-meta" style={{listStyle:"none", paddingLeft:0}}>
          {meta.source && <li><i className="bi bi-link-45deg"></i> {meta.source}</li>}
          {/* {meta.author && <li><i className="bi bi-person"></i> {meta.author}</li>} */}
          {meta.year && <li><i className="bi bi-calendar3"></i> {meta.year}</li>}
          {meta.length && <li><i className="bi bi-book"></i> {meta.length}</li>}
        </ul>

      </div>

      <div className="guide-card-actions">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="btn guide-open"
          title="Read"
        >
         Read guide
        </a>

        {/* protected actions */}
        <div className="guide-actions-protected">
          <button
            type="button"
            className={`btn guide-outline ${isBookmarked ? "active" : ""}`}
            onClick={handleBookmark}
            title={isBookmarked ? "Bookmarked" : "Save / Bookmark"}
          >
            <i className={isBookmarked ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}></i>
          </button>

          <button
            type="button"
            className="btn guide-outline"
            onClick={handleRecommend}
            title="Recommend"
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>
    </div>
  );
}