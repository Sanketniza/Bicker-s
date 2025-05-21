const express = require('express');
const { uploadMiddleware } = require('../Middlewares/multer');
const isAuthenticated = require('../Middlewares/isAuthenticated');
const {
    register,
    login,
    logout,
    updateProfile,
    deleteProfile
} = require('../controllers/user.controller');

const {
    sendVerificationOTP,
    verifyOTP,
    resendVerificationOTP
} = require('../controllers/verify.controller');

const {
    forgotPassword,
    verifyResetOTP,
    resetPassword,
    resetPasswordWithToken
} = require('../controllers/password.controller');

const router = express.Router();

// User registration and authentication
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated, uploadMiddleware, updateProfile);
router.route('/delete-user/:userId').delete(isAuthenticated, deleteProfile);

// Email verification routes
router.route('/verify/send-otp').post(sendVerificationOTP);
router.route('/verify/verify-otp').post(verifyOTP);
router.route('/verify/resend-otp').post(resendVerificationOTP);

// Password reset routes
router.route('/forgot-password').post(forgotPassword);
router.route('/verify-reset-otp').post(verifyResetOTP);
router.route('/reset-password').post(resetPassword);
router.route('/reset-password/:token').post(resetPasswordWithToken);

module.exports = router;