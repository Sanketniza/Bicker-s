require('dotenv').config();
const nodemailer = require('nodemailer');

// Function to test email sending
async function testEmailSend() {
    console.log('Starting email test...');
    console.log('============================================');
    console.log('SMTP Configuration:');
    console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
    console.log(`SMTP_SERVICE: ${process.env.SMTP_SERVICE}`);
    console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
    console.log(`SMTP_MAIL: ${process.env.SMTP_MAIL}`);
    console.log('SMTP_PASSWORD: [HIDDEN]');
    console.log('============================================');

    try {
        // Create transporter
        console.log('Creating transporter...');
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            debug: true
        });
        
        // Verify connection
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('SMTP connection successful! ✓');
        
        // Send test email
        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: process.env.SMTP_MAIL, // Send to self for testing
            subject: 'Test Email from Bicker\'s App',
            html: '<h1>Test Email</h1><p>This is a test email to verify SMTP configuration.</p>'
        });
        
        console.log('============================================');
        console.log('Email sent successfully! ✓');
        console.log(`Message ID: ${info.messageId}`);
        console.log('============================================');
        
    } catch (error) {
        console.log('============================================');
        console.error('ERROR SENDING EMAIL:');
        console.error(error);
        
        if (error.code === 'EAUTH') {
            console.log('\n⚠️  AUTHENTICATION ERROR ⚠️');
            console.log('- Your Gmail app password may be incorrect');
            console.log('- Make sure you have enabled 2FA in your Google account');
            console.log('- Generate a new app password: https://myaccount.google.com/apppasswords');
            console.log('- App passwords must be 16 characters with NO spaces');
        } else if (error.code === 'ESOCKET') {
            console.log('\n⚠️  CONNECTION ERROR ⚠️');
            console.log('- Check if your network blocks the SMTP port');
            console.log('- Verify the SMTP_PORT value (should be 465 for Gmail SSL)');
        }
        
        console.log('============================================');
    }
}

// Run the test
testEmailSend();
