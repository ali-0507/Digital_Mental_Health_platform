// backend/src/models/Resource.js
const mongoose = require("mongoose");

const AdminResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["guide", "video", "audio", "article", "other"], default: "other" },
  description: { type: String },
  url: { type: String },           // optional link or media url
  meta: { type: mongoose.Schema.Types.Mixed },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.models?.Resource || mongoose.model("Resource", AdminResourceSchema);
