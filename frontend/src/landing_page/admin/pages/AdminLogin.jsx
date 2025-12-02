
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // optional: redirect back to requested page
  const from = (location.state && location.state.from) || { pathname: "/admin" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { data } = await api.post("/auth/login", { email, password }, { withCredentials: true });

      // Many backends return accessToken + user; some only set cookie and return user.
      const accessToken = data?.accessToken || data?.token || null;
      const user = data?.user || data;

      if (accessToken) {
        // use AuthContext.login to set token + user and navigate
        login(accessToken, user);
      } else if (user && user.email) {
        // if backend set HttpOnly cookie and returned user info, set user in context
        // we still call login with a placeholder token (or you can set null)
        login("", user);
      } else {
        // unknown response shape — try to call /auth/me as fallback (cookie-based)
        try {
          const me = await api.get("/auth/me");
          const userFromMe = me.data?.user || me.data;
          if (userFromMe) {
            // don't have an access token, but set user; AuthContext will still work because it uses cookies for refresh
            login("", userFromMe);
          } else {
            throw new Error("Unexpected login response");
          }
        } catch (meErr) {
          throw new Error("Login failed");
        }
      }

      // success -> redirect to admin landing
      navigate(from, { replace: true });
    } catch (err) {
      console.error("admin login error:", err);
      // Prefer server-provided message
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed. Check credentials.";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <div className="card p-4" style={{ width: 420, borderRadius: 12 }}>
        <h4 className="mb-3 text-center">Admin Sign in</h4>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="d-grid">
            <button className="btn btn-success" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-muted text-center mt-3 small">
          Admin only — do not share credentials.
        </div>
      </div>
    </div>
  );
}
