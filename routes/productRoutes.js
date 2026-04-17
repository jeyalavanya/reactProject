// routes/productRoutes.js: Exposes product listing APIs.
// These endpoints allow clients to fetch all products or a single product by ID.
const express = require('express');
const Product = require('../models/Products');

const router = express.Router();

// GET /products
router.get('/products', async (req, res) => {
  try {
    // Fetch all products from the database.
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    // Return 500 if there is a server or database error.
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /products/:id
router.get('/products/:id', async (req, res) => {
  try {
    // Retrieve a single product by its MongoDB ID.
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    // If the ID format is invalid or a database error occurs, return 500.
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

module.exports = router;