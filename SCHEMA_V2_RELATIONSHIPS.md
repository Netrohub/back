# 🔗 NXOLand Database v2.0 - Entity Relationships Quick Reference

## 📊 Complete Relationship Mapping

### 🧍 **USERS** (Central Entity)
```
users (1) → (M) user_roles → (1) roles
users (1) → (M) products [as seller]
users (1) → (M) orders [as buyer]  
users (1) → (M) orders [as seller]
users (1) → (M) cart_items
users (1) → (M) wishlist_items
users (1) → (M) product_reviews
users (1) → (M) disputes [as buyer]
users (1) → (M) disputes [as seller]  
users (1) → (M) disputes [as assigned admin]
users (1) → (M) tickets [as customer]
users (1) → (M) tickets [as assigned admin]
users (1) → (M) ticket_messages
users (1) → (M) dispute_messages
users (1) → (M) kyc_verifications
users (1) → (M) password_resets
users (1) → (M) user_sessions
users (1) → (M) admin_actions
users (1) → (M) audit_logs
users (1) → (M) payouts
users (1) → (M) transactions
```

### 🎮 **PRODUCTS** (Core Business Entity)
```
products (M) → (1) categories
products (M) → (1) users [seller]
products (1) → (M) product_images
products (1) → (M) product_reviews
products (1) → (M) cart_items
products (1) → (M) order_items
products (1) → (M) wishlist_items
```

### 📦 **ORDERS** (Transaction Entity)
```
orders (M) → (1) users [buyer]
orders (M) → (1) users [seller]
orders (1) → (M) order_items
orders (1) → (M) transactions
orders (1) → (M) disputes
```

### ⚖️ **DISPUTES** (Resolution Entity)
```
disputes (M) → (1) orders
disputes (M) → (1) users [buyer]
disputes (M) → (1) users [seller]
disputes (M) → (1) users [assigned admin]
disputes (1) → (M) dispute_messages
disputes (1) → (M) dispute_evidence
```

### 🎫 **TICKETS** (Support Entity)
```
tickets (M) → (1) users [customer]
tickets (M) → (1) users [assigned admin]
tickets (1) → (M) ticket_messages
```

---

## 📋 Table-by-Table Relationships

### **Core User Management**
| Table | Relationships |
|-------|---------------|
| `users` | **Central hub** - connects to all major entities |
| `roles` | `roles (1) ← (M) user_roles (M) → (1) users` |
| `user_roles` | **Bridge table** for users ↔ roles many-to-many |

### **Product Catalog**
| Table | Relationships |
|-------|---------------|
| `categories` | `categories (1) → (M) products`<br>`categories (1) → (M) categories [self-ref]` |
| `products` | `products (M) → (1) categories`<br>`products (M) → (1) users [seller]` |
| `product_images` | `product_images (M) → (1) products` |
| `product_reviews` | `product_reviews (M) → (1) products`<br>`product_reviews (M) → (1) users` |

### **Shopping & Orders**
| Table | Relationships |
|-------|---------------|
| `cart_items` | `cart_items (M) → (1) users`<br>`cart_items (M) → (1) products` |
| `wishlist_items` | `wishlist_items (M) → (1) users`<br>`wishlist_items (M) → (1) products` |
| `orders` | `orders (M) → (1) users [buyer]`<br>`orders (M) → (1) users [seller]` |
| `order_items` | `order_items (M) → (1) orders`<br>`order_items (M) → (1) products` |
| `transactions` | `transactions (M) → (1) orders`<br>`transactions (M) → (1) users` |

### **Customer Service**
| Table | Relationships |
|-------|---------------|
| `disputes` | `disputes (M) → (1) orders`<br>`disputes (M) → (1) users [buyer/seller/admin]` |
| `dispute_messages` | `dispute_messages (M) → (1) disputes`<br>`dispute_messages (M) → (1) users [sender]` |
| `dispute_evidence` | `dispute_evidence (M) → (1) disputes` |
| `tickets` | `tickets (M) → (1) users [customer/admin]` |
| `ticket_messages` | `ticket_messages (M) → (1) tickets`<br>`ticket_messages (M) → (1) users [sender]` |

