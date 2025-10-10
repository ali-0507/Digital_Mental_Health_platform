import React, { useState } from "react";

function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", form);
    setSubmitted(true);
  };

  return submitted ? (
    <div className="alert alert-success">
      Your appointment request has been submitted confidentially. A counselor will reach out.
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Preferred Date</label>
        <input
          type="date"
          name="date"
          className="form-control"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Preferred Time</label>
        <input
          type="time"
          name="time"
          className="form-control"
          value={form.time}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default BookingForm;
