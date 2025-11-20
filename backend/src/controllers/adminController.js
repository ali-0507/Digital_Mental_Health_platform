// backend/src/controllers/adminController.js
const User = require("../models/User");
const { createAudit } = require("../utils/auditLogger");

/**
 * GET /api/admin/users
 * Query: page, limit, search
 */
exports.getUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limitRaw = Math.max(parseInt(req.query.limit || "10", 10), 1);
    const MAX_LIMIT = 100;
     const limit = Math.min(limitRaw, MAX_LIMIT);

    let search = (req.query.search || "").trim();
    if (search.length > 200) search = search.slice(0, 200);

    const filter = {};

    if (search) {
      const re = { $regex: search, $options: "i" };
      filter.$or = [
        { name:re },
        { email: re },
        { username:re },
      ];
    }

     // projection: exclude sensitive fields and any large fields
    const projection = "-password -refreshTokens -resetToken -__v";

    const[total, users] = await Promise.all([
      User.countDocuments(filter),
      User.find(filter)
      .select(projection)
       .sort({ createdAt: -1 })
       .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ]);
    
     // normalize id field for frontend
    const usersNormalized = users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      isBlocked: !!u.isBlocked,
      createdAt: u.createdAt,
      // add other safe fields you need for the admin table
    }));

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      users: usersNormalized,
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

   await User.deleteOne({ _id: user._id });
    return res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};




/**
 * PUT /api/admin/users/:id/block
 * Body: { block: true }  -> block user
 *       { block: false } -> unblock user
 */
