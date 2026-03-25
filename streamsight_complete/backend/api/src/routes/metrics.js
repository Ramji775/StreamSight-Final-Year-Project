const express = require("express");
const router = express.Router();
const Metric = require("../models/Metric");

router.get("/", async (req, res) => {
  try {
    const latest = await Metric.findOne().sort({ window_start: -1 }).lean();
    res.json(latest || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history", async (req, res) => {
  try {
    const range = req.query.range || "1h";
    const hours = range === "24h" ? 24 : range === "6h" ? 6 : 1;
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const history = await Metric.find({ window_start: { $gte: since } })
      .sort({ window_start: 1 })
      .limit(200)
      .lean();
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
