const expressAsyncHandler = require("express-async-handler");
const Group = require("../Models/groupModel");
const Activity = require("../Models/activityModel");
const Todo = require("../Models/todoModel");
const ShoppingList = require("../Models/shoppinglistModel");

const createGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { name, users } = req.body;

    if (!users || users.length < 2) {
      res
        .status(400)
        .json({ error: "At least two users are required for a group" });
      return;
    }

    const createdBy = req.user._id;

    const newGroup = new Group({
      name,
      users: [createdBy, ...users],
      activities: [],
      tasks: [],
    });

    await newGroup.save();

    const shoppingList = new ShoppingList({
      name: `${newGroup.name}'s Shopping List`,
      createdBy: req.user._id,
    });

    await shoppingList.save();

    newGroup.shoppingList = shoppingList._id;

    await newGroup.save();

    res.status(201).json(newGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const addActivityToGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { groupId, activityDetails } = req.body;
    const createdBy = req.user._id;
    // Find the group
    const group = await Group.findById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    if (!group.users.includes(createdBy)) {
      res.status(403).json({ error: "User is not a member of the group" });
      return;
    }

    const newActivity = new Activity({
      ...activityDetails,
      createdBy,
    });

    await newActivity.save();

    group.activities.push({ activity: newActivity._id, createdBy });
    await group.save();

    res.json({ group, activity: newActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const addTaskToGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { groupId, taskDetails } = req.body;
    const createdBy = req.user._id;
    // Find the group
    const group = await Group.findById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    if (!group.users.includes(createdBy)) {
      res.status(403).json({ error: "User is not a member of the group" });
      return;
    }

    const newTask = new Todo({
      ...taskDetails,
      createdBy,
    });

    // Save the task
    await newTask.save();

    group.tasks.push({ task: newTask._id, createdBy });
    await group.save();

    res.json({ group, task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getActivitiesFromGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    await group.populate("activities.activity");

    res.json({ activities: group.activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const getTasksFromGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    const validTasks = group.tasks.filter((task) => task);

    await Group.populate(validTasks, {
      path: "task",
    });

    res.json({ tasks: validTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const addItemToShoppingListInGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { groupId, itemName, quantity, isCompleted } = req.body;
    const createdBy = req.user._id;

    // Find the group
    const group = await Group.findById(groupId);

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    if (!group.users.includes(createdBy)) {
      res.status(403).json({ error: "User is not a member of the group" });
      return;
    }

    const shoppingList = await ShoppingList.findById(group.shoppingList);

    if (!shoppingList) {
      res.status(404).json({ error: "Shopping List not found in the group" });
      return;
    }

    const newItem = {
      name: itemName,
      quantity: quantity || 1,
      isCompleted: isCompleted || false,
    };

    shoppingList.items.push(newItem);
    await shoppingList.save();

    res.json({ group, shoppingList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const getGroupIdByName = expressAsyncHandler(async (req, res) => {
  try {
    const { groupName } = req.params;

    // Pronađi grupu na osnovu imena
    const group = await Group.findOne({ name: groupName });

    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    res.json({ groupId: group._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  createGroup,
  addActivityToGroup,
  addTaskToGroup,
  getActivitiesFromGroup,
  getTasksFromGroup,
  addItemToShoppingListInGroup,
  getGroupIdByName,
};