exports.toggleBlockUser = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const { id } = req.params;
    const actor = req.user;
    const block = req.body?.block === true; // default false if omitted

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // prevent blocking yourself
    if (user._id.toString() === actor._id.toString()) {
      await createAudit({
        action: "USER_BLOCK_BLOCKED",
        resourceType: "User",
        resourceId: user._id,
        performedBy: { id: actor._id, name: actor.name, email: actor.email },
        details: { reason: "attempted_self_block" },
        ip: req.ip,
        meta: { path: req.originalUrl, method: req.method },
      });
      return res.status(400).json({ message: "Cannot block yourself" });
    }

    const prev = { isBlocked: !!user.isBlocked };
    user.isBlocked = block;
    await user.save();

    const action = block ? "USER_BLOCK" : "USER_UNBLOCK";
    await createAudit({
      action,
      resourceType: "User",
      resourceId: user._id,
      performedBy: { id: actor._id, name: actor.name, email: actor.email },
      details: { previous: prev, current: { isBlocked: !!user.isBlocked } },
      ip: req.ip,
      meta: { path: req.originalUrl, method: req.method },
    });

    return res.json({
      message: block ? "User blocked" : "User unblocked",
      user: { id: user._id, name: user.name, email: user.email, isBlocked: !!user.isBlocked, role: user.role },
    });
  } catch (err) {
    console.error("toggleBlockUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};








// for analytics of admin page

exports.getAdminStats = async (req, res) => {
  try {
    // helper to safely require a model without throwing if file missing
    const safeModel = (name, path) => {
      try {
        return require(path);
      } catch (e) {
        // model not present — return null to gracefully skip
        console.debug(`model ${name} not found:`, e.message);
        return null;
      }
    };

    // Prefer existing models; try common names used in this repo
    const User = safeModel("User", "../models/User");
    const Screening = safeModel("Screening", "../models/Screening"); // common name
    const PeerPost = safeModel("Post", "../models/PeerSupport.Post.js"); // guess
    // const PeerSupportPost = safeModel("PeerSupportPost", "../models/PeerSupport"); // alternative guess
    // Counselors: prefer counting users with role "counselor" if User model exists, otherwise try a Counselor model
    const CounselorModel = safeModel("Counselor", "../models/Counselor");

    // counts with fallbacks
    let totalUsers = 0;
    let counselors = 0;
    let screenings = 0;
    let peerPosts = 0;

    if (User) {
      totalUsers = await User.countDocuments({});
      // counselors via role on User if role exists
      try {
        counselors = await User.countDocuments({ role: "counselor" });
      } catch (_) {
        counselors = 0;
      }
    } else if (CounselorModel) {
      counselors = await CounselorModel.countDocuments({});
    }

    if (!User && !CounselorModel) {
      // both missing → keep 0
    }

    
    if (Screening) {
      try {
        screenings = await Screening.countDocuments({});
      } catch (e) {
        screenings = 0;
      }
    }


      if (PeerPost) {
      peerPosts = await PeerPost.countDocuments({});
    } else {
      // attempt to detect collection by name in DB (very defensive)
      try {
        const collNames = await mongoose.connection.db.listCollections().toArray();
        const found = collNames.find((c) =>
          /peer/i.test(c.name) || /posts/i.test(c.name) || /peer_support/i.test(c.name)
        );
        if (found) {
          peerPosts = await mongoose.connection.collection(found.name).countDocuments({});
        }
      } catch (e) {
        peerPosts = 0;
      }
    }


     // Build a simple monthly signups trend for last 6 months if User model exists
    let trend = [];
    if (User) {
      const now = new Date();
      const monthsBack = 6;
      // start at beginning of month 'monthsBack' ago
      const start = new Date(now.getFullYear(), now.getMonth() - monthsBack + 1, 1);
      // aggregate monthly counts
      try {
        const agg = await User.aggregate([
          { $match: { createdAt: { $gte: start } } },
          {
            $group: {
              _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);


         for (let i = monthsBack - 1; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const label = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          const match = agg.find(
            (a) => a._id.year === d.getFullYear() && a._id.month === d.getMonth() + 1
          );
          trend.push({ label, users: match ? match.count : 0 });
        }
      } catch (e) {
        console.debug("trend aggregation failed:", e.message);
        trend = [];
      }
    }

    const breakdown = [
      { name: "Users", value: totalUsers },
      { name: "Counselors", value: counselors },
      { name: "Screenings", value: screenings },
      { name: "Peer Posts", value: peerPosts },
    ];

    
    return res.json({
      totalUsers,
      counselors,
      screenings,
      peerPosts,
      trend,
      breakdown,
    });
  } catch (err) {
    console.error("getAdminStats error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};




// Screening Reports of admin dashboard
// Admin: list screenings / screening reports (keep inside adminController.js)
const mongoose = require("mongoose");

// Reuse your safeModel helper if present; otherwise create a small local safe require.
// If you already have safeModel defined above in this file, you can remove the local one.
const safeModel = (name, relPath) => {
  try { return require(relPath); } catch (e) { return null; }
};

exports.adminListScreenings = async (req, res) => {
  try {
    const Screening = safeModel("Screening", "../models/Screening");
    const User = safeModel("User", "../models/User");

    if (!Screening) {
      return res.status(404).json({ message: "Screening model not available on server" });
    }

    // pagination + optional search
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.max(parseInt(req.query.limit || "50"), 1);
    const search = (req.query.search || "").trim();

    const filter = {};
    if (search) {
      filter.$or = [
        { "userName": { $regex: search, $options: "i" } },
        { "userEmail": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Screening.countDocuments(filter);
    const docs = await Screening.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Map docs to UI-friendly rows
    const rows = await Promise.all(docs.map(async (d) => {
      let userName = d.userName || null;

      // if screening references a user id, try to fetch name
      if (!userName && d.user && mongoose.Types.ObjectId.isValid(String(d.user)) && User) {
        try {
          const u = await User.findById(d.user).select("name email").lean();
          if (u) userName = u.name || u.email || null;
        } catch (_) {}
      }

      // derive result/score label
      let scoreLabel = null;
      if (typeof d.result === "string" && d.result.trim()) {
        scoreLabel = d.result;
      } else if (typeof d.outcome === "string" && d.outcome.trim()) {
        scoreLabel = d.outcome;
      } else if (typeof d.score === "number") {
        const n = d.score;
        if (n >= 0 && n <= 4) scoreLabel = "Minimal";
        else if (n <= 9) scoreLabel = "Mild";
        else if (n <= 14) scoreLabel = "Moderate";
        else if (n <= 19) scoreLabel = "Moderately Severe";
        else scoreLabel = "Severe";
      } else {
        scoreLabel = d.label || d.category || "Unknown";
      }

      const date = d.createdAt ? new Date(d.createdAt) : (d.date ? new Date(d.date) : null);
      const dateStr = date ? date.toISOString().slice(0,10) : null;

      return {
        id: d._id || d.id,
        user: userName || (d.userEmail || "Unknown"),
        score: scoreLabel,
        date: dateStr,
        raw: d,
      };
    }));

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      reports: rows,
    });
  } catch (err) {
    console.error("adminListScreenings error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
