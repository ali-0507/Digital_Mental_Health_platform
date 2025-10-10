import { Link } from "react-router-dom";

function Signup() {
    return ( 
        <>
            <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
           <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-primary">Create Account</h2>
        
        <form>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter your password"
              required
            />
          </div>

          {/* Signup Button */}
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none text-primary fw-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
        </>
     );
}

export default Signup;