const express = require("express");
const cors = require("cors");
const { authMiddleware, adminOnly } = require("./middlewares/authMiddleware");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

app.use("/auth",authMiddleware, authRoutes);

module.exports = app;
