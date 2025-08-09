const express = require('express');
const { addLikeOrDislike, getLikesAndDislikesCount } = require('../controllers/like.controller');
const authenticate = require('../Middlewares/isAuthenticated');

const router = express.Router();

router.post('/toggle', authenticate, addLikeOrDislike);
// Make counts public so even logged-out users can see like/dislike totals
router.get('/count/:productId', getLikesAndDislikesCount);

module.exports = router;
