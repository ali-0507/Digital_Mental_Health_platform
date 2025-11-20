 
import ScreeningForm from "../components/ScreeningForm";
// reuse theme (adjust path if needed)
import "./Screening.css";             // tiny page-specific tweaks

function Screening() {
   const isLoggedIn = Boolean(localStorage.getItem("token"));
  return (
    <div className="screening-bg py-5">
      <div className="container" style={{maxWidth: 980}}>
         <div className="mx-auto text-center mb-4" style={{maxWidth: 860}}>
          <span className="badge rounded-pill px-3 py-2 border me-2">
            <i className="bi bi-activity me-1"></i> Anonymous screening
         </span>
       <span className="badge rounded-pill px-3 py-2 border">
         <i className="bi bi-shield-lock me-1"></i> Private by default
       </span>

     <h2 className="mt-4 mb-3" style={{color:"#965fd8"}}>Welcome to AI Screening</h2>
           <p className="text-muted">
            <i>Let's take a short self-check! answer some questions below, this may help you decide whether to seek support.
            &nbsp;
            <strong style={{color:"#0b0b0cff"}}>This is not a diagnosis </strong> 
            </i>
         </p>
         <a href="/history" className={`btn history-btn ${!isLoggedIn ? "disabled" : ""}`}>
          View history
        </a>
      </div>
        
        <div className="screening-card m-3 p-4 p-md-4">
          <ScreeningForm />
        </div>
      </div>
    </div>
  );
}
export default Screening;
