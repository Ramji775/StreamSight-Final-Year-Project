const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Event");

// POST /api/simulate-event
// Called by the e-commerce simulation page to inject live events
router.post("/", async (req, res) => {
  try {
    const {
      event_type = "page_view",
      user_id = "sim_user",
      session_id,
      page = "/",
      product_id = "prod_001",
      category = "Electronics",
      price = 99.99,
      device = "desktop",
      country = "IN",
      is_anomalous = false,
    } = req.body;

    const event = new Event({
      event_id: require("crypto").randomUUID(),
      user_id,
      session_id: session_id || `sess_${Math.random().toString(36).substr(2, 8)}`,
      event_type,
      page,
      product_id,
      category,
      price,
      timestamp: new Date(),
      device,
      country,
      is_anomalous,
    });

    await event.save();

    // Emit to all connected Socket.IO clients so dashboard updates instantly
    const io = req.app.get("io");
    if (io) io.emit("event:new", event.toObject());

    // If anomalous, also emit anomaly:new
    if (is_anomalous) {
      const anomalyPayload = {
        user_id,
        session_id: event.session_id,
        event_type,
        reason: price > 5000
          ? `Price outlier — ₹${price} far exceeds normal range`
          : `Simulated malicious activity detected`,
        severity: price > 8000 ? "high" : "medium",
        timestamp: new Date(),
        features: { price, event_type_code: 5, anomaly_score: -0.25 },
      };
      if (io) io.emit("anomaly:new", anomalyPayload);

      // Save to anomalies collection too
      const db = mongoose.connection.db;
      await db.collection("anomalies").insertOne(anomalyPayload);
    }

    res.json({ success: true, event_id: event.event_id });
  } catch (err) {
    console.error("[simulate-event]", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
