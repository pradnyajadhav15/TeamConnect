import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
// import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/users.routes.js"; // ✅ Import routes

const app = express();
app.use(cors());
app.use(express.json({ limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended:true}));

// ✅ Use routes
app.use("/api/users", userRoutes);  



// Create HTTP server
const httpServer = createServer(app);

// Use dynamic port or fallback to 8000
const PORT = process.env.PORT || 8000;

// Setup socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins (change in production)
    methods: ["GET", "POST"],
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server + connect DB
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zoomcloneuser:zoomcloneuser123@cluster0.2pymycd.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("✅ MongoDB connected");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
};

start();
