import os
import logging
from datetime import datetime, timezone
from pymongo import MongoClient, ASCENDING, DESCENDING
from pymongo.errors import ConnectionFailure

logging.basicConfig(level=logging.INFO, format="%(asctime)s [MONGO_WRITER] %(message)s")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "streamsight"

def get_db():
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)
    return client[DB_NAME]

def ensure_indexes(db):
    try:
        db["raw_events"].create_index("timestamp", expireAfterSeconds=3600)
        db["aggregated_metrics"].create_index([("window_start", ASCENDING)])
        db["anomalies"].create_index([("timestamp", DESCENDING), ("severity", ASCENDING)])
        logging.info("MongoDB indexes ensured.")
    except Exception as e:
        logging.warning(f"Index creation: {e}")

def write_raw_events(events):
    if not events: return
    try:
        db = get_db()
        db["raw_events"].insert_many(events, ordered=False)
    except Exception as e:
        logging.error(f"Failed to write raw events: {e}")

def write_metrics(metrics):
    try:
        db = get_db()
        metrics["written_at"] = datetime.now(timezone.utc).isoformat()
        db["aggregated_metrics"].insert_one(metrics)
        logging.info(f"Metrics written: CVR={metrics.get('cvr', 0):.2f}%")
    except Exception as e:
        logging.error(f"Failed to write metrics: {e}")

def write_anomalies(anomalies):
    if not anomalies: return
    try:
        db = get_db()
        db["anomalies"].insert_many(anomalies, ordered=False)
        logging.info(f"Wrote {len(anomalies)} anomalies.")
    except Exception as e:
        logging.error(f"Failed to write anomalies: {e}")

try:
    db = get_db()
    ensure_indexes(db)
except ConnectionFailure:
    logging.warning("MongoDB not reachable on startup.")
