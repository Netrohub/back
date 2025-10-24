#!/bin/bash

# NXOLand Backend Complete Deployment Fix
# This script ensures the backend is running with proper CORS and all endpoints

set -e

echo "🚀 Starting NXOLand Backend Complete Deployment Fix..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Check if backend is running
echo "🔍 Checking current backend status..."
if pm2 list | grep -q "nxoland-backend"; then
    echo "📊 Current PM2 status:"
    pm2 status
    echo "🔄 Stopping existing backend..."
    pm2 delete nxoland-backend 2>/dev/null || true
else
    echo "ℹ️  No existing backend process found"
fi

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

# Ensure .env has proper CORS configuration
echo "🔧 Ensuring CORS configuration in .env..."
if ! grep -q "CORS_ORIGIN" .env; then
    echo "CORS_ORIGIN=https://www.nxoland.com" >> .env
    echo "✅ Added CORS_ORIGIN to .env"
fi

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
    echo "❌ All build methods failed. Please check logs for errors."
    exit 1
fi

# Install only production dependencies after build
echo "📦 Installing production dependencies..."
rm -rf node_modules
npm ci --omit=dev

# Create PM2 ecosystem file
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

# Start the backend with PM2
echo "🔄 Starting backend with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Wait for the server to start
echo "⏳ Waiting for server to start..."
sleep 10

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status

# Test the endpoints
echo "🧪 Testing endpoints..."

# Test health endpoint
echo "Testing /api/health endpoint:"
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health || echo "Failed")
echo "Health endpoint response: $HEALTH_RESPONSE"

# Test members endpoint
echo "Testing /api/users/members endpoint:"
MEMBERS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users/members || echo "Failed")
echo "Members endpoint response: $MEMBERS_RESPONSE"

# Test CORS headers
echo "Testing CORS headers:"
CORS_HEADERS=$(curl -s -I -H "Origin: https://www.nxoland.com" http://localhost:3000/api/health | grep -i "access-control" || echo "No CORS headers found")
echo "CORS headers: $CORS_HEADERS"

# Show recent logs
echo "📋 Recent backend logs:"
pm2 logs nxoland-backend --lines 20

echo ""
echo "✅ Backend deployment completed!"
echo "🌐 Backend should be running on port 3000"
echo "📋 Check logs with: pm2 logs nxoland-backend"
echo "🔗 Test endpoints:"
echo "   - Health: http://localhost:3000/api/health"
echo "   - Members: http://localhost:3000/api/users/members"
echo "   - External: https://api.nxoland.com/api/health"
