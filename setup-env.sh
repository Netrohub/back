#!/bin/bash

# NXOLand Backend Environment Setup Script for Ploi
# This script helps you configure the environment variables

echo " NXOLand Backend Environment Setup"
echo "=================================="

# Navigate to project directory
cd /home/ploi/api.nxoland.com

echo " Current directory: $(pwd)"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo " Creating .env file from .env.example..."
    cp .env.example .env
    echo " .env file created"
else
    echo " .env file already exists"
fi

echo ""
echo " Current .env configuration:"
echo "================================"
cat .env

echo ""
echo " Environment Setup Instructions:"
echo "=================================="
echo "1. Update DATABASE_URL with your MySQL connection:"
echo "   DATABASE_URL=\"mysql://username:password@localhost:3306/nxoland\""
echo ""
echo "2. Set a strong JWT_SECRET:"
echo "   JWT_SECRET=\"your-very-strong-secret-key-here\""
echo ""
echo "3. Set CORS_ORIGIN to your frontend domain:"
echo "   CORS_ORIGIN=\"https://nxoland.com\""
echo ""
echo "4. Optional: Configure Redis if using queues:"
echo "   REDIS_HOST=\"localhost\""
echo "   REDIS_PORT=\"6379\""
echo ""

# Generate a random JWT secret if not set
if grep -q "your-super-secret-jwt-key-here" .env; then
    echo " Generating a random JWT secret..."
    RANDOM_SECRET=$(openssl rand -base64 32)
    sed -i "s/your-super-secret-jwt-key-here/$RANDOM_SECRET/" .env
    echo " JWT secret generated and updated"
fi

echo ""
echo " Updated .env configuration:"
echo "================================"
cat .env

echo ""
echo " Environment setup complete!"
echo " You can now run the deployment script"
