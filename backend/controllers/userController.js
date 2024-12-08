const User = require("../models/userModel");
const Capsule = require("../models/capsuleModel");
const bcrypt = require("bcrypt");

const returnUser = async (req, res) => {
  try {
    // Retrieve token from localStorage (on client side, you would send it via headers for security)
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    const userId = decoded.userId; // Assumes userId is in the token payload

    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user details
    res.json({ user });
  } catch (error) {
    console.error("Error decoding token or fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBio = async (req, res) => {
  const userId = req.user.userId;
  const username = req.user.username;
  const { bio } = req.body;

  try {
    const user = await User.find({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (bio.length > 100) {
      return res
        .status(400)
        .json({ message: "Bio cannot exceed 200 characters" });
    }
    if (bio.length < 1) {
      return res.status(400).json({ message: "Bio cannot be empty" });
    }
    user.bio = bio;
    await user.save(); // Save updated user
    res.json({ message: "Bio updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update bio", error });
  }
};

const changeUsername = async (req, res) => {
  const userId = req.user.userId;
  const username = req.user.username;
  const { newUsername } = req.body;

  try {
    const user = await User.find({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (newUsername.length > 20) {
      return res
        .status(400)
        .json({ message: "Username cannot exceed 20 characters" });
    }
    if (newUsername.length < 1) {
      return res.status(400).json({ message: "Username cannot be empty" });
    }
    //check if another person has the same username
    const usernameExists = await user.findOne({ newUsername });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    user.username = newUsername;
    await user.save(); // Save updated user
    res.json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change username", error });
  }
};

const updatePassword = async (req, res) => {
  const userId = req.user.userId;
  const username = req.user.username;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save(); // Save updated user
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update password", error });
  }
};

module.exports = { returnUser };
