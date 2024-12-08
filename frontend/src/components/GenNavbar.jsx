import React from "react";
import bellImage from "../images/bell-filled.png";
import messageImage from "../images/message-circle-filled.png";
import user from "../images/user.png";
import "../stylesheets/GenNavbar.css";
const GenNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Moo Deng</h1>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/capsules">Capsules</a>
        </li>
        <li>
          <a href="/friends">Friends</a>
        </li>
      </ul>
      <div className="nav-icons">
        {/* Notification Placeholder */}
        <div className="nav-icon" title="Notifications">
        <img src={bellImage} alt="Notification" className="nav-image" />
        </div>
        {/* Chat Placeholder */}
        <div className="nav-icon" title="Chat">
        <img src={messageImage} alt="Notification" className="nav-image" />
        </div>
        {/* Profile Placeholder */}
        <div className="nav-icon" title="Profile">
        <img src={user} alt="user" className="nav-image" />
        </div>
      </div>
    </nav>
  );
};

export default GenNavbar;
