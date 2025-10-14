import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
       <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email or Username</label>
            <input
              type="text"
              name="usernameOrEmail"
              className="form-control"
              placeholder="Enter your email or username"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-primary fw-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;







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
