import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`topbar d-flex justify-content-between align-items-center px-4 shadow-sm ${
        theme === "dark" ? "text-light" : "text-dark"
      }`}
    >
      <span className="nav-title mb-0 h4">Digital Mental Health Admin</span>

      <div className="d-flex align-items-center">
        <button
          className={`btn me-3 ${
            theme === "dark" ? "btn-outline-success" : "btn-success"
          }`}
        >
          🔔 Notifications
        </button>

        <button
          className={`btn me-3 ${
            theme === "dark" ? "btn-outline-light" : "btn-outline-secondary"
          }`}
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <Link to="/" className="text-decoration-none">
        <span className="fw-bold">Home</span>
        </Link>
      </div>
    </nav>
  );
}

export default Topbar;
