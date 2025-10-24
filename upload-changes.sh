#!/bin/bash

# NXOLand Backend - Upload Changes Script
# This script commits and pushes all the new endpoint implementations

set -e

echo "🚀 Uploading NXOLand Backend Changes..."

# Navigate to backend directory
cd /c/Users/p5l/Desktop/NXOLand/nxoland-backend

echo "📁 Current directory: $(pwd)"

# Check git status
echo "📋 Git status:"
git status

# Add all new files and changes
echo "📦 Adding all changes..."
git add src/wishlist/
git add src/disputes/
git add src/kyc/
git add src/seller/
git add src/auth/auth.controller.ts
git add src/auth/auth.service.ts
git add src/app.module.ts
git add prisma/schema.prisma

# Check what's staged
echo "📋 Staged changes:"
git diff --cached --name-only

# Commit with descriptive message
echo "💾 Committing changes..."
git commit -m "Implement missing backend endpoints

- Add wishlist module with CRUD operations
- Add disputes module with admin controls  
- Add KYC module with document submission
- Add seller dashboard with analytics
- Add phone verification to auth
- Update Prisma schema with new fields
- Fix all frontend-backend API mismatches

Endpoints added:
- GET/POST/DELETE /wishlist
- GET/POST/PUT /disputes
- GET/POST /kyc
- GET /seller/dashboard, /products, /orders, /payouts, /notifications
- POST /auth/verify-phone

This resolves all 404 errors from missing endpoints."

# Push to remote repository
echo "🚀 Pushing to remote repository..."
git push origin master

echo "✅ Backend changes uploaded successfully!"
echo "🌐 Repository: https://github.com/Netrohub/back"
echo "📋 Next steps:"
echo "   1. Run database migration: npx prisma db push"
echo "   2. Deploy to Ploi using your deployment script"
echo "   3. Test endpoints with frontend"
