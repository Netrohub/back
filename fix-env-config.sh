#!/bin/bash

# NXOLand Backend Environment Configuration Fix
# This script fixes the JWT_SECRET and other environment variables

set -e

echo "🔧 Fixing NXOLand Backend Environment Configuration..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Stop the backend first
echo "🛑 Stopping backend..."
pm2 delete nxoland-backend 2>/dev/null || true

# Check current .env file
echo "📄 Checking current .env file..."
if [ -f ".env" ]; then
    echo "Current .env contents:"
    cat .env
else
    echo "No .env file found, creating from .env.example..."
    cp .env.example .env
fi

# Generate a secure JWT secret
echo "🔑 Generating secure JWT secret..."
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')

# Update .env file with proper configuration
echo "📝 Updating .env file with proper configuration..."

# Create a new .env file with all required variables
cat > .env << EOF
# Database Configuration
DATABASE_URL="mysql://u452469208_nxoland:your_password@srv584.hstgr.io:3306/u452469208_nxoland?authPlugins=mysql_native_password"

# JWT Configuration
JWT_SECRET="${JWT_SECRET}"
JWT_EXPIRES_IN="7d"

# CORS Configuration
CORS_ORIGIN="https://www.nxoland.com"

# Server Configuration
PORT=3000
NODE_ENV=production

# Swagger Configuration
SWAGGER_TITLE="NXOLand API"
SWAGGER_DESCRIPTION="Complete Digital Marketplace Platform API"
SWAGGER_VERSION="1.0.0"
SWAGGER_PATH="api/docs"
EOF

echo "✅ .env file updated with secure configuration"

# Verify the configuration
echo "🔍 Verifying environment configuration..."
echo "JWT_SECRET length: $(echo $JWT_SECRET | wc -c)"
echo "DATABASE_URL configured: $(grep -q "DATABASE_URL" .env && echo "Yes" || echo "No")"
echo "CORS_ORIGIN configured: $(grep -q "CORS_ORIGIN" .env && echo "Yes" || echo "No")"

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

# Test CORS headers
echo "Testing CORS headers:"
CORS_HEADERS=$(curl -s -I -H "Origin: https://www.nxoland.com" http://localhost:3000/api/health | grep -i "access-control" || echo "No CORS headers found")
echo "CORS headers: $CORS_HEADERS"

# Show recent logs
echo "📋 Recent backend logs:"
pm2 logs nxoland-backend --lines 10

echo ""
echo "✅ Environment configuration fixed!"
echo "🔑 JWT_SECRET has been generated and configured"
echo "🌐 Backend should be running on port 3000"
echo "📋 Check logs with: pm2 logs nxoland-backend"
echo ""
echo "⚠️  IMPORTANT: Update your DATABASE_URL in .env with your actual database credentials!"
