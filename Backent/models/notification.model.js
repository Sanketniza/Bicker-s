const mongoose = require('mongoose');

// Define the Notification Schema
const notificationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    read: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true,
});

// const Notification = mongoose.model('Notification', notificationSchema);

// module.exports = Notification;

export default mongoose.model('Notification', notificationSchema);