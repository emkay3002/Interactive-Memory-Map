import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute component checks if the user is authenticated
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check for the token in localStorage

  if (!isAuthenticated) {
    return <Navigate to="/" />; // If not authenticated, redirect to login page
  }

  return <Outlet />; // If authenticated, render the protected routes
};

export default PrivateRoute;
