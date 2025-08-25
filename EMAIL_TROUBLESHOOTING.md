# Email Setup Troubleshooting Guide

## Current Configuration
Environment variables now use NEXT_ prefix:
```env
NEXT_EMAIL_USER=navibyteinnovations@gmail.com
NEXT_EMAIL_PASS=kbfnaxppxgeidecg
```

## Step 1: Test Email Configuration

Visit: `http://localhost:3003/api/test-email`

This will:
- Show email configuration status
- Attempt to send a test email
- Display any error messages

## Step 2: Check Console Logs

When testing, check the terminal for logs like:
```
🧪 Testing email configuration...
🧪 NEXT_EMAIL_USER: navibyteinnovations@gmail.com
🧪 NEXT_EMAIL_PASS exists: true
🧪 Sending test email...
```

## Step 3: Verify Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Ensure "2-Step Verification" is ON
3. Go to "App passwords"
4. Generate new app password for "Mail"
5. Use the 16-character password (no spaces)

## Step 4: Test Endpoints

1. **Test Email**: `http://localhost:3003/api/test-email`
2. **Generate QR Code**: Create a QR code on homepage
3. **Submit Feedback**: Fill out feedback form

## Step 5: Check Email Delivery

- Check inbox: `navibyteinnovations@gmail.com`
- Check spam/junk folder
- Check Gmail filters/rules

## Common Issues

### "Authentication failed"
- Regenerate Gmail app password
- Ensure 2FA is enabled
- Remove spaces from password

### "Connection timeout"
- Check internet connection
- Try different SMTP port (465 with secure: true)

### No emails received
- Check spam folder
- Verify Gmail account settings
- Test with simple test endpoint first

## Debug Information

All APIs now include detailed logging with NEXT_ prefixed variables.
