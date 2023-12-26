const express = require("express");
const {
  addActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
} = require("../controllers/activityController");
const { protect } = require("../midleware/authmiddleware.js");

const router = express.Router();

router.post("/add-activity", protect, addActivity);
router.put("/update-activity/", protect, updateActivity);
router.delete("/delete-activity/:activityId", protect, deleteActivity);
router.get("/all-activities", protect, getAllActivities);

module.exports = router;
