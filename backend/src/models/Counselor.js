// backend/src/models/Counselor.js
const mongoose = require("mongoose");

const CounselorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    name: { type: String, required: false },
    email: { type: String, required: false },

    specialty: { type: String, default: "" },
    bio: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved", // or "pending" if you want manual admin approval
    },

    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports =
  mongoose.models?.Counselor ||
  mongoose.model("Counselor", CounselorSchema);
