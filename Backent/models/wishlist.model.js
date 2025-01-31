const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }, ],
    
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;