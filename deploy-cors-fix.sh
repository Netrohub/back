#!/bin/bash

# NXOLand Backend CORS Fix Deployment Script
# This script deploys the CORS fix to allow both nxoland.com and www.nxoland.com

set -e

echo "🚀 Starting NXOLand Backend CORS Fix Deployment..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Pull the latest changes from repository
echo "📥 Pulling latest changes from repository..."
git fetch origin
git reset --hard origin/master

echo "✅ Repository updated successfully"

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm ci --omit=dev

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building the application..."
npm run build

# Restart PM2 to apply changes
echo "🔄 Restarting PM2 processes..."
pm2 restart nxoland-backend

# Save PM2 configuration
pm2 save

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status

echo "✅ CORS fix deployment completed successfully!"
echo "🌐 Backend should now allow both nxoland.com and www.nxoland.com"
echo "📋 Check logs with: pm2 logs nxoland-backend"
