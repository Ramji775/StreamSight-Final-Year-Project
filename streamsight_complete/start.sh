#!/bin/bash

echo "========================================"
echo "  StreamSight - Starting All Services"
echo "========================================"

KAFKA_HOME=${KAFKA_HOME:-~/kafka}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo "[1] Starting Zookeeper..."
osascript -e "tell app \"Terminal\" to do script \"$KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties\"" 2>/dev/null || \
  (gnome-terminal -- bash -c "$KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties" 2>/dev/null || \
  $KAFKA_HOME/bin/zookeeper-server-start.sh $KAFKA_HOME/config/zookeeper.properties &)
sleep 5

echo "[2] Starting Kafka..."
osascript -e "tell app \"Terminal\" to do script \"$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties\"" 2>/dev/null || \
  (gnome-terminal -- bash -c "$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties" 2>/dev/null || \
  $KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties &)
sleep 8

echo "[3] Starting MongoDB..."
mkdir -p /tmp/streamsight-db
mongod --dbpath /tmp/streamsight-db --fork --logpath /tmp/mongod.log
sleep 3

echo "[4] Starting Event Simulator..."
cd "$PROJECT_DIR/backend/simulator"
pip install -r requirements.txt -q
python simulator.py &
SIM_PID=$!
echo "    Simulator PID: $SIM_PID"

echo "[5] Starting Spark Processor..."
cd "$PROJECT_DIR/backend/spark-processor"
pip install -r requirements.txt -q
python processor.py &
SPARK_PID=$!
echo "    Spark Processor PID: $SPARK_PID"

echo "[6] Starting Node.js API..."
cd "$PROJECT_DIR/backend/api"
[ ! -f .env ] && cp ../../.env.example .env
npm install -q
npm start &
API_PID=$!
echo "    API PID: $API_PID"

echo "[7] Starting React Dashboard..."
cd "$PROJECT_DIR/frontend/dashboard"
npm install -q
npm run dev &
DASH_PID=$!
echo "    Dashboard PID: $DASH_PID"

echo ""
echo "========================================"
echo "  All services running!"
echo "  React Dashboard → http://localhost:5173"
echo "  Node API        → http://localhost:4000"
echo "  Plotly Dash     → http://localhost:8050"
echo ""
echo "  To stop all: kill $SIM_PID $SPARK_PID $API_PID $DASH_PID"
echo "========================================"
