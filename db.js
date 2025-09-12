
const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB_URI = process.env.MONGODB_URI;

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDB_URI)
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error disconnecting from MongoDB:", err);
  }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB };