// backend/src/models/AuditLog.js
const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g. USER_ROLE_UPDATE, USER_DELETE
  resourceType: { type: String, required: true }, // e.g. User
  resourceId: { type: mongoose.Schema.Types.ObjectId, required: false },
  performedBy: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String },
    email: { type: String },
  },
  timestamp: { type: Date, default: Date.now },
  details: { type: mongoose.Schema.Types.Mixed }, // flexible JSON for old/new values
  ip: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed },
}, {
  versionKey: false,
  timestamps: false,
});

module.exports = mongoose.models?.AuditLog || mongoose.model("AuditLog", AuditLogSchema);
