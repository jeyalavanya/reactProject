// config/db.js: Connects the Express server to MongoDB using Mongoose.
// The MongoDB connection URI must be provided via the MONGO_URI environment variable.
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Stop the application if the database connection fails.
  }
};

module.exports = connectDB;