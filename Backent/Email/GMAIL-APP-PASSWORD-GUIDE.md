# Gmail App Password Setup Guide

## Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google" find "2-Step Verification" and click on it
4. If not enabled, follow the steps to turn on 2-Step Verification

## Step 2: Generate an App Password

1. Go to your Google Account > Security > App passwords
   (direct link: https://myaccount.google.com/apppasswords)
   
2. You may need to sign in again to verify it's you

3. At the bottom, select "Select app" and choose "Mail"

4. Select "Other (Custom name)" from the "Select device" dropdown

5. Enter "Bickers App" as the name

6. Click "Generate"

7. Google will display a 16-character password - **COPY THIS EXACTLY**

8. **IMPORTANT**: Remove all spaces from the password before using it

## Step 3: Update Your .env File

1. Open your .env file in the Backent folder
2. Replace the current SMTP_PASSWORD value with your new app password
3. Make sure there are no spaces in the password string
4. It should look like this:

```
SMTP_PASSWORD=abcdefghijklmnop
```

## Step 4: Restart Your Server

After updating your .env file, restart your Node.js server for the changes to take effect.

## Troubleshooting

If you still have issues after following these steps:

1. Confirm you're using the correct email address that matches the one where you generated the app password
2. Make sure 2FA is properly enabled on your Google account
3. Try generating a new app password
4. Consider using a dedicated email service like SendGrid or Mailgun

For more information: https://support.google.com/mail/answer/185833
