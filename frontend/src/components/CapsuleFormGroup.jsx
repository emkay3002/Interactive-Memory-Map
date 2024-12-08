import React, { useState } from "react";
import "../stylesheets/CapsuleForm.css"; // Import the CSS for form styling

const CapsuleForm = ({ formData, setFormData, handleSubmit, toggleForm, group }) => {
  const [loading, setLoading] = useState(false); // For managing loading state
  const [error, setError] = useState(null); // For error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const capsuleData = {
      title: formData.title,
      content: formData.content,
      media: formData.media.split(',').map((url) => url.trim()),
      creator: '675413177a9251ed80177a71', // Replace with actual user ID
      unlockDate: formData.unlockDate,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      isGroupCapsule: formData.isGroupCapsule,
      group: group,
      permissions: formData.permissions,
    };

    try {
      const response = await fetch('http://localhost:3000/api/capsules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(capsuleData),
      });

      if (!response.ok) {
        throw new Error('Failed to create capsule');
      }

      const data = await response.json();
      console.log('Capsule created successfully:', data);
      alert('Capsule created successfully!');
      toggleForm();
    } catch (error) {
      console.error('Error creating capsule:', error);
      setError('Error creating capsule');
    } finally {
      setLoading(false);
    }
  };

  // Close the form if clicked outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleForm();
    }
  };

  return (
    <div className="overlay-form" onClick={handleOverlayClick}>
      <div className="form-container">
        <h2 className="text-white text-2xl font-semibold mb-6">Create New Capsule</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Capsule Title */}
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="title" className="block text-white text-sm mb-2">
                Capsule Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Capsule Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Capsule Content */}
            <div className="mb-4">
              <label htmlFor="content" className="block text-white text-sm mb-2">
                Capsule Content (Drive Links)
              </label>
              <input
                type="text"
                id="content"
                name="content"
                placeholder="Enter Capsule Content (e.g., Google Drive link)"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Media URLs */}
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="media" className="block text-white text-sm mb-2">
                Media URLs (comma-separated)
              </label>
              <input
                type="text"
                id="media"
                name="media"
                placeholder="Enter Media URLs (comma separated)"
                value={formData.media}
                onChange={handleChange}
                required
              />
            </div>

            {/* Unlock Date */}
            <div className="mb-4">
              <label htmlFor="unlockDate" className="block text-white text-sm mb-2">
                Unlock Date
              </label>
              <input
                type="datetime-local"
                id="unlockDate"
                name="unlockDate"
                value={formData.unlockDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div className="form-group">
            <div className="mb-4">
              <label htmlFor="tags" className="block text-white text-sm mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Enter Tags"
                value={formData.tags}
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
              disabled={loading} // Disable button when loading
            >
              {loading ? "Creating..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={toggleForm} // Close the form
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-800 transition"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default CapsuleForm;
