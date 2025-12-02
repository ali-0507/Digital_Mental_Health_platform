const Activity = require("../models/User.Activity");

const startofDay = (d) =>  new Date(d.getFullYear(), d.getMonth(), d.getDate()); 
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

exports.getMyDashboard = async (req, res) => {
    try {
        const userId = req.user?._id;
        if(!userId) return res.status(401).json({message: "Unauthorized"});

   // time range: last 7 days (including today)
        const today = startofDay(new Date());
        const weekAgo = addDays(today, -6);
    
  
    // aggregate counts per day per type
    const agg = await Activity.aggregate([
      { $match: { user: userId, createdAt: { $gte: weekAgo } } },
      {
        $group: {
          _id: {
            d: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
    ]);
      // generate 7 date labels
    const days = [...Array(7)].map((_, i) => addDays(weekAgo, i).toISOString().slice(0, 10));

    // build stacked/day rows for chart
    const activity7d = days.map((d) => {
      const row = { date: d, chat: 0, screening: 0, booking: 0, resource: 0, peersupport: 0 };
      agg.forEach((a) => {
        if (a._id.d === d) row[a._id.type] = a.count;
      });
      return row;
    });

    // tiles
    const chatsThisWeek = activity7d.reduce((n, r) => n + r.chat, 0);
    const resourcesViewedWeek = activity7d.reduce((n, r) => n + r.resource, 0);

    const resourcesViewedTotal = await Activity.countDocuments({ user: userId, type: "resource" });
    // add a tile count
   const peerSupportThisWeek = activity7d.reduce((n, r) => n + r.peersupport, 0);

    // recent activity timeline
    const recent = await Activity.find({ user: userId }).sort({ createdAt: -1 }).limit(6).lean();

    // topics for donut: infer from meta.topic or keywords in meta.text
    const last50Resources = await Activity.find({ user: userId, type: "resource" })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
  
      
    const resourceCounts = {};
    last50Resources.forEach((a) => {
      const key = a?.meta?.topic || (a?.meta?.title || "other");
      resourceCounts[key] = (resourceCounts[key] || 0) + 1;
    });
     const resources = Object.keys(resourceCounts).map((k) => ({ name: k, value: resourceCounts[k] }));

    // last screening + next booking (if you log them with meta)
    const lastScreening = recent.find((r) => r.type === "screening")?.meta || null;
    const nextBooking = recent.find((r) => r.type === "booking")?.meta || null;

    // greeting
    const firstName = (req.user?.name || "there").split(" ")[0];

    return res.json({
      greeting: {
        title: "Connect&Evolve",
        headline: `${firstName}'s Dashboard`,
        subline: "Your personal mental-wellbeing hub.",
      },
      tiles: {
        chatsThisWeek,
        lastScreeningScore: lastScreening?.score ?? null,
        nextSession: nextBooking?.date ?? null,
        resourcesViewedWeek,
        resourcesViewed: resourcesViewedTotal,
        peerSupportThisWeek,
      },
      charts: {
        activity7d, // [{ date, chat, screening, booking, resource, peersupport }]
        resources,    
      },
      recent,       // [{ _id, type, meta, createdAt }]
    });
}catch (error) {
        console.error("getMyDashboard error:", error);
        res.status(500).json({message: "Internal server error"});
    }
};
