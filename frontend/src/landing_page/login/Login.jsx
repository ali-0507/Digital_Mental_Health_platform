import { Link } from "react-router-dom";
function Login() {
    return ( 
        <>
             <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>

        <form>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none text-primary fw-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
        </>
     );
}

export default Login;