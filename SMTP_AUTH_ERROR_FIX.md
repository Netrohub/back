# Fix SMTP Authentication Error

## Current Error

```
535 5.7.8 Error: authentication failed: (reason unavailable)
code: 'EAUTH'
```

## Possible Causes

### 1. Wrong Email or Password
- Email or password in `.env` is incorrect
- Email account doesn't exist in Hostinger
- Password has special characters that need escaping

### 2. Port/Security Mismatch
- Using wrong port for security type
- Port 587 requires TLS (not SSL)
- Port 465 requires SSL

### 3. Email Account Issues
- Account not created in Hostinger
- Account is suspended or disabled
- Wrong domain used

## Step-by-Step Fix

### Step 1: Verify Email Account Exists

1. Log in to Hostinger hPanel
2. Go to **Email Accounts**
3. Verify your email exists (e.g., `noreply@yourdomain.com`)
4. If not, create it now

### Step 2: Reset Email Password

1. In Hostinger, go to the email account
2. Click **Change Password** or **Reset Password**
3. Set a strong password (no special chars if possible)
4. Copy the password

### Step 3: Update .env File

SSH into your server and edit the `.env` file:

```bash
cd /home/ploi/api.nxoland.com
nano .env
```

Update these lines:

```bash
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=587
SMTP_USER="your-actual-email@yourdomain.com"
SMTP_PASS="your-actual-password"
SMTP_FROM="your-actual-email@yourdomain.com"
```

**Important**: 
- Replace `yourdomain.com` with your actual domain
- Use the actual email and password from Hostinger
- Make sure there are no extra spaces

### Step 4: Check for Special Characters

If password has special characters:

**Option 1**: Use quotes in .env:
```bash
SMTP_PASS="p@ssw0rd!123"
```

**Option 2**: Escape special characters:
```bash
SMTP_PASS=p\@ssw0rd\!123
```

### Step 5: Try Different Port

If port 587 doesn't work, try port 465:

```bash
SMTP_PORT=465
```

### Step 6: Restart Backend

```bash
cd /home/ploi/api.nxoland.com
pm2 restart nxoland-backend
pm2 logs nxoland-backend --lines 50
```

### Step 7: Check Logs

Look for these success messages:
```
✅ Email template loaded successfully
✅ SMTP server is ready to send emails
```

Or debug messages showing the configuration.

## Common Issues

### Issue: Password Has Special Characters

**Solution**: Wrap in quotes or escape:
```bash
SMTP_PASS="my@pass!word"
```

### Issue: Using Gmail Instead of Hostinger

**Error**: You might be using Gmail credentials

**Solution**: Make sure you're using Hostinger email:
- Go to Hostinger hPanel
- Create email account there
- Use that email and password

### Issue: Email Account Disabled

**Solution**: 
- Check Hostinger email dashboard
- Verify account is active
- If disabled, enable it

### Issue: Wrong Domain

**Solution**:
- Use the exact email from Hostinger
- Don't use `@gmail.com`, use `@yourdomain.com`
- Make sure domain is connected to Hostinger

## Testing SMTP Connection

To test if SMTP credentials work:

```bash
cd /home/ploi/api.nxoland.com
node -e "
require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: parseInt(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error:', error.message);
    console.log('Details:', error);
  } else {
    console.log('✅ Connection successful!');
  }
});
"
```

## Still Not Working?

### Check These:

1. **Is email account created in Hostinger?**
   - Go to Hostinger hPanel → Email Accounts
   - Verify it exists

2. **Are you using the correct domain?**
   - Should be `@yourdomain.com`
   - Not `@gmail.com` or other providers

3. **Password correct?**
   - Try resetting password in Hostinger
   - Copy password exactly as shown

4. **Port correct?**
   - Try port 587 first
   - If fails, try 465

5. **Environment variables loaded?**
   ```bash
   cd /home/ploi/api.nxoland.com
   cat .env | grep SMTP
   ```

## Quick Debug Commands

```bash
# Check .env file
cat .env | grep SMTP

# Test SMTP connection
cd /home/ploi/api.nxoland.com
node -e "require('dotenv').config(); console.log('SMTP_USER:', process.env.SMTP_USER); console.log('SMTP_PORT:', process.env.SMTP_PORT);"

# Restart and check logs
pm2 restart nxoland-backend
pm2 logs nxoland-backend --lines 100 | grep -i smtp
```

## Contact Support

If still not working:
1. Contact Hostinger support
2. Verify email account is active
3. Check if there are any SMTP restrictions on your account
4. Verify domain DNS settings are correct
