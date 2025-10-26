#!/bin/bash

# NXOLand Backend - Deploy Members Endpoint Fix
# This script deploys the fix for the /api/users/members endpoint

set -e

echo "🚀 Starting Members Endpoint Fix Deployment..."

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo "📁 Current directory: $(pwd)"

# Pull the latest changes from repository
echo "📥 Pulling latest changes from repository..."
git fetch origin
git pull origin master

echo "✅ Repository updated successfully"

# Build the application
echo "🏗️ Building the application..."
npm run build

# Restart the backend with PM2
echo "🔄 Restarting backend with PM2..."
pm2 restart nxoland-backend

# Wait for the server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Show PM2 status
echo "📊 PM2 Status:"
pm2 status

# Test the members endpoint
echo "🧪 Testing /api/users/members endpoint:"
MEMBERS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/users/members || echo "Failed")
echo "Members endpoint response: $MEMBERS_RESPONSE"

if [ "$MEMBERS_RESPONSE" = "200" ]; then
    echo "✅ Members endpoint is working correctly!"
else
    echo "❌ Members endpoint returned: $MEMBERS_RESPONSE"
    echo "📋 Recent backend logs:"
    pm2 logs nxoland-backend --lines 50
fi

echo ""
echo "✅ Deployment completed!"
echo "🔗 Test endpoint: https://api.nxoland.com/api/users/members"
