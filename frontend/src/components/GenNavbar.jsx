import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import bellImage from "../images/bell-filled.png";
import messageImage from "../images/message-circle-filled.png";
import user from "../images/user.png";
import "../stylesheets/GenNavbar.css";

const GenNavbar = () => {
  // Check if the user is logged in (e.g., by checking localStorage for a token)
  const isAuthenticated = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={isAuthenticated ? "/loggedIn" : "/"}>
          {" "}
          {/* Conditionally navigate for logo */}
          <h1 className="logo-text">Moo Deng</h1>{" "}
          {/* Add a class for styling */}
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          {/* Conditionally navigate for Home link */}
          <Link to={isAuthenticated ? "/loggedIn" : "/"}>Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/capsules">Capsules</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          <Link to="/grouppage">Groups</Link>
        </li>
      </ul>
      <div className="nav-icons">
        {/* Logout Placeholder */}
        {isAuthenticated && (
          <div
            className="nav-icon"
            title="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            <img src={user} alt="Logout" className="nav-image" />
          </div>
        )}
        {/* Chat Placeholder */}
        <div className="nav-icon" title="Chat">
          <img src={messageImage} alt="Notification" className="nav-image" />
        </div>
        {/* Profile Placeholder */}
        <Link to="/profile">
          <div className="nav-icon" title="Profile">
            <img src={user} alt="user" className="nav-image" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default GenNavbar;
