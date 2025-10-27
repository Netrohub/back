# 🗄️ **PostgreSQL Database Setup Guide for NXOLand v2.0**

## 🚨 **CRITICAL: Database Setup Required**

Your application is failing because the PostgreSQL database doesn't have the v2.0 schema tables. Follow these steps to fix it:

---

## **📋 Step 1: Access Your PostgreSQL Database**

### **Option A: Using pgAdmin or Database GUI**
1. Open your PostgreSQL admin panel (pgAdmin, DBeaver, etc.)
2. Connect to your production database

### **Option B: Using Command Line**
```bash
# Connect to your PostgreSQL database
psql -h your-host -U your-username -d your-database-name
```

---

## **📋 Step 2: Run the Database Setup Script**

1. **Copy the entire contents** of `database-setup-postgresql.sql`
2. **Execute the script** in your PostgreSQL database
3. This will create all tables, enums, indexes, and sample data

### **What the Script Creates:**
```
✅ 23 Tables: users, products, orders, categories, etc.
✅ 13 Enums: UserStatus, ProductStatus, OrderStatus, etc.  
✅ Default Roles: user, seller, admin, moderator
✅ Sample Categories: Gaming, Social Media, Streaming, Software
✅ Indexes: For optimal query performance
✅ Triggers: For automatic timestamp updates
```

---

## **📋 Step 3: Verify Database Setup**

Run these queries to confirm setup:

```sql
-- Check if main tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check if roles were created  
SELECT * FROM roles;

-- Check if categories were created
SELECT * FROM categories;
```

**Expected Output:**
- Should see 23+ tables including `users`, `products`, `orders`, etc.
- Should see 4 default roles
- Should see 4 default categories

---

## **📋 Step 4: Update Environment Variables**

Make sure your `.env` file has the correct PostgreSQL connection:

```env
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

---

## **📋 Step 5: Redeploy Your Application**

After database setup, redeploy your application. The API should now work correctly.

---

## **🔧 Troubleshooting**

### **Issue: Permission Denied**
```sql
-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;
```

### **Issue: Enum Already Exists**
If you get "enum already exists" errors, drop them first:
```sql
DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS product_status CASCADE;
-- ... repeat for all enums
```

### **Issue: Tables Already Exist**
If tables exist but are empty/wrong structure:
```sql
-- CAREFUL: This will delete all data
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- Then run the setup script again
```

---

## **✅ Success Indicators**

After completing setup, you should see:
- ✅ API starts without database errors
- ✅ `/api/health/database` returns success
- ✅ Products endpoint works correctly
- ✅ Authentication works correctly

---

## **🎯 Next Steps After Database Setup**

1. **Create an admin user** (if needed)
2. **Test key API endpoints**
3. **Upload sample products** (if needed)
4. **Configure email settings** (already working)

Your database is now ready for NXOLand v2.0! 🚀
