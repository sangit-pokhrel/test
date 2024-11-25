const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controllers/contactController");

router.post("/create", createMessage);
router.get("/messages", getMessages);

module.exports = router; // Ensure `router` is exported here
