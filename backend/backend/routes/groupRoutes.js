const express = require("express");
const router = express.Router();
const {
  createGroup,
  addActivityToGroup,
  addTaskToGroup,
  getActivitiesFromGroup,
  getTasksFromGroup,
  addItemToShoppingListInGroup,
  getGroupIdByName,
} = require("../controllers/groupController");
const { protect } = require("../midleware/authmiddleware.js");

router.post("/create-group", protect, createGroup);
router.post("/add-activity-to-group", protect, addActivityToGroup);
router.post("/add-task-to-group", protect, addTaskToGroup);
router.get(
  "/get-activities-from-group/:groupId",
  protect,
  getActivitiesFromGroup
);
router.get("/get-todo-from-group/:groupId", protect, getTasksFromGroup);
router.post("/add-item-to-shoppinglist", protect, addItemToShoppingListInGroup);
router.get("/get-group-id-by-name/:groupName", protect, getGroupIdByName);

module.exports = router;
