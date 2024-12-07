import React from "react";
import Navbar from "../components/navbar";
import "../stylesheets/GradientBackground.css";
const Homepage = () => {
    return (
      <div className="homepage-container">
        <Navbar /> {}
        <div className="gradient-overlay">
          {}
        </div>
        <div className="content-container">
          <h1>Welcome to the Homepage!</h1>
          <p>Here is your homepage content.</p>
          {}
        </div>
      </div>
    );
  };
  
  export default Homepage;