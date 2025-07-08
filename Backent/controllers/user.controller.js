const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");
const Product = require("../models/product.model");

exports.register = async(req, res) => {
    try {
        
        const { fullname, email, password, phone , role  } = req.body;

        if (!fullname || !email || !password || !phone   || !role ) {
            return res.status(400).json({
                message: "Please provide all required fields",
                success: false,
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }

        let profileUrl = '';
        if (req.file) {
            const dataUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
            profileUrl = cloudResponse.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP for email verification
        const { generateOTP, getEmailVerificationTemplate } = require("../utils/otpGenerator");
        const { sendEmail } = require("../utils/sendEmail");
        
        const otp = generateOTP();
        
        // Set OTP expiry to 10 minutes from now
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            role,
            isVerified: false,
            otp: otp,
            otpExpiry: otpExpiry,
            // address: {
            //     street: address.street || '',
            //     city: address.city || '',
            //     state: address.state || '',
            //     zip: address.zip || '',
            //     country: address.country || ''
            // },
            // profile: profileUrl,
        });

        // Send verification email with OTP
        const emailTemplate = getEmailVerificationTemplate(otp);
        
        try {
            await sendEmail({
                email: user.email,
                subject: "Email Verification - Bicker's",
                message: emailTemplate,
            });
            
            return res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified
                },
                message: "User registered successfully. Please check your email to verify your account.",
            });
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            
            // User is created but email failed - return appropriate response
            return res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified
                },
                emailSent: false,
                message: "User registered successfully but we couldn't send a verification email. Please request a new verification code.",
            });
        }

    } catch (error) {
        console.log(error);
        console.log("Error in register controller");
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};


exports.login = async(req, res) => {

    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please provide all required fields",
                success: false,
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
                success: false,
            });
        }        // check if user is verified
        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email before logging in",
                success: false,
                needsVerification: true,
                email: user.email
            });
        }

        // check for role
        if (user.role !== role) {
            return res.status(400).json({
                message: "Invalid role",
                success: false,
            });
        }

        const tokenData = {
            id: user._id,
            role: user.role,
        };

        // generate token
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        // remove password and token from response
        user = { // send only these fields to client
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            bio: user.bio,
            socialMediaLinks: user.socialMediaLinks,
            paymentInfo: user.paymentInfo,
            profile: user.profile,
        };

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }).json({
            message: `You have logged in successfully, ${user.fullname}`,
            token,
            user,
            success: true,
        });

    } catch (error) {
        console.log(error.message);
        console.log("Error in login controller");

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

};

exports.logout = async (req, res) => {
    try {
        // Clear the cookie regardless of authentication status
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        // If req.user is set, return a success response with user details
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    success: false,
                });
            }

            return res.status(200).json({
                success: true,
                message: `${user.fullname} has logged out successfully`,
            });
        }

        // If req.user is not set, still return a success response
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


