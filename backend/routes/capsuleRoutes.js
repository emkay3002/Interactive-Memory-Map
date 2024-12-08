const express = require("express");
const { createCapsule } = require("../controllers/capsuleController");
const router = express.Router();

//capsule CREATION
router.post("/", (req, res) => {
  console.log("POST request to /api/capsules received"); // This log should appear when the route is hit
  createCapsule(req, res);
});

module.exports = router;
