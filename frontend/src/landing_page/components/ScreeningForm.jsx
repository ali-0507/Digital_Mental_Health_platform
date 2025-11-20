import {useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Uncomment and wire when backend route is ready

function ScreeningForm() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Protected actions
  const [saveConsent, setSaveConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState("");

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const [level, setLevel] = useState("level1");

  const [questions, setQuestions] = useState([]);
    useEffect(() => {
      api.get("/screenings/questions").then(res => {
      setQuestions(res.data.questions);
      setLevel(res.data.level);
    });
}, []);

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: parseInt(value, 10) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    setScore(total);
  };

  const severity = useMemo(() => {
    if (score == null) return null;
    if (score < 5) return { label: "Minimal / None", cls: "badge-scr-good" };
    if (score < 10) return { label: "Mild", cls: "badge-scr-info" };
    if (score < 15) return { label: "Moderate", cls: "badge-scr-warn" };
    if (score < 20) return { label: "Moderately Severe", cls: "badge-scr-warn" };
    return { label: "Severe", cls: "badge-scr-risk" };
  }, [score]);

  const selfHarmFlag = (answers[8] ?? 0) >= 1;

  // ---- Protected: Save result (requires login + consent) ----
  const handleSave = async () => {
    setSaveError("");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!saveConsent) {
      setSaveError("Please check the consent box to save your result.");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/screenings",{answers, score,level});
      alert("Your score was saved scuccessfully!");
    } catch (err) {
      console.error(err);
      setSaveError(err?.response?.data?.message || "Unable to save right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setAnswers({});
    setScore(null);
    setSaveConsent(false);
    setSaveError("");
  };

  return (
    
    <form onSubmit={handleSubmit} noValidate className="form">
      {questions.map((q, i) => (
        <div key={i} className="mb-4 screening-divider pb-4">
          <label className="form-label screening-label mb-2">{q}</label>
          <select
            className="drop-down screening-select"
            onChange={(e) => handleChange(i, e.target.value)}
            required
            value={answers[i] ?? ""}
          >
            <option id="select-option" value="">Select...</option>
            <option id="select-option" value="0">Not at all</option>
            <option id="select-option" value="1">Several days</option>
            <option id="select-option" value="2">More than half days</option>
            <option id="select-option" value="3">Everyday</option>
          </select>
           <div className="mt-1 screening-hint">Answer honestly for the best guidance.</div>
          {/* Self-harm safety nudge */}
          {i === 8 && answers[8] >= 1 && (
            <div className="alert alert-danger mt-2 py-2 px-3 small">
              If you’re thinking about harming yourself, please reach out to local helplines
              or emergency services immediately. You matter.
            </div>
          )}
        </div>
      ))}

      <div className="d-flex gap-2">
        <button type="submit" className="btn screening-btn px-4">
          Submit
        </button>
        <button type="button" onClick={resetForm} className="btn screening-btn px-4">
          Reset
        </button>
      </div>

      {/* PUBLIC: immediate results + general advice */}
      {score !== null && (
        <div className="screening-alert-soft mt-4 p-3 p-md-4">
          <h5 className="screening-section-title mb-2">Your Score: {score}</h5>
          {severity && (
            <span className={`badge rounded-pill me-2 ${severity.cls}`}>{severity.label}</span>
          )}

          <div className="mt-2">
            {score < 5 && <p>Looks minimal — keep caring for your routine and sleep.</p>}
            {score >= 5 && score < 10 && <p>Mild symptoms — try self-care, journaling, light activity.</p>}
            {score >= 10 && score < 15 && <p>Moderate — consider talking to a counselor.</p>}
            {score >= 15 && score < 20 && <p>Moderately severe — professional help is recommended.</p>}
            {score >= 20 && <p>Severe — please seek help urgently.</p>}
          </div>

          {selfHarmFlag && (
            <div className="alert alert-danger small mt-2 mb-0">
              If you have thoughts of harming yourself, contact local emergency services or a
              crisis line in your region now.
            </div>
          )}
        </div>
      )}

      {/* PROTECTED: Save + View history */}
      {score !== null && (
        <div className="mt-3 p-3 border rounded-3" style={{ borderColor: "var(--scr-border)" }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          
            <div className="form-check">
            
              <input
                id="scr-consent"
                className="form-check-input"
                type="checkbox"
                checked={saveConsent}
                onChange={(e) => setSaveConsent(e.target.checked)}
                disabled={!isLoggedIn}
              />
              <label htmlFor="scr-consent" className="form-check-label">
                I consent to save this screening result to my account.
              </label>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="btn screening-btn btn-mental"
                disabled={!isLoggedIn || submitting}
              >
                {submitting ? "Saving..." : "Save my results"}
              </button>

              {!isLoggedIn && (
                <span className="medium screening-note">
                  <Link to="/login" className="link-plain"><b> Log in</b></Link> to save and view history or{" "}
                  <Link to="/signup" className="link-plain"><b>create an account</b></Link>
                </span>
              )}
            </div>
          </div>

          {saveError && <div className="text-danger small mt-2">{saveError}</div>}

        </div>
      )}
    </form>
  );
}

export default ScreeningForm;
