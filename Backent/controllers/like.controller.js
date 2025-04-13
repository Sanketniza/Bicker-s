const Like = require('../models/like.model');

// Add Like or Dislike
exports.addLikeOrDislike = async (req, res) => {
    try {
        const { productId, type } = req.body;
        const userId = req.user._id;  // ✅ Make sure your auth middleware adds this

        const existing = await Like.findOne({ userId, productId });

        if (existing) {
            if (existing.type === type) {
                await Like.findByIdAndDelete(existing._id);
                return res.status(200).json({ success: true, message: `${type} removed.` });
            } else {
                existing.type = type;
                await existing.save();
                return res.status(200).json({ success: true, message: `Updated to ${type}.` });
            }
        }

        const like = new Like({ userId, productId, type });
        await like.save();

        res.status(201).json({
            success: true,
            message: `${type} added.`,
            like
        });

    } catch (error) {
        console.log("error at like controller:", error.message);  // ✅ Log the actual error
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get total likes and dislikes for a product
exports.getLikesAndDislikesCount = async (req, res) => {
    try {
        const { productId } = req.params;

        const likes = await Like.countDocuments({ productId, type: 'like' });
        const dislikes = await Like.countDocuments({ productId, type: 'dislike' });

        res.status(200).json({
            success: true,
            productId,
            likes,
            dislikes,
        });

    } catch (error) {
        console.log("error at like controller"),
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};


