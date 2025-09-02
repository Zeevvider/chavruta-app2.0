// server.js
import express from "express";
import cors from "cors";
import { AccessToken } from "livekit-server-sdk";

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your API credentials
const apiKey = "APIwnvsMbWX5Ry9";
const apiSecret = "CYkmmGzCjJg0ZhDKvxe9qCwcrB7UGGq9A7yf5Zf2fwsD"; // paste from LiveKit

app.post("/get-token", (req, res) => {
  const { identity, roomName } = req.body;

  if (!identity || !roomName) {
    return res.status(400).json({ error: "identity and roomName required" });
  }

  const at = new AccessToken(apiKey, apiSecret, { identity });
  at.addGrant({ roomJoin: true, room: roomName });

  const token = at.toJwt();
  res.json({ token });
});

app.listen(3001, () => {
  console.log("🚀 LiveKit token server running at http://localhost:3001");
});
