#!/bin/bash

# Emergency Backend Rebuild Script
# This script rebuilds the backend on the production server when PM2 can't find dist/main.js

set -e

echo "🚨 Emergency Backend Rebuild"
echo ""

# Navigate to backend directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"
echo ""

# Step 1: Stop PM2 process
echo "⏹️ Stopping PM2..."
pm2 stop nxoland-backend || true
echo "✅ PM2 stopped"
echo ""

# Step 2: Remove old build directory
echo "🧹 Removing old build directory..."
rm -rf dist
echo "✅ Removed dist directory"
echo ""

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 4: Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"
echo ""

# Step 5: Build the application
echo "🏗️ Building the application..."
npm run build
BUILD_EXIT_CODE=$?
echo "Build command exit code: $BUILD_EXIT_CODE"

if [ $BUILD_EXIT_CODE -eq 0 ] && [ -d "dist" ]; then
    echo "✅ Application built successfully"
else
    echo "❌ Build failed or dist directory not created"
    echo "Build exit code: $BUILD_EXIT_CODE"
    echo "dist directory exists: $([ -d "dist" ] && echo "yes" || echo "no")"
    exit 1
fi
echo ""

# Step 6: Verify build file exists
echo "🔍 Checking for build files..."
ls -la dist/ || echo "⚠️ dist directory not found"
echo ""

if [ -f "dist/main.js" ]; then
    echo "✅ Build file exists: dist/main.js"
    echo "📊 File size: $(du -h dist/main.js | cut -f1)"
else
    echo "❌ Build file not found: dist/main.js"
    echo ""
    echo "Listing dist directory contents:"
    ls -la dist/ || echo "⚠️ dist directory does not exist"
    exit 1
fi
echo ""

# Step 7: Start PM2
echo "🚀 Starting PM2..."
pm2 start ecosystem.config.js --env production
echo "✅ PM2 started"
echo ""

# Step 8: Show PM2 status
echo "📊 PM2 Status:"
pm2 status
echo ""

echo "🎉 Emergency rebuild completed successfully!"
echo ""
echo "Check logs with: pm2 logs nxoland-backend"
echo ""
echo "If there are still issues, check the PM2 logs above."
