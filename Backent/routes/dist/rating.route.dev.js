"use strict";

var express = require('express');

var _require = require('../controllers/rating.controller'),
    addRating = _require.addRating,
    getRatingsByProduct = _require.getRatingsByProduct,
    getAverageRating = _require.getAverageRating;

var authenticate = require("../Middlewares/isAuthenticated");

var router = express.Router();
router.post('/add', authenticate, addRating);
router.get('/:productId', authenticate, getRatingsByProduct);
router.get('/average/:productId', authenticate, getAverageRating);
route["delete"];