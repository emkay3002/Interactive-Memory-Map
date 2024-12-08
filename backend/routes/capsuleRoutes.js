const express = require("express");
const { createCapsule } = require("../controllers/capsuleController");
const router = express.Router();
const Capsule = require("../models/capsuleModel");

//capsule CREATION
router.post("/", (req, res) => {
  console.log("POST request to /api/capsules received"); // This log should appear when the route is hit
  createCapsule(req, res);
});
router.get("/", async (req, res) => {
    const groupId = req.query.group;
    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required." });
    }
    const capsules = await Capsule.find({ group: groupId });
    res.json({ capsules });
  });
  router.get("/", async (req, res) => {
    const groupId = req.query.group;
    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required." });
    }
    const capsules = await Capsule.find({ group: groupId });
    res.json({ capsules });
  });
module.exports = router;
