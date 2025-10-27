# 🚀 VPS Backend Update for NXOLand v2.0 Database

## 📋 Overview
Your v2.0 database is now ready in phpMyAdmin! Now you need to update your VPS backend application to work with the new schema.

## 🔄 Required VPS Updates

### **1. Update Prisma Schema**
Replace your current `schema.prisma` with the v2.0 version:

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Navigate to backend directory
cd /path/to/nxoland-backend

# Backup current schema
cp prisma/schema.prisma prisma/schema-v1-backup.prisma

# Replace with v2.0 schema
cp prisma/schema-v2.prisma prisma/schema.prisma
```

### **2. Update Database Connection**
Update your `.env` file with the new database connection:

```bash
# Edit environment file
nano .env

# Update DATABASE_URL to point to your v2.0 database
DATABASE_URL="mysql://username:password@localhost:3306/nxoland_v2"
```

### **3. Generate New Prisma Client**
Generate the updated Prisma client for the new schema:

```bash
# Generate new Prisma client
npm run prisma:generate

# Or manually:
npx prisma generate
```

### **4. Update Backend Services**
Stop and restart your backend services:

```bash
# Stop current backend process
pm2 stop nxoland-backend

# Or if using systemctl:
sudo systemctl stop nxoland-backend

# Start with new schema
pm2 start ecosystem.config.js

# Or if using systemctl:
sudo systemctl start nxoland-backend
```

### **5. Verify Database Connection**
Test that your backend can connect to the new database:

```bash
# Test database connection
npm run prisma:studio

# Or check with a simple query
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.count().then(count => {
  console.log('Users count:', count);
  process.exit(0);
}).catch(err => {
  console.error('Connection failed:', err);
  process.exit(1);
});
"
```

## 🔧 Code Updates Required

### **1. Update User Authentication**
Your auth service needs to work with the new roles system:

```typescript
// OLD v1.0 approach (JSON roles)
const user = await prisma.user.findUnique({
  where: { email },
  select: { id: true, email: true, roles: true }
});

// NEW v2.0 approach (normalized roles)
const user = await prisma.user.findUnique({
  where: { email },
  include: {
    user_roles: {
      include: {
        role: true
      }
    }
  }
});
```

### **2. Update Product Queries**
Products now have proper category relationships:

```typescript
// OLD v1.0 approach (string category)
const products = await prisma.product.findMany({
  where: { category: 'gaming' }
});

// NEW v2.0 approach (category relationship)
const products = await prisma.product.findMany({
  where: { 
    category: { 
      slug: 'gaming' 
    } 
  },
  include: {
    category: true,
    images: { orderBy: { sort_order: 'asc' } },
    seller: { select: { id: true, username: true, name: true } }
  }
});
```

### **3. Update Order Processing**
Orders now have enhanced structure:

```typescript
// NEW v2.0 order creation
const order = await prisma.order.create({
  data: {
    order_number: generateOrderNumber(),
    buyer_id: userId,
    seller_id: sellerId,
    subtotal: subtotal,
    service_fee: serviceFee,
    total_amount: total,
    status: 'PENDING',
    payment_status: 'PENDING',
    items: {
      create: orderItems.map(item => ({
        product_id: item.productId,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }))
    }
  },
  include: {
    items: true,
    buyer: { select: { id: true, username: true, email: true } },
    seller: { select: { id: true, username: true, email: true } }
  }
});
```

## 🧪 Testing Checklist

After updating your VPS, test these functionalities:

### **✅ Authentication**
```bash
# Test login endpoint
curl -X POST http://your-vps-ip:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nxoland.com","password":"Admin123!"}'
```

### **✅ Products**
```bash
# Test product listing
curl http://your-vps-ip:3000/api/products

# Test product by category
curl http://your-vps-ip:3000/api/products/categories/playstation
```

### **✅ User Management**
```bash
# Test user profile
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://your-vps-ip:3000/api/users/me
```

### **✅ Orders**
```bash
# Test order creation
curl -X POST http://your-vps-ip:3000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":1,"quantity":1}]}'
```

## 🚨 Troubleshooting

### **Database Connection Issues**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Test database connection
mysql -u username -p -e "USE nxoland_v2; SHOW TABLES;"
```

### **Prisma Client Issues**
```bash
# Clear Prisma cache and regenerate
rm -rf node_modules/.prisma
npm run prisma:generate
```

### **Permission Issues**
```bash
# Fix file permissions
sudo chown -R $USER:$USER /path/to/nxoland-backend
chmod +x /path/to/nxoland-backend/node_modules/.bin/*
```

### **Port Issues**
```bash
# Check if port is in use
netstat -tulpn | grep :3000

# Kill process if needed
sudo fuser -k 3000/tcp
```

## 📝 Quick Update Script

Create a script to automate the update process:

```bash
#!/bin/bash
# save as update-to-v2.sh

echo "🚀 Updating NXOLand Backend to v2.0..."

# Stop backend
pm2 stop nxoland-backend

# Update Prisma schema
cp prisma/schema-v2.prisma prisma/schema.prisma

# Generate new client
npm run prisma:generate

# Start backend
pm2 start ecosystem.config.js

# Test connection
sleep 5
curl -f http://localhost:3000/api/health || echo "❌ Health check failed"

echo "✅ Update completed!"
```

Make it executable and run:
```bash
chmod +x update-to-v2.sh
./update-to-v2.sh
```

## 🔄 Rollback Plan (if needed)

If something goes wrong, you can rollback:

```bash
# Stop backend
pm2 stop nxoland-backend

# Restore old schema
cp prisma/schema-v1-backup.prisma prisma/schema.prisma

# Restore old database connection
# Edit .env to point back to old database

# Regenerate client
npm run prisma:generate

# Start backend
pm2 start ecosystem.config.js
```

## ✅ Success Indicators

Your v2.0 backend is working correctly when:
- ✅ Backend starts without errors
- ✅ Health check endpoint responds
- ✅ Login with sample users works
- ✅ Product listing shows categories
- ✅ No database connection errors in logs

## 🎯 Next Steps

1. **Test all endpoints** with the new schema
2. **Update frontend** to handle new API responses
3. **Monitor logs** for any issues
4. **Update API documentation** if needed
5. **Deploy frontend updates** to match new backend

Your VPS backend should now be fully compatible with the v2.0 database! 🎉
