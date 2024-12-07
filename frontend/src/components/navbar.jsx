import React from "react";
import "../stylesheets/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Moo Deng</h1>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/capsules">Capsules</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
      <div className="auth-buttons">
        <a href="/register" className="btn-register">Register</a>
        <a href="/signin" className="btn-signin">Sign In</a>
      </div>
    </nav>
  );
};

export default Navbar;
