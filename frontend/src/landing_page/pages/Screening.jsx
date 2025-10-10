// import React from "react";
import ScreeningForm from "../components/ScreeningForm";

function Screening() {
  return (
    <div className="screening">
      <h2 className="mb-4 text-center">Mental Health Screening</h2>
      <p className="text-muted text-center mb-4">
        This self-assessment uses common tools (PHQ-9, GAD-7). It is not a
        medical diagnosis but helps identify if you may benefit from support.
      </p>

      <div className="card p-4 shadow-sm">
        <ScreeningForm />
      </div>
    </div>
  );
}

export default Screening;
