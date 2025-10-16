import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import "./Signup.css";

function Signup() {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role:"user", //default role
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // for more styling
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [pwdScore, setPwdScore] = useState(0);

  // for styling
  const scorePassword = (pwd) => {
    // lightweight strength heuristic (0–4)
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // for styling
    if (name === "password") setPwdScore(scorePassword(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Save token + redirect
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // for styling
  const strengthLabel = ["Very weak", "Weak", "Okay", "Good", "Strong"][pwdScore];

    return ( 
        
    //         <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
    //       <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
    //         <h2 className="text-center mb-4 text-primary">Create Account</h2>

    //     {error && <div className="alert alert-danger">{error}</div>}

    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-3">
    //         <label className="form-label fw-bold">Full Name</label>
    //         <input type="text" name="name" className="form-control"
    //           placeholder="Enter your full name" required onChange={handleChange} />
    //       </div>

    //       <div className="mb-3">
    //         <label className="form-label fw-bold">Username</label>
    //         <input type="text" name="username" className="form-control"
    //           placeholder="Choose a username" required onChange={handleChange} />
    //       </div>

    //       <div className="mb-3">
    //         <label className="form-label fw-bold">Email address</label>
    //         <input type="email" name="email" className="form-control"
    //           placeholder="Enter your email" required onChange={handleChange} />
    //       </div>

    //       <div className="mb-3">
    //         <label className="form-label fw-bold">Password</label>
    //         <input type="password" name="password" className="form-control"
    //           placeholder="Enter your password" required onChange={handleChange} />
    //       </div>

    //       <div className="mb-3">
    //         <label className="form-label fw-bold">Confirm Password</label>
    //         <input type="password" name="confirmPassword" className="form-control"
    //           placeholder="Re-enter your password" required onChange={handleChange} />
    //       </div>

    //         {/* Role section */}
    //         <div className="mb-3">
    //         <label className="form-label fw-bold">Select Role</label>
    //         <select
    //           name="role"
    //           className="form-select"
    //           value={formData.role}
    //           onChange={handleChange}
    //         >
    //           <option value="user">User</option>
    //           <option value="counselor">Counselor</option>
    //           <option value="admin">Admin</option>
    //         </select>
    //       </div>

    //       <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
    //         {loading ? "Signing Up..." : "Sign Up"}
    //       </button>

    //       <p className="text-center mt-3">
    //         Already have an account?{" "}
    //         <Link to="/login" className="text-decoration-none text-primary fw-bold">
    //           Login
    //         </Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>









    // New design
     <div className="mental-bg d-flex align-items-center min-vh-100 p-3">
      <div className="container">
        <div className="auth-wrapper mx-auto shadow-lg">
          <div className="row g-0">
            {/* Left: calming hero */}
            <div className="col-lg-5 hero-panel d-none d-lg-flex flex-column justify-content-between">
              <div>
                <div className="brand-badge">
                  <i className="bi bi-heart-pulse"></i>
                </div>
                <h2 className="hero-title">
                  Connect & Evolve <span className="hero-dot">•</span>
                </h2>
                <p className="hero-sub">
                  A safe, private space to track your mood, talk to counselors,
                  and build habits that help you heal.
                </p>
              </div>

              <ul className="hero-points">
                <li><i className="bi bi-shield-check"></i> HIPAA-style privacy practices</li>
                <li><i className="bi bi-chat-dots"></i> Qualified counselors & communities</li>
                <li><i className="bi bi-graph-up"></i> Insights from your daily check-ins</li>
              </ul>

              <blockquote className="hero-quote">
                “Small steps, every day.” <span>— your future self</span>
              </blockquote>
            </div>

            {/* Right: form */}
            <div className="col-lg-7 bg-white p-4 p-md-5">
              <div className="text-center mb-3">
                <h3 className="mb-1">Create your account</h3>
                <p className="text-muted mb-0">Start your wellbeing journey in minutes</p>
              </div>

              {error && <div className="alert alert-danger small">{error}</div>}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="e.g., Aisha Khan"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-at"></i></span>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Choose a username"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="name@example.com"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Min 8 characters"
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

                {/* Strength meter */}
                <div className="mb-3">
                  <div className="progress password-progress">
                    <div
                      className={`progress-bar s-${pwdScore}`}
                      role="progressbar"
                      style={{ width: `${(pwdScore / 4) * 100}%` }}
                      aria-valuemin="0"
                      aria-valuemax="4"
                    ></div>
                  </div>
                  <small className="text-muted">Password strength: {strengthLabel}</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-check2-circle"></i></span>
                    <input
                      type={showConfirmPwd ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Re-enter your password"
                      required
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowConfirmPwd((s) => !s)}
                      aria-label="Toggle confirm password visibility"
                    >
                      <i className={`bi ${showConfirmPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Select Role</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="counselor">Counselor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <small className="text-muted">
                    Roles help personalize the experience and access.
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-mental w-100 fw-semibold"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Create account"}
                </button>

                <p className="text-center mt-3 small">
                  By continuing you agree to our{" "}
                  <a href="#" className="link-mental">Privacy Policy</a> and{" "}
                  <a href="#" className="link-mental">Terms</a>.
                </p>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to="/login" className="link-mental fw-semibold">
                    Login
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

export default Signup;
 