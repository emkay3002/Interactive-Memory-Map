const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    capsules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capsule" }],
    privacySettings: {
      profileVisibility: { type: Boolean, default: true },
      capsuleVisibility: { type: Boolean, default: true },
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
