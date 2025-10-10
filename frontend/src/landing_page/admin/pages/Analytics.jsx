import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Analytics() {
  const data = [
    { name: "Jan", users: 100, sessions: 200 },
    { name: "Feb", users: 150, sessions: 300 },
    { name: "Mar", users: 200, sessions: 400 },
    { name: "Apr", users: 250, sessions: 500 },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Analytics</h2>
      <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">User Growth</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#0d6efd" />
                <Line type="monotone" dataKey="sessions" stroke="#198754" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
