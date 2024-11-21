const mongoose = require('mongoose');

// Define the Transaction Schema
const transactionSchema = new mongoose.Schema({

    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    shopOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },

    transactionDate: {
        type: Date,
        default: Date.now,
    },

    paymentMethod: {
        type: String,
        enum: ['credit card', 'debit card', 'paypal', 'bank transfer'],
        default: 'credit card',
    },

}, {
    timestamps: true,
});

// const Transaction = mongoose.model('Transaction', transactionSchema);

// module.exports = Transaction;

export default mongoose.model('Transaction', transactionSchema);