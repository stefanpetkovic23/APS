const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  logoutUser,
  getUserIdByEmail,
} = require("../controllers/userController");
const { protect } = require("../midleware/authmiddleware.js");

const router = express.Router();

router.route("/").post(registerUser).get(allUsers);
router.post("/login", authUser);
router.route("/logout").post(logoutUser);
router.get("/getuseridbyemail/:email", protect, getUserIdByEmail);

module.exports = router;
