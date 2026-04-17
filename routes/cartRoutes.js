// routes/cartRoutes.js: Supports cart operations for authenticated users.
// Users can add products, update quantities, and remove items from their cart.
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Products');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /cart - Add product to cart
// Protected route that requires a valid JWT token.
router.post('/cart', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate required request fields.
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId and quantity are required' });
    }

    // Verify the selected product exists.
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock availability before adding to cart.
    if (quantity > product.stockQuantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    // If the user already has this product in their cart, increment quantity.
    const existingCartItem = await Cart.findOne({
      user: req.user.id,
      product: productId
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      return res.status(200).json({
        message: 'Cart updated successfully',
        cart: existingCartItem
      });
    }

    // Create a new cart item for the user.
    const cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity
    });

    res.status(201).json({
      message: 'Product added to cart successfully',
      cart: cartItem
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
});

// PUT /cart/:id - Update quantity
// Protected route that allows updating a cart item owned by the authenticated user.
router.put('/cart/:id', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    // Validate quantity input.
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    // Find the cart item and ensure it belongs to the current user.
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Confirm the referenced product still exists.
    const product = await Product.findById(cartItem.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure requested quantity does not exceed stock.
    if (quantity > product.stockQuantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: 'Cart item updated successfully',
      cart: cartItem
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item' });
  }
});

// DELETE /cart/:id - Remove item from cart
router.delete('/cart/:id', authMiddleware, async (req, res) => {
  try {
    // Ensure the cart item belongs to the authenticated user before deletion.
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      message: 'Cart item removed successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
});

module.exports = router;