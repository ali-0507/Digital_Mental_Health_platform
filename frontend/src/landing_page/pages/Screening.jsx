 
import ScreeningForm from "../components/ScreeningForm";
// reuse theme (adjust path if needed)
import "./Screening.css";             // tiny page-specific tweaks

function Screening() {
  return (
    <div className="screening-bg py-5">
      <div className="container" style={{maxWidth: 980}}>
         <div className="mx-auto text-center mb-4" style={{maxWidth: 860}}>
          <span className="badge rounded-pill px-3 py-2 bg-light text-dark border me-2">
            <i className="bi bi-activity me-1"></i> Anonymous screening
         </span>
       <span className="badge rounded-pill px-3 py-2 bg-light text-dark border">
         <i className="bi bi-shield-lock me-1"></i> Private by default
       </span>

     <h2 className="mt-3 mb-2">Mental Health Screening</h2>
           <p className="text-muted">
            Short self-check inspired by PHQ-9. This is <strong>not</strong> a diagnosis,
           but it can help you decide whether to seek support.
         </p>
      </div>
        
        <div className="screening-card p-4 p-md-5">
          <ScreeningForm />
        </div>
      </div>
    </div>
  );
}
export default Screening;
