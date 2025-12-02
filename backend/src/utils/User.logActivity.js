const Activity = require("../models/User.Activity");

exports.logActivity = async (userId, type, meta = {}) => {
     
    if (!userId) throw new Error("Missing userId");
      const doc = await Activity.create({ user: userId, type, meta });
    return doc;
};