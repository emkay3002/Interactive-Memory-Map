const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { signup, login, createGroup,getUserGroups, saveRoles } = require("../controllers/authController");
const router = express.Router();



// In authRoutes.js
router.get("/user-groups", getUserGroups);
router.post("/signup", signup);
router.post("/login", login);
router.post("/create-group", createGroup);
router.put("/groups/:groupId/roles", saveRoles);

module.exports = router;