exports.updateProfile = async (req, res) => {
  try {
    const { fullname, phone, bio, socialMediaLinks, paymentInfo } = req.body;
    const file = req.file;
    let { address } = req.body;

    const userId = req.user.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (file) {
      const dataUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
      user.profile = cloudResponse.secure_url;
    }

    if (fullname) user.fullname = fullname;
    if (phone) user.phone = phone;

    if (address) {
      // Ensure address is a string
      if (typeof address !== 'string') {
        return res.status(400).json({
          message: "Address must be a string",
          success: false,
        });
      }

      const addressParts = address.split(',');
      user.address = {
        street: addressParts[0] ? addressParts[0].trim() : '',
        city: addressParts[1] ? addressParts[1].trim() : '',
        state: addressParts[2] ? addressParts[2].trim() : '',
        zip: addressParts[3] ? addressParts[3].trim() : '',
        country: addressParts[4] ? addressParts[4].trim() : '',
      };
    }

    if (bio) user.bio = bio;
    if (socialMediaLinks) user.socialMediaLinks = socialMediaLinks;
    if (paymentInfo) user.paymentInfo = paymentInfo;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
      address: user.address,
      phone: user.phone,
      bio: user.bio,
      socialMediaLinks: user.socialMediaLinks,
      paymentInfo: user.paymentInfo,
    };

    return res.status(200).json({
      message: `${user.fullname}, your profile has been updated successfully`,
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.deleteProfile = async(req, res) => {
    try {
        const { userId } = req.params; // User ID to delete (passed in URL params)
        const requesterId = req.user._id; // ID of the authenticated user (from isAuthenticated middleware)
        const requesterRole = req.user.role; // Role of the requester (admin or normal user)

        console.log("Delete request - User ID:", userId);
        console.log("Requester ID:", requesterId);
        console.log("Requester Role:", requesterRole);

        // Fetch user to delete
        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            console.log("User not found with ID:", userId);
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }        // Convert MongoDB ObjectId to string for comparison
        const userToDeleteId = userToDelete._id.toString();
        const requesterIdStr = requesterId && typeof requesterId === 'object' ? requesterId.toString() : requesterId;
        
        console.log("User to delete ID (string):", userToDeleteId);
        console.log("Requester ID (string):", requesterIdStr);
        console.log("User to delete ID type:", typeof userToDeleteId);
        console.log("Requester ID type:", typeof requesterIdStr);
        
        // Check if the requester is the owner or an admin
        if (userToDeleteId !== requesterIdStr && requesterRole !== 'admin') {
            console.log("Access denied - IDs don't match and not an admin");
            return res.status(403).json({
                success: false,
                message: 'Access denied! You can only delete your own account.',
            });
        }

        // Start by importing all required models
        try {
            const Company = require("../models/company.model");
            const Cart = require("../models/cart.model");
            const Order = require("../models/order.model");
            const Rating = require("../models/rating.model");
            const Review = require("../models/review.model");
            const Wishlist = require("../models/wishlist.model");
            const Like = require("../models/like.model");
            const Notification = require("../models/notification.model");
            
            console.log("Deleting associated data for user:", userId);
            
            // Delete user's data - use try/catch for each operation to continue even if some fail
            try {
                // Delete user's products
                const deletedProducts = await Product.deleteMany({ 
                    $or: [
                        { ownerId: userToDelete._id },
                        { shopOwnerId: userToDelete._id }
                    ]
                });
                console.log("Deleted products:", deletedProducts.deletedCount);
            } catch (err) {
                console.error("Error deleting products:", err.message);
            }
            
            try {
                // Delete companies owned by the user
                const deletedCompanies = await Company.deleteMany({ ownerId: userToDelete._id });
                console.log("Deleted companies:", deletedCompanies.deletedCount);
            } catch (err) {
                console.error("Error deleting companies:", err.message);
            }
            
            try {
                // Delete user's cart
                const deletedCarts = await Cart.deleteMany({ userId: userToDelete._id });
                console.log("Deleted carts:", deletedCarts.deletedCount);
            } catch (err) {
                console.error("Error deleting carts:", err.message);
            }
            
            try {
                // Delete user's orders
                const deletedOrders = await Order.deleteMany({ 
                    $or: [
                        { userId: userToDelete._id },
                        { shopOwnerId: userToDelete._id }
                    ]
                });
                console.log("Deleted orders:", deletedOrders.deletedCount);
            } catch (err) {
                console.error("Error deleting orders:", err.message);
            }
            
            try {
                // Delete user's ratings and reviews
                const deletedRatings = await Rating.deleteMany({ userId: userToDelete._id });
                console.log("Deleted ratings:", deletedRatings.deletedCount);
                
                const deletedReviews = await Review.deleteMany({ userId: userToDelete._id });
                console.log("Deleted reviews:", deletedReviews.deletedCount);
            } catch (err) {
                console.error("Error deleting ratings/reviews:", err.message);
            }
            
            try {
                // Delete user's wishlist items
                const deletedWishlistItems = await Wishlist.deleteMany({ userId: userToDelete._id });
                console.log("Deleted wishlist items:", deletedWishlistItems.deletedCount);
            } catch (err) {
                console.error("Error deleting wishlist items:", err.message);
            }
            
            try {
                // Delete user's likes
                const deletedLikes = await Like.deleteMany({ userId: userToDelete._id });
                console.log("Deleted likes:", deletedLikes.deletedCount);
            } catch (err) {
                console.error("Error deleting likes:", err.message);
            }
            
            try {
                // Delete user's notifications
                const deletedNotifications = await Notification.deleteMany({ 
                    $or: [
                        { userId: userToDelete._id },
                        { senderId: userToDelete._id }
                    ]
                });
                console.log("Deleted notifications:", deletedNotifications.deletedCount);
            } catch (err) {
                console.error("Error deleting notifications:", err.message);
            }

        } catch (err) {
            console.error("Error loading models:", err.message);
            // Continue with user deletion even if related data deletion fails
        }

        // Finally, delete the user account itself
        console.log("Deleting user account");
        await userToDelete.deleteOne();
        console.log("User account deleted successfully");
        
        // Clear user cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        
        console.log("User cookie cleared");

        return res.status(200).json({
            success: true,
            message: 'User account and all associated data deleted successfully.',
        });

    } catch (error) {
        console.error("Error in deleteProfile controller:", error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the user account.',
            error: error.message
        });
    }
};
