import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import FriendSearch from "../components/FriendSearch";
import GenNavbar from "../components/GenNavbar";
import "../stylesheets/GradientBackground.css";

const FriendsPage = ({ currentUserId }) => {
  const [currentUserUsername, setCurrentUserUsername] = useState(null);

  // Fetch current user data on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.username) {
          setCurrentUserUsername(decodedToken.username);
        } else {
          console.error("No username found in token");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, [currentUserId]);

  return (
    <div className="homepage-container">
      <GenNavbar />
      <h1>Friends Page</h1>

      <div className="gradient-overlay"></div>

      <div className="friend-search-container">
        {currentUserUsername ? (
          <FriendSearch currentUserUsername={currentUserUsername} />
        ) : (
          <p>Please log in to search for and add friends.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
