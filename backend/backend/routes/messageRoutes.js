const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
const { protect } = require("../midleware/authmiddleware");

const router = express.Router();

router.route("/send-message").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
