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
      username: { $regex: query, $options: "i" }, // Case-insensitive search
      username: { $ne: requesterUsername }, // Exclude the requester
    }).select("username profilePicture"); // Only return relevant fields

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

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

    // Validate the required fields
    if (!requesterUsername || !recipientUsername) {
      return res
        .status(400)
        .json({ message: "Requester and recipient usernames are required" });
    }

    // Find the requester and recipient by username
    const requester = await User.findOne({ username: requesterUsername });
    const recipient = await User.findOne({ username: recipientUsername });

    // Check if the users exist
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

    // Check if they are already friends
    const existingFriendship = await Friendship.findOne({
      $or: [
        { requester: requester._id, recipient: recipient._id },
        { requester: recipient._id, recipient: requester._id },
      ],
    });

    if (existingFriendship) {
      return res.status(400).json({ message: "You are already friends" });
    }

    // Create a new friend request
    const friendship = new Friendship({
      requester: requester._id,
      recipient: recipient._id,
      status: "pending", // You can also add a status field for "accepted", "declined", etc.
    });

    await friendship.save();
    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending friend request" });
  }
});

// Accept or Reject Friend Request
router.post("/response", async (req, res) => {
  try {
    const { requesterUsername, recipientUsername, action } = req.body;

    // Validate the required fields and action
    if (!requesterUsername || !recipientUsername || !action) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (action !== "accept" && action !== "reject") {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Find the users involved in the friend request
    const requester = await User.findOne({ username: requesterUsername });
    const recipient = await User.findOne({ username: recipientUsername });

    if (!requester || !recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the friend request
    const friendship = await Friendship.findOne({
      requester: requester._id,
      recipient: recipient._id,
    });

    if (!friendship) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Update the friend request based on the action
    if (action === "accept") {
      friendship.status = "accepted";
    } else if (action === "reject") {
      friendship.status = "rejected";
    }

    await friendship.save();

    res.status(200).json({ message: `Friend request ${action}ed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error handling friend request response" });
  }
});

module.exports = router;
