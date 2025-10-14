// backend/src/controllers/adminController.js
const User = require("../models/User");
const { createAudit } = require("../utils/auditLogger");

/**
 * GET /api/admin/users
 * Query: page, limit, search
 */
exports.getUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.max(parseInt(req.query.limit || "10"), 1);
    const search = (req.query.search || "").trim();

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        // username is commented in schema; if you later add username, it will work.
        { username: { $regex: search, $options: "i" } },
      ];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (err) {
    console.error("getUsers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/admin/users/:id
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error("getUserById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/admin/users/:id/role
 * Body: { role: "admin" }
 * Prevent admin removing their own admin role
 */
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ message: "Role is required" });

    const allowedRoles = ["user", "counselor", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent admin from demoting themselves
    if (user._id.toString() === req.user._id.toString() && user.role === "admin" && role !== "admin") {
      return res.status(400).json({ message: "Cannot remove your own admin role" });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    // audit log
    await createAudit({
      action: "USER_ROLE_UPDATE",
      resourceType: "User",
      resourceId: user._id,
      performedBy: { id: req.user._id, name: req.user.name, email: req.user.email },
      details: { oldRole, newRole: role },
      ip: req.ip,
      meta: { path: req.originalUrl, method: req.method },
    });

    return res.json({
      message: "Role updated",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("updateUserRole error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/admin/users/:id
 * Prevent deleting yourself
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    // create audit snapshot BEFORE removal
    await createAudit({
      action: "USER_DELETE",
      resourceType: "User",
      resourceId: user._id,
      performedBy: { id: req.user._id, name: req.user.name, email: req.user.email },
      details: { deletedUserSnapshot: { id: user._id, name: user.name, email: user.email, role: user.role } },
      ip: req.ip,
      meta: { path: req.originalUrl, method: req.method },
    });

    await user.remove();
    return res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
