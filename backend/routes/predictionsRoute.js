const express = require("express");
const { createPrediction } = require("../controllers/predictionController");
const router = express.Router();

// Prediction Creation
router.post("/", (req, res) => {
  console.log("POST request to /api/predictions received"); // Log for debugging
  createPrediction(req, res);
});

module.exports = router;
