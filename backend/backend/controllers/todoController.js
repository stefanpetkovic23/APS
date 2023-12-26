const expressAsyncHandler = require("express-async-handler");
const TodoTask = require("../Models/todoModel");

// Add a new Todo Task
const addTask = expressAsyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const createdBy = req.user && req.user._id ? req.user._id : null;

    const newTask = new TodoTask({
      title,
      description,
      dueDate,
      createdBy,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Todo Task
const updateTask = expressAsyncHandler(async (req, res) => {
  try {
    const { taskId, title, description, dueDate, completed } = req.body;

    const task = await TodoTask.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Todo Task
const deleteTask = expressAsyncHandler(async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await TodoTask.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await TodoTask.findByIdAndDelete(taskId);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const getAllTasksForUser = expressAsyncHandler(async (req, res) => {
  try {
    const currentUserID = req.user && req.user._id;

    if (!currentUserID) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userTasks = await TodoTask.find({ createdBy: currentUserID });

    res.json(userTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { addTask, updateTask, deleteTask, getAllTasksForUser };
