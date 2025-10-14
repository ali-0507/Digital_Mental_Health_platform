import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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



    return ( 
        
            <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
          <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
            <h2 className="text-center mb-4 text-primary">Create Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input type="text" name="name" className="form-control"
              placeholder="Enter your full name" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input type="text" name="username" className="form-control"
              placeholder="Choose a username" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input type="email" name="email" className="form-control"
              placeholder="Enter your email" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" name="password" className="form-control"
              placeholder="Enter your password" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control"
              placeholder="Re-enter your password" required onChange={handleChange} />
          </div>

            {/* Role section */}
            <div className="mb-3">
            <label className="form-label fw-bold">Select Role</label>
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
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-primary fw-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
 