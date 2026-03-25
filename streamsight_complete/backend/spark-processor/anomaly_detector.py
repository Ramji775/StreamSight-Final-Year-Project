from __future__ import annotations
import numpy as np
from sklearn.ensemble import IsolationForest
import logging
from typing import List, Dict

logging.basicConfig(level=logging.INFO, format="%(asctime)s [ANOMALY] %(message)s")

EVENT_TYPE_MAP = {
    "page_view": 0, "product_click": 1, "search": 2,
    "add_to_cart": 3, "checkout": 4, "purchase": 5
}

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.05, random_state=42)
        self._pretrain()

    def _pretrain(self):
        logging.info("Pre-training Isolation Forest on 500 synthetic normal events...")
        synthetic = []
        for _ in range(500):
            price = np.random.uniform(10.0, 999.0)
            event_code = np.random.randint(0, 6)
            repeat_flag = 0
            synthetic.append([price, event_code, repeat_flag])
        self.model.fit(np.array(synthetic))
        logging.info("Isolation Forest trained and ready.")

    def extract_features(self, event: dict) -> list:
        price = float(event.get("price", 100.0))
        event_code = EVENT_TYPE_MAP.get(event.get("event_type", "page_view"), 0)
        repeat_flag = 1 if event.get("is_anomalous", False) else 0
        return [price, event_code, repeat_flag]

    def detect(self, events: List[Dict]) -> List[Dict]:
        if not events:
            return []

        features = [self.extract_features(e) for e in events]
        predictions = self.model.predict(np.array(features))
        scores = self.model.score_samples(np.array(features))

        anomalies = []
        for event, pred, score in zip(events, predictions, scores):
            if pred == -1:
                severity = "high" if score < -0.15 else ("medium" if score < -0.08 else "low")
                reason = self._determine_reason(event)
                anomalies.append({
                    "user_id": event.get("user_id"),
                    "session_id": event.get("session_id"),
                    "event_type": event.get("event_type"),
                    "reason": reason,
                    "severity": severity,
                    "timestamp": event.get("timestamp"),
                    "features": {
                        "price": event.get("price"),
                        "event_type_code": EVENT_TYPE_MAP.get(event.get("event_type"), 0),
                        "anomaly_score": round(float(score), 4)
                    }
                })
        return anomalies

    def _determine_reason(self, event: dict) -> str:
        price = float(event.get("price", 0))
        event_type = event.get("event_type", "")
        if price > 5000:
            return f"Price outlier — ₹{price} far exceeds normal range"
        if event_type == "purchase" and event.get("is_anomalous"):
            return "Flash purchase burst — unusually rapid purchase pattern"
        return f"Unusual behavior detected for event type '{event_type}'"

detector = AnomalyDetector()
