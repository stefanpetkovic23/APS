const express = require("express");
const router = express.Router();
const {
  addTask,
  updateTask,
  deleteTask,
  getAllTasksForUser,
} = require("../controllers/todoController");
const { protect } = require("../midleware/authmiddleware.js");

router.post("/add-task", protect, addTask);
router.put("/update-task", protect, updateTask);
router.delete("/delete-task/:taskId", protect, deleteTask);
router.get("/get-all-tasks", protect, getAllTasksForUser);

module.exports = router;
