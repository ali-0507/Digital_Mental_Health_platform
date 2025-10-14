// backend/src/controllers/auditController.js
const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.max(parseInt(req.query.limit || "20"), 1);
    const { action, resourceType, performedBy, search } = req.query;

    const filter = {};
    if (action) filter.action = action;
    if (resourceType) filter.resourceType = resourceType;
    if (performedBy) filter["performedBy.id"] = performedBy;

    if (search) {
      filter.$or = [
        { "performedBy.name": { $regex: search, $options: "i" } },
        { "performedBy.email": { $regex: search, $options: "i" } },
        { action: { $regex: search, $options: "i" } },
      ];
    }

    const total = await AuditLog.countDocuments(filter);
    const logs = await AuditLog.find(filter)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({ page, limit, total, pages: Math.ceil(total / limit), logs });
  } catch (err) {
    console.error("getAuditLogs error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
