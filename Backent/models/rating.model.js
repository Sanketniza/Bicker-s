const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0.5,
        max: 5
    },

    comment: {
        type: String,
        default: ''
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });



// ✅ Indexing for Faster Queries:
ratingSchema.index({ productId: 1 }); // Index on productId for faster lookup
ratingSchema.index({ userId: 1 }); // Index on userId for faster lookup
ratingSchema.index({ productId: 1, userId: 1 }, { unique: true }); // Combined index to prevent duplicate ratings

module.exports = mongoose.model('Rating', ratingSchema);
