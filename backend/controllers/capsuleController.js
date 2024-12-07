const Capsule = require("../models/capsuleModel");
exports.createCapsule = async (req, res) => {
  try {
    const {
      title,
      content,
      media,
      creator,
      unlockDate,
      tags,
      isGroupCapsule,
      group,
      permissions,
    } = req.body;

    if (!title || !creator || !unlockDate) {
      return res
        .status(400)
        .json({ message: "Title, Creator, and Unlock Date are required." });
    }

    const creationDate = new Date();

    const newCapsule = new Capsule({
      title,
      content,
      media,
      creator,
      unlockDate,
      creationDate,
      tags,
      isGroupCapsule,
      group,
      permissions,
    });

    await newCapsule.save();
    res
      .status(201)
      .json({ message: "Capsule created successfully", capsule: newCapsule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
