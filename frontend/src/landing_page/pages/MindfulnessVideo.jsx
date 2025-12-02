import React, { useEffect, useRef } from "react";
import "./Resources.css";
import { logResourceView, VIEW_THRESHOLD_MS_EXPORT } from "../../utils/resourceLogger";

const videos = [
  { id: 1, title: "Mindfulness for Beginners", url: "https://www.youtube.com/embed/inpok4MKVLM", description: "A short guided mindfulness session..." },
  { id: 2, title: "10-Minute Breathing Meditation", url: "https://www.youtube.com/embed/Fpiw2hH-dlc", description: "Learn simple breathing techniques..." },
  { id: 3, title: "Body Scan for Relaxation", url: "https://www.youtube.com/embed/QHkXvPq2pQE", description: "A body-scan meditation..." },
];

function extractYouTubeId(url) {
  const m = url.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export default function MindfulnessVideo() {
  const playersRef = useRef({}); // map video.id -> YT.Player
  const apiLoadedRef = useRef(false);
  const thresholdMs = VIEW_THRESHOLD_MS_EXPORT || 3000;

  // load YT API once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      apiLoadedRef.current = true;
      return;
    }

    // create script and wait for it to initialize
    const scriptId = "youtube-iframe-api";
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement("script");
      tag.id = scriptId;
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // onYouTubeIframeAPIReady is invoked by the YT script
    window.onYouTubeIframeAPIReady = () => {
      apiLoadedRef.current = true;
    };

    return () => {
      // don't remove the script (other pages might reuse it)
      // cleanup handler remains noop
    };
  }, []);

  useEffect(() => {
    // wait until API is ready, then create players
    let mounted = true;
    const createPlayersWhenReady = () => {
      if (!mounted) return;
      if (!apiLoadedRef.current || !window.YT || !window.YT.Player) {
        // try again in short while
        setTimeout(createPlayersWhenReady, 200);
        return;
      }

      videos.forEach((video) => {
        const vidId = extractYouTubeId(video.url);
        if (!vidId) return;
        const elementId = `yt-player-${video.id}`;
        // If player already exists skip
        if (playersRef.current[video.id]) return;

        const player = new window.YT.Player(elementId, {
          videoId: vidId,
          playerVars: {
            // keep intuitive YouTube behavior
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
          },
          events: {
            onStateChange: (evt) => handleStateChange(evt, video),
            onError: (err) => console.debug("YT player error:", err),
          },
        });

        // keep reference + a small object to store timeout id
        playersRef.current[video.id] = {
          player,
          viewTimeoutId: null,
          logged: false,
        };
      });
    };

    const handleStateChange = (evt, video) => {
      const YT = window.YT;
      if (!YT) return;
      const state = evt.data;
      const entry = playersRef.current[video.id];
      if (!entry) return;

      // session key to avoid duplicate logs in same session
      const sessionKey = `resource_viewed:video:${video.id}`;
      if (sessionStorage.getItem(sessionKey)) {
        // already logged in this session — mark and skip any timers
        entry.logged = true;
        clearTimeout(entry.viewTimeoutId);
        entry.viewTimeoutId = null;
        return;
      }

      // When playing, start threshold timer; clear it on pause/stop/buffering
      if (state === YT.PlayerState.PLAYING) {
        // if already logged, nothing to do
        if (entry.logged) return;

        // ensure no existing timer
        clearTimeout(entry.viewTimeoutId);
        entry.viewTimeoutId = setTimeout(async () => {
          try {
            // call logger
            const resourceId = `video:${video.id}`; // stable id
            const ok = await logResourceView({
              resourceId,
              title: video.title,
              topic: "video",
              durationSeen: thresholdMs, // send threshold as seen
            });
            if (ok) {
              entry.logged = true;
              try { sessionStorage.setItem(sessionKey, "1"); } catch {}
            }
          } catch (e) {
            console.error("video view log failed:", e);
          }
        }, thresholdMs);
      } else {
        // PAUSE, ENDED, BUFFERING, CUED, etc -> cancel pending timer
        clearTimeout(entry.viewTimeoutId);
        entry.viewTimeoutId = null;
      }
    };

    window.__createYTPlayers = createPlayersWhenReady;
    // try initial create (if API already loaded)
    createPlayersWhenReady();

    return () => {
      mounted = false;
      // destroy players and clear timers
      Object.values(playersRef.current).forEach((entry) => {
        try {
          if (entry.viewTimeoutId) clearTimeout(entry.viewTimeoutId);
          if (entry.player && entry.player.destroy) entry.player.destroy();
        } catch (_) {}
      });
      playersRef.current = {};
      // cleanup any global helper we set
      try { delete window.__createYTPlayers; } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // We declare this here so closures in YT events can use it too (defensive)
  const handleStateChange = () => {
    /* placeholder - actual per-player handler is attached in createPlayersWhenReady */
  };

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
              {/* YT player mount point (replaces static iframe) */}
              <div
                id={`yt-player-${video.id}`}
                style={{ width: "100%", height: 215, background: "#000" }}
              >
                {/* the player will replace this div */}
              </div>

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
