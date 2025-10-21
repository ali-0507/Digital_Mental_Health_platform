import "./Booking.css";
import BookingForm from "../components/BookingForm";
import { Link } from "react-router-dom";
import { useState } from "react";

function AuthModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="bk-modal-backdrop" onClick={onClose}>
      <div className="bk-modal" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-1">Login required</h5>
        <p className="text-muted mb-3">
          Booking is personal. Please log in so we can confirm by email and notify your counselor.
        </p>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-plain w-100">Login</Link>
          <Link to="/signup" className="btn btn-accent w-100">Sign up</Link>
        </div>
        <button className="bk-modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default function Booking() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="bk-bg py-5">
      <div className="container" style={{ maxWidth: 980 }}>
        <header className="text-center mb-3">
          <h2 className="bk-title mb-1">Confidential Booking</h2>
          <p className="bk-subtitle">
            Book a private session with a counselor. Your details remain confidential.
          </p>
        </header>

        <div className="bk-card p-3 p-md-4">
          {!isLoggedIn && (
            <div className="bk-banner mb-3">
              You’re browsing anonymously.{" "}
              <button className="link-plain" onClick={() => setShowAuth(true)}>
                Log in
              </button>{" "}
              to book an appointment.
            </div>
          )}

          <BookingForm
            isLoggedIn={isLoggedIn}
            onRequireAuth={() => setShowAuth(true)}
          />
        </div>

        <p className="bk-helpline mt-4 text-center">
          In crisis or need immediate help?{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noreferrer">
            Contact local helplines
          </a>
          .
        </p>
      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}

