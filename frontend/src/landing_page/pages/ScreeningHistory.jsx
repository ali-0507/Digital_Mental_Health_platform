import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Screening.css";


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
  let mounted = true;

  api.get("/screenings")
    .then(res => {
      if (mounted) setHistory(res.data.data);
    })
    .catch(err => {
      console.log("History error:", err);
    })
    .finally(() => {
      if (mounted) setLoading(false);
    });

  return () => mounted = false;
}, []);


  if (loading) return <p>Loading...</p>;
  console.log(history);

  const handleDeleteHistory = async () => {
  if (!window.confirm("Are you sure you want to clear all screening history?")) {
    return;
  }

  try {
    await api.delete("/screenings");
    setHistory([]);  // instantly update UI
    alert("History cleared successfully.");
  } catch (err) {
    console.error(err);
    alert("Failed to clear history.");
  }
};

const deleteSingle = async (id) => {
  if (!window.confirm("Delete this record?")) return;

  try {
    await api.delete(`/screenings/${id}`);
    setHistory(history.filter((h) => h._id !== id));  // remove from UI
  } catch (err) {
    console.error("Delete error:", err);
  }
};

  return (
    <div className="container mx-auto my-4" style={{maxWidth: "1000px", padding:"10px"}}>
      <h3 style={{textAlign:"center",padding:"10px",fontFamily:"Intern,sans-serif",fontSize:"45px",color:"#173753"}}>Your Screening History</h3>
      <p style={{color:"#6b7280",textAlign:"center",fontSize:"20px",fontStyle:"italic"}}>Take a look at your previous screening</p>
        <div className="text-center mb-3">
          <button 
            className="btn deleteBtn"
            onClick={handleDeleteHistory}
            style={{ borderRadius: "10px", padding: "8px 16px" }}
          >
          Clear All History
          </button>
        </div>
     
      
      {history.length === 0 ? (
        <p>No screenings saved yet.</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="card p-3 screening-history">
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

                <button
                  onClick={() => deleteSingle(item._id)}
                  className=" delete-btn"
                >
               <i className="fa-solid fa-trash trash" style={{color:"black", paddingBottom:"15px"}}></i>
              </button>

            </div>
           
                         
               <ul id="answer" style={{ listStyleType: "none" }}>
               {(item.questions || []).map((question, qIndex) => {
               const answer = item.answers?.[qIndex];               // safe access
               const display = (answer === undefined || answer === null)
                ? "No answer"
                : (OPTIONS[answer] ?? answer);
         return (
               <li key={qIndex} style={{ marginBottom: "8px" }}>
               <b>&#9679;</b> {question} <br /><br/>
              <p style={{fontWeight:"lighter",color:"GrayText",padding:"0px"}}>
               Your response &rarr;
            </p>
           {display}
         </li>
       );
      })}
   </ul>
                    
          </div>
      
        ))
      )}
    </div>
  );
}

export default ScreeningHistory;
