const Prediction = require("../models/predictions");

const createPrediction = async (req, res) => {
  try {
    const { title, description, predictedOutcome, predictionDate } = req.body;

    const newPrediction = new Prediction({
      title,
      description,
      predictedOutcome,
      predictionDate,
    });

    await newPrediction.save();
    res.status(201).json({ message: "Prediction created successfully!", prediction: newPrediction });
  } catch (error) {
    res.status(500).json({ error: "Error creating prediction" });
  }
};

module.exports = { createPrediction };
