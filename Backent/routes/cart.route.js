const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authenticate = require("../Middlewares/isAuthenticated");


// Routes
router.post('/add', authenticate, cartController.addItemToCart); // Add item to cart
router.get('/:userId', authenticate, cartController.getCart); // Get cart
router.put('/update', authenticate, cartController.updateItemQuantity); // Update item quantity
router.delete('/remove', authenticate, cartController.removeItemFromCart); // Remove item from cart

module.exports = router;