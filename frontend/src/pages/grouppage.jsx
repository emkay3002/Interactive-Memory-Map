import React from "react";
import Navbar from "../components/navbar";
import GenNavbar from "../components/GenNavbar"
import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard"; // Import the Dashboard component
import "../stylesheets/GradientBackground.css"; // Ensure correct path
import "../stylesheets/groupPanel.css"; // Ensure correct path

const Grouppage = () => {
  return (
    <div className="homepage-container">
      <GenNavbar />
      

      <div className="content-container">
          {/* Left Sidebar */}
          
          <Dashboard />

          {/* Center Content (Dashboard) */}
          <Sidebar />
          
        </div>
      <div className="gradient-overlay">
        
      </div>
      

    </div>
    
  );
};

export default Grouppage;
