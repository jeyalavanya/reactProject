// server.js: Main API entry point for the ShoppyGlobe backend.
// It loads environment variables, establishes the MongoDB connection, and
// configures Express middleware and route modules for the API.
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Load environment variables from .env file.
dotenv.config();

// Connect to MongoDB before handling any requests.
connectDB();

const app = express();

// Enable Cross-Origin Resource Sharing for front-end requests.
app.use(cors());

// Parse incoming JSON request bodies.
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'ShoppyGlobe API is running' });
});

// Mount API route modules. Each module handles a set of related endpoints.
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);

// Invalid route handler: returns a 404 JSON response when no route matches.
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler: catches unexpected server errors and prevents crashes.
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});