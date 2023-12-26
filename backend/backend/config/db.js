const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://petkovicstefan36:IDRDEVZUJ9nnkeGd@cluster0.mprcyrw.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
