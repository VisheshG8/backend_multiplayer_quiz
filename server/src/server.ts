import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import { initializeSocket } from "./socket/socket";
import { JWT_SECRET } from "./config/config";
import { logRequests } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import connectDB from "./config/db";

// Check for JWT_SECRET
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1); // Exit if JWT_SECRET is not set
}

connectDB();

const app = express();

app.use(logRequests);
app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

// Health check route
app.get("/", (_req, res) => res.status(200).send("OK"));

app.use(errorHandler);

const server = app.listen(5000, () => {
  console.log("Server running on port 5000");
});

initializeSocket(server);
