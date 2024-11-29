const express = require('express');

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
} = require('../controllers/wishlist.controller');

const authenticate = require("../Middlewares/isAuthenticated");

const router = express.Router();

router.post('/add', authenticate, addToWishlist); // Add product
router.get('/', authenticate, getWishlist); // Get wishlist
router.delete('/remove', authenticate, removeFromWishlist); // Remove product
router.delete('/clear', authenticate, clearWishlist); // Clear wishlist

module.exports = router;