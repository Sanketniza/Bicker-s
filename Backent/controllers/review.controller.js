const Review = require('../models/review.model');
const Product = require('../models/product.model');

exports.addReview = async(req, res) => {

    try {

        const { productId, userId, rating, comment } = req.body;

        // Check if the user already reviewed the product
        const existingReview = await Review.findOne({ productId, userId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product.',
            });
        }

        // Create a new review
        const review = await Review.create({ productId, userId, rating, comment });

        res.status(201).json({
            success: true,
            message: 'Review added successfully.',
            review,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getReviewsByProduct = async(req, res) => {

    try {

        const { productId } = req.params;

        const reviews = await Review.find({ productId }).populate('userId', 'name'); // Include user names

        res.status(200).json({
            success: true,
            reviews,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAverageRating = async(req, res) => {

    try {

        const { productId } = req.params;

        const reviews = await Review.find({ productId });

        if (reviews.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                message: 'No reviews for this product.',
            });
        }

        const averageRating =
            reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({
            success: true,
            averageRating: averageRating.toFixed(1), // Rounded to one decimal place
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateReview = async(req, res) => {

    try {

        const { reviewId, userId, rating, comment } = req.body;

        const review = await Review.findOne({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or you are not authorized to update it.',
            });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Review updated successfully.',
            review,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteReview = async(req, res) => {

    try {

        const { reviewId, userId } = req.body;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or you are not authorized to delete it.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};