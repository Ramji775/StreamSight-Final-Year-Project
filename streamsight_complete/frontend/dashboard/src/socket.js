import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

const socket = io(SOCKET_URL, {
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
  transports: ["websocket"],
});

socket.on("connect", () => console.log("[Socket.IO] Connected:", socket.id));
socket.on("disconnect", () => console.log("[Socket.IO] Disconnected"));
socket.on("connect_error", (err) => console.warn("[Socket.IO] Error:", err.message));

export default socket;
