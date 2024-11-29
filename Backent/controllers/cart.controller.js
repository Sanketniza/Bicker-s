const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

// Add Item to Cart
exports.addItemToCart = async(req, res) => {

    try {

        const { userId, productId, quantity } = req.body;

        // Validate input
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                totalPrice: 0
            });
        }

        // Check if the product is already in the cart
        const existingItem = cart.items.find((item) => item.productId.toString() === productId);

        if (existingItem) {
            // Update the quantity
            existingItem.quantity += quantity;
        } else {
            // Add the new product
            cart.items.push({ productId, quantity });
        }

        // Update the total price
        cart.totalPrice += product.price * quantity;

        // Save the cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Item added to cart.',
            cart
        });

    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
};

// Get Cart
exports.getCart = async(req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate('items.productId', 'title price images');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found.' });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};

// Remove Item from Cart
exports.removeItemFromCart = async(req, res) => {

    try {

        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found.'
            });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart.'
            });
        }

        // Update total price
        const removedItem = cart.items[itemIndex];
        const product = await Product.findById(productId);
        cart.totalPrice -= product.price * removedItem.quantity;

        // Remove the item
        cart.items.splice(itemIndex, 1);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Item removed from cart.',
            cart
        });

    } catch (error) {
        console.error('Error removing item from cart:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};

// Update Item Quantity
exports.updateItemQuantity = async(req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found.' });
        }

        const item = cart.items.find((item) => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Product not found in cart.' });
        }

        // Update the total price
        const product = await Product.findById(productId);
        cart.totalPrice += product.price * (quantity - item.quantity);

        // Update the quantity
        item.quantity = quantity;
        await cart.save();

        return res.status(200).json({ success: true, message: 'Item quantity updated.', cart });
    } catch (error) {
        console.error('Error updating item quantity:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
    }
};