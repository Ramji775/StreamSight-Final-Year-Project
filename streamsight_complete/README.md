# ⚡ StreamSight — Real-Time ClickStream Analytics Pipeline

> Real-time e-commerce clickstream ingestion, stream processing, anomaly detection, and live dashboard visualization.

---

## Architecture

```
[Python Simulator]
      │  kafka-python (500ms)
      ▼
[Apache Kafka]  ←── Topic: clickstream-events
      │
      ▼
[PySpark Structured Streaming]
      │  5-second micro-batches
      ├──► Funnel Aggregation (CVR, Bounce Rate)
      └──► Isolation Forest Anomaly Detection
              │
              ▼
         [MongoDB]
          ├── raw_events        (TTL: 1hr)
          ├── aggregated_metrics
          └── anomalies
              │
              ▼
     [Node.js Express API]  :4000
      ├── REST endpoints
      └── Socket.IO + MongoDB Change Streams
              │
              ▼
     [React Dashboard]  :5173
      ├── KPI Cards (CVR, Bounce, Sessions, Users)
      ├── Conversion Funnel Chart
      ├── Live Anomaly Feed
      └── Event Timeline

     [Plotly Dash]  :8050  (optional)
      ├── CVR Gauge
      ├── Funnel Chart
      ├── Anomaly Scatter Plot
      └── Session Table
```

---

## Ports

| Service         | Port  |
|----------------|-------|
| Zookeeper       | 2181  |
| Kafka           | 9092  |
| MongoDB         | 27017 |
| Node.js API     | 4000  |
| React Dashboard | 5173  |
| Plotly Dash     | 8050  |

---

## Prerequisites

Install these before running:

- [Apache Kafka](https://kafka.apache.org/downloads) (includes Zookeeper)
- [MongoDB Community](https://www.mongodb.com/try/download/community)
- Python 3.10+
- Node.js 18+
- Java 11+ (required by Spark)

---

## Setup & Run (7 terminals)

### Terminal 1 — Zookeeper
```bash
# Windows
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties

# Mac/Linux
./bin/zookeeper-server-start.sh config/zookeeper.properties
```

### Terminal 2 — Kafka
```bash
# Windows
.\bin\windows\kafka-server-start.bat .\config\server.properties

# Mac/Linux
./bin/kafka-server-start.sh config/server.properties
```

### Terminal 3 — MongoDB
```bash
mongod --dbpath ./data/db
```

### Terminal 4 — Event Simulator
```bash
cd backend/simulator
pip install -r requirements.txt
python simulator.py
```

### Terminal 5 — Spark Processor
```bash
cd backend/spark-processor
pip install -r requirements.txt
python processor.py
```

### Terminal 6 — Node.js API
```bash
cd backend/api
cp ../../.env.example .env
npm install
npm start
```

### Terminal 7 — React Dashboard
```bash
cd frontend/dashboard
npm install
npm run dev
# Open http://localhost:5173
```

### Terminal 8 (Optional) — Plotly Dash
```bash
cd backend/dash-analytics
pip install -r requirements.txt
python app.py
# Open http://localhost:8050
```

---

## How Anomaly Detection Works

The system uses **Isolation Forest** (scikit-learn) — an unsupervised ML algorithm that isolates anomalies by randomly partitioning data. Points that require fewer splits to isolate are flagged as anomalies.

**Features used:**
- `price` — detects price outliers (e.g. ₹9000 on a fashion item)
- `event_type_code` — encodes event type numerically
- `repeat_flag` — flags repeated anomalous patterns

**Pre-training:** At startup, 500 synthetic normal events are generated and used to fit the model before live stream processing begins (contamination=0.05 = 5% expected anomaly rate).

**Severity levels:**
- 🔴 **High** — anomaly score < -0.15
- 🟡 **Medium** — anomaly score < -0.08
- 🔵 **Low** — anomaly score below threshold but marginal

---

## Project Structure

```
streamsight/
├── .env.example
├── frontend/
│   └── dashboard/          ← React 18 + Vite + TailwindCSS
└── backend/
    ├── simulator/           ← Python Kafka producer
    ├── spark-processor/     ← PySpark + Isolation Forest
    ├── api/                 ← Node.js Express + Socket.IO
    └── dash-analytics/      ← Plotly Dash (optional)
```
