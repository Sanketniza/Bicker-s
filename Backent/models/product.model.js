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
        type: String, // URLs for images
        required: false,
    }],

    videos: [{
        type: String, // URLs for videos
        required: false,
    }],

    features: [{
        type: String,
        trim: true,
        required: true,
    }],

    specifications: [{
        EngineType:{type: String, required: true , default: ''},
        Displacement:{type: String, required: true , default: ''},
        Power:{type: String,  required: true , default: ''},
        Condition:{type: String,  required: true , default: ''},
    }],

    shopOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (shop owner)
        required: true,
    },

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: ['bike', 'car','Scooter','Electric Bike', 'other'],
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'sold'],
        default: 'active',
    },

    views: {
        type: Number,
        default: 0,
    },

    ratings: {
        average: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
    },

    tags: [{
        type: String,
        required: false,
    }],

    stock: {
        type: Number,
        required: true,
        default: 0,
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);