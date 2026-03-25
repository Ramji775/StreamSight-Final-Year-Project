import uuid
import random
from datetime import datetime, timezone

EVENT_TYPES = ["page_view", "add_to_cart", "checkout", "purchase", "search", "product_click"]
PAGES = ["/home", "/product/101", "/product/202", "/cart", "/checkout", "/confirmation", "/search"]
CATEGORIES = ["Electronics", "Fashion", "Books", "Home", "Sports"]
DEVICES = ["mobile", "desktop", "tablet"]
COUNTRIES = ["IN", "US", "UK", "SG", "DE"]

def generate_event(force_anomaly=False):
    user_id = f"user_{random.randint(100, 999)}"
    session_id = f"sess_{''.join(random.choices('abcdefghijklmnopqrstuvwxyz0123456789', k=8))}"
    event_type = random.choice(EVENT_TYPES)
    category = random.choice(CATEGORIES)
    price = round(random.uniform(10.0, 999.0), 2)
    is_anomalous = False

    if force_anomaly:
        anomaly_type = random.choice(["price_spike", "rapid_purchase"])
        if anomaly_type == "price_spike":
            price = round(random.uniform(5001.0, 9999.0), 2)
        elif anomaly_type == "rapid_purchase":
            event_type = "purchase"
        is_anomalous = True

    return {
        "event_id": str(uuid.uuid4()),
        "user_id": user_id,
        "session_id": session_id,
        "event_type": event_type,
        "page": random.choice(PAGES),
        "product_id": f"prod_{random.randint(100, 999)}",
        "category": category,
        "price": price,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "device": random.choice(DEVICES),
        "country": random.choice(COUNTRIES),
        "is_anomalous": is_anomalous
    }
