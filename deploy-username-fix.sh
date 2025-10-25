#!/bin/bash

# Deploy Username/Name Field Fix
# This script deploys the changes to separate username and name fields

echo "🚀 Deploying Username/Name Field Fix..."

# Navigate to backend directory
cd /home/ploi/api.nxoland.com

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --omit=dev

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migration
echo "🗄️ Running database migration..."
mysql -u u452469208_nxoland -p u452469208_nxoland < migrations/002_add_username_field.sql

# Build the application
echo "🔨 Building application..."
npm run build

# Restart the application
echo "🔄 Restarting application..."
pm2 restart nxoland-backend

echo "✅ Username/Name field fix deployed successfully!"
echo ""
echo "📋 What was changed:"
echo "- Added username field to database schema"
echo "- Updated registration to collect both username and name"
echo "- Fixed existing users to have proper names and usernames"
echo "- Updated frontend form to include username field"
echo ""
echo "🎯 Next steps:"
echo "1. Test registration with new form fields"
echo "2. Verify existing users have proper names"
echo "3. Update any other forms that might need username field"
