const jwt = require("jsonwebtoken");

const isAuthenticated = async(req, res, next) => {
    try {
        
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Authentication error",
            success: false
        });
    }
}

module.exports = isAuthenticated;