const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const predictionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    predictedOutcome: { type: String },
    predictionDate: { type: Date, required: true },
    predictionId: { type: String, unique: true, default: uuidv4 }, // Generate unique ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
