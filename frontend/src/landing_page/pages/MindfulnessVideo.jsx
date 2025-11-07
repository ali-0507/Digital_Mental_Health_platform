import React from "react";
import "./Resources.css";

export default function MindfulnessVideo() {
  const videos = [
    {
      id: 1,
      title: "Mindfulness for Beginners",
      url: "https://www.youtube.com/embed/inpok4MKVLM",
      description:
        "A short guided mindfulness session to help you stay grounded and aware in the present moment.",
    },
    {
      id: 2,
      title: "10-Minute Breathing Meditation",
      url: "https://www.youtube.com/embed/Fpiw2hH-dlc",
      description:
        "Learn simple breathing techniques to calm your mind and release stress.",
    },
    {
      id: 3,
      title: "Body Scan for Relaxation",
      url: "https://www.youtube.com/embed/QHkXvPq2pQE",
      description:
        "A body-scan meditation to bring attention to each part of your body and release tension.",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 rs-title">Mindfulness Video Library</h2>
      <p className="text-center text-muted mb-5 rs-subtitle">
        Watch guided mindfulness and meditation practices to improve focus and emotional balance.
      </p>

      <div className="row g-4">
        {videos.map((video) => (
          <div key={video.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <iframe
                width="100%"
                height="215"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text text-muted">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-5 text-muted">
        Take a few minutes daily to practice mindfulness — your mind deserves peace. 🌿
      </p>
    </div>
  );
}