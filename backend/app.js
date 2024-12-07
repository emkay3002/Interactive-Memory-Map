const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const capsuleRoutes = require("./routes/capsuleRoutes");
const { authMiddleware, adminOnly } = require("./middlewares/authMiddleware");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware setup
app.use(express.json());

app.use("/auth", authMiddleware, authRoutes);

module.exports = app;
