import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext.jsx";
import "../signup/Signup.css"; // shared styles
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const{ login } = useAuth();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
    const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // for login styling
   const [showPwd, setShowPwd] = useState(false);

   const isEmail = (v) => /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
  const isUsername = (v) => /^[A-Za-z0-9._-]{3,}$/.test(v); // min 3 chars

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

   const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

    const validate = useMemo(() => {
    const errs = {};
     // usernameOrEmail: required; must be email OR username pattern
    if (!formData.usernameOrEmail.trim()) {
      errs.usernameOrEmail = "Please enter your email or username.";
    } else if (!(isEmail(formData.usernameOrEmail) || isUsername(formData.usernameOrEmail))) {
      errs.usernameOrEmail =
        "Enter a valid email (name@example.com) or a username (min 3 letters/numbers).";
    }

    // password
    if (!formData.password) {
      errs.password = "Please enter your password.";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    return errs;
  }, [formData]);


  const hasErrors = Object.keys(validate).length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
     setTouched({ usernameOrEmail: true, password: true });

     if (hasErrors) {
      Swal.fire({
        icon: "warning",
        title: "Check your details",
        text: "Please fix the highlighted fields before logging in.",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);

      // Save token and redirect
      // localStorage.setItem("token", res.data.token);
      // alert("Login successful!");
      // navigate("/"); // redirect to home or dashboard

      // IMPORTANT: backend returns { accessToken, user }
     // Use context login so Navbar updates immediately
      login(res.data.accessToken, res.data.user);
     Swal.fire({
    icon: "success",
    title: "Welcome back! 🎉",
    text: "Login successful. Redirecting to your dashboard...",
    timer: 2000,                // auto close in 2 sec
    showConfirmButton: false,   // hide "OK" button
  });
      setTimeout(() => {
    navigate("/");
    }, 2000);   // redirect to home or dashboard
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
       // Handle different types of errors
  if (msg?.toLowerCase().includes("invalid credentials")) {
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials ❌",
      text: "The email or password you entered is incorrect.",
    });
  } else if (msg?.toLowerCase().includes("user not found")) {
    Swal.fire({
      icon: "warning",
      title: "User Not Found ⚠️",
      text: "No account found with this email. Please sign up first.",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed 😕",
      text: msg || "Something went wrong. Please try again later.",
    });
  }

  setError(msg || "Login failed!");
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
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      name="usernameOrEmail"
                       className={`form-control ${
                        touched.usernameOrEmail && validate.usernameOrEmail
                          ? "is-invalid"
                          : touched.usernameOrEmail
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Enter your email or username"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     <div className="invalid-feedback">{validate.usernameOrEmail}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                       className={`form-control ${
                        touched.password && validate.password
                          ? "is-invalid"
                          : touched.password
                          ? "is-valid"
                          : ""
                      }`}
                      placeholder="Enter your password"
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label="Toggle password visibility"
                    >
                      <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                      <div className="invalid-feedback">{validate.password}</div>
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