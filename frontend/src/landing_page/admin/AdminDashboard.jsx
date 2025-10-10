import { useTheme } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Routes, Route } from "react-router-dom";

// Admin Pages
import DashboardOverview from "./pages/DashboardOverview";
import Users from "./pages/Users";
import Counselors from "./pages/Counselors";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";

function AdminDashboard() {
  const { theme } = useTheme();

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Topbar */}
        <Topbar />

        {/* Content Area */}
        <div
          className={`p-4 flex-grow-1 ${
            theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="users" element={<Users />} />
            <Route path="counselors" element={<Counselors />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="resources" element={<Resources />} />
            <Route path="settings" element={<Settings />} />

            {/* Fallback */}
            <Route path="*" element={<h4>Page not found in Admin</h4>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
