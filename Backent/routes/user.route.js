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

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated, uploadMiddleware, updateProfile);
router.route('/delete-user/:userId').delete(isAuthenticated, deleteProfile);
// router.route('/verify-user/:token').get(verifyUser);


module.exports = router;