// models/Products.js: Defines the Product schema for product listing and stock.
// Each product includes a name, price, description, and available stock quantity.
// Timestamps are automatically saved for creation and updates.
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0 // Prevents storing negative stock levels.
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);