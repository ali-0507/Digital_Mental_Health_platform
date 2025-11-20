import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Screening.css";

const QUESTIONS = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble sleeping, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself — or that you are a failure?",
    "Trouble concentrating on things?",
    "Moving/speaking slowly or being restless?",
    "Thoughts that you would be better off dead or hurting yourself?",
  ];

  const OPTIONS = {
  0: "Not at all",
  1: "Several days",
  2: "More than half the days",
  3: "Nearly every day",
};

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
  console.log(history);

  return (
    <div className="container mx-auto my-4" style={{maxWidth: "1000px", padding:"10px"}}>
      <h3 style={{textAlign:"center",padding:"10px",fontFamily:"Intern,sans-serif",fontSize:"45px",color:"#173753"}}>Your Screening History</h3>
      <p style={{color:"#6b7280",textAlign:"center",fontSize:"20px",fontStyle:"italic"}}>Take a look at your previous screening</p>
      {history.length === 0 ? (
        <p>No screenings saved yet.</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="card my-4 p-3 screening-history">
            <div className="start-info">
                <p id="history-para"><b>Date: {new Date(item.createdAt).toLocaleString()}</b></p>
                <p id="history-para"><b>Score: {item.score}</b> </p>
                <p id="history-para"><b>Severity:{" "}
                  {item.score < 5 ? "Minimal" :
                  item.score < 10 ? "Mild" :
                  item.score < 15 ? "Moderate" :
                  item.score < 20 ? "Moderately Severe" : "Severe"}
                  </b>
                </p>
            </div>
           
                          
                <ul id="answer" style={{listStyleType: "none"}}>
                {item.answers && Object.entries(item.answers).map(([qIndex, ans]) => (
                  <li key={qIndex}>
                    <b><i className="fa-solid fa-question fs-6" style={{color:"#ffffffff"}}></i> </b> {QUESTIONS[qIndex]} <br></br>
                    <b><i className="fa-solid fa-check fs-6"style={{color:"#ffffffff"}}></i> </b> {OPTIONS[ans] ?? ans}
                  </li>
                ))}
                </ul>
                      
          </div>
      
        ))
      )}
    </div>
  );
}

export default ScreeningHistory;
