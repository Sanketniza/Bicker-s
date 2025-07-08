# Email Testing Guide

After setting up your email configuration, follow these steps to test and ensure everything is working properly.

## Step 1: Validate Your Environment

Run the test script to verify your SMTP connection is working:

```bash
node test-gmail-connection.js
```

If successful, you'll see "Email sent successfully!" in the output.

## Step 2: Test Registration Flow

1. Start your backend server:
```bash
node index.js
```

2. Start your frontend application:
```bash
cd ../Frontend
npm run dev
```

3. Open your browser and navigate to the registration page.

4. Register a new test user with a valid email address.

5. Check if the verification email is received.

## Step 3: Test Password Reset Flow

1. Navigate to the login page.

2. Click on "Forgot Password" or equivalent.

3. Enter your email address.

4. Check if the password reset email is received.

## Step 4: Check Server Logs

Monitor your server logs during these operations to ensure:
- No authentication errors
- Proper email sending confirmations
- No unexpected errors

## Troubleshooting

If emails still aren't being sent:

1. **Check .env File**: Verify your SMTP configuration is correct
2. **Gmail Settings**: Make sure "Less secure app access" is turned off and 2FA is enabled
3. **App Password**: Confirm you're using a 16-character app password with no spaces
4. **Restart Server**: Always restart your server after changing .env variables
5. **Check Email Limits**: Gmail has sending limits (typically 500/day)

## Next Steps

If you continue having issues with Gmail, consider switching to a dedicated email service provider like SendGrid, Mailgun, or Amazon SES as described in the `ALTERNATIVE-EMAIL-PROVIDERS.md` document.
