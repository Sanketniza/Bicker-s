// Gmail Test Script
require('dotenv').config();
const nodemailer = require('nodemailer');

// Show current environment variables
console.log('===== ENVIRONMENT VARIABLES =====');
console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
console.log(`SMTP_SERVICE: ${process.env.SMTP_SERVICE}`);
console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
console.log(`SMTP_MAIL: ${process.env.SMTP_MAIL}`);
console.log(`Password length: ${process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD.length : 0} characters`);
console.log(`Password contains spaces: ${process.env.SMTP_PASSWORD ? /\s/.test(process.env.SMTP_PASSWORD) : 'N/A'}`);

async function testEmail() {
  console.log('\n===== ATTEMPTING TO SEND TEST EMAIL =====');
  
  try {
    // Create a transporter with debug enabled
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      debug: true // Show debug logs
    });
    
    console.log('Testing connection...');
    await transporter.verify();
    console.log('✅ Connection successful!');
    
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Bicker's App" <${process.env.SMTP_MAIL}>`,
      to: process.env.SMTP_MAIL, // Send to yourself for testing
      subject: 'Test Email - Connection Working',
      html: `
        <h1>Email Connection Test</h1>
        <p>If you're seeing this, your Gmail SMTP configuration is working correctly!</p>
        <p>Date and time: ${new Date().toLocaleString()}</p>
      `,
    });
    
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error('❌ ERROR SENDING EMAIL:');
    console.error(error);
    
    if (error.code === 'EAUTH') {
      console.log('\n⚠️ AUTHENTICATION ERROR ⚠️');
      console.log('- Your Gmail password was rejected');
      console.log('- Please follow these steps:');
      console.log('  1. Make sure 2FA is enabled on your Google account');
      console.log('  2. Generate a new app password at https://myaccount.google.com/apppasswords');
      console.log('  3. Copy the app password WITHOUT spaces');
      console.log('  4. Update your .env file with the new password');
      console.log('  5. Restart your server');
    }
  }
}

testEmail();
