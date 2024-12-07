import React from "react";
import "../stylesheets/sidebar.css"; // Make sure the path is correct

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Group Options</h2>
      </div>
      <div className="sidebar-links">
        <button className="sidebar-btn">Group Creation</button>
        <button className="sidebar-btn">Shared Capsules</button>
      </div>
    </div>
  );
};

export default Sidebar;
