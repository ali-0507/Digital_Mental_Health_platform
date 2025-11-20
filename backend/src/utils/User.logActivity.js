const Activity = require("../models/User.Activity");

exports.logActivity = async (userId, type, meta = {}) => {
    // try {
    //     if(!userId) return;
    //     await Activity.create({ user: userId, type, meta });
    // } catch (error) {
    //     console.warn("logging activity failed:", error.message);
    // }   
    if (!userId) throw new Error("Missing userId");
      const doc = await Activity.create({ user: userId, type, meta });
    return doc;
};