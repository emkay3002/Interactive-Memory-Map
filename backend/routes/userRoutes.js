const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { returnUser } = require("../controllers/userController");
const router = express.Router();

// In authRoutes.js
router.get("/profile", returnUser);

module.exports = router;
