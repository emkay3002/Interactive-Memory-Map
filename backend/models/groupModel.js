const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    capsules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capsule" }],
    roles: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["Admin", "Member"], default: "Member" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
