import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import GenNavbar from "../components/GenNavbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileVisibility, setProfileVisibility] = useState(true); // State for profileVisibility

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user);
        setFormData({
          username: data.user.username || "",
          email: data.user.email || "",
          bio: data.user.bio || "",
        });
        setProfileVisibility(data.user.privacySettings.profileVisibility); // Set initial visibility state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Save the selected file
  };

  const handleVisibilityToggle = () => {
    setProfileVisibility(!profileVisibility); // Toggle profile visibility
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      // Add form fields to FormData
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("bio", formData.bio);
      data.append("profileVisibility", profileVisibility); // Add profileVisibility to the form data

      // Add profile picture if provided
      if (profilePicture) {
        data.append("profilePicture", profilePicture);
      }

      const response = await fetch("http://localhost:3000/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data, // Send FormData
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <>
        {" "}
        <GenNavbar />
        <div className="relative h-screen flex items-center justify-center bg-[#0e0823]">
          <p className="text-white text-xl">Loading...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <GenNavbar />
        <div className="relative h-screen flex items-center justify-center bg-[#0e0823]">
          <p className="text-red-500 text-xl">Failed to load profile</p>
        </div>
      </>
    );
  }

  return (
    <>
      <GenNavbar />
      <div className="relative h-screen flex items-center justify-center bg-[#0e0823]">
        <div className="gradient-overlay"></div>

        {/* Profile Card */}
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold text-white text-center mb-6">
            Your Profile
          </h1>

          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <img
              src={
                `http://localhost:3000${user.profilePicture}` ||
                "/default-profile.png"
              } // Fallback image
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-purple-500"
            />
          </div>

          {/* File Upload */}
          {editing && (
            <div className="mb-4">
              <label className="block text-sm text-white mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 text-sm text-white bg-transparent border border-white/40 rounded-lg"
              />
            </div>
          )}

          {/* User Info */}
          <div className="text-white">
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg ${
                  editing ? "bg-white/10" : ""
                }`}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg ${
                  editing ? "bg-white/10" : ""
                }`}
              />
            </div>

            {/* Bio */}
            <div className="mb-4">
              <label className="block text-sm text-white mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-3 text-sm text-white bg-transparent border border-white/40 rounded-lg ${
                  editing ? "bg-white/10" : ""
                }`}
              ></textarea>
            </div>

            {/* Profile Visibility Toggle */}
            <div className="mb-4 flex items-center">
              <label className="text-sm text-white mr-2">
                Profile Visibility
              </label>
              <input
                type="checkbox"
                checked={profileVisibility}
                onChange={handleVisibilityToggle}
                disabled={!editing} // Disable toggle when not editing
                className="w-4 h-4 text-purple-500"
              />
            </div>

            {/* Edit and Save Buttons */}
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
