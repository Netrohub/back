# 🔄 NXOLand v2.0 Codebase Update Plan

## 📋 Overview
We need to update all backend services to work with the new v2.0 database schema. This involves 89 errors across multiple files that need systematic fixes.

## 🎯 Update Strategy

### **Phase 1: Core Authentication (Priority 1)**
- ✅ **auth.service.ts** - Update role system from JSON to normalized tables
- ✅ **users.service.ts** - Update user queries for new role relationships

### **Phase 2: Business Logic (Priority 2)** 
- ✅ **products.service.ts** - Update for categories FK, product images, enum values
- ✅ **orders.service.ts** - Update for new order structure and relationships
- ✅ **cart.service.ts** - Update enum values and relationships

### **Phase 3: Feature Services (Priority 3)**
- ✅ **disputes.service.ts** - Update field names and relationships  
- ✅ **kyc.service.ts** - Migrate to kyc_verifications table
- ✅ **categories.service.ts** - Update for new category structure

### **Phase 4: Admin & Support (Priority 4)**
- ✅ **admin.service.ts** - Update all admin queries for new relationships
- ✅ **tickets.service.ts** - Update enum values and role checks
- ✅ **payouts.service.ts** - Update role checks and field names

## 🔧 Key Changes Needed

### **1. Roles System Transformation**
```typescript
// OLD v1.0 (JSON roles)
select: { roles: true }
user.roles.includes('admin')

// NEW v2.0 (Normalized)
include: { 
  user_roles: { 
    include: { role: true } 
  } 
}
user.user_roles.some(ur => ur.role.slug === 'admin')
```

### **2. Enum Value Updates**
```typescript
// OLD v1.0 (lowercase)
status: 'active' → status: 'ACTIVE'
status: 'pending' → status: 'PENDING' 
type: 'percentage' → type: 'PERCENTAGE'
```

### **3. Field Name Changes**
```typescript
// Orders
user_id → buyer_id (for orders)
Add: seller_id, order_number

// Disputes  
user_id → buyer_id
Add: seller_id

// KYC
kyc_status → kyc_verifications table
kyc_documents → kyc_verifications.documents
```

### **4. Relationship Updates**
```typescript
// Products
category: string → category_id: number
images: JSON → product_images table

// Categories
Add: parent_id, sort_order, is_active
```

## 📁 Files to Update (89 errors)

### **Authentication & Users (15 errors)**
- `src/auth/auth.service.ts` - 6 errors
- `src/users/users.service.ts` - 9 errors

### **Products & Orders (25 errors)**  
- `src/products/products.service.ts` - 8 errors
- `src/orders/orders.service.ts` - 17 errors

### **Shopping Features (8 errors)**
- `src/cart/cart.service.ts` - 6 errors
- `src/categories/categories.service.ts` - 2 errors

### **Customer Service (15 errors)**
- `src/disputes/disputes.service.ts` - 8 errors
- `src/tickets/tickets.service.ts` - 7 errors

### **KYC & Verification (26 errors)**
- `src/kyc/kyc.service.ts` - 26 errors (most complex)

### **Admin & Management (10 errors)**
- `src/admin/admin.service.ts` - 10 errors

## ⚡ Implementation Order

1. **Start with Auth** (foundation for everything)
2. **Update Users** (needed by all other services)
3. **Fix Products** (core business logic)
4. **Update Orders** (depends on products and users)
5. **Fix remaining services** (disputes, tickets, etc.)

This systematic approach ensures we don't break dependencies between services.
