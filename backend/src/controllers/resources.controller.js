// controllers/resourceController.js
const { logActivity } = require("../utils/User.logActivity"); // adjust path if needed
const Activity = require("../models/User.Activity");

exports.markResourceViewed = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { resourceId, title = null, topic = null, durationSeen = 0 } = req.body;
    if (!resourceId) return res.status(400).json({ message: "Missing resourceId" });

    // optional duplicate-guard: skip if same user/resource logged within last 5 minutes
    const FIVE_MIN = 1000 * 60 * 5;
    const recent = await Activity.findOne({
      user: userId,
      type: "resource",
      "meta.resourceId": resourceId,
      createdAt: { $gte: new Date(Date.now() - FIVE_MIN) }
    });

    if (recent) {
      return res.status(200).json({ message: "Already logged recently" });
    }

    const meta = { resourceId, title, topic, durationSeen };
     const created = await logActivity(userId, "resource", meta); // will throw on error
    if (!created) return res.status(500).json({ message: "Failed to log resource view" });

    // // IMPORTANT: await so the DB write completes before returning
    

    return res.status(201).json({ message: "Resource view logged", activityId: created._id });
  } catch (err) {
    console.error("markResourceViewed error:", err);
    return res.status(500).json({ message: "Server error while logging resource view" });
  }
};
