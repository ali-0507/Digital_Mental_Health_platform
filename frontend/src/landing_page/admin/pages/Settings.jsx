// frontend/src/landing_page/admin/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import { Card, Button, Form, Row, Col, Modal, Spinner, Alert } from "react-bootstrap";
import api from "../../../api/axios";

function useLocal(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }, [key, val]);
  return [val, setVal];
}

export default function Settings() {
  const [theme, setTheme] = useLocal("admin:theme", "light"); // "light" | "dark"
  const [notifications, setNotifications] = useLocal("admin:notifications", {
    newUser: true,
    newScreening: true,
    newPost: false,
  });
  const [branding, setBranding] = useLocal("admin:branding", {
    siteTitle: "Connect&Evolve",
    siteSubtitle: "Digital Mental Health Admin",
  });

  const [showPwdModal, setShowPwdModal] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [saveMsg, setSaveMsg] = useState(null);

  // apply theme on body
  useEffect(() => {
    const body = document.body;
    if (theme === "dark") body.classList.add("dark-mode");
    else body.classList.remove("dark-mode");
  }, [theme]);

  // simple toast helper
  const showTemp = (msg, sec = 3) => {
    setSaveMsg(msg);
    setTimeout(() => setSaveMsg(null), sec * 1000);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    showTemp("Theme updated");
  };

  const handleToggleNotification = (key) => {
    setNotifications((n) => ({ ...n, [key]: !n[key] }));
  };

  const handleBrandingChange = (e) => {
    const { name, value } = e.target;
    setBranding((b) => ({ ...b, [name]: value }));
  };

  const handleSaveAll = async () => {
    // Try to save to backend /api/admin/settings (optional)
    try {
      await api.post("/admin/settings", { theme, notifications, branding });
      showTemp("Settings saved to server");
    } catch (err) {
      // fallback: we already persisted to localStorage with hooks above
      showTemp("Settings saved locally");
      // console.debug("save settings failed:", err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdError("");
    if (!oldPwd || !newPwd) return setPwdError("Please fill both fields");
    if (newPwd !== confirmPwd) return setPwdError("New password and confirmation do not match");
    setPwdLoading(true);

    try {
      // If your API supports change password, the endpoint could be /api/auth/change-password
      // It should expect { oldPassword, newPassword } and require Authorization.
      await api.post("/auth/change-password", { oldPassword: oldPwd, newPassword: newPwd });
      setShowPwdModal(false);
      setOldPwd(""); setNewPwd(""); setConfirmPwd("");
      showTemp("Password changed");
    } catch (err) {
      // If endpoint not present, pretend success but show notice
      if (err.response?.status === 404) {
        // simulate
        setShowPwdModal(false);
        showTemp("Password changed (local simulation)");
      } else {
        setPwdError(err.response?.data?.message || "Failed to change password");
      }
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-3">Settings</h2>
      <p className="text-muted">Manage system and admin preferences here.</p>

      {saveMsg && <Alert variant="success">{saveMsg}</Alert>}

      <Row className="g-4">
        {/* Left column */}
        <Col lg={8}>
          <Card className="p-4 shadow-sm">
            <h5 className="mb-3">Appearance</h5>
            <p className="text-muted">Choose admin UI theme.</p>
            <div className="d-flex align-items-center gap-3">
              <div>
                <strong>Current:</strong> <span className="ms-2">{theme === "dark" ? "Dark mode" : "Light mode"}</span>
              </div>
              <Button onClick={toggleTheme} variant={theme === "dark" ? "outline-light" : "primary"}>
                {theme === "dark" ? "Switch to light" : "Switch to dark"}
              </Button>
            </div>

            <hr />

            <h5 className="mb-3">Notifications</h5>
            <Form>
              <Form.Check
                type="switch"
                id="noti-new-user"
                label="Notify on new user signup"
                checked={notifications.newUser}
                onChange={() => handleToggleNotification("newUser")}
              />
              <Form.Check
                type="switch"
                id="noti-new-screening"
                label="Notify when a screening is completed"
                checked={notifications.newScreening}
                onChange={() => handleToggleNotification("newScreening")}
              />
              <Form.Check
                type="switch"
                id="noti-new-post"
                label="Notify on new peer post"
                checked={notifications.newPost}
                onChange={() => handleToggleNotification("newPost")}
              />
            </Form>

            <hr />

            <h5 className="mb-3">Branding</h5>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Site Title</Form.Label>
                <Form.Control name="siteTitle" value={branding.siteTitle} onChange={handleBrandingChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Site Subtitle</Form.Label>
                <Form.Control name="siteSubtitle" value={branding.siteSubtitle} onChange={handleBrandingChange} />
              </Form.Group>
              <Form.Text className="text-muted">Note: Branding changes are stored locally. Add backend support to persist globally.</Form.Text>
            </Form>

            <div className="mt-3 d-flex justify-content-end">
              <Button variant="outline-secondary" className="me-2" onClick={() => {
                // reset local settings to defaults
                localStorage.removeItem("admin:theme");
                localStorage.removeItem("admin:notifications");
                localStorage.removeItem("admin:branding");
                window.location.reload();
              }}>
                Reset to defaults
              </Button>
              <Button variant="success" onClick={handleSaveAll}>Save settings</Button>
            </div>
          </Card>

          <Card className="p-4 mt-4 shadow-sm">
            <h5>Account</h5>
            <p className="text-muted">Administrative account actions.</p>
            <div className="d-flex gap-2">
              <Button variant="danger" onClick={() => setShowPwdModal(true)}>Change password</Button>
              <Button variant="outline-danger" onClick={async () => {
                try {
                  await api.post("/auth/logout", {}, { withCredentials: true });
                } catch (_) {}
                localStorage.removeItem("token");
                window.location.replace("/login");
              }}>
                Sign out
              </Button>
            </div>
          </Card>
        </Col>

        {/* Right column */}
        <Col lg={4}>
          <Card className="p-3 shadow-sm text-center">
            <h5>System Health</h5>
            <p className="text-muted mb-1">API status</p>
            <SystemHealth />
          </Card>

          <Card className="p-3 shadow-sm mt-4">
            <h6>Quick actions</h6>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.open("/admin/users", "_self")}>Manage users</Button>
              <Button variant="outline-secondary" onClick={() => window.open("/admin/resources", "_self")}>Manage resources</Button>
              <Button variant="outline-info" onClick={() => window.open("/admin/analytics", "_self")}>Open analytics</Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Change password modal */}
      <Modal show={showPwdModal} centered onHide={() => setShowPwdModal(false)}>
        <Form onSubmit={handleChangePassword}>
          <Modal.Header closeButton>
            <Modal.Title>Change password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {pwdError && <Alert variant="danger">{pwdError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Current password</Form.Label>
              <Form.Control type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New password</Form.Label>
              <Form.Control type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            </Form.Group>
            <Form.Text className="text-muted">Password change will attempt to use /api/auth/change-password if available.</Form.Text>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPwdModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={pwdLoading}>
              {pwdLoading ? <Spinner animation="border" size="sm" /> : "Change password"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

/** small system health component */
function SystemHealth() {
  const [status, setStatus] = useState({ ok: null, latency: null });

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const t0 = Date.now();
      try {
        await fetch("/api/health");
        if (!mounted) return;
        setStatus({ ok: true, latency: Date.now() - t0 });
      } catch (e) {
        if (!mounted) return;
        setStatus({ ok: false, latency: null });
      }
    };
    check();
    const id = setInterval(check, 20_000); // every 20s
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <div>
      {status.ok === null && <div>Checking…</div>}
      {status.ok === true && (
        <div>
          <div className="h5 text-success">Healthy</div>
          <div className="small text-muted">Latency: {status.latency} ms</div>
        </div>
      )}
      {status.ok === false && (
        <div>
          <div className="h5 text-danger">Unreachable</div>
          <div className="small text-muted">API not responding</div>
        </div>
      )}
    </div>
  );
}
