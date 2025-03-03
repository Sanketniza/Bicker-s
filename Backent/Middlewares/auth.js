const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: 'No token provided', success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token', success: false });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error.message);
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }
};

module.exports = auth;
