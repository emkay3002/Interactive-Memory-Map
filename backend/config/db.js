const mongoose = require("mongoose");

require("dotenv").config({ path: ".env.local" });

const User = require("../models/userModel");
const Capsule = require("../models/capsuleModel");
const Friendship = require("../models/friendsModel");
const Group = require("../models/groupModel");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Initialize models to ensure collections are created if they don't exist
    await Promise.all([
      User.init(),
      Capsule.init(),
      Friendship.init(),
      Group.init(),
    ]);

    console.log("Collections are set up");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process with failure if DB connection fails
  }
};

// Export DB connection and models
module.exports = {
  connectDB,
  User,
  Capsule,
  Friendship,
  Group,
};
