import { logResourceView } from "../../utils/resourceLogger";

export default function GuideCard({
  id,
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


    // Called when user clicks "Read guide"
  const handleOpen = (e) => {
    // determine a stable resource id; fallback to link if id not provided
    const resourceId = id || link;
    if (!resourceId) return;

    // avoid duplicate logs in same session
    const sessionKey = `resource_viewed:${resourceId}`;
    if (sessionStorage.getItem(sessionKey)) {
      // already logged this session — do nothing
      return;
    }



    
    // Fire-and-forget the logger so we don't delay opening the doc.
    // When it resolves, mark sessionStorage to avoid re-logging.
    logResourceView({ resourceId, title, topic: "guide", durationSeen: 0 })
      .then((ok) => {
        if (ok) {
          try {
            sessionStorage.setItem(sessionKey, "1");
          } catch (err) {
            // ignore sessionStorage errors
          }
        }
      })
      .catch((err) => {
        console.error("Guide view log failed:", err);
      });

    // do not prevent default — allow opening in new tab immediately
  };
  return (
    <div className="guide-card">
      <div className="guide-card-body">
       <span><i className="fa-solid fa-seedling fs-5 pb-2"></i></span>
       <h5 className="guide-title">{title}</h5>
        {description && <p className="guide-desc">{description}</p>}

        <ul className="guide-meta" style={{listStyle:"none", paddingLeft:0}}>
          {meta.source && <li><i className="bi bi-link-45deg"></i> {meta.source}</li>}
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
          onClick={handleOpen}
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