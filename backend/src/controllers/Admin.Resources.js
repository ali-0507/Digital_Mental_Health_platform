const Resource = require("../models/Admin.Resources");
const {createAudit} = require("../utils/auditLogger");
const mongoose = require("mongoose");


exports.listPublic = async (req, res) => {
  try {
    // optional query: ?type=video&page=1&limit=20
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.max(parseInt(req.query.limit || "50"), 10);
    const filter = { isDeleted: { $ne: true } };

    if (req.query.type) filter.type = req.query.type;
    if (req.query.search) {
      const q = req.query.search.trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const total = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();


        return res.json({ page, limit, total, pages: Math.ceil(total / limit), resources });
  } catch (err) {
    console.error("listPublic resources error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// admin list
exports.listAdmin = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.max(parseInt(req.query.limit || "50"), 10);
    const filter = {}; // admin sees deleted items too if you want
    if (req.query.type) filter.type = req.query.type;
    if (req.query.search) {
      const q = req.query.search.trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

      const total = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.json({ page, limit, total, pages: Math.ceil(total / limit), resources });
  } catch (err) {
    console.error("listAdmin resources error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// admin delete (soft-delete by default)
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // audit snapshot first
    await createAudit({
      action: "RESOURCE_DELETE",
      resourceType: "Resource",
      resourceId: resource._id,
      performedBy: { id: req.user._id, name: req.user.name, email: req.user.email },
      details: { snapshot: resource.toObject() },
      ip: req.ip,
      meta: { path: req.originalUrl, method: req.method },
    });

    // soft-delete
    resource.isDeleted = true;
    await resource.save();

    return res.json({ message: "Resource deleted" });
  } catch (err) {
    console.error("deleteResource error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};