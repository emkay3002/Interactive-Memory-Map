const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
const { authMiddleware, adminOnly } = require("./middlewares/authMiddleware");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const movieRoutes = require("./routes/movieRoutes");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
//app.use(morgan("dev"));

// app.use("/api", userRoutes);
// app.use("/api/admin", authMiddleware, adminOnly, adminRoutes);
// app.use("/api/user", authMiddleware, userRoutes);

module.exports = app;
