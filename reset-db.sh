#!/bin/bash

# Complete Database Reset Script for NXOLand
# WARNING: This will DELETE ALL DATA!

set -e  # Exit on any error

echo "🔄 NXOLand Database Reset Script"
echo "⚠️  WARNING: This will delete ALL data from the database!"
echo ""

# Ask for confirmation
read -p "Are you sure you want to reset the database? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Reset cancelled."
    exit 1
fi

echo ""
echo "📦 Step 1: Validating Prisma schema..."
npx prisma validate

echo ""
echo "🗑️  Step 2: Resetting database (dropping all tables)..."
npx prisma migrate reset --skip-seed --force || {
    echo "⚠️  migrate reset failed, trying manual reset..."
    echo "🔄 Attempting db push with reset..."
    npx prisma db push --force-reset --skip-generate
}

echo ""
echo "🔧 Step 3: Generating Prisma client..."
npx prisma generate

echo ""
echo "📋 Step 4: Creating fresh migration..."
npx prisma migrate dev --name init --skip-seed || {
    echo "⚠️  Migration creation failed, using db push..."
    npx prisma db push --skip-generate
}

echo ""
echo "🌱 Step 5: Seeding database..."
npm run prisma:seed || {
    echo "⚠️  Seeding failed, but database is reset."
    exit 1
}

echo ""
echo "✅ Database reset complete!"
echo ""
echo "📊 Verification:"
echo "  - Tables created: $(psql $DATABASE_URL -t -c \"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name NOT LIKE '_prisma%';\" | tr -d ' ')"
echo "  - Users: $(psql $DATABASE_URL -t -c 'SELECT COUNT(*) FROM users;' | tr -d ' ')"
echo "  - Roles: $(psql $DATABASE_URL -t -c 'SELECT COUNT(*) FROM roles;' | tr -d ' ')"
echo "  - Categories: $(psql $DATABASE_URL -t -c 'SELECT COUNT(*) FROM categories;' | tr -d ' ')"
echo "  - Products: $(psql $DATABASE_URL -t -c 'SELECT COUNT(*) FROM products;' | tr -d ' ')"
echo ""
echo "🎉 Reset successful! Database is fresh and ready."

