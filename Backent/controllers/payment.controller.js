const Transaction = require("../models/payment.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

// Create Transaction
exports.createTransaction = async(req, res) => {
    try {
        const { orderId, amount, paymentMethod, paymentDetails } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!orderId || !amount || !paymentMethod) {
            return res.status(400).json({
                message: "Order ID, amount, and payment method are required.",
                success: false,
            });
        }

        // Validate amount is positive number
        if (amount <= 0 || !Number.isFinite(amount)) {
            return res.status(400).json({
                message: "Amount must be a positive number.",
                success: false,
            });
        }

        // Validate payment method
        const validMethods = ['upi', 'credit_card', 'debit_card', 'net_banking'];
        if (!validMethods.includes(paymentMethod)) {
            return res.status(400).json({
                message: "Invalid payment method.",
                success: false,
            });
        }

        // Fetch order details with populated shopOwner
        // const order = await Order.findById(orderId).populate('productId');
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
                success: false,
            });
        }

        // Check if order already has a transaction
        const existingTransaction = await Transaction.findOne({ orderId });
        if (existingTransaction) {
            return res.status(400).json({
                message: "A transaction already exists for this order.",
                success: false,
            });
        }

        // Check order status
        if (order.status !== 'pending') {
            return res.status(400).json({
                message: "This order is not available for payment.",
                success: false,
            });
        }

        // Fetch product details
        const product = order.productId; // Assuming `productId` is populated and contains the product details
        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                success: false,
            });
        }

        // Ensure user is the same as the one who created the order
        if (order.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to make this payment.",
                success: false,
            });
        }

        // Check if shop owner exists
        const shopOwner = await User.findById(order.shopOwnerId);
        if (!shopOwner) {
            return res.status(404).json({
                message: "Shop owner not found.",
                success: false,
            });
        }

        // Create a transaction record
        const transaction = await Transaction.create({
            orderId,
            userId,
            shopOwnerId: order.shopOwnerId,
            amount,
            paymentMethod,
            paymentDetails: {
                ...paymentDetails,
                transactionId: `TXN${Date.now()}${Math.random().toString(36).slice(2)}`,
            }
        });

        // Update order payment status
        order.paymentStatus = 'pending';
        await order.save();

        return res.status(201).json({
            message: "Transaction initiated successfully.",
            success: true,
            transaction,
        });
    } catch (error) {
        console.error("Error in createTransaction:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Update Transaction Status
exports.updateTransactionStatus = async(req, res) => {
    try {
        const { transactionId } = req.params;
        const { paymentStatus } = req.body;

        // Validate paymentStatus
        const validStatuses = ['pending', 'completed', 'failed'];
        if (!validStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                message: "Invalid transaction status.",
                success: false,
            });
        }

        // Find transaction by _id instead of paymentDetails.transactionId
        // const transaction = await Transaction.findById(transactionId);
        // Find transaction by transactionId in paymentDetails
        const transaction = await Transaction.findOne({
            'paymentDetails.transactionId': transactionId
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found.",
                success: false,
            });
        }

        // Update status
        transaction.paymentStatus = paymentStatus;
        await transaction.save();

        // If payment is completed, update the order status
        if (paymentStatus === 'completed') {
            const order = await Order.findById(transaction.orderId);
            if (order) {
                order.paymentStatus = 'completed';
                await order.save();
            }
        }

        return res.status(200).json({
            message: `Transaction status updated to ${paymentStatus}.`,
            success: true,
            transaction,
        });

    } catch (error) {
        console.error("Error in updateTransactionStatus:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

// Get User Transactions
exports.getUserTransactions = async(req, res) => {
    try {
        const userId = req.user.id;

        const transactions = await Transaction.find({ userId })
            .populate({
                path: 'orderId',
                select: 'status paymentStatus message createdAt',
                populate: {
                    path: 'productId',
                    select: 'title price'
                }
            })
            .populate('shopOwnerId', 'fullname email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Transactions retrieved successfully.",
            success: true,
            transactions,
        });

    } catch (error) {
        console.error("Error in getUserTransactions:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};