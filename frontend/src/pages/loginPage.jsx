import React, { useState } from "react";
import "../stylesheets/GradientBackground.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.success === false) {
        throw new Error("Login failed. Please check your credentials.");
      } else {
        alert("User logged in successfully!");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Redirect or store token as needed
      // For example:
      // localStorage.setItem("token", data.token);
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-[#0e0823]">
      {/* Gradient Overlay */}
      <div className="gradient-overlay"></div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Registration Prompt */}
        <p className="text-center text-sm text-white mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
