const mongoose = require('mongoose');

// Define the Application/Order Schema
const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User (normal user)
        required: true,
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product (bike/car)
        required: true,
    },

    shopOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Shop Owner
        required: true,
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending', // Track the application status
    },

    message: {
        type: String,
        maxlength: 500,
        default: '', // Optional message from the user to the shop owner
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },

    totalAmount: {
        type: Number,
        // required: true
    },



}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Application/Order Model
// const Application = mongoose.model('Application', applicationSchema);

// module.exports = Application;

module.exports = mongoose.model('Order', orderSchema);