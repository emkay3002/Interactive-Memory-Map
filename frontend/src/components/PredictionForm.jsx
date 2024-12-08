import React, { useState } from "react";
import "../stylesheets/CapsuleForm.css"; // Import the CSS for form styling

const PredictionForm = ({ toggleForm }) => {
  const [predictionData, setPredictionData] = useState({
    title: "",
    description: "",
    predictedOutcome: "",
    predictionDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPredictionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(predictionData),
      });

      const result = await response.json();
      if (response.status === 201) {
        alert(result.message);
        toggleForm(); // Close the form after successful submission
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating prediction");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleForm();
    }
  };

  return (
    <div className="overlay-form" onClick={handleOverlayClick}>
      <div className="form-container">
        <h2 className="text-white text-2xl font-semibold mb-6">Create New Prediction</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Prediction Title */}
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="title" className="block text-white text-sm mb-2">
                Prediction Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Prediction Title"
                value={predictionData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-white text-sm mb-2">
                Prediction Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Prediction Description"
                value={predictionData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Predicted Outcome */}
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="predictedOutcome" className="block text-white text-sm mb-2">
                Predicted Outcome
              </label>
              <input
                type="text"
                id="predictedOutcome"
                name="predictedOutcome"
                placeholder="Enter Predicted Outcome"
                value={predictionData.predictedOutcome}
                onChange={handleChange}
                required
              />
            </div>

            {/* Prediction Date */}
            <div className="mb-4">
              <label htmlFor="predictionDate" className="block text-white text-sm mb-2">
                Prediction Date
              </label>
              <input
                type="datetime-local"
                id="predictionDate"
                name="predictionDate"
                value={predictionData.predictionDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-800 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleForm} // Close the form
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;
