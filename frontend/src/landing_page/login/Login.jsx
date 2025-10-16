import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import "../signup/Signup.css"; // shared styles

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // for login styling
   const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);

      // Save token and redirect
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

    return ( 


          <div className="mental-bg d-flex align-items-center min-vh-100 p-3">
      <div className="container">
        <div className="auth-wrapper mx-auto shadow-lg">
          <div className="row g-0">
            {/* Left: same calming hero as signup */}
            <div className="col-lg-5 hero-panel d-none d-lg-flex flex-column justify-content-between">
              <div>
                <div className="brand-badge">
                  <i className="bi bi-heart-pulse"></i>
                </div>
                <h2 className="hero-title">
                  Welcome back <span className="hero-dot">•</span>
                </h2>
                <p className="hero-sub">
                  Pick up where you left off—your check-ins, goals, and counselor
                  conversations are right here.
                </p>
              </div>

              <ul className="hero-points">
                <li><i className="bi bi-shield-lock"></i> Your data stays private</li>
                <li><i className="bi bi-emoji-smile"></i> Daily mood check-ins</li>
                <li><i className="bi bi-journal-check"></i> Guided exercises</li>
              </ul>

              <blockquote className="hero-quote">
                “You don’t have to do it all today—just one step.” <span>— gentle reminder</span>
              </blockquote>
            </div>

            {/* Right: login form */}
            <div className="col-lg-7 bg-white p-4 p-md-5">
              <div className="text-center mb-3">
                <h3 className="mb-1">Login</h3>
                <p className="text-muted mb-0">We’re glad you’re here</p>
              </div>

              {error && <div className="alert alert-danger small">{error}</div>}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Email or Username</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      name="usernameOrEmail"
                      className="form-control"
                      placeholder="Enter your email or username"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      required
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label="Toggle password visibility"
                    >
                      <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label small" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="small link-mental">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn btn-mental w-100 fw-semibold" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center mt-3 small auth-note">
                  Private, encrypted, and designed for your wellbeing.
                </p>

                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="link-mental fw-semibold">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;







































































//        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
//         <h2 className="text-center mb-4 text-primary">Login</h2>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-bold">Email or Username</label>
//             <input
//               type="text"
//               name="usernameOrEmail"
//               className="form-control"
//               placeholder="Enter your email or username"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center mt-3">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-decoration-none text-primary fw-bold">
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default Login;







// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Works in both Vite (import.meta.env) and CRA (process.env)
// const API_BASE = import.meta.env.VITE_API_BASE || "";




//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!usernameOrEmail || !password) {
//       setError("Please enter email/username and password.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ usernameOrEmail, password }),
//       });

//       const body = await res.json().catch(() => ({}));
//       if (!res.ok) {
//         throw new Error(body.message || "Login failed");
//       }

//       // expected { token, user }
//       const { token, user } = body;
//       if (token) {
//         localStorage.setItem("token", token);
//       }
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//       }

//       // redirect based on role
//       if (user?.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Login error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
//         <h2 className="text-center mb-4 text-primary">Login</h2>

//         <form onSubmit={handleSubmit}>
//           {error && <div className="alert alert-danger">{error}</div>}

//           <div className="mb-3">
//             <label className="form-label fw-bold">Email address or Username</label>
//             <input
//               value={usernameOrEmail}
//               onChange={(e) => setUsernameOrEmail(e.target.value)}
//               type="text"
//               className="form-control"
//               placeholder="Enter your email or username"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center mt-3">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-decoration-none text-primary fw-bold">
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
