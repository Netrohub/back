#!/bin/bash

# NXOLand Backend Deployment Script for Ploi - Members Endpoint
# This script deploys the new members endpoint and restarts the backend

set -e

echo "🚀 Starting NXOLand Backend Deployment (Members Endpoint)..."

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

# Test the new members endpoint
echo "🧪 Testing the new members endpoint..."
sleep 5  # Wait for the server to start

echo "Testing /api/users/members endpoint:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users/members || echo "Failed to test endpoint"

echo ""
echo "✅ Backend deployment completed successfully!"
echo "🌐 Backend should be running on port 3000 with the new members endpoint"
echo "📋 Check logs with: pm2 logs nxoland-backend"
echo "🔗 Members endpoint: http://localhost:3000/api/users/members"
