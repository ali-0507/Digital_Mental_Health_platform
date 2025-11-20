import api from "../api/axios";

const VIEW_THRESHOLD_MS = 3000; // 3 seconds
export const VIEW_THRESHOLD_MS_EXPORT = VIEW_THRESHOLD_MS;

// NOTE: ENDPOINT must NOT include the top-level '/api' because api.defaults.baseURL already includes '/api'
const ENDPOINT = "/resources/view";

function buildUrl() {
  const base = api?.defaults?.baseURL || "";
  if (!base) return ENDPOINT; // relative path if base missing
  return base.endsWith("/") ? base.slice(0, -1) + ENDPOINT : base + ENDPOINT;
}

async function sendLogWithAuth(payload) {
  const url = buildUrl();
  const token = (typeof localStorage !== "undefined" && localStorage.getItem("token")) || "";

  // 1) Try fetch with keepalive + Authorization
  try {
    if (typeof fetch === "function") {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (resp && resp.ok) return true;
      // if not ok, proceed to axios fallback (resp.status may be 401 etc.)
      console.debug("resourceLogger fetch response:", resp.status);
    }
  } catch (e) {
    console.debug("resourceLogger fetch failed, will fallback to axios:", e);
  }

  // 2) Fallback to axios instance (your interceptors will attach token if available)
  try {
    await api.post(ENDPOINT, payload);
    return true;
  } catch (e) {
    console.debug("resourceLogger axios fallback failed:", e);
  }

  // 3) Last resort: sendBeacon (can't set headers). Not recommended unless server accepts token-in-body.
  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([JSON.stringify({ ...payload, __token: token })], {
        type: "application/json",
      });
      const ok = navigator.sendBeacon(buildUrl(), blob);
      console.warn("resourceLogger used sendBeacon fallback; server must accept token-in-body for this to work.");
      return ok;
    }
  } catch (e) {
    console.warn("resourceLogger sendBeacon fallback failed:", e);
  }

  return false;
}

export const logResourceView = async ({ resourceId, title = null, topic = null, durationSeen = 0 }) => {
  if (!resourceId && resourceId !== 0) return false;
  const rid = String(resourceId);
  const payload = {
    resourceId: rid,
    title: title || null,
    topic: topic || null,
    durationSeen: Number(durationSeen) || 0,
  };

  try {
    const ok = await sendLogWithAuth(payload);
    if (ok) {
      try { window.dispatchEvent(new Event("resourceLogged")); } catch {}
      return true;
    }
    return false;
  } catch (err) {
    console.error("logResourceView error:", err);
    return false;
  }
};
