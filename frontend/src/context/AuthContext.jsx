import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


   // --- helper: try to refresh access token using HTTP-only cookie
  const silentRefresh = async () => {
    try {
      const { data } = await api.post("/auth/refresh", {}, { withCredentials: true });
      if (data?.accessToken) {
        localStorage.setItem("token", data.accessToken); // save fresh access token
        return data.accessToken;
      }
    } catch (_) {
      // ignore here; caller will clean up
    }
    return null;
  };


  // Load user on app start:
  // 1) If we have a non-empty token -> try /me
  // 2) If missing/invalid -> try silent refresh, then /me
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = localStorage.getItem("token");

        const hasToken =
          token && token !== "undefined" && token !== "null" && token.trim() !== "";

        if (hasToken) {
          try {
            const { data } = await api.get("/auth/me");
            setUser(data.user);
            setLoading(false);
            return;
          } catch {
            // token might be expired/malformed; fall through to refresh
          }
        }


         // No valid token -> try silent refresh using cookie
        const newToken = await silentRefresh();
        if (newToken) {
          const { data } = await api.get("/auth/me");
          setUser(data.user);
        } else {
          // refresh failed -> ensure clean state
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);
  
  // Login user (after successful login form)
  const login = (accessToken, userData) => {
    localStorage.setItem("token", accessToken);
    setUser(userData);
    navigate("/");
  };

  // Logout
  const logout = async () => {
    try{
      await api.post("/auth/logout", {}, { withCredentials: true });
    }catch(_){
      // ignore errors
    }
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => useContext(AuthContext);
