const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Optional authentication middleware
const optionalAuth = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        
        // If no token, continue without authentication (user will be null)
        if (!token) {
            return next();
        }
        
        // Try to verify token
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            // Get user from token
            const user = await User.findById(decoded.id).select('-password');
            
            if (user) {
                // Add user to request object if found
                req.user = user;
            }
        } catch (tokenError) {
            // If token verification fails, continue without authentication
            console.log("Token verification failed:", tokenError.message);
        }
        
        // Continue to the next middleware
        next();
    } catch (error) {
        // Continue without authentication in case of any error
        console.error('Optional auth error:', error.message);
        next();
    }
};

module.exports = optionalAuth;