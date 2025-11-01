const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tokenHash: { type: String, required: true, index: true },
  userAgent: String,
  ip: String,
   // You are setting this in the controller; declare it here so TTL works
    expiresAt: { type: Date, required: true },
    // Do NOT declare createdAt manually. timestamps will add createdAt/updatedAt
   //   createdAt: { type: Date, required:true} // Session expires after 7 days
}, { timestamps: true });

// auto-delete after expiresAt
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Session", sessionSchema);