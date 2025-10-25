#!/bin/bash

# Deploy Frontend-Backend Connection Fixes
# This script deploys all the critical fixes for frontend-backend integration

echo "🚀 Deploying Frontend-Backend Connection Fixes..."

# Navigate to backend directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --omit=dev

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migration for username field
echo "🗄️ Running database migration..."
mysql -u u452469208_nxoland -p u452469208_nxoland < migrations/002_add_username_field.sql

# Build the application
echo "🔨 Building application..."
npm run build

# Restart the application
echo "🔄 Restarting application..."
pm2 restart nxoland-backend

echo "✅ Frontend-Backend connection fixes deployed successfully!"
echo ""
echo "📋 What was fixed:"
echo "- ✅ API response format standardized"
echo "- ✅ User interface updated with username field"
echo "- ✅ Authentication token handling unified"
echo "- ✅ Admin data provider implemented with real API calls"
echo "- ✅ CORS configuration made environment-based"
echo "- ✅ Error handling standardized between frontend and backend"
echo ""
echo "🎯 Next steps:"
echo "1. Test user registration with username/name fields"
echo "2. Test admin panel functionality"
echo "3. Verify CORS headers in production"
echo "4. Test error messages display correctly"
echo "5. Monitor authentication flow"
