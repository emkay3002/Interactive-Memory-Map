import React from "react";
import "../stylesheets/GradientBackground.css"; // For the gradient background

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center gradient-background">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        </form>
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
