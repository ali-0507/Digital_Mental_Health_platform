// src/landing_page/admin/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserMd,
  FaChartBar,
  FaBook,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();

  const sidebarClass = `sidebar d-flex flex-column p-3 ${
    theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
  }`;

  const makeLinkClass = (path) => {
    // active if exact match OR starts with path (so /admin/users/new still marks /admin/users active)
    const isActive =
      path === "/admin"
        ? location.pathname === "/admin"
        : location.pathname === path || location.pathname.startsWith(path + "/");

    const base = "nav-link d-flex align-items-center rounded py-2";
    if (isActive) {
      // use a visible primary background for active state in both themes
      return `${base} bg-success text-white`;
    } else {
      return `${base} ${theme === "dark" ? "text-light" : "text-dark"}`;
    }
  };

  return (
    <div className={sidebarClass} style={{ width: "250px", minHeight: "100vh" }}>
      <h3 className="text-center mb-4">Admin Panel</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin" className={makeLinkClass("/admin")} aria-current={location.pathname === "/admin" ? "page" : undefined}>
            <FaTachometerAlt className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/users" className={makeLinkClass("/admin/users")}>
            <FaUsers className="me-2" /> Users
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/counselors" className={makeLinkClass("/admin/counselors")}>
            <FaUserMd className="me-2" /> Counselors
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/reports" className={makeLinkClass("/admin/reports")}>
            <FaFileAlt className="me-2" /> Reports
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/resources" className={makeLinkClass("/admin/resources")}>
            <FaBook className="me-2" /> Resources
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/analytics" className={makeLinkClass("/admin/analytics")}>
            <FaChartBar className="me-2" /> Analytics
          </Link>
        </li>
        <li className="nav-item mt-3 border-top pt-2">
          <Link to="/admin/settings" className={makeLinkClass("/admin/settings")}>
            <FaCog className="me-2" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
