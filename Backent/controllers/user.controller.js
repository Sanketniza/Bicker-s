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


        // const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            role,
            // address: {
            //     street: address.street || '',
            //     city: address.city || '',
            //     state: address.state || '',
            //     zip: address.zip || '',
            //     country: address.country || ''
            // },
            // profile: profileUrl,
            // verificationToken // Add the verification token
        });

        // Send verification email
        // await sendVerificationEmail(email, verificationToken);

        return res.status(201).json({
            success: true,
            user,
            message: "User registered successfully. Please check your email to verify your account.",
            // verificationToken // Include this for testing purposes
        });

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
        }

        // check if user is verified
        // if (!user.isVerified) {
        //     return res.status(400).json({
        //         message: "User is not verified",
        //         success: false,
        //     });
        // }

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
            message: `Welcome ${user.fullname} , you have logged in successfully`,
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

exports.logout = async(req, res) => {

    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Get user details from database using the ID from JWT
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        return res.status(200).cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 0,
        }).json({
            message: `${user.fullname} has logged out successfully`,
            success: true,
        });

    } catch (error) {
        console.log(error.message);
        console.log("Error in logout controller");

        return res.status(500).json({
            message: "Internal server error",
            success: false,
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
        const requesterId = req.user.id; // ID of the authenticated user (from isAuthorized middleware)
        const requesterRole = req.user.role; // Role of the requester (admin or normal user)

        // Fetch user to delete
        const userToDelete = await User.findById(userId);
        if (!userToDelete) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Check if the requester is the owner or an admin
        if (userToDelete._id.toString() !== requesterId && requesterRole !== 'admin') {
            return res.status(403).json({
                message: 'Access denied! You can only delete your own account.',
            });
        }

        // Delete associated data (e.g., products posted by the user)
        await Product.deleteMany({ userId: userToDelete._id });

        // Delete the user account
        await userToDelete.deleteOne();

        return res.status(200).json({
            message: 'User account and associated data deleted successfully.',
        });

    } catch (error) {
        console.log(error.message);
        console.log("Error in deleteProfile controller");

        return res.status(500).json({
            message: 'An error occurred while deleting the user account.',
            error: error.message
        });
    }

};

// exports.verifyUser = async(req, res) => {
//     try {
//         const { token } = req.params;

//         // Find user with verification token
//         const user = await User.findOne({ verificationToken: token });

//         if (!user) {
//             return res.status(400).json({
//                 message: "Invalid verification token",
//                 success: false
//             });
//         }

//         // Update user verification status
//         user.isVerified = true;
//         user.verificationToken = undefined; // Clear the token after verification
//         await user.save();

//         return res.status(200).json({
//             message: "Email verified successfully",
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Error verifying email",
//             success: false
//         });
//     }
// };