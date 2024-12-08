import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../stylesheets/Navbar.css";

const Navbar = () => {
  // Check if the user is logged in (e.g., by checking localStorage for a token)
  const isAuthenticated = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={isAuthenticated ? "/loggedIn" : "/"}> {/* Conditionally navigate */}
          <h1 className="logo-text">Moo Deng</h1> {/* Add a class for styling */}
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
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
      </ul>
      <div className="auth-buttons">
        <Link to="/register" className="btn-register">
          Register
        </Link>
        <Link to="/signin" className="btn-signin">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
