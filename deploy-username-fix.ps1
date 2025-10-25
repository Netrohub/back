# Deploy Username/Name Field Fix
# This script deploys the changes to separate username and name fields

Write-Host "🚀 Deploying Username/Name Field Fix..." -ForegroundColor Green

# Navigate to backend directory
Set-Location "C:\Users\p5l\Desktop\NXOLand\nxoland-backend"

# Pull latest changes
Write-Host "📥 Pulling latest changes..." -ForegroundColor Yellow
git pull origin master

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --omit=dev

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Username/Name field fix prepared!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 What was changed:" -ForegroundColor Cyan
Write-Host "- Added username field to database schema"
Write-Host "- Updated registration to collect both username and name"
Write-Host "- Updated frontend form to include username field"
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Run the database migration manually:"
Write-Host "   mysql -u u452469208_nxoland -p u452469208_nxoland < migrations/002_add_username_field.sql"
Write-Host "2. Deploy to production server"
Write-Host "3. Test registration with new form fields"
Write-Host "4. Verify existing users have proper names"
