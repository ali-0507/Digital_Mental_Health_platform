 import React, { useRef, useEffect } from "react";
import { logResourceView, VIEW_THRESHOLD_MS_EXPORT } from "../../utils/resourceLogger";
import "./RelaxationAudio.css";

const audios = [
  { id: "a1", title: "2-Minute Deep Breathing", description: "Calm your mind...", src: "/audios/mental-health-163877.mp3" },
  { id: "a2", title: "Progressive Muscle Relaxation", description: "Gently relax each muscle group...", src: "/audios/relaxing-piano-music-272714.mp3" },
  { id: "a3", title: "Mindful Body Scan", description: "A soothing 2-minute mindfulness practice...", src: "/audios/please-calm-my-mind-125566.mp3" },
  { id: "a4", title: "Evening Calm Meditation", description: "Ease your mind before sleep...", src: "/audios/evening-meditation-in-the-open-air-166108.mp3" },
];

export default function RelaxationAudio() {
  return (
    <div className="audio-page container py-5">
      <h2 className="text-center mb-4 rs-title">Relaxation Audio Library</h2>
      <p className="text-center text-muted mb-5">
        Listen to guided practices and calming tracks designed to help you unwind.
      </p>

      <div className="row g-4">
        {audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-4">
            <AudioCard audio={audio} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AudioCard({ audio }) {
  const elRef = useRef(null);
  const timerRef = useRef(null);
  const loggedRef = useRef(false);
  const thresholdMs = typeof VIEW_THRESHOLD_MS_EXPORT === "number" ? VIEW_THRESHOLD_MS_EXPORT : 3000;
  const sessionKey = `resource_viewed:audio:${audio.id}`;

  // Pause this audio when another audio starts
  useEffect(() => {
    const onOtherAudioPlayed = (e) => {
      const playingId = e?.detail;
      if (!playingId) return;
      if (playingId !== audio.id && elRef.current && !elRef.current.paused) {
        elRef.current.pause();
      }
    };
    window.addEventListener("audio-played", onOtherAudioPlayed);
    return () => {
      window.removeEventListener("audio-played", onOtherAudioPlayed);
    };
  }, [audio.id]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // helper to mark sessionStorage and local loggedRef
  const markLogged = () => {
    loggedRef.current = true;
    try { sessionStorage.setItem(sessionKey, "1"); } catch {}
  };

  const startTimer = async () => {
    // if already logged in this session, avoid starting
    if (loggedRef.current || sessionStorage.getItem(sessionKey)) {
      loggedRef.current = true;
      // still broadcast so other audios pause
      window.dispatchEvent(new CustomEvent("audio-played", { detail: audio.id }));
      return;
    }

    // broadcast playing so others pause
    window.dispatchEvent(new CustomEvent("audio-played", { detail: audio.id }));

    // ensure no duplicate timer
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      // double-check element still exists and is playing
      const current = elRef.current;
      if (!current || current.paused) {
        timerRef.current = null;
        return;
      }

      try {
        const resourceId = `audio:${audio.id}`; // consistent with video prefix
        const ok = await logResourceView({
          resourceId,
          title: audio.title,
          topic: "audio",
          // send threshold (ms) or seconds depending on your backend expectation
          durationSeen: Math.floor(thresholdMs / 1000), // seconds watched at least
        });
        if (ok) markLogged();
      } catch (err) {
        console.error("audio view log failed:", err);
      } finally {
        timerRef.current = null;
      }
    }, thresholdMs);
  };

  const cancelTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const onEnded = async () => {
    cancelTimer();
    if (loggedRef.current || sessionStorage.getItem(sessionKey)) {
      markLogged();
      return;
    }

    try {
      const resourceId = `audio:${audio.id}`;
      const currentTime = Math.floor(elRef.current?.currentTime || 0);
      const ok = await logResourceView({
        resourceId,
        title: audio.title,
        topic: "audio",
        durationSeen: currentTime, // send actual seconds listened
      });
      if (ok) markLogged();
    } catch (err) {
      console.error("audio onEnded log failed:", err);
    }
  };

  return (
    <div className="audio-card p-3 rounded shadow-sm">
      <h5>{audio.title}</h5>
      <p className="text-muted small">{audio.description}</p>
      <audio
        ref={elRef}
        controls
        className="w-100 mt-2"
        onPlay={startTimer}
        onPause={cancelTimer}
        onSeeking={cancelTimer}
        onEnded={onEnded}
      >
        <source src={audio.src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
