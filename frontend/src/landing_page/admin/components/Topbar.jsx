import { Link } from "react-router-dom";

function Topbar() {

  return (
    <nav
      className={"topbar d-flex justify-content-between align-items-center px-4 shadow-sm"}
      style={{backgroundColor:"white"}}>
      <span className="nav-title mb-0 h4" style={{color:"black"}}>Digital Mental Health Admin</span>

      <div className="d-flex align-items-center">
        <button
          className={"btn me-3"}
        >
          🔔 Notifications
        </button>

        <Link to="/" className="text-decoration-none">
        <span className="fw-bold">Home</span>
        </Link>
      </div>
    </nav>
  );
}

export default Topbar;
