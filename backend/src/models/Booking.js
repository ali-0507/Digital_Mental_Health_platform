const mongoose = require("mongoose");

// Booking schema defines the structure of booking data in MongoDB
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to logged-in user
    ref: "User", // Tells MongoDB to link this with the User collection
    required: true,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String, trim: true },
  mode: { type: String, enum: ["online", "in-person"], default: "online" },
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);