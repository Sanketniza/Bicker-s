const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    phone: {
        type: String,
        required: false,
        trim: true,
    },

    role: {
        type: String,
        enum: ['shopOwner', 'user'],
        default: 'user',
    },

    profile: {
        type: String, // URL of the profile picture
        default: '', // Optional: Set a default image URL if needed
    },

    address: {
        street: { type: String, trim: true, default: '' },
        city: { type: String, trim: true, default: '' },
        state: { type: String, trim: true, default: '' },
        zip: { type: String, trim: true, default: '' },
        country: { type: String, trim: true, default: '' },
    },

    socialMediaLinks: {
        instagram: { type: String, trim: true, default: '' },
        facebook: { type: String, trim: true, default: '' },
        twitter: { type: String, trim: true, default: '' },
        linkedin: { type: String, trim: true, default: '' },
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    paymentInfo: {
        bankAccount: { type: String, trim: true, default: '' },
        upiId: { type: String, trim: true, default: '' },
    },

    bio: {
        type: String, // A short description about the user
        trim: true,
        maxlength: 500,
        default: '',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the User Model
// const User = mongoose.model('User', userSchema);

// module.exports = User;

export default mongoose.model('User', userSchema);