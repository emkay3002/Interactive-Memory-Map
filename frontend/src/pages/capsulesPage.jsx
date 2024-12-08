import React, { useState } from "react";
import CapsuleForm from "../components/CapsuleForm"; // Import the CapsuleForm component
import GenNavbar from "../components/GenNavbar";
import "../stylesheets/GradientBackground.css";

const CapsulesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false); // To control form visibility
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    media: "",
    unlockDate: "",
    tags: "",
    isGroupCapsule: false,
    group: "",
    permissions: [],
  });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen); // Toggle the state to open/close the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to the backend
    try {
      const response = await fetch("http://localhost:3000/api/capsules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.status === 201) {
        alert(result.message);
        setIsFormOpen(false); // Close the form after successful submission
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating capsule");
    }
  };

  return (
    <div className="homepage-container">
      <GenNavbar />
      <div className="gradient-overlay"></div>

      {/* Capsules Grid */}
      <div className="capsules-container relative z-10 flex flex-wrap justify-center gap-8 p-8">
        {/* Add Capsule Tile as Button */}
        <div
          className="capsule-tile bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 backdrop-blur-md border border-white/30 rounded-lg p-6 shadow-lg hover:scale-105 transition-all duration-300 w-60 cursor-pointer"
          onClick={toggleForm} // Toggle form visibility on click
        >
          <h2 className="text-white text-xl font-semibold mb-4">Add New Capsule</h2>
          <p className="text-white text-sm">Click to create a new capsule.</p>
        </div>

        {/* Tiled Capsules */}
        <div className="capsule-tile bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-6 shadow-lg hover:scale-105 transition-all duration-300 w-60">
          <h2 className="text-white text-xl font-semibold mb-4">Capsule 1</h2>
          <p className="text-white text-sm">Description of Capsule 1</p>
        </div>
      </div>

      {/* Show the form if isFormOpen is true */}
      {isFormOpen && (
        <CapsuleForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          toggleForm={toggleForm}
        />
      )}
    </div>
  );
};

export default CapsulesPage;
