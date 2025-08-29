# Email Setup & AI Configuration Troubleshooting Guide

## Current Configuration
Environment variables now use NEXT_ prefix:
```env
NEXT_EMAIL_USER=navibyteinnovations@gmail.com
NEXT_EMAIL_PASS=kbfnaxppxgeidecg
GEMINI_API_KEY=your_gemini_api_key_here
```

## New Feature: AI Review Assistant 🤖

The app now includes an AI-powered review assistant that helps customers write better reviews!

### Setting up Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your `.env` and `.env.local` files:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### How the AI Review Assistant Works

1. **Customer scans QR code** → Goes to review helper page
2. **Selects experience details** → Business type, experience type, rating
3. **AI generates review** → Personalized, helpful review text
4. **Customer can edit** → Customize the AI-generated text
5. **Copy & paste** → Use in actual Google review page

## Step 1: Test Email Configuration

Visit: `http://localhost:3003/api/test-email`

This will:
- Show email configuration status
- Attempt to send a test email
- Display any error messages

## Step 2: Test AI Review Generation

Visit: `http://localhost:3003/api/generate-review` (POST request)

Test payload:
```json
{
  "businessName": "Test Restaurant",
  "businessType": "Restaurant", 
  "experienceType": "First-time visit",
  "rating": 5
}
```

## Step 3: Check Console Logs

When testing, check the terminal for logs like:
```
🧪 Testing email configuration...
� AI Review Generation API called...
� GEMINI_API_KEY exists: true
```

## Step 4: Verify Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Ensure "2-Step Verification" is ON
3. Go to "App passwords"
4. Generate new app password for "Mail"
5. Use the 16-character password (no spaces)

## Step 5: Test Endpoints

1. **Test Email**: `http://localhost:3003/api/test-email`
2. **Generate QR Code**: Create a QR code on homepage (try both regular and AI-assisted)
3. **Submit Feedback**: Fill out feedback form
4. **Test AI Review**: Create a feedback QR with AI assistance enabled

## Step 6: Check Email Delivery

- Check inbox: `navibyteinnovations@gmail.com`
- Check spam/junk folder
- Check Gmail filters/rules

## Common Issues

### "Authentication failed"
- Regenerate Gmail app password
- Ensure 2FA is enabled
- Remove spaces from password

### "AI service is not configured"
- Check GEMINI_API_KEY is set correctly
- Verify API key is valid in Google AI Studio
- Restart development server after adding API key

### "Connection timeout"
- Check internet connection
- Try different SMTP port (465 with secure: true)

### No emails received
- Check spam folder
- Verify Gmail account settings
- Test with simple test endpoint first

### AI Review Generation Fails
- Fallback reviews will be provided automatically
- Check API key permissions in Google AI Studio
- Monitor API usage quotas

## New AI Features

### Review Helper Page
- Accessible at `/review-helper?business=BusinessName&url=ReviewURL`
- Provides step-by-step AI assistance
- Helps customers write better reviews
- Increases review completion rates

### Smart QR Code Generation
- Option to enable AI assistance for feedback QRs
- Creates intermediate landing page
- Guides customers through review process
- Higher quality reviews for businesses

## Debug Information

All APIs now include detailed logging with NEXT_ prefixed variables.
The AI review system has fallback templates if Gemini API is unavailable.
