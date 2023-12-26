const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      isCompleted: { type: Boolean, default: false },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
