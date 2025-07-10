// Test the app password format
require('dotenv').config();
const fs = require('fs');

console.log('=== App Password Check ===');

// Check SMTP_PASSWORD length and format
const password = process.env.SMTP_PASSWORD;
if (!password) {
  console.log('❌ SMTP_PASSWORD is missing in .env file');
} else {
  console.log(`Password length: ${password.length} characters`);
  console.log(`Contains spaces: ${/\s/.test(password)}`);
  console.log(`Contains only valid chars: ${/^[a-zA-Z0-9]+$/.test(password)}`);
  
  if (password.length !== 16) {
    console.log('❌ Password should be exactly 16 characters (no spaces)');
  } else if (/\s/.test(password)) {
    console.log('❌ Password should not contain spaces');
  } else {
    console.log('✓ Password format looks good');
  }
}

console.log('\n=== Gmail Account Settings ===');
// Check email address format
const email = process.env.SMTP_MAIL;
if (!email) {
  console.log('❌ SMTP_MAIL is missing in .env file');
} else if (!email.endsWith('@gmail.com')) {
  console.log('⚠️ Warning: SMTP_MAIL does not end with @gmail.com');
} else {
  console.log('✓ Email format looks good');
}

console.log('\n=== SMTP Configuration ===');
// Check SMTP configuration
if (process.env.SMTP_HOST === 'smtp.gmail.com' && 
    process.env.SMTP_PORT == 465 && 
    process.env.SMTP_SERVICE === 'gmail') {
  console.log('✓ SMTP configuration for Gmail looks correct');
} else {
  console.log('⚠️ SMTP configuration may be incorrect:');
  console.log(`Host: ${process.env.SMTP_HOST} (should be smtp.gmail.com)`);
  console.log(`Port: ${process.env.SMTP_PORT} (should be 465)`);
  console.log(`Service: ${process.env.SMTP_SERVICE} (should be gmail)`);
}

console.log('\n=== App Password Instructions ===');
console.log('1. Go to https://myaccount.google.com/security');
console.log('2. Enable 2-Step Verification if not already enabled');
console.log('3. Go to https://myaccount.google.com/apppasswords');
console.log('4. Generate a new app password for "Mail" > "Other (Custom name)"');
console.log('5. Name it "Bickers App" and click Generate');
console.log('6. Copy the generated password (remove all spaces)');
console.log('7. Update your .env file with this password');
console.log('8. Restart your backend server');
