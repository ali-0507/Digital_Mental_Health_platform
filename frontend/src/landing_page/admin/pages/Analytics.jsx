// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// function Analytics() {
//   const data = [
//     { name: "Jan", users: 100, sessions: 200 },
//     { name: "Feb", users: 150, sessions: 300 },
//     { name: "Mar", users: 200, sessions: 400 },
//     { name: "Apr", users: 250, sessions: 500 },
//   ];

//   return (
//     <div className="container-fluid py-4">
//       <h2 className="mb-4">Analytics</h2>
//       <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
//         <div className="card-body">
//           <h5 className="card-title mb-4">User Growth</h5>
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="users" stroke="#0d6efd" />
//                 <Line type="monotone" dataKey="sessions" stroke="#198754" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analytics;


// frontend/src/landing_page/admin/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { Spinner } from "react-bootstrap";
import api from "../../../api/axios";
import StatsCard from "../components/StatsCard";
import { FaUsers, FaUserMd, FaCheckCircle, FaComments } from "react-icons/fa";

const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    counselors: 0,
    screenings: 0,
    peerPosts: 0,
  });
  const [trendData, setTrendData] = useState([]); // monthly or daily trend for chart
  const [pieData, setPieData] = useState([]);

  // Try admin stats endpoint, fallback to other endpoints
  const fetchStats = async () => {
    setLoading(true);
    try {
      // primary: admin stats
      try {
        const { data } = await api.get("/admin/stats"); // prefer server-provided aggregated stats
        // expecting shape { totalUsers, counselors, screenings, peerPosts, trend: [...], breakdown: [...] }
        setStats({
          totalUsers: data.totalUsers || 0,
          counselors: data.counselors || 0,
          screenings: data.screenings || 0,
          peerPosts: data.peerPosts || 0,
        });
        setTrendData(data.trend || []);
        setPieData(
          data.breakdown ||
            [
              { name: "Users", value: data.totalUsers || 0 },
              { name: "Counselors", value: data.counselors || 0 },
              { name: "Screenings", value: data.screenings || 0 },
              { name: "Posts", value: data.peerPosts || 0 },
            ]
        );
        setLoading(false);
        return;
      } catch (adminErr) {
        console.warn("/admin/stats failed, falling back:", adminErr?.response?.status);
      }

      // fallback: attempt to collect from available endpoints
      // 1) users count
      let totalUsers = 0;
      try {
        const usersResp = await api.get("/admin/users?page=1&limit=1");
        totalUsers = usersResp.data?.total ?? 0;
      } catch (e) {
        try {
          const usersResp2 = await api.get("/users?page=1&limit=1");
          totalUsers = usersResp2.data?.total ?? 0;
        } catch (_) {
          totalUsers = 0;
        }
      }

      // 2) counselors - attempt to use /admin/counselors or /api/counselors endpoints
      let counselors = 0;
      try {
        const c = await api.get("/admin/counselors");
        counselors = (c.data && c.data.length) || c.data?.total || 0;
      } catch (_) {
        try {
          const c2 = await api.get("/counselors");
          counselors = (c2.data && c2.data.length) || c2.data?.total || 0;
        } catch (_) {
          counselors = 0;
        }
      }

      // 3) screenings and peer posts: try /api/reports or /api/screenings endpoints
      let screenings = 0;
      try {
        const s = await api.get("/screenings");
        screenings = s.data?.total ?? (Array.isArray(s.data) ? s.data.length : 0);
      } catch (_) {
        screenings = 0;
      }

      let peerPosts = 0;
      try {
        const p = await api.get("/peer-support/posts");
        peerPosts = p.data?.total ?? (Array.isArray(p.data) ? p.data.length : 0);
      } catch (_) {
        peerPosts = 0;
      }

      setStats({ totalUsers, counselors, screenings, peerPosts });
      setTrendData([]); // no trend from fallback
      setPieData([
        { name: "Users", value: totalUsers },
        { name: "Counselors", value: counselors },
        { name: "Screenings", value: screenings },
        { name: "Posts", value: peerPosts },
      ]);
    } catch (err) {
      console.error("fetchStats fallback error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid py-4 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  const statsCards = [
    { title: "Total Users", value: stats.totalUsers, icon: <FaUsers size={20} color="white" />, color: "#0d6efd" },
    { title: "Counselors", value: stats.counselors, icon: <FaUserMd size={20} color="white" />, color: "#198754" },
    { title: "Screenings", value: stats.screenings, icon: <FaCheckCircle size={20} color="white" />, color: "#ffc107" },
    { title: "Peer Posts", value: stats.peerPosts, icon: <FaComments size={20} color="white" />, color: "#dc3545" },
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "white" }}>
      <h2 className="mb-4">Analytics</h2>

      <div className="row">
        {statsCards.map((s, idx) => (
          <div key={idx} className="col-md-3 col-sm-6">
            <StatsCard {...s} />
          </div>
        ))}
      </div>

      <div className="card shadow-sm mt-4" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">System Distribution</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mt-4" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">User Growth (trend)</h5>
          {trendData && trendData.length > 0 ? (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#0d6efd" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-muted">No trend data available from API.</div>
          )}
        </div>
      </div>
    </div>
  );
}
