const express = require("express");
const { createCapsule } = require("../controllers/capsuleController");
const router = express.Router();

//capsule CREATION
router.post("/capsules", createCapsule);

module.exports = router;
