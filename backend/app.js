const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const capsuleRoutes = require("./routes/capsuleRoutes");
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

/*ROUTES*/
// app.use("/api", userRoutes);
// app.use("/api/admin", authMiddleware, adminOnly, adminRoutes);
// app.use("/api/user", authMiddleware, userRoutes);
app.use("/api", capsuleRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

module.exports = app;
