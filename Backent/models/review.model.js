const mongoose = require('mongoose');

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
        max: 5, // Ratings between 1 and 5 stars
    },

    comment: {
        type: String,
        maxlength: 500,
    }

}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);