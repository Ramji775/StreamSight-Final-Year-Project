import { useEffect, useState } from "react";
import socket from "../socket";

export function useSocket() {
  const [metrics, setMetrics] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(socket.connected);

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("metrics:update", (data) => {
      setMetrics(data);
    });

    socket.on("anomaly:new", (data) => {
      setAnomalies((prev) => [data, ...prev].slice(0, 50));
    });

    socket.on("event:new", (data) => {
      setEvents((prev) => [data, ...prev].slice(0, 20));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("metrics:update");
      socket.off("anomaly:new");
      socket.off("event:new");
    };
  }, []);

  return { metrics, anomalies, events, connected };
}
