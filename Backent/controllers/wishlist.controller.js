const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');

// Add to Wishlist
exports.addToWishlist = async(req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id; // Get userId from authenticated user

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Find user's wishlist or create new one
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                userId,
                products: [productId]
            });
        } else {
            // Check if product already in wishlist
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({
                    success: false,
                    message: "Product already in wishlist"
                });
            }

            // Add product to wishlist
            wishlist.products.push(productId);
            await wishlist.save();
        }

        // Populate product details in response
        const populatedWishlist = await Wishlist.findById(wishlist._id)
            .populate('products', 'title price images description');

        return res.status(200).json({
            success: true,
            message: "Product added to wishlist successfully",
            wishlist: populatedWishlist
        });

    } catch (error) {
        console.error("Error in addToWishlist:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Add to Wishlist
// exports.addToWishlist = async(req, res) => {
//     try {
//         const { productId } = req.body;
//         const userId = req.user.id;

//         if (!productId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Product ID is required"
//             });
//         }

//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         let wishlist = await Wishlist.findOne({ userId });

//         if (!wishlist) {
//             wishlist = await Wishlist.create({
//                 userId,
//                 products: [productId]
//             });
//         } else {
//             if (wishlist.products.includes(productId)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Product already in wishlist"
//                 });
//             }

//             wishlist.products.push(productId);
//             await wishlist.save();
//         }

//         // ✅ Populate product details after saving
//         const populatedWishlist = await Wishlist.findById(wishlist._id)
//             .populate('products', 'title price images description');

//         return res.status(200).json({
//             success: true,
//             message: "Product added to wishlist successfully",
//             wishlist: populatedWishlist
//         });

//     } catch (error) {
//         console.error("Error in addToWishlist:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// Get Wishlist
exports.getWishlist = async(req, res) => {
    try {
        const userId = req.user.id;

        const wishlist = await Wishlist.findOne({ userId })
            .populate('products', 'title price images description');

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                message: "Wishlist is empty",
                wishlist: { products: [] }
            });
        }

        return res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {
        console.error("Error in getWishlist:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async(req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        // ✅ Populate product details after saving
        const updatedWishlist = await Wishlist.findOne({ userId })
            .populate('products', 'title price images description');

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist: updatedWishlist
        });

    } catch (error) {
        console.error("Error in removeFromWishlist:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Remove from Wishlist
// exports.removeFromWishlist = async(req, res) => {

//     try {

//         const { productId } = req.params;
//         // const { productId } = req.body;
//         const userId = req.user.id;

//         if (!productId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Product ID is required"
//             });
//         }

//         const wishlist = await Wishlist.findOne({ userId });

//         if (!wishlist) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Wishlist not found"
//             });
//         }

//         wishlist.products = wishlist.products.filter(
//             (id) => id.toString() !== productId
//         );

//         await wishlist.save();

//         return res.status(200).json({
//             success: true,
//             message: "Product removed from wishlist",
//             wishlist
//         });

//     } catch (error) {
//         console.error("Error in removeFromWishlist:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// Clear Wishlist
exports.clearWishlist = async(req, res) => {
    try {
        const userId = req.user.id;

        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        wishlist.products = [];
        await wishlist.save();

        return res.status(200).json({
            success: true,
            message: "Wishlist cleared successfully",
            wishlist
        });

    } catch (error) {
        console.error("Error in clearWishlist:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};