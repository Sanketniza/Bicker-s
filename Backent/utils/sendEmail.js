
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

exports.sendEmail = async ({email, subject, message}) => {

    const transporter = nodeMailer.createTransport({

        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const option = {
        // from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message
        // text: options.message || "your message"
    };

    await transporter.sendMail(option);
};