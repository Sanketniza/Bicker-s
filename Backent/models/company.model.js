const mongoose = require('mongoose');

// Define the Company Schema
const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        maxlength: 1000, // Description of the company
    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the shop owner (User Model)
        required: true,
    },

    contactDetails: {
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        email: {
            type: String,
            trim: true,
            default: '',
        },
        address: {
            street: { type: String, trim: true, default: '' },
            city: { type: String, trim: true, default: '' },
            state: { type: String, trim: true, default: '' },
            zip: { type: String, trim: true, default: '' },
            country: { type: String, trim: true, default: '' },
        },
    },

    logo: {
        type: String, // URL for company logo
        default: '',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Create the Company Model
// const Company = mongoose.model('Company', companySchema);

// module.exports = Company;

export default mongoose.model('Company', companySchema);