# Email Templates System

## Overview

NXOLand now uses professional HTML email templates for all email communications. The template system is modular, easy to maintain, and ensures consistent branding across all emails.

## Features

✅ **Professional Design**: Modern, responsive email templates with NXOLand branding  
✅ **Mobile-Friendly**: Optimized for all screen sizes  
✅ **Easy to Edit**: Separate HTML files that can be customized without touching code  
✅ **Fallback Support**: Inline HTML fallback if template files are not found  
✅ **Variable Substitution**: Simple `{{VARIABLE}}` syntax for dynamic content  
✅ **Auto-Loading**: Templates automatically loaded on service initialization

## Current Templates

### 1. Verification Email (`verification-email.html`)
**Used for**: Email verification during KYC process

**Variables:**
- `{{CODE}}` - 6-digit verification code
- `{{YEAR}}` - Current year

**Location**: `src/email/templates/verification-email.html`

## Template Structure

All templates follow this structure:

```
├── Header (NXOLand branding with gradient)
├── Content (main message and call-to-action)
├── Help Section (support information)
├── Footer (copyright and legal notices)
└── Unsubscribe Notice (if applicable)
```

## How It Works

1. **Template Loading**: On service initialization, templates are loaded from the `templates/` directory
2. **Variable Replacement**: When sending an email, variables like `{{CODE}}` are replaced with actual values
3. **Fallback**: If template file cannot be loaded, inline HTML is used as fallback
4. **Email Sending**: Processed HTML is sent via SMTP

## Adding a New Template

1. **Create HTML file** in `src/email/templates/`:
   ```html
   <!-- templates/welcome-email.html -->
   <html>...</html>
   ```

2. **Add variables** where needed:
   ```html
   <h1>Welcome {{USERNAME}}!</h1>
   ```

3. **Update EmailService** to use the template:
   ```typescript
   async sendWelcomeEmail(email: string, username: string) {
     let htmlContent = this.welcomeTemplate
       .replace(/{{USERNAME}}/g, username)
       .replace(/{{YEAR}}/g, new Date().getFullYear().toString());
     
     // Send email...
   }
   ```

4. **Load template** in `onModuleInit()`:
   ```typescript
   const templatePath = path.join(__dirname, 'templates', 'welcome-email.html');
   this.welcomeTemplate = fs.readFileSync(templatePath, 'utf8');
   ```

## Template Guidelines

### Design
- ✅ Use NXOLand brand colors (#667eea, #764ba2)
- ✅ Keep width under 600px
- ✅ Use table-based layouts for email clients
- ✅ Include inline styles (no external CSS)

### Content
- ✅ Clear, concise messaging
- ✅ Prominent call-to-action
- ✅ Contact information in footer
- ✅ Professional tone

### Technical
- ✅ Test in multiple email clients
- ✅ Use web-safe fonts
- ✅ Optimize all images
- ✅ Include alt text for images

## Testing Templates

To test a template:

1. Start backend: `npm run start:dev`
2. Trigger the email from your application
3. Check your inbox for the rendered email
4. Test on:
   - Desktop email clients (Gmail, Outlook)
   - Mobile devices
   - Different browsers

## Troubleshooting

### Template Not Loading
```bash
# Check if template exists
ls src/email/templates/

# Check backend logs for:
# ✅ Email template loaded successfully
# or
# ⚠️ Could not load email template, using inline template
```

### Variables Not Replacing
- Check variable syntax: `{{VARIABLE}}` (double curly braces)
- Verify `.replace()` calls in EmailService
- Check template file encoding (should be UTF-8)

### Email Not Displaying Correctly
- Use table-based layouts (not divs)
- Use inline styles only
- Test in multiple email clients
- Keep HTML simple and compatible

## Future Templates

Potential templates to add:
- [ ] Password reset email
- [ ] Order confirmation
- [ ] Order shipment notification
- [ ] Account suspended/activated
- [ ] Monthly newsletter
- [ ] Marketing promotions
- [ ] Dispute resolution updates

## Resources

- [Email Template Documentation](src/email/templates/README.md)
- [NestJS Asset Configuration](nest-cli.json)
- [Email Service Implementation](src/email/email.service.ts)

## Support

For issues or questions about email templates, contact the development team.
