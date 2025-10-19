 
import React, { useMemo, useState } from "react";
function buildSlots() {
  // 09:00 – 17:00 every 30 mins
  const slots = [];
  for (let h = 9; h <= 17; h++) {
    for (let m of [0, 30]) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

export default function BookingForm({ isLoggedIn, onRequireAuth }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    note: "",
    mode: "online", // online / in-person
  });
  const [submitted, setSubmitted] = useState(false);

  const slots = useMemo(buildSlots, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const selectSlot = (t) => setForm((p) => ({ ...p, time: p.time === t ? "" : t }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return onRequireAuth?.();

    // TODO (backend):
    // 1) POST /api/bookings { ...form }
    // 2) Send user confirmation email
    // 3) Notify counselor/admin
    console.log("Booking submitted (UI):", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bk-success p-3 p-md-4">
        <h5 className="mb-1">Request received ✔</h5>
        <p className="text-muted mb-0">
          We’ve recorded your preferred time. You’ll receive a confirmation email after a counselor accepts.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control bk-input"
            value={form.name}
            onChange={handleChange}
            required
            disabled={!isLoggedIn}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control bk-input"
            value={form.email}
            onChange={handleChange}
            required
            disabled={!isLoggedIn}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Preferred Date</label>
          <input
            type="date"
            name="date"
            className="form-control bk-input"
            value={form.date}
            onChange={handleChange}
            required
            disabled={!isLoggedIn}
          />
        </div>

        <div className="col-md-8">
          <label className="form-label d-flex justify-content-between">
            <span>Preferred Time</span>
            <small className="text-muted">Tap to select</small>
          </label>
          <div className="bk-slots">
            {slots.map((t) => (
              <button
                key={t}
                type="button"
                className={`bk-slot ${form.time === t ? "active" : ""}`}
                onClick={() => (isLoggedIn ? selectSlot(t) : onRequireAuth?.())}
                disabled={!isLoggedIn}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="form-text">
            Can’t find a fit? You can still enter a custom time:
          </div>
          <input
            type="time"
            name="time"
            className="form-control bk-input mt-1"
            value={form.time}
            onChange={handleChange}
            disabled={!isLoggedIn}
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Session Mode</label>
          <div className="d-flex gap-2 flex-wrap">
            {["online", "in-person"].map((m) => (
              <button
                key={m}
                type="button"
                className={`bk-mode ${form.mode === m ? "active" : ""}`}
                onClick={() => (isLoggedIn ? setForm((p) => ({ ...p, mode: m })) : onRequireAuth?.())}
                disabled={!isLoggedIn}
              >
                {m === "online" ? "Online (video)" : "In-person"}
              </button>
            ))}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Notes for counselor (optional)</label>
          <textarea
            name="note"
            rows={3}
            className="form-control bk-input"
            placeholder="Anything you’d like your counselor to know…"
            value={form.note}
            onChange={handleChange}
            disabled={!isLoggedIn}
          />
        </div>
      </div>

      {!isLoggedIn && (
        <div className="bk-note mt-3">
          Please <button type="button" className="link-plain" onClick={onRequireAuth}>log in</button> to submit.
        </div>
      )}

      <div className="d-flex justify-content-end mt-3">
        <button type="submit" className="btn bk-btn" disabled={!isLoggedIn}>
          Submit request
        </button>
      </div>

      <div className="bk-privacy mt-3">
        <i className="bi bi-shield-lock me-1"></i>
        Your booking is confidential. We’ll only email you about this appointment.
      </div>
    </form>
  );
}
