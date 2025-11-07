import React from "react";
import "./RelaxationAudio.css";

const audios = [
  {
    id: 1,
    title: "5-Minute Deep Breathing",
    description: "Calm your mind with a short guided breathing session.",
    src: "https://example.com/audios/deep-breathing.mp3",
  },
  {
    id: 2,
    title: "Progressive Muscle Relaxation",
    description: "Gently relax each muscle group to reduce tension.",
    src: "https://example.com/audios/muscle-relaxation.mp3",
  },
  {
    id: 3,
    title: "Mindful Body Scan",
    description: "A soothing 10-minute mindfulness practice for awareness.",
    src: "https://example.com/audios/body-scan.mp3",
  },
  {
    id: 4,
    title: "Evening Calm Meditation",
    description: "Ease your mind before sleep with gentle guidance.",
    src: "https://example.com/audios/evening-calm.mp3",
  },
];

const RelaxationAudio = () => {
  return (
    <div className="audio-page container py-5">
      <h2 className="text-center mb-4 rs-title">Relaxation Audio Library</h2>
      <p className="text-center text-muted mb-5">
        Listen to guided practices and calming tracks designed to help you unwind.
      </p>

      <div className="row g-4">
        {audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-4">
            <div className="audio-card p-3 rounded shadow-sm">
              <h5>{audio.title}</h5>
              <p className="text-muted small">{audio.description}</p>
              <audio controls className="w-100 mt-2">
                <source src={audio.src} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelaxationAudio;