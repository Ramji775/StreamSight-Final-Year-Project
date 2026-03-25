import dash
from dash import dcc, html, dash_table
from dash.dependencies import Input, Output
import plotly.graph_objects as go
import plotly.express as px
from pymongo import MongoClient
import pandas as pd
from datetime import datetime, timezone

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "streamsight"

app = dash.Dash(__name__, title="StreamSight Analytics")
app.layout = html.Div(style={"backgroundColor": "#0f172a", "minHeight": "100vh", "padding": "24px", "fontFamily": "Inter, sans-serif"}, children=[
    html.H1("StreamSight — Analytics Dashboard", style={"color": "#f1f5f9", "marginBottom": "4px", "fontSize": "22px"}),
    html.P("Auto-refreshes every 5 seconds", style={"color": "#64748b", "fontSize": "13px", "marginBottom": "24px"}),

    dcc.Interval(id="interval", interval=5000, n_intervals=0),

    html.Div(style={"display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "20px", "marginBottom": "20px"}, children=[
        dcc.Graph(id="cvr-gauge"),
        dcc.Graph(id="funnel-chart"),
    ]),

    dcc.Graph(id="anomaly-scatter", style={"marginBottom": "20px"}),

    html.Div([
        html.H3("Recent Sessions", style={"color": "#94a3b8", "fontSize": "13px", "textTransform": "uppercase", "letterSpacing": "2px", "marginBottom": "12px"}),
        dash_table.DataTable(
            id="session-table",
            columns=[
                {"name": "User ID", "id": "user_id"},
                {"name": "Event Type", "id": "event_type"},
                {"name": "Device", "id": "device"},
                {"name": "Country", "id": "country"},
                {"name": "Price", "id": "price"},
                {"name": "Time", "id": "timestamp"},
            ],
            data=[],
            page_size=15,
            style_table={"overflowX": "auto"},
            style_header={"backgroundColor": "#1e293b", "color": "#94a3b8", "border": "1px solid #334155", "fontSize": "12px"},
            style_cell={"backgroundColor": "#0f172a", "color": "#cbd5e1", "border": "1px solid #1e293b", "fontSize": "12px", "padding": "8px"},
            style_data_conditional=[{"if": {"row_index": "odd"}, "backgroundColor": "#1e293b"}],
        )
    ]),
])

def get_db():
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
    return client[DB_NAME]

@app.callback(
    Output("cvr-gauge", "figure"),
    Output("funnel-chart", "figure"),
    Output("anomaly-scatter", "figure"),
    Output("session-table", "data"),
    Input("interval", "n_intervals")
)
def update_all(n):
    try:
        db = get_db()

        # CVR Gauge
        latest_metric = db["aggregated_metrics"].find_one(sort=[("window_start", -1)]) or {}
        cvr = latest_metric.get("cvr", 0)
        gauge = go.Figure(go.Indicator(
            mode="gauge+number+delta",
            value=cvr,
            delta={"reference": 3.0},
            title={"text": "Conversion Rate %", "font": {"color": "#94a3b8", "size": 14}},
            number={"font": {"color": "#34d399", "size": 40}, "suffix": "%"},
            gauge={
                "axis": {"range": [0, 20], "tickcolor": "#475569"},
                "bar": {"color": "#34d399"},
                "bgcolor": "#1e293b",
                "bordercolor": "#334155",
                "steps": [
                    {"range": [0, 5], "color": "#1e293b"},
                    {"range": [5, 10], "color": "#164e63"},
                    {"range": [10, 20], "color": "#065f46"},
                ],
            }
        ))
        gauge.update_layout(paper_bgcolor="#1e293b", plot_bgcolor="#1e293b", margin=dict(t=60, b=20, l=20, r=20), height=250)

        # Funnel Chart
        funnel_data = latest_metric.get("funnel", {})
        stages = ["page_view", "add_to_cart", "checkout", "purchase"]
        labels = ["Page View", "Add to Cart", "Checkout", "Purchase"]
        values = [funnel_data.get(s, 0) for s in stages]
        funnel_fig = go.Figure(go.Funnel(
            y=labels, x=values,
            textinfo="value+percent initial",
            marker={"color": ["#34d399", "#10b981", "#059669", "#047857"]},
        ))
        funnel_fig.update_layout(
            title={"text": "Conversion Funnel", "font": {"color": "#94a3b8", "size": 14}},
            paper_bgcolor="#1e293b", plot_bgcolor="#1e293b",
            font={"color": "#cbd5e1"},
            margin=dict(t=60, b=20, l=20, r=20), height=250
        )

        # Anomaly Scatter
        anomaly_docs = list(db["anomalies"].find().sort("timestamp", -1).limit(100))
        if anomaly_docs:
            df = pd.DataFrame(anomaly_docs)
            df["price"] = df["features"].apply(lambda f: f.get("price", 0) if isinstance(f, dict) else 0)
            df["ts"] = pd.to_datetime(df["timestamp"])
            color_map = {"high": "#f87171", "medium": "#fbbf24", "low": "#60a5fa"}
            scatter_fig = px.scatter(
                df, x="ts", y="price", color="severity",
                color_discrete_map=color_map,
                hover_data=["user_id", "reason", "event_type"],
                title="Anomaly Detection — Price vs Time",
                labels={"ts": "Time", "price": "Price (₹)"},
            )
        else:
            scatter_fig = go.Figure()
            scatter_fig.add_annotation(text="No anomalies detected yet", showarrow=False,
                                       font=dict(color="#64748b", size=14), xref="paper", yref="paper", x=0.5, y=0.5)
        scatter_fig.update_layout(
            paper_bgcolor="#1e293b", plot_bgcolor="#0f172a",
            font={"color": "#cbd5e1"},
            title_font={"color": "#94a3b8", "size": 14},
            margin=dict(t=60, b=40, l=40, r=20), height=300
        )

        # Session Table
        raw_events = list(db["raw_events"].find().sort("timestamp", -1).limit(20))
        table_data = []
        for e in raw_events:
            table_data.append({
                "user_id": e.get("user_id", ""),
                "event_type": e.get("event_type", ""),
                "device": e.get("device", ""),
                "country": e.get("country", ""),
                "price": f"₹{e.get('price', 0):.2f}",
                "timestamp": str(e.get("timestamp", ""))[:19],
            })

        return gauge, funnel_fig, scatter_fig, table_data

    except Exception as ex:
        print(f"[Dash] Error: {ex}")
        empty_fig = go.Figure()
        empty_fig.update_layout(paper_bgcolor="#1e293b", plot_bgcolor="#1e293b")
        return empty_fig, empty_fig, empty_fig, []

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=8050)
