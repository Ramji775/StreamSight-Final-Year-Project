const mongoose = require("mongoose");
const AnomalySchema = new mongoose.Schema({
  user_id: String,
  session_id: String,
  event_type: String,
  reason: String,
  severity: { type: String, enum: ["low", "medium", "high"], index: true },
  timestamp: { type: Date, index: true },
  features: Object
});
module.exports = mongoose.model("Anomaly", AnomalySchema, "anomalies");
