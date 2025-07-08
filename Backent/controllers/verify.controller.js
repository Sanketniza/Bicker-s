const User = require("../models/user.model");
const { sendEmail } = require("../utils/sendEmail");
const { generateOTP, getEmailVerificationTemplate, getPasswordResetOTPTemplate } = require("../utils/otpGenerator");

// Controller to send email verification OTP
exports.sendVerificationOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false,
            });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Set OTP expiry to 10 minutes from now
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

        // Update user with OTP details
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send email with OTP
        const emailTemplate = getEmailVerificationTemplate(otp);
        await sendEmail({
            email: user.email,
            subject: "Email Verification - Bicker's",
            message: emailTemplate,
        });

        return res.status(200).json({
            message: "Verification OTP sent successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in sendVerificationOTP controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

// Controller to verify OTP for email verification
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Check if OTP matches and is not expired
        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false,
            });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP has expired",
                success: false,
            });
        }

        // Verify the user
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in verifyOTP controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

// Controller to resend verification OTP
exports.resendVerificationOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
                success: false,
            });
        }

        // Generate new OTP
        const otp = generateOTP();
        
        // Set OTP expiry to 10 minutes from now
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

        // Update user with new OTP details
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send email with OTP
        const emailTemplate = getEmailVerificationTemplate(otp);
        
        try {
            await sendEmail({
                email: user.email,
                subject: "Email Verification - Bicker's",
                message: emailTemplate,
            });

            return res.status(200).json({
                message: "Verification OTP resent successfully",
                success: true,
            });
        } catch (emailError) {
            console.error("Failed to send verification email:", emailError);
            
            return res.status(500).json({
                message: "Failed to send verification email. Please try again later.",
                success: false,
                error: emailError.message
            });
        }
    } catch (error) {
        console.error("Error in resendVerificationOTP controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
