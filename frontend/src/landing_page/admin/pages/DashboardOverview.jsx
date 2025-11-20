 import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaUserMd, FaCheckCircle, FaComments } from "react-icons/fa";
import api from "../../../api/axios";

function DashboardOverview() {
 const [data, setData] = useState({
    totalUsers: null,
    counselors: null,
    screenings: null,
    peerPosts: null,
    trend: [],
    breakdown: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // fallback values (used while loading or if API doesn't return fields)
  const fallback = {
    totalUsers: 1200,
    counselors: 85,
    screenings: 560,
    peerPosts: 340,
    breakdown: [
      { name: "Users", value: 1200 },
      { name: "Counselors", value: 85 },
      { name: "Screenings", value: 560 },
      { name: "Posts", value: 340 },
    ],
    trend: [],
  };
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
     api.get("/admin/stats")
      .then((res) => {
        if (!isMounted) return;
        const body = res.data || {};
        setData({
          totalUsers: typeof body.totalUsers === "number" ? body.totalUsers : null,
          counselors: typeof body.counselors === "number" ? body.counselors : null,
          screenings: typeof body.screenings === "number" ? body.screenings : null,
          peerPosts: typeof body.peerPosts === "number" ? body.peerPosts : null,
          trend: Array.isArray(body.trend) ? body.trend : [],
          breakdown: Array.isArray(body.breakdown) ? body.breakdown : [],
        });
      })
      .catch((err) => {
        console.error("Failed to load admin stats:", err);
        if (isMounted) setError(err?.response?.data?.message || "Failed to load stats");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);


  // choose displayed values: API -> fallback
  const totalUsers = data.totalUsers ?? fallback.totalUsers;
  const counselors = data.counselors ?? fallback.counselors;
  const screenings = data.screenings ?? fallback.screenings;
  const peerPosts = data.peerPosts ?? fallback.peerPosts;
  const chartData = data.breakdown.length ? data.breakdown : fallback.breakdown;


   const stats = [
    { title: "Total Users", value: totalUsers, icon: <FaUsers size={24} color="white" />, color: "#0d6efd" },
    { title: "Counselors", value: counselors, icon: <FaUserMd size={24} color="white" />, color: "#198754" },
    { title: "Screenings", value: screenings, icon: <FaCheckCircle size={24} color="white" />, color: "#ffc107" },
    { title: "Peer Posts", value: peerPosts, icon: <FaComments size={24} color="white" />, color: "#dc3545" },
  ];

  const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

  return (
    <div className="container-fluid py-4" style={{backgroundColor:"white"}}>
      <h2 className="mb-4">Dashboard Overview</h2>

  {loading && <div className="alert alert-info">Loading stats...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {/* Stats Cards */}
      <div className="row">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="card shadow-sm mt-4" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">System Distribution</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => entry.name}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
