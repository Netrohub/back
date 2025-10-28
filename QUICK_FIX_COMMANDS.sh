#!/bin/bash
# Quick Fix Commands for NXOLand Backend
# Use Prisma DB Push to sync schema with database

echo "🚀 NXOLand Backend - Quick Schema Fix"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Error: prisma/schema.prisma not found!"
    echo "Please run this script from /home/ploi/api.nxoland.com"
    exit 1
fi

echo "✅ Found prisma/schema.prisma"
echo ""

# Check DATABASE_URL
echo "📊 Checking DATABASE_URL..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set in environment!"
    echo "Please set it before running this script"
    exit 1
else
    echo "✅ DATABASE_URL is set"
fi
echo ""

# Run prisma db push
echo "🔄 Step 1/3: Pushing schema to database..."
echo "This will create all ENUMs and missing columns"
echo ""
npx prisma db push --accept-data-loss

if [ $? -ne 0 ]; then
    echo "❌ prisma db push failed!"
    exit 1
fi

echo ""
echo "✅ Schema pushed successfully!"
echo ""

# Generate Prisma Client
echo "🔄 Step 2/3: Generating Prisma Client..."
echo ""
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ prisma generate failed!"
    exit 1
fi

echo ""
echo "✅ Prisma Client generated successfully!"
echo ""

# Final message
echo "🎉 All done! Next steps:"
echo ""
echo "1. ✅ Schema synced with database"
echo "2. ✅ Prisma Client generated"
echo "3. ⏳ Restart your application (Render will auto-restart or use Dashboard)"
echo ""
echo "🧪 After restart, test these endpoints:"
echo "   - POST /api/auth/login"
echo "   - GET /api/products?featured=true"
echo "   - GET /api/cart"
echo ""
echo "✅ Your platform should now be 100% operational!"
echo ""
