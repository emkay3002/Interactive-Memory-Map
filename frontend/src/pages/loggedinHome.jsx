import React from "react";
import GenNavbar from "../components/GenNavbar";
import FloatingBox from "../components/FloatingBox"; // Import the FloatingBox component
import "../stylesheets/GradientBackground.css";

const LoggedIn = () => {
  return (
    <div className="homepage-container relative">
      <GenNavbar />
      <div className="gradient-overlay"></div>
      <FloatingBox /> {/* Add the floating box */}
    </div>
  );
};

export default LoggedIn;
