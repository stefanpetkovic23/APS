const expressAsyncHandler = require("express-async-handler");
const ShoppingList = require("../Models/shoppinglistModel");

// Create a new shopping list
const createShoppingList = expressAsyncHandler(async (req, res) => {
  try {
    const { name, items } = req.body;
    const createdBy = req.user._id;

    const shoppingList = new ShoppingList({
      name,
      items,
      createdBy,
    });

    await shoppingList.save();

    res.status(201).json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all shopping lists for a user
const getAllShoppingLists = expressAsyncHandler(async (req, res) => {
  try {
    const createdBy = req.user._id;

    const shoppingLists = await ShoppingList.find({ createdBy });

    res.json(shoppingLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single shopping list by ID
const getShoppingListById = expressAsyncHandler(async (req, res) => {
  try {
    const shoppingListId = req.params.id;

    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      res.status(404).json({ error: "Shopping List not found" });
      return;
    }

    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a shopping list by ID
const updateShoppingList = expressAsyncHandler(async (req, res) => {
  try {
    const { name, quantity, isCompleted, shoppingListId } = req.body;

    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      res.status(404).json({ error: "Shopping List not found" });
      return;
    }

    const newItem = {
      name,
      quantity: quantity || 1,
      isCompleted: isCompleted || false,
    };

    shoppingList.items.push(newItem);

    await shoppingList.save();

    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a shopping list by ID
const deleteShoppingList = expressAsyncHandler(async (req, res) => {
  try {
    const shoppingListId = req.params.id;

    const shoppingList = await ShoppingList.findById(shoppingListId);

    if (!shoppingList) {
      res.status(404).json({ error: "Shopping List not found" });
      return;
    }

    await shoppingList.remove();

    res.json({ message: "Shopping List deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const deleteItemFromShoppingList = expressAsyncHandler(async (req, res) => {
  try {
    const shoppingListId = req.params.id;
    const { itemIdToDelete } = req.body;

    const shoppingList = await ShoppingList.findById(shoppingListId);
    console.log("Shopping List ID:", shoppingListId);
    console.log("Item ID to delete:", itemIdToDelete);

    if (!shoppingList) {
      res.status(404).json({ error: "Shopping List not found" });
      return;
    }

    const itemIndex = shoppingList.items.findIndex(
      (item) => item._id.toString() === itemIdToDelete
    );

    if (itemIndex === -1) {
      res.status(404).json({ error: "Item not found in the shopping list" });
      return;
    }

    shoppingList.items.splice(itemIndex, 1);

    await shoppingList.save();

    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  createShoppingList,
  getAllShoppingLists,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
  deleteItemFromShoppingList,
};
