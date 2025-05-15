const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");




// Create a new order
exports.createOrder = async(req, res) => {
    try {
        const { productId, shopOwnerId, message, name, email, phone } = req.body;
        const userId = req.user ? req.user.id : null;

        // Input validation
        if (!productId || !shopOwnerId) {
            return res.status(400).json({
                message: "Product ID and Shop Owner ID are required.",
                success: false,
            });
        }

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Name, email and phone are required.",
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

        // Create a new order/inquiry
        const order = await Order.create({
            userId: userId || shopOwnerId, // If user is not logged in, use shop owner as default
            productId,
            shopOwnerId,
            message: message || "",
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            orderType: 'contact' // Mark as contact inquiry
        });

        // Send notification to shop owner (can be implemented later)
        // TODO: Implement notification logic here

        return res.status(201).json({
            message: "Your inquiry has been sent to the seller.",
            success: true,
            order,
        });

    } catch (error) {
        console.error("Error in createOrder:", error.message);
        return res.status(500).json({
            message: "Failed to submit your inquiry. Please try again.",
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


exports.getOrdersByShopOwner = async(req, res) => {
    try {
        // console.log("Getting orders for shop owner ID:", req.user.id);
        
        const orders = await Order.find({ shopOwnerId: req.user.id })
            .populate({
                path: "productId",
                select: "title price location companyId",
                populate: {
                    path: "companyId",
                    select: "name logo"
                }
            })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        
        // console.log("Found orders:", orders.length);
        
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