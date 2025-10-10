// import React from "react";
import BookingForm from "../components/BookingForm";

function Booking() {
  return (
    <div className="booking p-2">
      <h2 className="mt-2 mb-3 text-center">Confidential Booking</h2>
      <p className="text-muted text-center mb-4">
        Book a private session with a counselor. Your details remain confidential.
      </p>

      <div className="card p-4 shadow-sm">
        <BookingForm />
      </div>
    </div>
  );
}

export default Booking;
