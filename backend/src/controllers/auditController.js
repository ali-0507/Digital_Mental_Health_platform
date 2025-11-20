// backend/src/controllers/auditController.js
const mongoose = require("mongoose");
const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1",10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20",10), 1);
    const { action, resourceType, performedBy, search } = req.query;

    const filter = {};

    if (action) filter.action = action;
    if (resourceType) filter.resourceType = resourceType;

    if (performedBy){
      if (mongoose.Types.ObjectId.isValid(performedBy)) {
        filter["performedBy.id"] = mongoose.Types.ObjectId(performedBy);
    }else{
      return res.status(400).json({ message: "Invalid performedBy user ID" });
    } 
  }
    if (search) {
      const s = search.trim();
      if(s.length){
      filter.$or = [
        { "performedBy.name": { $regex: s, $options: "i" } },
        { "performedBy.email": { $regex: s, $options: "i" } },
        { action: { $regex: s, $options: "i" } },
      ];
    }
  }
    const [total, logs] = await Promise.all([
    AuditLog.countDocuments(filter),
      AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
    ]);
    return res.json({ 
      page, limit,
       total, 
       pages: Math.ceil(total / limit),
       logs,
     });
  } catch (err) {
    console.error("getAuditLogs error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
