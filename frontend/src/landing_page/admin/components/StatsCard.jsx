 
function StatsCard({ title, value, icon, color }) {
  return (
    <div className="card shadow-sm text-center mb-4" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <div
          className="d-flex justify-content-center align-items-center mb-2"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: color || "#f8f9fa",
            margin: "0 auto",
          }}
        >
          {icon}
        </div>
        <h5 className="card-title">{title}</h5>
        <h3 className="fw-bold">{value}</h3>
      </div>
    </div>
  );
}

export default StatsCard;