### **Security & Compliance**
| Table | Relationships |
|-------|---------------|
| `kyc_verifications` | `kyc_verifications (M) → (1) users` |
| `password_resets` | `password_resets (M) → (1) users` |
| `user_sessions` | `user_sessions (M) → (1) users` |

### **Admin & Audit**
| Table | Relationships |
|-------|---------------|
| `admin_actions` | `admin_actions (M) → (1) users [admin]` |
| `audit_logs` | `audit_logs (M) → (1) users` |
| `system_logs` | **Standalone** - optional user reference |
| `admin_invites` | **Standalone** - references users by email |

### **Financial**
| Table | Relationships |
|-------|---------------|
| `payouts` | `payouts (M) → (1) users [seller]` |
| `coupons` | **Standalone** - applied at order level |

---

## 🔄 Data Flow Patterns

### **User Registration → Product Purchase Flow**
```
1. users [register]
2. user_roles [assign default role] 
3. kyc_verifications [verify identity]
4. products [browse catalog]
5. cart_items [add to cart]
6. orders + order_items [checkout]
7. transactions [payment processing]
8. product_reviews [post-purchase feedback]
```

### **Seller Onboarding → Sales Flow**
```
1. users [register as seller]
2. user_roles [assign seller role]
3. kyc_verifications [business verification]
4. products [list items]
5. product_images [upload photos]
6. orders [receive orders]
7. payouts [request earnings]
```

### **Issue Resolution Flow**
```
1. orders [completed order]
2. disputes [issue reported]
3. dispute_messages [communication]
4. dispute_evidence [file uploads]
5. admin_actions [resolution actions]
6. audit_logs [change tracking]
```

---

## 🗝️ Key Foreign Key Constraints

### **Critical Relationships**
- `products.category_id` → `categories.id` (**RESTRICT** - prevent category deletion)
- `products.seller_id` → `users.id` (**RESTRICT** - preserve seller history)
- `orders.buyer_id` → `users.id` (**RESTRICT** - maintain order history)
- `orders.seller_id` → `users.id` (**RESTRICT** - maintain seller history)

### **Cascading Deletes**
- `users.id` → `cart_items.user_id` (**CASCADE** - clean up personal data)
- `users.id` → `wishlist_items.user_id` (**CASCADE** - clean up personal data)
- `users.id` → `user_sessions.user_id` (**CASCADE** - security cleanup)
- `products.id` → `product_images.product_id` (**CASCADE** - clean up product data)
- `orders.id` → `order_items.order_id` (**CASCADE** - maintain data integrity)

### **Set Null on Delete**
- `users.id` → `disputes.assigned_to` (**SET NULL** - preserve dispute history)
- `users.id` → `tickets.assigned_to` (**SET NULL** - preserve ticket history)
- `users.id` → `audit_logs.user_id` (**SET NULL** - preserve audit trail)

---

## 🎯 Relationship Benefits

### **Data Integrity**
- ✅ **Foreign key constraints** prevent orphaned records
- ✅ **Cascading rules** ensure clean data deletion
- ✅ **Unique constraints** prevent duplicate relationships

### **Query Performance** 
- ✅ **Strategic indexes** on foreign keys enable fast joins
- ✅ **Composite indexes** optimize common query patterns
- ✅ **Proper normalization** reduces data redundancy

### **Scalability**
- ✅ **Modular design** allows independent table scaling
- ✅ **Clear boundaries** enable microservice architecture
- ✅ **Extensible structure** supports future feature additions

### **Developer Experience**
- ✅ **Clear relationships** make code more maintainable  
- ✅ **Type safety** with Prisma schema generation
- ✅ **Intuitive navigation** between related entities

This relationship structure provides a solid foundation for NXOLand's continued growth and feature development while maintaining data integrity and performance at scale.
