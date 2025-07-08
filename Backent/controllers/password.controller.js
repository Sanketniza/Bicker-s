const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendEmail");
const { generateOTP, generateResetToken, getPasswordResetOTPTemplate, getPasswordResetTemplate } = require("../utils/otpGenerator");

// Controller to handle forgot password request
exports.forgotPassword = async (req, res) => {
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

        // Generate OTP for password reset
        const otp = generateOTP();
        
        // Generate a reset token as backup (for link-based resets)
        const resetToken = generateResetToken();
        
        // Set token expiry to 30 minutes from now
        const tokenExpiry = new Date();
        tokenExpiry.setMinutes(tokenExpiry.getMinutes() + 30);

        // Update user with reset token details
        user.otp = otp;
        user.otpExpiry = tokenExpiry;
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = tokenExpiry;
        await user.save();

        // Create reset link (for link-based reset method)
        const resetLink = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
        
        // Send email with OTP
        const emailTemplate = getPasswordResetOTPTemplate(otp);
        
        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset - Bicker's",
                message: emailTemplate,
            });

            return res.status(200).json({
                message: "Password reset instructions sent to your email",
                success: true,
            });
        } catch (emailError) {
            console.error("Failed to send password reset email:", emailError);
            
            return res.status(500).json({
                message: "Failed to send password reset email. Please try again later.",
                success: false,
                error: emailError.message,
                resetToken: resetToken // Include reset token so it can be used alternatively
            });
        }
    } catch (error) {
        console.error("Error in forgotPassword controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

// Controller to verify OTP for password reset
exports.verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false,
            });
        }

        const user = await User.findOne({ 
            email,
            otp,
            otpExpiry: { $gt: new Date() } 
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
                success: false,
            });
        }

        // Return a success response with the reset token
        // This token will be used in the next step to reset the password
        return res.status(200).json({
            message: "OTP verified successfully",
            success: true,
            resetToken: user.passwordResetToken,
        });
    } catch (error) {
        console.error("Error in verifyResetOTP controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

// Controller to reset password
exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({
                message: "Reset token and new password are required",
                success: false,
            });
        }

        // Check password strength
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                success: false,
            });
        }

        const user = await User.findOne({
            passwordResetToken: resetToken,
            passwordResetExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token",
                success: false,
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset tokens
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in resetPassword controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

// Controller to reset password using token from URL
exports.resetPasswordWithToken = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required",
                success: false,
            });
        }

        // Check password strength
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                success: false,
            });
        }

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token",
                success: false,
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear reset tokens
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in resetPasswordWithToken controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
