const express = require("express");
const router = express.Router();
const {
  createShoppingList,
  getAllShoppingLists,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
  deleteItemFromShoppingList,
} = require("../controllers/shoppinglistController.js");
const { protect } = require("../midleware/authmiddleware.js");
router.post("/create-shoppinglist", protect, createShoppingList);
router.get("/get-shoppinglists", protect, getAllShoppingLists);
router.get("/get-byid/:id", protect, getShoppingListById);
router.put("/add-item", protect, updateShoppingList);
router.delete("/:id", protect, deleteShoppingList);
router.delete("/delete-item/:id", protect, deleteItemFromShoppingList);

module.exports = router;
