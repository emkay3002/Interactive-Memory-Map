const User = require("../models/userModel");
const Capsule = require("../models/capsuleModel");
const bcrypt = require("bcrypt");
const Group = require("../models/groupModel");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const mongoose = require("mongoose"); // Ensure mongoose is properly imported

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating user", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error logging in", error });
  }
};

const createGroup = async (req, res) => {
  const { emails, groupName } = req.body;
  let creatorId;

  // Verify JWT token
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      creatorId = decoded.userId;
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  try {
    // Split and trim emails
    const emailList = emails
      .split(/[\s,]+/)
      .map(email => email.trim())
      .filter(email => email !== "");

    // Find users by emails
    const users = await User.find({ email: { $in: emailList } });

    // Check if all emails correspond to existing users
    const existingEmails = users.map(user => user.email);
    const missingEmails = emailList.filter(email => !existingEmails.includes(email));
    if (missingEmails.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Users with the following emails not found: ${missingEmails.join(", ")}`,
      });
    }

    const memberIDs = [...new Set([...users.map(user => user._id), creatorId])];

    // Create a new group with the user IDs
    const group = new Group({
      name: groupName,
      creator: new mongoose.Types.ObjectId(creatorId), // Fix ObjectId usage
      members: memberIDs.map(userId => new mongoose.Types.ObjectId(userId)), // Fix ObjectId usage
      capsules: [],
      roles: []
    });
    await group.save();

    res.json({ success: true, message: "Group created successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating group", error });
  }
};

// In authController.js
const getUserGroups = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
      }
      const userId = user.userId;
      Group.find({ members: userId })
        .populate('members', 'username') // Populate members if needed
        
        .then(groups => {
          res.json({ success: true, groups });
        })
        .catch(error => {
          res.status(500).json({ success: false, message: "Error fetching groups", error });
        });
    });
  } else {
    res.status(401).json({ success: false, message: "Token missing" });
  }
};



const saveRoles = async (req, res) => {
  const { groupId } = req.params;
  const { roles } = req.body; // roles is an array of { user, role }

  // Verify JWT token
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Find the group
      const group = await Group.findById(groupId).populate("members");

      if (!group) {
        return res.status(404).json({ success: false, message: "Group not found" });
      }

      // Validate roles input
      const users = await User.find({ _id: { $in: roles.map((role) => role.user) } });

      // Check if all users exist
      const userIds = new Set(users.map((user) => user._id.toString()));
      for (const role of roles) {
        if (!userIds.has(role.user.toString())) {
          return res.status(400).json({ success: false, message: `User ${role.user} does not exist` });
        }
      }

      // Validate that all user IDs in roles are members of the group
      const memberIds = new Set(group.members.map((member) => member._id.toString()));
      for (const role of roles) {
        if (!memberIds.has(role.user.toString())) {
          return res.status(400).json({ success: false, message: `User ${role.user} is not a member of the group` });
        }
      }

      // Update the group's roles
      group.roles = roles.map((role) => ({
        user: new mongoose.Types.ObjectId(role.user), // Use 'new' here
        role: role.role,
      }));
      await group.save();

      res.json({ success: true, message: "Roles updated successfully", group });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating roles", error });
    }
  } else {
    res.status(401).json({ success: false, message: "Token missing" });
  }
};


module.exports = { signup, login, createGroup, getUserGroups, saveRoles };
