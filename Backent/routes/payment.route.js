const express = require('express');
const { createTransaction, updateTransactionStatus, getUserTransactions } = require('../controllers/payment.controller');
const isAuthenticated = require('../Middlewares/isAuthenticated');

const router = express.Router();

router.post('/transaction', isAuthenticated, createTransaction); // Create a transaction
router.patch('/:transactionId', isAuthenticated, updateTransactionStatus); // Update transaction status
router.get('/transaction', isAuthenticated, getUserTransactions); // Get user transactions

module.exports = router;