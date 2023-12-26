const expressAsyncHandler = require("express-async-handler");
const Activity = require("../Models/activityModel");
const User = require("../Models/userModel");

const addActivity = expressAsyncHandler(async (req, res) => {
  try {
    const { title, image, location, note } = req.body;

    const createdBy = req.user._id;

    const activity = new Activity({
      title,
      image,
      location,
      note,
      createdBy,
    });

    await activity.save();

    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateActivity = expressAsyncHandler(async (req, res) => {
  try {
    const { title, image, location, note, activityId } = req.body;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    if (activity.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this activity" });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { title, image, location, note },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteActivity = expressAsyncHandler(async (req, res) => {
  try {
    const { activityId } = req.params;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    if (activity.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this activity" });
    }

    await Activity.findByIdAndDelete(activityId);

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//vraca sve activity-e koje je kreirao odredjeni korisnik
const getAllActivities = expressAsyncHandler(async (req, res) => {
  try {
    // const activities = await Activity.find({}).populate("createdBy", "name");
    const activities = await Activity.find({});

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  addActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
};
