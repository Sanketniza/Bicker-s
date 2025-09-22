
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = async (req, res, next) => {try {
        // Get token from cookies
        const token = req.cookies.token;
        
        // console.log("Authentication middleware - Cookie token:", token ? "Present" : "Missing");
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in.'
            });
        }
          // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Token decoded successfully:", decoded.id);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token.'
            });
        }
        
        // Get user from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.'
            });
        }
        
        // console.log("User authenticated:", user._id);
        
        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        
        // Handle different JWT errors 
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format.'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please log in again.'
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'Server error during authentication.'
        });
    }
};

module.exports = isAuthenticated;
