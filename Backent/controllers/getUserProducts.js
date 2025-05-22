const Product = require("../models/product.model");

// Get Products owned by the current user
exports.getUserProducts = async(req, res) => {
    try {
        const userId = req.user.id;
        
        // Find products where the user is either the shop owner or the owner
        const products = await Product.find({
            $or: [
                { shopOwnerId: userId },
                { ownerId: userId }
            ]
        }).populate('companyId', 'name');
        
        return res.status(200).json({
            message: "User products retrieved successfully.",
            success: true,
            products,
        });
    } catch (error) {
        console.error("Error in getUserProducts:", error.message);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};
