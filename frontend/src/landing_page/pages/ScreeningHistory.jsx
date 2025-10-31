import React, { useEffect, useState } from "react";
import api from "../api/axios";

function ScreeningHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/screenings")
      .then((res) => setHistory(res.data.data))
      .catch((err) => console.error("Error loading history:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Your Screening History</h3>
      {history.length === 0 ? (
        <p>No screenings saved yet.</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="card my-2 p-3">
            <p><b>Date:</b> {new Date(item.createdAt).toLocaleString()}</p>
            <p><b>Score:</b> {item.score}</p>
            <p><b>Severity:</b>{" "}
              {item.score < 5 ? "Minimal / None" :
              item.score < 10 ? "Mild" :
              item.score < 15 ? "Moderate" :
              item.score < 20 ? "Moderately Severe" : "Severe"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ScreeningHistory;
