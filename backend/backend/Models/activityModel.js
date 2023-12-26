const mongoose = require("mongoose");

const activityShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    location: { type: String },
    note: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activityShema);
module.exports = Activity;
