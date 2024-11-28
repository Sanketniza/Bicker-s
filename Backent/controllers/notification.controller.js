const Notification = require('../models/notification.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// Create Notification
exports.createNotification = async(req, res) => {
    try {
        const { userId, shopOwnerId, productId, title, message, type = 'general' } = req.body;

        // Validate required fields
        if (!userId || !message) {
            return res.status(400).json({
                success: false,
                message: "userId and message are required.",
            });
        }

        // Check if productId exists and get the product details
        let product = null;
        if (productId) {
            product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({
                    message: "Product not found.",
                    success: false,
                });
            }
        }

        // Check if shopOwnerId matches the product's owner (ownerId in Product)
        if (product && shopOwnerId) {
            if (!product.shopOwnerId) { // Change shopOwnerId to ownerId if your schema defines that way
                return res.status(400).json({
                    message: "Product does not have an ownerId.",
                    success: false,
                });
            }
            if (product.shopOwnerId.toString() !== shopOwnerId.toString()) {
                return res.status(403).json({
                    message: "Only the shop owner of this product can send notifications.",
                    success: false,
                });
            }
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        // Create the notification
        const notification = await Notification.create({
            userId,
            shopOwnerId: shopOwnerId || null,
            productId: productId || null,
            title,
            message,
            type
        });

        // Fetch the created notification with populated fields
        const populatedNotification = await Notification.findById(notification._id)
            .populate('productId', 'title price images')
            .populate('shopOwnerId', 'fullname email companyName');

        return res.status(201).json({
            success: true,
            message: "Notification created successfully.",
            notification: {
                _id: populatedNotification._id,
                userId: populatedNotification.userId,
                shopOwnerId: populatedNotification.shopOwnerId ? populatedNotification.shopOwnerId._id || populatedNotification.shopOwnerId : null,
                productId: populatedNotification.productId ? populatedNotification.productId._id || populatedNotification.productId : null,
                title: populatedNotification.title,
                message: populatedNotification.message,
                type: populatedNotification.type,
                isRead: populatedNotification.isRead,
                createdAt: populatedNotification.createdAt,
                updatedAt: populatedNotification.updatedAt
            }
        });

    } catch (error) {
        console.error("Error creating notification:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};


// Get All Notifications with Pagination
exports.getAllNotifications = async(req, res) => {
    try {
        const { userId } = req.user; // Ensure that userId is available in req.user (check authentication)
        const { page = 1, limit = 10 } = req.query;

        const notifications = await Notification.find({ userId })
            .populate('productId', 'title price images')
            .populate('shopOwnerId', 'fullname email companyName')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        return res.status(200).json({
            success: true,
            message: "Notifications retrieved successfully.",
            notifications: notifications.map(notification => ({
                _id: notification._id,
                userId: notification.userId,
                message: notification.message,
                productId: notification.productId ? notification.productId._id || notification.productId : null,
                shopOwnerId: notification.shopOwnerId ? notification.shopOwnerId._id || notification.shopOwnerId : null,
                type: notification.type,
                isRead: notification.isRead,
                createdAt: notification.createdAt,
                updatedAt: notification.updatedAt
            }))
        });

    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};



// Update Notification (Mark as Read)
// Update Notification (Mark as Read)
exports.updateNotification = async(req, res) => {
    try {
        const { notificationId } = req.params;
        const { isRead } = req.body;

        // Check if 'isRead' is provided in the request body
        if (isRead === undefined) {
            return res.status(400).json({
                success: false,
                message: "'isRead' field is required.",
            });
        }

        // Fetch the notification by ID
        const notification = await Notification.findById(notificationId)
            .populate('productId', 'title price images')
            .populate('shopOwnerId', 'fullname email companyName');

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found.",
                success: false,
            });
        }

        // Update the 'isRead' status
        notification.isRead = isRead;
        await notification.save();

        // Return the updated notification
        return res.status(200).json({
            success: true,
            message: "Notification updated successfully.",
            notification: {
                _id: notification._id,
                userId: notification.userId,
                shopOwnerId: notification.shopOwnerId ? notification.shopOwnerId._id || notification.shopOwnerId : null,
                productId: notification.productId ? notification.productId._id || notification.productId : null,
                title: notification.title,
                message: notification.message,
                type: notification.type,
                isRead: notification.isRead, // Updated field
                createdAt: notification.createdAt,
                updatedAt: notification.updatedAt
            }
        });

    } catch (error) {
        console.error("Error updating notification:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};



// Delete Notification
exports.deleteNotification = async(req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({
                message: "Notification not found.",
                success: false,
            });
        }

        await notification.deleteOne();

        return res.status(200).json({
            message: "Notification deleted successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Error deleting notification:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};