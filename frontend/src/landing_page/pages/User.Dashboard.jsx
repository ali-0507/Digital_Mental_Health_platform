import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import Swal from "sweetalert2";
const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b", "#858796"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/dashboard/me");
        if (!mounted) return;
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err?.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

   load();
  const onResourceLogged = () => load();
  window.addEventListener("resourceLogged", onResourceLogged);
  
    return () => {
      mounted = false;
       window.removeEventListener("resourceLogged", onResourceLogged); // ← remove listener
    };
  }, []);


  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  const greeting = dashboard?.greeting || {};
  const tiles = dashboard?.tiles || {};
  const activity7d = dashboard?.charts?.activity7d || []; // existing chart shape
  const chatTopics = dashboard?.charts?.topics || []; // old chat topics
  const resourcesPie = dashboard?.charts?.resources || null; // prefer backend-provided resources pie
  const recent = dashboard?.recent || [];

  // Bar data unchanged
  const barData = activity7d;

  // For resources pie: fallback logic
  const pieData = resourcesPie && resourcesPie.length
    ? resourcesPie
    : [{ name: "No data", value: 1 }];


  const resourcesCount =
  dashboard?.tiles?.resourcesViewed ??            // prefer backend-provided total
  dashboard?.metrics?.resourcesViewed ??         // optional fallback if you add metrics
  (Array.isArray(recent) ? recent.filter((r) => r.type === "resource").length : 0); // last resort

  
  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("en-IN", {
       year: "numeric",
       month: "short",
       day: "numeric",
      });
    } catch {
      return iso || "—";
    }
  };

  return (
    <div className="dashboard-wrap" style={{ minHeight: "80vh" }}>
      {/* Sidebar + main content layout */}
      <div className="d-flex">
     <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
       {/* User mini profile */}
  <div className="sidebar-profile text-center py-3 position-relative">
    <button className="close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              ✕
      </button>
    <div className="avatar-circle mx-auto mb-2">
      {user?.name?.charAt(0).toUpperCase()}
    </div>
    <div className="fw-bold">{user?.name}</div>
    <small className="text-muted">{user?.email}</small>
  </div>

  <hr className="sidebar-divider" />

  <div className="sidebar-body p-3">
    <button className="btn w-100 mb-3 side-btn" onClick={() => navigate("/chat")}>
      <i class="fa-solid fa-comments" style={{color:"#4c73f2ff"}}></i> Continue Chat
    </button>
    <button className="btn w-100 mb-3 side-btn" onClick={() => navigate("/screening")}>
      <i class="fa-solid fa-chart-line" style={{color:"#db4291ff"}}></i> Take Screening
    </button>
    <button className="btn w-100 mb-3 side-btn" onClick={() => navigate("/booking")}>
      <i class="fa-solid fa-calendar-days" style={{color:"#1fc768ff"}}></i> Book Session&nbsp;&nbsp;
    </button>
    <button className="btn w-100 mb-3 side-btn" onClick={() => navigate("/resources")}>
     &nbsp;&nbsp;<i class="fa-solid fa-book" style={{color:"#b54cf2ff"}}></i> Explore Resources
    </button>
    <button className="btn w-100 mb-3 side-btn" onClick={() => navigate("/peer-support")}>
      <i class="fa-solid fa-handshake" style={{color:"#0be1d3dc"}}></i> Peer Support&nbsp;&nbsp;
    </button>
  </div>
<div className="sidebar-footer p-3 small text-muted">
            Pro tip: use the above actions to quickly continue your journey.
          </div>
  <hr className="sidebar-divider" />

   <hr></hr>

  <div className="sidebar-footer">
    <ul>
      <li>
        <i class="fa-solid fa-globe"></i> <Link to="/about-us">About us</Link>
      </li>
      <li>
        <i class="fa-solid fa-clipboard-question"></i> <Link to="/faq">FAQ</Link>
      </li>
      <li>
        <i class="fa-solid fa-user-shield"></i> <Link to="/privacy-policy">Privacy Policy</Link>
      </li>
      <li>
        <i class="fa-solid fa-file-contract"></i> <Link to="/terms">Terms and Conditions</Link>
      </li>
    </ul>
  </div>
</aside>


        {/* small open button when sidebar closed */}
        {!sidebarOpen && (
          <div className="sidebar-closed-btn p-2 mt-2">
            <button className="btn options" onClick={() => setSidebarOpen(true)} 
            aria-label="Open sidebar">
               ☰</button>
          </div>
        )}

        {/* MAIN */}
        <main className="flex-fill p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div style={{textAlign:"left",fontFamily:"Inter, sans-serif"}}>
              <h1 className="mt-0" style={{color:"#4e73df",fontWeight:"bold"}}><i className="fa-solid fa-brain fs-2"></i>{greeting.title}</h1>
              <h4 className="mb-1 fs-5"><i>{greeting.headline}</i></h4>
              <p className="text-muted fs-6">{greeting.subline}</p>
             
            </div>

            <div className="d-flex gap-2">
              <button className="btn options" onClick={() => navigate("/")}>Home</button>

              <button className="btn btn-danger" onClick={() => {
                Swal.fire({
                  title: 'Are you sure ?',
                  text : 'You will be logged out from your account!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, logout',
                }).then((result) => {
                  if (result.isConfirmed) {
                  logout(); 
                  navigate("/");
                }
                });
              }}
              >Logout</button>
            </div>
          </div>

          {/* Tiles row */}
          <div className="row g-3 mb-4">
            <Tile title="AI Chats" subtitle="Conversations this week" value={tiles.chatsThisWeek ?? 0} icon="bi-chat-dots" />
            <Tile title="Last Screening" subtitle="Latest screening score"value={tiles.lastScreeningScore ?? "—"}  icon="bi-clipboard-check" />
            <Tile title="Next Session" subtitle="Upcoming booking"  value={tiles.nextSession ? fmtDate(tiles.nextSession) : "None"} icon="bi-calendar-event" />
            <Tile title="Peer Support" value={tiles.peerSupportThisWeek ?? tiles.peerSupportThisWeek ?? 0} subtitle="Peer support activity" icon="bi-people" />
          </div>

          {/* Charts row */}
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="card h-100 shadow-sm chart-card">
                <div className="card-body">
                  <h6 className="card-title mb-3">Activity by feature (last 7 days)</h6>
                  <div style={{ width: "100%", height: 340 }}>
                    <ResponsiveContainer>
                      <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 6" opacity={0.2} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => v} wrapperStyle={{ fontSize: 13 }} />
                        <Legend verticalAlign="bottom" height={36} />
                        {/* Bars in a consistent order */}
                        <Bar dataKey="booking" stackId="a" name="Booking" fill={COLORS[0]} radius={[6,6,0,0]} />
                        <Bar dataKey="chat" stackId="a" name="Chat" fill={COLORS[1]} radius={[6,6,0,0]} />
                        <Bar dataKey="peersupport" stackId="a" name="PeerSupport" fill={COLORS[2]} radius={[6,6,0,0]} />
                        <Bar dataKey="resource" stackId="a" name="Resource" fill={COLORS[3]} radius={[6,6,0,0]} />
                        <Bar dataKey="screening" stackId="a" name="Screening" fill={COLORS[4]} radius={[6,6,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100 shadow-sm chart-card">
                <div className="card-body">
          
          {/* top row: icon + title */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <div className="resource-icon me-3 d-flex align-items-center justify-content-center">
                <i className="bi bi-bookmark tile-icon" aria-hidden="true" />
              </div>
              <div>
                <div className="fw-semibold ">Resources</div>
                <div className="text-muted small">Viewed</div>
              </div>
            </div>  
          </div>
          
          <div className="mt-5 mx-3">
            <div className="h2 mb-0">{resourcesCount ?? 0}</div>
          </div>
      
          {/* chart row: place pie to the right (compact) */}
          <div className="d-flex align-items-center">
            <div style={{ flex: "1 1 0" }} className="pe-3">
          
          {/* optional legend / small note */}
          {/* <div className="small text-muted mb-2">Breakdown</div> */}
      
          <div style={{ width: "120%", height: 190 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={80}
                label={false}
              >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={30} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

          {/* keep a small visual spacer if you want the donut to float to the right */}
          <div style={{ width: 15}} /></div>
        </div>
          </div>
          </div>
          </div>

          {/* Recent activity + note */}
          <div className="row g-3">
            <div className="col-lg-7">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title mb-3">Recent activity</h6>

                  <div className="list-group list-group-flush">
                    {recent.length === 0 && <div className="text-muted small">No recent activity</div>}
                    {recent.map((r) => (
                      <div key={r._id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{renderActivityTitle(r)}</div>
                          <div className="small text-muted">{fmtDate(r.createdAt)}</div>
                        </div>
                        <div className="text-muted small">{renderActivityMeta(r)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: optional cards (kept small as user asked) */}
            <div className="col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title mb-3">Need help?</h6>
                  <p className="small text-muted">If you're feeling overwhelmed, reach out to a counselor or one of our peer groups.</p>
                  <div className="d-grid gap-2">
                    <p style={{color:"#ce4343ff"}}>Call on toll-free number of Tele manas 14416 or 
                      <br></br>1800-89-14416</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4 text-center text-muted small">
            You control what is saved. Manage your preferences in Settings.
          </div>
        </main>
      </div>
    </div>
  );
}

/* -------------------- helper components & functions -------------------- */

function Tile({ title, value, subtitle, icon }) {
  return (
    <div className="col-6 col-md-3">
      <div className="card tile-card h-100">
        <div className="card-body d-flex align-items-center">
          <div className="me-3 tile-icon">
            <i className={`bi ${icon}`} />
          </div>
          <div>
            <div className="fw-semibold tile-title">{title}</div>
            <div className="h3 mb-1 tile-value">{value}</div>
            <div className="text-muted small">{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderActivityTitle(r) {
  switch (r.type) {
    case "chat":
      // prefer meta.topic, then meta.text excerpt
      if (r.meta?.topic) return `You chatted about ${capitalize(r.meta.topic)}`;
      if (r.meta?.text) {
        const ex = String(r.meta.text).slice(0, 40);
        return `You chatted: "${ex}${r.meta.text.length > 40 ? "…" : ""}"`;
      }
      return "You had a chat";
    case "screening":
      return r.meta?.score ? `Screening — Score: ${r.meta.score}` : "Screening completed";
    case "booking":
      return `Booking created${r.meta?.date ? ` — ${new Date(r.meta.date).toLocaleString()}` : ""}`;
    case "resource":
      return r.meta?.title ? `Viewed resource — ${r.meta.title}` : `viewed reosurce - ${r.meta?.resourceId || "-"}`;
    case "peersupport":
      return r.meta?.action ? `PeerSupport — ${capitalize(r.meta.action.replace("_", " "))}` : "Peer support activity";
    default:
      return r.type;
  }
}

function renderActivityMeta(r) {
  if (!r.meta) return "";
  if (r.meta?.score !== undefined) return `Score: ${r.meta.score}`;
  if (r.meta?.date) return new Date(r.meta.date).toLocaleString();
  if (r.meta?.topic) return capitalize(r.meta.topic);
  if (r.meta?.slug) return r.meta.slug;
  return "";
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
