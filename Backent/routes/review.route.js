const express = require('express');

const {
    addReview,
    getReviewsByProduct,
    getAverageRating,
    updateReview,
    deleteReview
} = require('../controllers/review.controller');

const authenticate = require("../Middlewares/isAuthenticated");

const router = express.Router();

router.post('/add', authenticate, addReview);
router.get('/:productId', authenticate, getReviewsByProduct);
router.get('/average/:productId', authenticate, getAverageRating);
router.put('/update', authenticate, updateReview);
router.delete('/delete', authenticate, deleteReview);

module.exports = router;