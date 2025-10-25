#!/bin/bash

# Deploy Admin API Endpoints
# This script deploys the new admin endpoints for the admin panel

echo "🚀 Deploying Admin API Endpoints..."

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

# Build the application
echo "🔨 Building application..."
npm run build

# Restart the application
echo "🔄 Restarting application..."
pm2 restart nxoland-backend

echo "✅ Admin API endpoints deployed successfully!"
echo ""
echo "📋 New endpoints added:"
echo "- ✅ GET /api/users - List all users with pagination"
echo "- ✅ GET /api/orders - List all orders with pagination"
echo "- ✅ GET /api/vendors - List all vendors with pagination"
echo "- ✅ GET /api/listings - List all product listings with pagination"
echo "- ✅ GET /api/payouts - List all payouts with pagination"
echo "- ✅ GET /api/dashboard/stats - Get admin dashboard statistics"
echo ""
echo "🎯 Next steps:"
echo "1. Test admin panel functionality"
echo "2. Verify all endpoints are working"
echo "3. Check admin authentication"
echo "4. Monitor admin panel data loading"

