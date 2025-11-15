const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: {
    type: [String],
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  level: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Screening", screeningSchema);
