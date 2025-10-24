#!/bin/bash

# NXOLand Backend CORS Fix Deployment Script - Robust Version
# This script handles NestJS build issues and ensures proper deployment

set -e

echo "🚀 Starting NXOLand Backend CORS Fix Deployment (Robust)..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Pull the latest changes from repository
echo "📥 Pulling latest changes from repository..."
git fetch origin
git reset --hard origin/master

echo "✅ Repository updated successfully"

# Clean any existing node_modules to avoid conflicts
echo "🧹 Cleaning existing dependencies..."
rm -rf node_modules package-lock.json

# Install all dependencies (including dev dependencies for build)
echo "📦 Installing all dependencies for build..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application - Try multiple methods
echo "🏗️ Building the application..."
if npm run build; then
    echo "✅ Build successful with 'npm run build'"
elif npx nest build; then
    echo "✅ Build successful with 'npx nest build'"
elif npx @nestjs/cli build; then
    echo "✅ Build successful with 'npx @nestjs/cli build'"
elif npx tsc; then
    echo "✅ Build successful with 'npx tsc'"
else
    echo "❌ All build methods failed. Trying TypeScript compilation directly..."
    if tsc; then
        echo "✅ Build successful with 'tsc'"
    else
        echo "❌ All build methods failed. Please check logs for errors."
        exit 1
    fi
fi

# Install only production dependencies after build
echo "📦 Installing production dependencies..."
rm -rf node_modules
npm ci --omit=dev

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
