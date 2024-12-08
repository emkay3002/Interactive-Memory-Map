const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const capsuleRoutes = require("./routes/capsuleRoutes");
const { authMiddleware, adminOnly } = require("./middlewares/authMiddleware");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
//const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next(); // Continue processing the request
});
app.use("/auth",  authRoutes);
app.use("/api/capsules", capsuleRoutes);

// router.get("/capsules", (req, res) => {
//   res.json({ message: "GET request works!" });
// });

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
