#!/bin/bash

# NXOLand Backend Deployment Without Database Fix
# This script deploys the backend fixes without requiring database access

set -e

echo "🚀 Starting NXOLand Backend Deployment (Without DB Fix)..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Stop the backend first
echo "🛑 Stopping backend..."
pm2 delete nxoland-backend 2>/dev/null || true

# Pull latest changes
echo "📥 Pulling latest changes..."
git fetch origin
git reset --hard origin/master

# Install dependencies
echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building the application..."
npm run build

# Install production dependencies
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

# Start the backend
echo "🚀 Starting backend with PM2..."
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

# Test cart endpoint (should work without auth now)
echo "Testing /api/cart endpoint:"
CART_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/cart || echo "Failed")
echo "Cart endpoint response: $CART_RESPONSE"

# Test CORS headers
echo "Testing CORS headers:"
CORS_HEADERS=$(curl -s -I -H "Origin: https://www.nxoland.com" http://localhost:3000/api/health | grep -i "access-control" || echo "No CORS headers found")
echo "CORS headers: $CORS_HEADERS"

# Show recent logs
echo "📋 Recent backend logs:"
pm2 logs nxoland-backend --lines 10

echo ""
echo "✅ Backend deployment completed!"
echo "🌐 Backend should be running on port 3000"
echo "📋 Check logs with: pm2 logs nxoland-backend"
echo ""
echo "🔧 Changes deployed:"
echo "   - Cart endpoint now works without authentication"
echo "   - Returns empty cart for unauthenticated users"
echo "   - CORS configuration updated"
echo ""
echo "⚠️  To fix undefined usernames in database, run this SQL manually:"
echo "   UPDATE users SET name = SUBSTRING_INDEX(email, '@', 1) WHERE name = 'undefined undefined' OR name LIKE '%undefined%' OR name IS NULL OR name = '';"
