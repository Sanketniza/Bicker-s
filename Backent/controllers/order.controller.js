const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");


// Create a new order
exports.createOrder = async(req, res) => {
    try {
        const { productId, shopOwnerId, message } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!productId || !shopOwnerId) {
            return res.status(400).json({
                message: "Product ID and Shop Owner ID are required.",
                success: false,
            });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false,
            });
        }

        // Check if the product is active and in stock
        if (product.status !== "active" || product.stock <= 0) {
            return res.status(400).json({
                message: "Product is either inactive or out of stock.",
                success: false,
            });
        }

        // Check if the user already placed an order for the same product
        const existingOrder = await Order.findOne({
            userId: req.user.id,
            productId: productId,
        });

        if (existingOrder) {
            return res.status(400).json({
                message: "You have already placed an order for this product.",
                success: false,
            });
        }

        // Create a new order
        const order = await Order.create({
            userId,
            productId,
            shopOwnerId,
            message: message || "",
        });

        // Reduce the product stock by 1
        product.stock -= 1;
        await product.save();

        return res.status(201).json({
            message: "Order created successfully.",
            success: true,
            order,
        });

    } catch (error) {
        console.error("Error in createOrder:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};


// Get orders by user
exports.getOrdersByUser = async(req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate("productId", "title price location")
            .populate("shopOwnerId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Orders fetched successfully.",
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Error in getOrdersByUser:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Get orders by shop owner
exports.getOrdersByShopOwner = async(req, res) => {
    try {
        const orders = await Order.find({ shopOwnerId: req.user.id })
            .populate("productId", "title price location")
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Orders fetched successfully.",
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Error in getOrdersByShopOwner:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Update order status
exports.updateOrderStatus = async(req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["pending", "approved", "rejected", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status value.",
                success: false,
            });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
                success: false,
            });
        }

        // Validate ownership
        if (order.shopOwnerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! Only the shop owner can update the order status.",
                success: false,
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            message: "Order status updated successfully.",
            success: true,
            order,
        });

    } catch (error) {
        console.error("Error in updateOrderStatus:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Delete order
exports.deleteOrder = async(req, res) => {
    try {
        const { orderId } = req.params;

        // Validate if orderId is provided
        if (!orderId) {
            return res.status(400).json({
                message: "Order ID is required.",
                success: false,
            });
        }

        // Find the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
                success: false,
            });
        }

        // Validate if the user has permission to delete (only the user who created the order or the shop owner)
        if (
            order.userId.toString() !== req.user.id &&
            order.shopOwnerId.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You are not authorized to delete this order.",
                success: false,
            });
        }

        // Delete the order
        await Order.findByIdAndDelete(orderId);

        return res.status(200).json({
            message: "Order deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in deleteOrder:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};