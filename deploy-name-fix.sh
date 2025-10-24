#!/bin/bash

# NXOLand Backend Deployment Script - Name Fix
# This script deploys the name field fix and runs database cleanup

set -e

echo "🚀 Starting NXOLand Backend Deployment (Name Fix)..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Pull the latest changes from repository
echo "📥 Pulling latest changes from repository..."
git fetch origin
git reset --hard origin/master

echo "✅ Repository updated successfully"

# Install dependencies
echo "📦 Installing production dependencies..."
npm ci --omit=dev

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building the application..."
npm run build

# Fix existing users with "undefined undefined" names
echo "🔧 Fixing existing users with undefined names..."
mysql -u u452469208_nxoland -p'your_password_here' u452469208_nxoland << 'EOF'
-- Update users with "undefined undefined" to use their email prefix as name
UPDATE users 
SET name = SUBSTRING_INDEX(email, '@', 1)
WHERE name = 'undefined undefined' 
OR name LIKE '%undefined%';

-- Show the results
SELECT id, name, email, created_at 
FROM users 
WHERE name LIKE '%undefined%';
EOF

# Restart with PM2
echo "🔄 Managing PM2 processes..."
pm2 restart nxoland-backend

# Save PM2 configuration
pm2 save

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status

echo "✅ Deployment completed successfully!"
echo "🌐 Backend should be running with fixed name handling"
echo "📋 Check logs with: pm2 logs nxoland-backend"
