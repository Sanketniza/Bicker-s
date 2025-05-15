const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Existing fields
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    shopOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending',
    },
    message: {
        type: String,
        maxlength: 5000,
        default: '',
    },
    
    // New fields for customer information
    customerName: {
        type: String,
        trim: true,
        required: true
    },
    customerEmail: {
        type: String,
        trim: true,
        required: true
    },
    customerPhone: {
        type: String,
        trim: true,
        required: true
    },
    
    // Existing fields
    createdAt: {
        type: Date,
        default: Date.now,
    },
    paymentStatus: {
        type: String,
        enum: ['pending',  'approved', "rejected", 'completed'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
    },
    
    // Add a field to identify if this is a contact inquiry or an actual order
    orderType: {
        type: String,
        enum: ['contact', 'purchase'],
        default: 'contact' // Default to contact inquiry
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);