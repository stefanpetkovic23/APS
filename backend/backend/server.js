const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const groupRoutes = require("./routes/groupRoutes");
const todoRoutes = require("./routes/todoRoutes");
const shoppingRoutes = require("./routes/shoppinglistRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is runnning sucessfuly");
});

app.use("/api/user", userRoutes);

app.use("/api/activity", activityRoutes);

app.use("/api/group", groupRoutes);

app.use("/api/todo", todoRoutes);

app.use("/api/shopping", shoppingRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on PORT ${PORT}`));
