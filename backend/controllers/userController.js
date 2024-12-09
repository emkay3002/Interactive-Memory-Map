const User = require("../models/userModel");
const Capsule = require("../models/capsuleModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

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

// const updateBio = async (req, res) => {
//   const { bio } = req.body;

//   try {
//     if (bio.length > 100) {
//       return res
//         .status(400)
//         .json({ message: "Bio cannot exceed 200 characters" });
//     }
//     if (bio.length < 1) {
//       return res.status(400).json({ message: "Bio cannot be empty" });
//     }
//     user.bio = bio;
//     await user.save(); // Save updated user
//     res.json({ message: "Bio updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update bio", error });
//   }
// };

// const updateEmail = async (req, res) => {
//   const { newEmail } = req.body;

//   const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   // Decode the token
//   const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
//   const userId = decoded.userId; // Assumes userId is in the token payload

//   if (newEmail === user.email) {
//     return res.status(400).json({ message: "Email is the same" });
//   }

//   try {
//     if (newEmail.length < 1) {
//       return res.status(400).json({ message: "Email cannot be empty" });
//     }
//     //check if another person has the same email
//     const emailExists = await user.findOne({ newEmail });
//     if (emailExists) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     user.email = newEmail;
//     await user.save(); // Save updated user
//     res.json({ message: "Email updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to change email", error });
//   }
// };

// const changeUsername = async (req, res) => {
//   const { newUsername } = req.body;

//   const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   // Decode the token
//   const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
//   const userId = decoded.userId; // Assumes userId is in the token payload

//   if (newUsername === user.username) {
//     return res.status(400).json({ message: "username is the same" });
//   }

//   try {
//     const user = await User.find({ username });
//     if (newUsername.length > 20) {
//       return res
//         .status(400)
//         .json({ message: "Username cannot exceed 20 characters" });
//     }
//     if (newUsername.length < 1) {
//       return res.status(400).json({ message: "Username cannot be empty" });
//     }
//     //check if another person has the same username
//     const usernameExists = await user.findOne({ newUsername });
//     if (usernameExists) {
//       return res.status(400).json({ message: "Username already exists" });
//     }
//     user.username = newUsername;
//     await user.save(); // Save updated user
//     res.json({ message: "Username updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to change username", error });
//   }
// };

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory for uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// Function to update profile
const updateUserProfile = async (req, res) => {
  try {
    // Retrieve token from headers
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract fields from request body
    const { username, email, bio } = req.body;

    // Update only the fields provided in the request
    if (username && username !== user.username) {
      if (username.length > 20 || username.length < 1) {
        return res
          .status(400)
          .json({ message: "Username must be between 1 and 20 characters" });
      }
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already exists" });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      if (!email.includes("@") || email.length < 1) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (bio && bio !== user.bio) {
      if (bio.length > 200 || bio.length < 1) {
        return res
          .status(400)
          .json({ message: "Bio must be between 1 and 200 characters" });
      }
      user.bio = bio;
    }

    // Update profile picture if provided
    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`;
    }

    // Save the updated user
    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error", error });
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

module.exports = {
  returnUser,
  updateUserProfile,
  upload,
  updatePassword,
};
