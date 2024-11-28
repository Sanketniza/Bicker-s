const express = require('express');
const router = express.Router();

const authenticate = require("../Middlewares/isAuthenticated");
const { getAllNotifications, createNotification, updateNotification, deleteNotification } = require('../controllers/notification.controller');



// Create Notification
router.post('/', authenticate, createNotification);

// Get All Notifications (Paginated)
router.get('/', authenticate, getAllNotifications);

// Update Notification (Mark as Read)
router.put('/:notificationId', authenticate, updateNotification);

// Delete Notification
router.delete('/:notificationId', authenticate, deleteNotification);

module.exports = router;