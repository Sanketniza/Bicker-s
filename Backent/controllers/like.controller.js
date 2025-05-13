const Like = require('../models/like.model');

// // Add Like or Dislike
// exports.addLikeOrDislike = async (req, res) => {
//     try {
//         const { productId  , type} = req.body;
//         const userId = req.user._id;  // ✅ Make sure your auth middleware adds this

//         const existing = await Like.findOne({ userId, productId });

//         if (existing) {
//             if (existing.type === type) {
//                 await Like.findByIdAndDelete(existing._id);
//                 return res.status(200).json({ success: true, message: `${type} removed.` });
//             } else {
//                 existing.type = type;
//                 await existing.save();
//                 return res.status(200).json({ success: true, message: `Updated to ${type}.` });
//             }
//         }

//         const like = new Like({ userId, productId, type });
//         await like.save();

//         res.status(201).json({
//             success: true,
//             message: `${type} added.`,
//             like
//         });

//     } catch (error) {
//         console.log("error at like controller:", error.message);  // ✅ Log the actual error
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // Get total likes and dislikes for a product
// exports.getLikesAndDislikesCount = async (req, res) => {
//     try {
//         const { productId } = req.params;

//         const likes = await Like.countDocuments({ productId, type: 'like' });
//         const dislikes = await Like.countDocuments({ productId, type: 'dislike' });

//         res.status(200).json({
//             success: true,
//             productId,
//             likes,
//             dislikes,
//         });

//     } catch (error) {
//         console.log("error at like controller"),
//         res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };



// const Like = require('../models/like.model');

// Add Like or Dislike
exports.addLikeOrDislike = async (req, res) => {
    try {
        // Check what's actually in the request body for debugging
        // console.log("Request body:", req.body);
        
        // Handle both formats (type or action)
        const { productId, type, action } = req.body;
        
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const userId = req.user._id;
        
        // Determine the actual like type (from either 'type' or 'action')
        let likeType;
        if (type) {
            likeType = type; // Use type if provided
        } else if (action) {
            if (action === 'remove') {
                // Handle removal based on existing like
                const existing = await Like.findOne({ userId, productId });
                if (existing) {
                    await Like.findByIdAndDelete(existing._id);
                    
                    // Get updated counts
                    const likes = await Like.countDocuments({ productId, type: 'like' });
                    const dislikes = await Like.countDocuments({ productId, type: 'dislike' });
                    
                    return res.status(200).json({ 
                        success: true, 
                        message: 'Reaction removed.',
                        likes,
                        dislikes,
                        isLike: false,
                        isDislike: false
                    });
                }
                return res.status(404).json({
                    success: false,
                    message: "No reaction found to remove"
                });
            } else {
                likeType = action; // 'like' or 'dislike'
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Either 'type' or 'action' parameter is required"
            });
        }

        // Find existing like/dislike
        const existing = await Like.findOne({ userId, productId });

        // Handle existing or new like/dislike
        if (existing) {
            if (existing.type === likeType) {
                // User is toggling off the same reaction
                await Like.findByIdAndDelete(existing._id);
                
                // Get updated counts
                const likes = await Like.countDocuments({ productId, type: 'like' });
                const dislikes = await Like.countDocuments({ productId, type: 'dislike' });
                
                return res.status(200).json({ 
                    success: true, 
                    message: `${likeType} removed.`,
                    likes,
                    dislikes,
                    isLike: false,
                    isDislike: false
                });
            } else {
                // User is changing reaction type
                existing.type = likeType;
                await existing.save();
                
                // Get updated counts
                const likes = await Like.countDocuments({ productId, type: 'like' });
                const dislikes = await Like.countDocuments({ productId, type: 'dislike' });
                
                return res.status(200).json({ 
                    success: true, 
                    message: `Updated to ${likeType}.`,
                    likes,
                    dislikes,
                    isLike: likeType === 'like',
                    isDislike: likeType === 'dislike'
                });
            }
        }

        // Create new like/dislike
        const like = new Like({ userId, productId, type: likeType });
        await like.save();
        
        // Get updated counts
        const likes = await Like.countDocuments({ productId, type: 'like' });
        const dislikes = await Like.countDocuments({ productId, type: 'dislike' });

        return res.status(201).json({
            success: true,
            message: `${likeType} added.`,
            like,
            likes,
            dislikes,
            isLike: likeType === 'like',
            isDislike: likeType === 'dislike'
        });

    } catch (error) {
        console.error("Error in like controller:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while processing like/dislike"
        });
    }
};


// Get total likes and dislikes for a product
exports.getLikesAndDislikesCount = async (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const likes = await Like.countDocuments({ productId, type: 'like' });
        const dislikes = await Like.countDocuments({ productId, type: 'dislike' });
        
        // Check if the user has liked or disliked this product
        let isLike = false;
        let isDislike = false;
        
        if (req.user && req.user._id) {
            const userReaction = await Like.findOne({ 
                userId: req.user._id, 
                productId 
            });
            
            if (userReaction) {
                isLike = userReaction.type === 'like';
                isDislike = userReaction.type === 'dislike';
            }
        }

        return res.status(200).json({
            success: true,
            productId,
            likes,
            dislikes,
            isLike,
            isDislike
        });

    } catch (error) {
        console.error("Error in getLikesAndDislikesCount:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Server error while getting like counts" 
        });
    }
};