const crypto = require('crypto');

// Generate a random 6-digit OTP
exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate a random token for password reset
exports.generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Generate HTML template for email verification
exports.getEmailVerificationTemplate = (otp) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #10b981;">Bicker's</h1>
            <p style="font-size: 18px; color: #333;">Email Verification</p>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
            <p>Thank you for registering with Bicker's. Please use the following OTP (One-Time Password) to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #10b981; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px; letter-spacing: 5px; display: inline-block;">
                    ${otp}
                </div>
            </div>
            <p>This OTP is valid for 10 minutes. If you did not request this verification, please ignore this email.</p>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 14px;">
            <p>&copy; ${new Date().getFullYear()} Bicker's. All rights reserved.</p>
        </div>
    </div>
    `;
};

// Generate HTML template for password reset
exports.getPasswordResetTemplate = (resetLink) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #10b981;">Bicker's</h1>
            <p style="font-size: 18px; color: #333;">Password Reset Request</p>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
            <p>You recently requested to reset your password for your Bicker's account. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #10b981; color: white; font-weight: bold; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block;">
                    Reset Your Password
                </a>
            </div>
            <p>This password reset link is only valid for the next 30 minutes. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 14px;">
            <p>&copy; ${new Date().getFullYear()} Bicker's. All rights reserved.</p>
        </div>
    </div>
    `;
};

// Generate HTML template for OTP reset password
exports.getPasswordResetOTPTemplate = (otp) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #10b981;">Bicker's</h1>
            <p style="font-size: 18px; color: #333;">Password Reset OTP</p>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
            <p>You recently requested to reset your password for your Bicker's account. Use the following OTP to complete the process:</p>
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #10b981; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px; letter-spacing: 5px; display: inline-block;">
                    ${otp}
                </div>
            </div>
            <p>This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 14px;">
            <p>&copy; ${new Date().getFullYear()} Bicker's. All rights reserved.</p>
        </div>
    </div>
    `;
};
