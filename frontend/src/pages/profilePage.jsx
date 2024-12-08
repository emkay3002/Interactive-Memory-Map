import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token
        const response = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
        setProfileVisibility(data.privacySettings?.profileVisibility || true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleVisibilityChange = async () => {
    const previousVisibility = profileVisibility; // Save the current state
    const newVisibility = !profileVisibility;
    setProfileVisibility(newVisibility);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({
          userId: user._id,
          profileVisibility: newVisibility,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update visibility");
      }

      alert("Profile visibility updated successfully");
    } catch (error) {
      console.error("Error updating profile visibility:", error);
      alert("Failed to update profile visibility");
      setProfileVisibility(previousVisibility); // Revert state on failure
    }
  };

  if (loading) {
    return (
      <div className="relative h-screen flex items-center justify-center homepage-container">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative h-screen flex items-center justify-center homepage-container">
        <p className="text-red-500 text-xl">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex items-center justify-center homepage-container">
      <div className="gradient-overlay"></div>

      {/* Profile Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Your Profile
        </h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src={user.profilePicture || "/default-profile.png"} // Fallback image
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-purple-500"
          />
        </div>

        {/* User Info */}
        <div className="text-white">
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-2">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg"
            />
          </div>

          {/* Password (Hidden in Asterisks) */}
          <div className="mb-4">
            <label className="block text-sm text-white mb-2">Password</label>
            <input
              type="password"
              value="********"
              disabled
              className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg"
            />
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Bio</label>
              <textarea
                value={user.bio}
                disabled
                className="w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg"
              ></textarea>
            </div>
          )}

          {/* Profile Visibility */}
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="profileVisibility" className="text-white text-sm">
              Profile Visibility
            </label>
            <input
              type="checkbox"
              id="profileVisibility"
              checked={profileVisibility}
              onChange={handleVisibilityChange}
              className="w-5 h-5"
            />
          </div>

          {/* Friends & Capsules */}
          <div className="mb-4">
            <p className="text-sm text-purple-400">
              <strong>Friends:</strong> {user.friends?.length || 0}
            </p>
            <p className="text-sm text-purple-400">
              <strong>Capsules:</strong> {user.capsules?.length || 0}
            </p>
          </div>

          {/* Role */}
          <p className="text-sm text-purple-400">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
