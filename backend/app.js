const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const path = require("path");
const capsuleRoutes = require("./routes/capsuleRoutes");
const { authMiddleware, adminOnly } = require("./middlewares/authMiddleware");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const predictionsRoute = require("./routes/predictionsRoute");

const userRoutes = require("./routes/userRoutes");

//const taskRoutes = require("./routes/tasks");
const friendshipRoutes = require("./routes/friendshipRoutes");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware setup
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next(); // Continue processing the request
});
app.use("/auth", authRoutes);
app.use("/api/capsules", capsuleRoutes);
app.use("/api/predictions", predictionsRoute);
app.use("/api", aiRoutes);
app.use("/user", userRoutes);

app.use("/api/friendships", friendshipRoutes);

// router.get("/capsules", (req, res) => {
//   res.json({ message: "GET request works!" });
// });

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
