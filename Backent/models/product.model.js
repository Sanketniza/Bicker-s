const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },

    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },

    images: [{
        type: String,
        required: true,
    }, ],

    videos: [{
        type: String,
        required: false,
    }, ],

    shopOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // Only needed if you plan to track user interactions with the product
    },

    category: {
        type: String,
        required: true,
        enum: ['bike', 'car', 'other'],
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'sold'],
        default: 'active',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
});

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;

module.exports = mongoose.model('Product', productSchema);