
const Rating = require('../models/rating.model');
const Product = require('../models/product.model');

exports.addRating = async(req, res) => {

    try {

        const { productId, userId, rating } = req.body;

        // Check if the user already rated the product
        const existingRating = await Rating.findOne({ productId, userId });
        if (existingRating) {
            return res.status(400).json({
                success: false,
                message: 'You have already rated this product.',
            });
        }

        // Create a new rating
        const rate = await Rating.create({ productId, userId, rating });

        res.status(201).json({
            success: true,
            message: 'Rating added successfully.',
            // rating: rate,
            rate,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAverageRating = async(req, res) => {

    try {

        const { productId } = req.params;

        const ratings = await Rating.find({ productId });

        if (ratings.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                message: 'No ratings for this product.',
            });
        }

        // rating in one decimal like 3.3 
        const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

        res.status(200).json({
            success: true,
            averageRating: averageRating.toFixed(1), // Rounded to one decimal place
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getRatingsByProduct = async(req, res) => {

    try {

        const { productId } = req.params;

        const ratings = await Rating.find({ productId });

        res.status(200).json({
            success: true,
            ratings,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateRating = async(req, res) => {

    try {

        const { ratingId, userId, rating , comment } = req.body;

        const ratingToUpdate = await Rating.findOne({ _id: ratingId, userId });

        if (!ratingToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'Rating not found or you are not authorized to update it.',
            });
        }

        ratingToUpdate.rating = rating || ratingToUpdate.rating;

        // update the comment
        ratingToUpdate.comment = req.body.comment || ratingToUpdate.comment;

        // updata the average rating
        const productId = ratingToUpdate.productId;
        const ratings = await Rating.find({ productId });
        const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
        await Product.updateOne({ _id: productId }, { $set: { averageRating } });

        ratingToUpdate.averageRating = averageRating;

        await ratingToUpdate.save();

        res.status(200).json({
            success: true,
            message: 'Rating updated successfully.',
            rating: ratingToUpdate,

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            message:"An error occurred while updating the rating."
        });
    }
};

exports.deleteRating = async(req, res) => {

    try {

        const { ratingId, userId } = req.body;

        const ratingToDelete = await Rating.findOne({ _id: ratingId, userId });

        if (!ratingToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Rating not found or you are not authorized to delete it.',
            });
        }

         

        await ratingToDelete.remove();

        // updata the average rating
        const productId = ratingToDelete.productId;
        const ratings = await Rating.find({ productId });
        const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
        await Product.updateOne({ _id: productId }, { $set: { averageRating } });


        res.status(200).json({
            success: true,
            message: 'Rating deleted successfully.',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            message:"rating is not deleted"
        });
    }
};

