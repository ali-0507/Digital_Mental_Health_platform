const AuditLog = require("../models/AuditLog");

const createAudit = async ({ action, resourceType, resourceId = null, performedBy, details = {}, ip = null, meta = {} }) => {
  try {
    if (!performedBy || !performedBy.id) {
      console.warn("createAudit called without performedBy.id - skipping audit");
      return null;
    }

    const entry = new AuditLog({
      action,
      resourceType,
      resourceId,
      performedBy: {
        id: performedBy.id,
        name: performedBy.name,
        email: performedBy.email,
      },
      details,
      ip,
      meta,
    });

    await entry.save();
    return entry;
  } catch (err) {
    // Do not crash main flow for audit failures
    console.error("Failed to write audit log:", err);
    return null;
  }
};

module.exports = { createAudit };
