const express = require("express");
const router = express.Router();
const Friendship = require("../models/friendsModel");
const User = require("../models/userModel");

// Search Users by Username
router.get("/search", async (req, res) => {
  try {
    const { query, requesterUsername } = req.query;

    // Validate query and requesterUsername
    if (!query || !requesterUsername) {
      return res
        .status(400)
        .json({ message: "Query and requesterUsername are required" });
    }

    // Find users matching the query (exclude the requester)
    const users = await User.find({
      username: { $regex: query, $options: "i" },
      username: { $ne: requesterUsername }, // Exclude the requester
    }).select("username profilePicture");

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users" });
  }
});

// Send Friend Request by Username
router.post("/request", async (req, res) => {
  try {
    const { requesterUsername, recipientUsername } = req.body;

    // Validate usernames
    if (!requesterUsername || !recipientUsername) {
      return res
        .status(400)
        .json({ message: "Requester and recipient usernames are required" });
    }

    // Find the requester and recipient by username
    const requester = await User.findOne({ username: requesterUsername });
    const recipient = await User.findOne({ username: recipientUsername });

    if (!requester || !recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a friend request already exists
    const existingRequest = await Friendship.findOne({
      requester: requester._id,
      recipient: recipient._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create a new friend request
    const friendship = new Friendship({
      requester: requester._id,
      recipient: recipient._id,
    });

    await friendship.save();
    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending friend request" });
  }
});

module.exports = router;
