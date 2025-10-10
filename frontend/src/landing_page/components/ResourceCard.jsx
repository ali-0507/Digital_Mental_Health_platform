// import React from "react";
function ResourceCard({ title, type, link }) {
  return (
    <div className="card h-100 p-3 text-center">
      <span className="material-icons fs-1 text-primary">
        {type === "audio" ? "music_note" : type === "video" ? "videocam" : "menu_book"}
      </span>
      <h5 className="mt-3">{title}</h5>
      <a href={link} className="btn btn-outline-primary mt-3" target="_blank" rel="noreferrer">
        Open
      </a>
    </div>
  );
}

export default ResourceCard;
