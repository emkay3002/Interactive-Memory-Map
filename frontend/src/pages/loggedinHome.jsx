import React from "react";
import GenNavbar from "../components/GenNavbar";
import FloatingBox from "../components/FloatingBox"; // Import the FloatingBox component
import "../stylesheets/GradientBackground.css";
import "../stylesheets/FeatureSection.css"; // Import new CSS for the homepage

const LoggedIn = () => {
  return (
    <div className="homepage-container relative">
      <GenNavbar />
      <div className="gradient-overlay"></div>
      <FloatingBox />

      <div className="features-container">
        <h1 className="homepage-title">Discover the Magic of Memory Capsules</h1>
        <div className="features-grid">
          {/* Feature: User Registration */}
          <div className="feature-tile">
            <img
              src="https://via.placeholder.com/150"
              alt="User Registration"
              className="feature-image"
            />
            <h2>User Registration</h2>
            <p>Register with email or social login and manage your profile effortlessly.</p>
          </div>

          {/* Feature: Capsule Creation */}
          <div className="feature-tile">
            <img
              src="https://via.placeholder.com/150"
              alt="Capsule Creation"
              className="feature-image"
            />
            <h2>Capsule Creation</h2>
            <p>Craft personalized capsules with text, images, and videos.</p>
          </div>

          {/* Feature: Social Networking */}
          <div className="feature-tile">
            <img
              src="https://via.placeholder.com/150"
              alt="Social Networking"
              className="feature-image"
            />
            <h2>Social Networking</h2>
            <p>Connect with friends, join groups, and create shared memories.</p>
          </div>

          {/* Feature: Interactive Map */}
          <div className="feature-tile">
            <img
              src="https://via.placeholder.com/150"
              alt="Interactive Map"
              className="feature-image"
            />
            <h2>Interactive Map</h2>
            <p>Explore capsules around the globe with our memory map.</p>
          </div>

          {/* Feature: Notifications */}
          <div className="feature-tile">
            <img
              src="https://via.placeholder.com/150"
              alt="Notifications"
              className="feature-image"
            />
            <h2>Notifications</h2>
            <p>Stay updated with reminders for capsule unlocks and milestones.</p>
          </div>

          {/* Feature: Explore Public Capsules */}
          <div className="feature-tile">
            <img
              src="https://via.placeholder.com/150"
              alt="Explore Capsules"
              className="feature-image"
            />
            <h2>Explore Capsules</h2>
            <p>Discover public capsules and connect with shared interests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
