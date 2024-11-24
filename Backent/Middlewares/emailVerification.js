const nodemailer = require('nodemailer');

const sendVerificationEmail = async(email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const verificationUrl = `http://localhost:${process.env.PORT}/api/v1/user/verify-user/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            html: `
                <h1>Email Verification</h1>
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationUrl}">${verificationUrl}</a>
                <p>This link will expire in 24 hours.</p>
            `
        });

        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = sendVerificationEmail;