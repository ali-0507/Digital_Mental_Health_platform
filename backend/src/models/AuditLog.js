
const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g. USER_ROLE_UPDATE, USER_DELETE
  resourceType: { type: String, required: true }, // e.g. User
  resourceId: { type: mongoose.Schema.Types.Mixed, required: false },
  performedBy: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String },
    email: { type: String },
  },
  details: { type: mongoose.Schema.Types.Mixed, default: {} }, // flexible JSON for old/new values
  ip: { type: String },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} }, // additional metadata
}, {
  versionKey: false,
  timestamps: true,
});

// Useful indexes for admin listing & filtering
AuditLogSchema.index({ action: 1 });
AuditLogSchema.index({ resourceType: 1 });
AuditLogSchema.index({ "performedBy.id": 1 });
AuditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.models?.AuditLog || mongoose.model("AuditLog", AuditLogSchema);
