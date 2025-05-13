const express = require('express');
const { addLikeOrDislike, getLikesAndDislikesCount } = require('../controllers/like.controller');
const authenticate = require('../Middlewares/isAuthenticated');

const router = express.Router();

router.post('/toggle', authenticate, addLikeOrDislike);
router.get('/count/:productId', authenticate , getLikesAndDislikesCount);

module.exports = router;
