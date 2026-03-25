#!/bin/bash
KAFKA_HOME=${KAFKA_HOME:-~/kafka}
echo "Creating Kafka topic: clickstream-events..."
$KAFKA_HOME/bin/kafka-topics.sh --create \
  --topic clickstream-events \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1

echo "Verifying topic..."
$KAFKA_HOME/bin/kafka-topics.sh --list --bootstrap-server localhost:9092
echo "Done!"
