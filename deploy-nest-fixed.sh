#!/bin/bash

# NXOLand Backend NestJS Fixed Deployment Script for Ploi
# Handles nest command not found by using npx and multiple build strategies

set -e

echo "🚀 Starting NXOLand Backend NestJS Fixed Deployment..."

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

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your actual database credentials and JWT secret!"
fi

# Check if .env has default values and warn
if grep -q "your-super-secret-jwt-key-here" .env; then
    echo "⚠️  WARNING: .env file contains default values!"
    echo "📋 Please update the following in your .env file:"
    echo "   - DATABASE_URL with your actual MySQL connection string"
    echo "   - JWT_SECRET with a strong secret key"
    echo "   - CORS_ORIGIN with your frontend domain"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application with multiple strategies
echo "🏗️ Building the application..."

# Strategy 1: Try npm run build (which calls nest build)
echo "📦 Attempting Strategy 1: npm run build"
if npm run build 2>/dev/null; then
    echo "✅ Build successful with npm run build"
elif npx nest build 2>/dev/null; then
    echo "✅ Build successful with npx nest build"
elif npx @nestjs/cli build 2>/dev/null; then
    echo "✅ Build successful with npx @nestjs/cli build"
else
    echo "📦 Attempting Strategy 2: Direct TypeScript compilation"
    # Strategy 2: Direct TypeScript compilation
    if npx tsc 2>/dev/null; then
        echo "✅ Build successful with direct TypeScript compilation"
    else
        echo "❌ All build strategies failed"
        echo "📋 Debugging information:"
        echo "Node version: $(node --version)"
        echo "NPM version: $(npm --version)"
        echo "Available scripts:"
        npm run 2>/dev/null || echo "No scripts available"
        echo "NestJS CLI check:"
        npx nest --version 2>/dev/null || echo "NestJS CLI not found"
        exit 1
    fi
fi

# Check if dist/main.js exists
if [ ! -f "dist/main.js" ]; then
    echo "❌ Build failed - dist/main.js not found"
    echo "📋 Available files in dist/:"
    ls -la dist/ || echo "dist/ directory not found"
    exit 1
fi

echo "✅ Build completed successfully - dist/main.js found"

# Install only production dependencies after build
echo "📦 Installing production dependencies..."
rm -rf node_modules
npm ci --omit=dev

# Create PM2 ecosystem file if it doesn't exist
if [ ! -f "ecosystem.config.js" ]; then
    echo "📄 Creating PM2 ecosystem configuration..."
    cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'nxoland-backend',
    script: 'dist/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF
fi

# Restart with PM2
echo "🔄 Managing PM2 processes..."
pm2 delete nxoland-backend 2>/dev/null || true
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status

echo "✅ Deployment completed successfully!"
echo "🌐 Backend should be running on port 3000"
echo "📋 Check logs with: pm2 logs nxoland-backend"
