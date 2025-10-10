import React, { useState } from "react";

function ScreeningForm() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = [
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

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: parseInt(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = Object.values(answers).reduce((a, b) => a + b, 0);
    setScore(total);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, i) => (
        <div key={i} className="mb-3">
          <label className="form-label">{q}</label>
          <select
            className="form-select"
            onChange={(e) => handleChange(i, e.target.value)}
            required
          >
            <option value="">Select...</option>
            <option value="0">Not at all (0)</option>
            <option value="1">Several days (1)</option>
            <option value="2">More than half the days (2)</option>
            <option value="3">Nearly every day (3)</option>
          </select>
        </div>
      ))}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      {score !== null && (
        <div className="alert alert-info mt-4">
          <h5>Your Score: {score}</h5>
          {score < 5 && <p>Minimal or no depression.</p>}
          {score >= 5 && score < 10 && <p>Mild symptoms — consider self-care.</p>}
          {score >= 10 && score < 15 && (
            <p>Moderate symptoms — talking to a counselor may help.</p>
          )}
          {score >= 15 && score < 20 && (
            <p>Moderately severe — professional help is recommended.</p>
          )}
          {score >= 20 && <p>Severe symptoms — please seek help urgently.</p>}
        </div>
      )}
    </form>
  );
}

export default ScreeningForm;
