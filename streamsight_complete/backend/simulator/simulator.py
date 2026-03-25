import time
import json
import random
import logging
from kafka import KafkaProducer
from kafka.errors import NoBrokersAvailable
from event_schema import generate_event

logging.basicConfig(level=logging.INFO, format="%(asctime)s [SIMULATOR] %(message)s")

KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "clickstream-events"
INTERVAL = 0.5
ANOMALY_RATE = 0.05

def create_producer(retries=5, delay=3):
    for attempt in range(1, retries + 1):
        try:
            producer = KafkaProducer(
                bootstrap_servers=KAFKA_BROKER,
                value_serializer=lambda v: json.dumps(v).encode("utf-8")
            )
            logging.info("Connected to Kafka.")
            return producer
        except NoBrokersAvailable:
            logging.warning(f"Kafka not ready. Attempt {attempt}/{retries}. Retrying in {delay}s...")
            time.sleep(delay)
    raise RuntimeError("Could not connect to Kafka after multiple retries.")

def run():
    producer = create_producer()
    logging.info(f"Producing events to topic '{KAFKA_TOPIC}' every {INTERVAL}s...")
    count = 0
    while True:
        force_anomaly = random.random() < ANOMALY_RATE
        event = generate_event(force_anomaly=force_anomaly)
        producer.send(KAFKA_TOPIC, value=event)
        count += 1
        if count % 50 == 0:
            logging.info(f"Sent {count} events. Last: {event['event_type']} by {event['user_id']}")
        time.sleep(INTERVAL)

if __name__ == "__main__":
    run()
