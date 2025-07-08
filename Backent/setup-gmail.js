/**
 * GMAIL SMTP CONFIGURATION SCRIPT
 * 
 * This script provides an interactive way to set up your Gmail SMTP configuration.
 * Follow the prompts to generate a proper app password and test your email connection.
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ASCII art header
console.log(`
╔═══════════════════════════════════════════╗
║       BICKER'S APP EMAIL CONFIGURATION     ║
╚═══════════════════════════════════════════╝
`);

console.log("This script will help you fix your Gmail SMTP configuration.\n");

// Ask user to follow steps
console.log("STEP 1: Enable 2-Step Verification on your Google account");
console.log("1. Go to https://myaccount.google.com/security");
console.log("2. Find '2-Step Verification' and enable it if not already enabled\n");

rl.question("Press ENTER when you've completed this step...", () => {
  console.clear();
  console.log("STEP 2: Generate an App Password");
  console.log("1. Go to https://myaccount.google.com/apppasswords");
  console.log("2. Select 'Mail' as the app and 'Other (Custom name)' for device");
  console.log("3. Enter 'Bicker's App' and click Generate");
  console.log("4. Google will show you a 16-character password");
  
  rl.question("\nHave you generated the app password? (yes/no): ", (answer) => {
    if (answer.toLowerCase() !== 'yes') {
      console.log("\nPlease generate an app password before continuing.");
      rl.close();
      return;
    }
    
    console.clear();
    console.log("STEP 3: Enter your app password");
    console.log("IMPORTANT: Enter the 16-character password WITHOUT spaces");
    
    rl.question("\nEnter your app password: ", (password) => {
      // Validate password format
      if (!/^[a-zA-Z0-9]{16}$/.test(password)) {
        console.log("\nInvalid password format! App password must be exactly 16 characters with no spaces.");
        rl.close();
        return;
      }
      
      console.clear();
      console.log("STEP 4: Update your .env file");
      console.log(`Setting SMTP_PASSWORD=${password} in your .env file...`);
      
      // Update .env file
      const envFilePath = path.join(__dirname, '.env');
      
      try {
        // Read the current .env file
        let envContent = fs.readFileSync(envFilePath, 'utf8');
        
        // Replace the SMTP_PASSWORD line
        envContent = envContent.replace(
          /SMTP_PASSWORD=.*/,
          `SMTP_PASSWORD=${password}`
        );
        
        // Write back to the file
        fs.writeFileSync(envFilePath, envContent);
        console.log("✅ .env file updated successfully!");
        
        console.log("\nSTEP 5: Test your email connection");
        console.log("Running the test script...\n");
        
        // Run the test script
        const testScript = exec('node test-gmail-connection.js');
        
        testScript.stdout.on('data', (data) => {
          console.log(data);
        });
        
        testScript.stderr.on('data', (data) => {
          console.error(data);
        });
        
        testScript.on('close', (code) => {
          if (code === 0) {
            console.log("\n✅ Email configuration completed successfully!");
          } else {
            console.log("\n❌ Email test failed. Please check the error messages above.");
          }
          
          console.log("\nNext Steps:");
          console.log("1. Restart your server with 'npm start' or 'node index.js'");
          console.log("2. Try registering a new user to test email verification");
          
          rl.close();
        });
      } catch (error) {
        console.error("Error updating .env file:", error);
        rl.close();
      }
    });
  });
});

// Handle readline close
rl.on('close', () => {
  console.log("\nThank you for using the Email Configuration Script!");
  process.exit(0);
});
