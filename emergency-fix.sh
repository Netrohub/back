#!/bin/bash

# NXOLand Backend Emergency Fix
# This script directly fixes the JWT_SECRET issue and ensures the backend starts

set -e

echo "🚨 Emergency Fix for NXOLand Backend..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Stop all PM2 processes
echo "🛑 Stopping all PM2 processes..."
pm2 delete all 2>/dev/null || true

# Generate a secure JWT secret
echo "🔑 Generating secure JWT secret..."
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')

# Create .env file with proper configuration
echo "📝 Creating .env file with JWT_SECRET..."
cat > .env << EOF
# JWT Configuration
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d

# Database Configuration
DATABASE_URL=mysql://u452469208_nxoland:your_password@srv584.hstgr.io:3306/u452469208_nxoland?authPlugins=mysql_native_password

# CORS Configuration
CORS_ORIGIN=https://www.nxoland.com

# Server Configuration
PORT=3000
NODE_ENV=production

# Swagger Configuration
SWAGGER_TITLE=NXOLand API
SWAGGER_DESCRIPTION=Complete Digital Marketplace Platform API
SWAGGER_VERSION=1.0.0
SWAGGER_PATH=api/docs
EOF

echo "✅ .env file created with JWT_SECRET: ${JWT_SECRET:0:20}..."

# Verify .env file exists and has content
echo "🔍 Verifying .env file..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    echo "📄 .env file contents:"
    cat .env
else
    echo "❌ .env file not created!"
    exit 1
fi

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
    instances: 1,
    exec_mode: 'fork',
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
echo "🚀 Starting backend with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Wait for the server to start
echo "⏳ Waiting for server to start..."
sleep 20

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

# Test cart endpoint
echo "Testing /api/cart endpoint:"
CART_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/cart || echo "Failed")
echo "Cart endpoint response: $CART_RESPONSE"

# Show recent logs
echo "📋 Recent backend logs:"
pm2 logs nxoland-backend --lines 15

echo ""
echo "✅ Emergency fix completed!"
echo "🌐 Backend should be running on port 3000"
echo "📋 Check logs with: pm2 logs nxoland-backend"
echo ""
echo "⚠️  IMPORTANT: Update your DATABASE_URL in .env with your actual database password!"
echo "   Current: DATABASE_URL=mysql://u452469208_nxoland:your_password@srv584.hstgr.io:3306/u452469208_nxoland?authPlugins=mysql_native_password"
echo "   Update 'your_password' with your actual database password"
