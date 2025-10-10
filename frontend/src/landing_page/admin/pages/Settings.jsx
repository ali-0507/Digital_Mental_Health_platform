import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container py-4">
      <h2>Settings</h2>
      <p>Manage system and admin preferences here.</p>

      {/* Theme Switch */}
      <div className="card p-3 shadow-sm mt-3">
        <h5>Appearance</h5>
        <p>Current Theme: <strong>{theme}</strong></p>
        <button className="btn btn-primary" onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      {/* Example additional setting */}
      <div className="card p-3 shadow-sm mt-3">
        <h5>Account</h5>
        <button className="btn btn-danger">Reset Password</button>
      </div>
    </div>
  );
}

export default Settings;
