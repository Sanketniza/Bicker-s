const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

exports.register = async(req, res) => {

    try {

        const { fullname, email, password, phone, role, address } = req.body;

        if (!fullname || !email || !password || !phone || !role || !address) {
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

        const file = req.file;

        const dataUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(dataUri.content);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            role,
            address,
            profile: cloudResponse.secure_url,
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });

    } catch (error) {
        console.log(error.User.message);
        console.log("Error in register controller");

        return res.status(500).json({
            message: "Internal server error",
            success: false,
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
        if (!user.isVerified) {
            return res.status(400).json({
                message: "User is not verified",
                success: false,
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
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        // remove password and token from response
        user = { // send only these fields to client
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile,
            address: user.address,
            phone: user.phone,
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

        const user = req.user;

        return res.status(200).cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 0,
        }).json({
            message: `${user.fullname} , you have logged out successfully`,
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

export const updateProfile = async(req, res) => {

    try {

        const { fullname, phone, address, email, bio, socialMediaLinks, profile, paymentInfo } = req.body;

        const file = req.file; // for profile picture

        const dataUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(dataUri.content);

        // update user

        const userId = req._id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        if (fullname) user.fullname = fullname;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (socialMediaLinks) user.socialMediaLinks = socialMediaLinks;
        if (profile) user.profile = cloudResponse.secure_url;

        await user.save();

        user = { // send only these fields to client
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            profile: user.profile,
            address: user.address,
            phone: user.phone,
        };

        return res.status(200).json({
            message: `${user.fullname} , your profile has been updated successfully`,
            success: true,
            user,
        });

    } catch (error) {
        console.log(error.message);
        console.log("Error in updateProfile controller");

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

};