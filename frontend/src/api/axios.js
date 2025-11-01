import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api", // backend URL
  withCredentials: true,               // set true because using cookies for refresh token
});

// ---- REQUEST INTERCEPTOR ---- Automatically attach token if logged in
 api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined" || token !== "null") {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    if(config.headers) delete config.headers.Authorization;
  }
  return config;
});



// Helper to set refresh token cookie

// ---------- RESPONSE INTERCEPTOR (auto-refresh logic) ----------
let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, newToken = null) => {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (newToken) resolve(newToken);
    else reject(error);
  });
  pendingRequests = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Not a 401 → reject immediately
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

 // If refresh already in progress, queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: (token) => {
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
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true }  //  send cookie
      );

      const newToken = data?.accessToken;
      if (!newToken) throw new Error("No new access token");

      // Save new token
      localStorage.setItem("token", newToken);
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      processQueue(null, newToken);

       // Retry original request with new token
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (err) {
      processQueue(err, null);

      // Refresh failed → log out user
      localStorage.removeItem("token");
      try {
        await axios.post(`${baseURL}/auth/logout`, {}, { withCredentials: true });
      } catch (_) {}

      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);


export default api;