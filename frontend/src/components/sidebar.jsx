import React, { useState } from "react";
import "../stylesheets/sidebar.css";
import "../stylesheets/Modal.css";


const Sidebar = () => {
  const [emails, setEmails] = useState("");
  const [groupName, setGroupName] = useState(""); // New state for group name
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU0YzYzNThkY2IyOGE5NjI4NmJhYTkiLCJ1c2VybmFtZSI6ImFuYXMiLCJyb2xlIjoiVXNlciIsImlhdCI6MTczMzY1MTIxNSwiZXhwIjoxNzMzNjU0ODE1fQ.cCIVNEPfhQWo7qDU0Njek3CPJqDWc-ufDBovefKRXoA"
      const response = await fetch("http://localhost:3000/auth/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ emails, groupName })
      });
      const data = await response.json();
      if (data.success) {
        alert("Group created successfully.");
        setIsModalOpen(false); // Close modal after successful creation
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating group. Please try again.");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Group Options</h2>
      </div>
      <div className="sidebar-links">
        <button className="sidebar-btn" onClick={() => setIsModalOpen(true)}>Group Creation</button>
        <button className="sidebar-btn">Shared Capsules</button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
            <h3>Create Group</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
              <textarea
                placeholder="Enter emails separated by commas"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                required
              />
              <button type="submit" className="sidebar-btn">Create Group</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
