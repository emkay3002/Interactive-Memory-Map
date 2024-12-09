const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const {
  returnUser,
  updateUserProfile,
  changeUsername,
  upload,
} = require("../controllers/userController");
const router = express.Router();

// In authRoutes.js
router.get("/profile", returnUser);
router.put("/update", upload.single("profilePicture"), updateUserProfile);

module.exports = router;
