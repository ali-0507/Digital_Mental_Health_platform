import axios from "axios";

const BASE_URL =
  (import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "") || "http://localhost:8080") + "/api";

 const api = axios.create({
  baseURL: BASE_URL, // backend URL
  withCredentials: true,               // set true because using cookies for refresh token
});

// ---- REQUEST INTERCEPTOR ---- Automatically attach token if logged in
 api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

   const hasRealToken =
    typeof token === "string" &&
    token.trim() !== "" &&
    token !== "null" &&
    token !== "undefined";


  if (hasRealToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }else if (config.headers && "Authorization" in config.headers){
      delete config.headers.Authorization;  // ensure header is absent for public requests
  }
  return config;
});



// Helper to set refresh token cookie

// ---------- RESPONSE INTERCEPTOR (auto-refresh logic) ----------
let isRefreshing = false;
let pendingRequests = [];
let logoutInProgress = false;



const shouldAttemptRefresh = (error, original) => {
  // must be 401
  if (error.response?.status !== 401) return false;

  // don't refresh for refresh/logout endpoints
  const url = (original?.url || "").toString();
  if (url.includes("/auth/refresh") || url.includes("/auth/logout") || url.includes("/auth/login")) {
    return false;
  }

  // only refresh if the original request actually had Authorization
  const hadAuth =
    !!original?.headers?.Authorization ||
    !!api.defaults?.headers?.common?.Authorization;
  if (!hadAuth) return false;

  return true;
};
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (!shouldAttemptRefresh(error, original) || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

 // If refresh already in progress, queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: (token) => {
             original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

     // Start refresh process
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true, headers: {} }  //  send cookie
      );

      const newToken = data?.accessToken;
      if (!newToken) throw new Error("No new access token");

      // Save new token
      localStorage.setItem("token", newToken);
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        pendingRequests.forEach(({ resolve }) => resolve(newToken));
       pendingRequests = [];


       // Retry original request with new token
        original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (err) {
        // fail once → clear and (once) logout
      pendingRequests.forEach(({ reject }) => reject(err));
      pendingRequests = [];


       localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;

      // Refresh failed → log out user
      if (!logoutInProgress) {
        logoutInProgress = true;
        try {
          await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true, headers: {} });
        } catch (_) {}
        // redirect once
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);


export default api;