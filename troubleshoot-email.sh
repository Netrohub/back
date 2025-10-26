#!/bin/bash

echo "🔍 Troubleshooting Email Configuration"
echo "======================================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    exit 1
fi

echo "✅ .env file exists"
echo ""

# Load environment variables
source .env

# Check required variables
echo "Checking SMTP configuration:"
echo "----------------------------"

if [ -z "$SMTP_HOST" ]; then
    echo "❌ SMTP_HOST is not set"
else
    echo "✅ SMTP_HOST: $SMTP_HOST"
fi

if [ -z "$SMTP_PORT" ]; then
    echo "❌ SMTP_PORT is not set"
else
    echo "✅ SMTP_PORT: $SMTP_PORT"
fi

if [ -z "$SMTP_USER" ]; then
    echo "❌ SMTP_USER is not set"
else
    echo "✅ SMTP_USER: ${SMTP_USER:0:3}***"
fi

if [ -z "$SMTP_PASS" ]; then
    echo "❌ SMTP_PASS is not set"
else
    echo "✅ SMTP_PASS: Set (hidden)"
fi

if [ -z "$SMTP_FROM" ]; then
    echo "❌ SMTP_FROM is not set"
else
    echo "✅ SMTP_FROM: $SMTP_FROM"
fi

echo ""
echo "Checking if nodemailer is installed..."
if npm list nodemailer > /dev/null 2>&1; then
    echo "✅ nodemailer is installed"
else
    echo "❌ nodemailer is NOT installed"
    echo "Run: npm install"
fi

echo ""
echo "Testing SMTP connection..."
echo "Create a test file... (test-smtp.js)"

cat > test-smtp.js << 'EOF'
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔧 SMTP Configuration:');
console.log('Host:', process.env.SMTP_HOST);
console.log('Port:', process.env.SMTP_PORT);
console.log('User:', process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + '***' : 'NOT SET');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection Failed:');
    console.log('Error Code:', error.code);
    console.log('Error Message:', error.message);
    console.log('');
    console.log('Common solutions:');
    console.log('1. Check if SMTP credentials are correct');
    console.log('2. For Gmail, use an app password (not regular password)');
    console.log('3. Enable 2FA on your Gmail account');
    console.log('4. Check firewall settings');
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!');
    console.log('Server is ready to send emails');
    process.exit(0);
  }
});
EOF

# Run the test
node test-smtp.js

# Clean up
rm -f test-smtp.js

echo ""
echo "Done!"
