import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import "./Signup.css";
import Swal from "sweetalert2";

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

  const [touched, setTouched] = useState({});
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


  // Handle blur (to trigger validation on leaving field)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };


  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim()) newErrors.email = "Please enter your email address.";
    else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      newErrors.email = "Please enter a valid email.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const errors = validateForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
     setTouched({
      name: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    // setError("");

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match!");
    //   return;
    // }

     if (Object.keys(errors).length > 0) {
      setError("Please fix the highlighted errors before submitting.");
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
      Swal.fire({
    icon: "success",
    title: "Signup Successful 🎉",
    text: "Signup successful. Redirecting to your dashboard...",
    timer: 2000,
    showConfirmButton: false,
    });
      setTimeout(() => {
    navigate("/");
    }, 2000); 
    } catch (err) {
  console.error(err);
  const msg = err.response?.data?.message;

  if (msg?.includes("Username")) {
     Swal.fire({
      icon: "error",
      title: "Username Taken",
      text: "This username is already taken. Please choose another one.",
    });
  } else if (msg?.includes("Email")) {
    Swal.fire({
      icon: "warning",
      title: "Email Already Registered",
      text: "This email is already registered. Try logging in instead.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: msg || "Something went wrong. Try again!",
    });
  }
  }finally {
      setLoading(false);
    }
  };

  // for styling
  const strengthLabel = ["Very weak", "Weak", "Okay", "Good", "Strong"][pwdScore];

    return ( 

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
                     className={`form-control ${
                        touched.name && errors.name ? "is-invalid" : touched.name ? "is-valid" : ""
                      }`}
                      placeholder="e.g., Aisha Khan"
                      required
                      onChange={handleChange}
                       onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                  </div>
                </div>
           {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="bi bi-at"></i></span>
                    <input
                      type="text"
                      name="username"
                       className={`form-control ${
                        touched.username && errors.username ? "is-invalid" : touched.username ? "is-valid" : ""
                      }`}
                      placeholder="Choose a username"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     <div className="invalid-feedback">{errors.username}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <div className="input-group  has-validation">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        touched.email && errors.email ? "is-invalid" : touched.email ? "is-valid" : ""
                      }`}
                      placeholder="name@example.com"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                       <div className="invalid-feedback">{errors.email}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : touched.password ? "is-valid" : ""
                      }`}
                      placeholder="Min 6 characters"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPwd((s) => !s)}
                    >
                      <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                      <div className="invalid-feedback">{errors.password}</div>
                  </div>
                </div>

                {/* Strength meter */}
                <div className="mb-3">
                  <div className="progress password-progress">
                    <div
                      className={`progress-bar s-${pwdScore}`}
                      style={{ width: `${(pwdScore / 4) * 100}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">Password strength: {strengthLabel}</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text"><i className="bi bi-check2-circle"></i></span>
                    <input
                      type={showConfirmPwd ? "text" : "password"}
                      name="confirmPassword"
                        className={`form-control ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "is-invalid"
                          : touched.confirmPassword
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Re-enter your password"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowConfirmPwd((s) => !s)}
                    >
                      <i className={`bi ${showConfirmPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  </div>
                </div>
               {/* Role */}
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
 