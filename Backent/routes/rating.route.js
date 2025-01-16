
const express = require('express');
const { 
        addRating, 
        getRatingsByProduct, 
        getAverageRating , 
        updateRating , 
        deleteRating 
    } = require('../controllers/rating.controller');

const authenticate = require("../Middlewares/isAuthenticated");

const router = express.Router();

router.post('/add', authenticate, addRating);
router.get('/:productId', authenticate, getRatingsByProduct);
router.get('/average/:productId', authenticate, getAverageRating);
router.put('/update', authenticate, updateRating);
router.delete('/delete', authenticate, deleteRating);

module.exports = router;