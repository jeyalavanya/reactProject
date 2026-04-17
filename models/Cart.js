// models/Cart.js: Defines the Cart schema used to store user shopping cart items.
// Each cart item references a user and a product and tracks the quantity selected.
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);