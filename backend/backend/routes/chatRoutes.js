const express = require("express");
const { protect } = require("../midleware/authmiddleware.js");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController.js");

const router = express.Router();
router.post("/access-chat", protect, accessChat);
router.get("/get-user-chat", protect, fetchChats);
router.post("/create-group-chat", protect, createGroupChat);
router.put("/remove-user-chat", protect, removeFromGroup);
router.put("/add-user-chat", protect, addToGroup);

module.exports = router;
