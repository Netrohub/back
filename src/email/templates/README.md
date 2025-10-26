# Email Templates

This directory contains HTML email templates for various email types sent by NXOLand.

## Available Templates

### verification-email.html
Email sent to users for email verification during the KYC process.

**Variables:**
- `{{CODE}}` - The 6-digit verification code
- `{{YEAR}}` - Current year for copyright

## Template Features

All email templates include:
- ✅ Responsive design (mobile-friendly)
- ✅ Professional styling with NXOLand branding
- ✅ Gradient headers with brand colors
- ✅ Clear call-to-action elements
- ✅ Support contact information
- ✅ Footer with copyright and legal notices

## Adding New Templates

1. Create a new HTML file in this directory
2. Use `{{VARIABLE_NAME}}` for dynamic content
3. Update `EmailService` to load and use the new template
4. Replace variables using `.replace()` method

Example:
```typescript
htmlContent = template
  .replace(/{{VARIABLE}}/g, value)
  .replace(/{{ANOTHER}}/g, anotherValue);
```

## Testing Templates

To test email templates:
1. Update the template HTML
2. Restart the backend: `npm run start:dev`
3. Trigger the email from the application
4. Check your inbox for the rendered email

## Best Practices

- ✅ Use inline styles (email clients don't support external CSS)
- ✅ Use table-based layouts for better compatibility
- ✅ Test in multiple email clients (Gmail, Outlook, Apple Mail)
- ✅ Keep email width under 600px
- ✅ Include plain text alternatives when possible
- ✅ Use web-safe fonts
- ✅ Optimize images and keep them small
- ✅ Test on mobile devices

## Email Client Compatibility

Tested and working on:
- ✅ Gmail (Web, iOS, Android)
- ✅ Apple Mail (iOS, macOS)
- ✅ Outlook (Windows, Web)
- ✅ Yahoo Mail
- ✅ Others (table-based structure ensures compatibility)

## Styling Guidelines

- **Colors**: Use NXOLand brand colors (#667eea, #764ba2)
- **Fonts**: System fonts stack for best compatibility
- **Spacing**: Use padding and margins consistently
- **Buttons**: Use table-based buttons for email clients
- **Images**: Host images externally, use alt text

## Support

For email template issues or customization requests, contact the development team.
