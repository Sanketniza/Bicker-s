const mongoose = require('mongoose');

// Define the Review Schema
const reviewSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    comment: {
        type: String,
        maxlength: 500,
        default: '',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
});

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;

export default mongoose.model('Review', reviewSchema);