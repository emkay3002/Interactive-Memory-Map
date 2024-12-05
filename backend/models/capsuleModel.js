const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String }, //drive links idk how to upload images directly
    media: [{ type: String }], // URLs to uploaded media
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    unlockDate: { type: Date, required: true },
    creationDate: { type: Date, required: true },
    tags: [{ type: String }],
    isGroupCapsule: { type: Boolean, default: false },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // If group capsule
    permissions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        canEdit: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capsule", capsuleSchema);
