const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET /api/user-activity?limit=200&event_type=purchase
// Returns flat list of raw_events sorted by timestamp desc
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 200;
    const eventType = req.query.event_type || null; // filter by event_type if provided

    const query = {};
    if (eventType) query.event_type = eventType;

    const events = await Event.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();

    // Group by user_id to build per-user activity summary
    const userMap = {};
    events.forEach(e => {
      if (!userMap[e.user_id]) {
        userMap[e.user_id] = {
          user_id: e.user_id,
          events: [],
          totalEvents: 0,
          purchases: 0,
          cartAdds: 0,
          views: 0,
          checkouts: 0,
          totalSpend: 0,
          lastActive: e.timestamp,
          device: e.device,
          country: e.country,
        };
      }
      const u = userMap[e.user_id];
      u.events.push({
        event_type: e.event_type,
        product_id: e.product_id,
        category: e.category,
        price: e.price,
        page: e.page,
        timestamp: e.timestamp,
        is_anomalous: e.is_anomalous,
      });
      u.totalEvents++;
      if (e.event_type === "purchase")    { u.purchases++;  u.totalSpend += (e.price || 0); }
      if (e.event_type === "add_to_cart") { u.cartAdds++; }
      if (e.event_type === "page_view")   { u.views++; }
      if (e.event_type === "checkout")    { u.checkouts++; }
      // keep most recent lastActive
      if (new Date(e.timestamp) > new Date(u.lastActive)) u.lastActive = e.timestamp;
    });

    const users = Object.values(userMap).sort(
      (a, b) => new Date(b.lastActive) - new Date(a.lastActive)
    );

    res.json({
      users,
      totalEvents: events.length,
      rawEvents: events, // also send flat list for the detailed table
    });
  } catch (err) {
    console.error("[user-activity]", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
