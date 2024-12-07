import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Dashboard from "../components/dashboard"; // Import the Dashboard component
import "../stylesheets/GradientBackground.css"; // Ensure correct path
import "../stylesheets/groupPanel.css"; // Ensure correct path

const Grouppage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      

      <div className="content-container">
          {/* Left Sidebar */}
          
          <Dashboard />

          {/* Center Content (Dashboard) */}
          <Sidebar />
          
        </div>
      <div className="gradient-overlay">
        
      </div>
      <img 
        id="image" 
        src="https://img.icons8.com/?size=100&id=Aim4pBWMKPgj&format=png&color=7950F2" 
        style={{ width: '100px', height: '100px', margin: '50px' }} 
        alt="Icon" 
        />

    </div>
    
  );
};

export default Grouppage;
