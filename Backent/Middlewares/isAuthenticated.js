/* const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

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
};


module.exports = isAuthenticated; */

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // First check cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Then check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; // Save decoded token (user ID and role)
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Authentication error",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
