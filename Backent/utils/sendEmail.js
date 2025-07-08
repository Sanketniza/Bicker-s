
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

exports.sendEmail = async ({email, subject, message}) => {
    try {
        // console.log('Attempting to send email with the following config:');
        // console.log(`SMTP Host: ${process.env.SMTP_HOST}`);
        // console.log(`SMTP Service: ${process.env.SMTP_SERVICE}`);
        // console.log(`SMTP Port: ${process.env.SMTP_PORT}`);
        // console.log(`SMTP User: ${process.env.SMTP_MAIL}`);
        // console.log('SMTP Password: [HIDDEN]');
        
        const transporter = nodeMailer.createTransport({

            // host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: Number(process.env.SMTP_PORT),
            secure: true, // use SSL
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            debug: true // Enable debug output
        });

        const option = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html: message
        };

        await transporter.sendMail(option);
        // console.log(`Email sent to ${email} successfully`);
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Provide more detailed error information for debugging
        if (error.code === 'EAUTH') {
            console.error('Authentication error: Your Gmail credentials are incorrect or not working.');
            console.error('Make sure you\'re using an App Password if 2FA is enabled on your Google account.');
        } else if (error.code === 'ESOCKET') {
            console.error('Socket error: There might be network issues or the SMTP port is blocked.');
        }
        
        throw new Error(`Failed to send email: ${error.message}`);
    }
};