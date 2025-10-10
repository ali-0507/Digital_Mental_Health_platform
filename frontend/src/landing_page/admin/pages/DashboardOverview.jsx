import StatsCard from "../components/StatsCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaUserMd, FaCheckCircle, FaComments } from "react-icons/fa";

function DashboardOverview() {
  // Dummy data
  const stats = [
    { title: "Total Users", value: 1200, icon: <FaUsers size={24} color="white" />, color: "#0d6efd" },
    { title: "Counselors", value: 85, icon: <FaUserMd size={24} color="white" />, color: "#198754" },
    { title: "Screenings", value: 560, icon: <FaCheckCircle size={24} color="white" />, color: "#ffc107" },
    { title: "Peer Posts", value: 340, icon: <FaComments size={24} color="white" />, color: "#dc3545" },
  ];

  const chartData = [
    { name: "Users", value: 1200 },
    { name: "Counselors", value: 85 },
    { name: "Screenings", value: 560 },
    { name: "Posts", value: 340 },
  ];

  const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Dashboard Overview</h2>

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
                  label
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
