# 🏗️ NXOLand Database Schema v2.0 - Complete Documentation

## 📋 Overview

This document describes the completely refactored and normalized database schema for NXOLand v2.0. The new schema follows modern database design principles, implements 3NF normalization, and provides a scalable foundation for the platform.

## 🎯 Key Improvements from v1.0

### ✅ **Normalization & Data Integrity**
- Replaced JSON `roles` field with proper `roles` and `user_roles` tables
- Split product images and reviews into separate normalized tables
- Proper foreign key relationships throughout the schema
- Eliminated redundant data and improved referential integrity

### ✅ **Enhanced Product System**
- Dedicated `categories` table with hierarchical support
- `product_images` table for better image management
- `product_reviews` table with verified purchase validation
- Enhanced product fields for gaming/social media specifics

### ✅ **Robust Order Management**
- Separate `transactions` table for payment tracking
- Enhanced order fields (order_number, seller_id, service_fee)
- Proper order status tracking with timestamps
- Support for partial refunds and complex payment scenarios

### ✅ **Advanced Dispute System**
- `dispute_messages` for threaded conversations
- `dispute_evidence` for file attachments
- Proper assignment and escalation workflows

### ✅ **Comprehensive Security**
- `password_resets` table for secure password recovery
- `user_sessions` for session management and device tracking
- `kyc_verifications` for structured KYC processes

### ✅ **Performance Optimizations**
- Strategic indexing on all query-heavy fields
- Full-text search indexes on products
- Composite indexes for common query patterns
- Proper cascading rules for data consistency

---

## 📊 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NXOLAND DATABASE v2.0                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│     roles    │    │ user_roles  │    │    users     │
│──────────────│    │─────────────│    │──────────────│
│ id (PK)      │◄──┤ role_id (FK)│    │ id (PK)      │
│ name         │    │ user_id (FK)├───►│ username     │
│ slug         │    │ granted_at  │    │ email        │
│ permissions  │    └─────────────┘    │ password     │
└──────────────┘                       │ is_active    │
                                       │ ...          │
                                       └──────┬───────┘
                                              │
                ┌─────────────────────────────┴─────────────────────────────┐
                │                                                           │
                ▼                                                           ▼
    ┌──────────────┐                                           ┌──────────────┐
    │  categories  │         ┌──────────────┐                  │   orders     │
    │──────────────│         │   products   │                  │──────────────│
    │ id (PK)      │◄───────┤ category_id  │                  │ id (PK)      │
    │ name         │         │ seller_id (FK├─────────────────►│ buyer_id (FK)│
    │ slug         │         │ name         │                  │ seller_id(FK)│
    │ parent_id    │         │ price        │                  │ order_number │
    └──────────────┘         │ platform     │                  │ total_amount │
                             │ rating_avg   │                  │ status       │
                             │ ...          │                  └──────┬───────┘
                             └──────┬───────┘                         │
                                    │                                 │
                    ┌───────────────┼─────────────────┐              │
                    │               │                 │              │
                    ▼               ▼                 ▼              ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │product_images│ │product_reviews│ │ cart_items   │ │ order_items  │
        │──────────────│ │──────────────│ │──────────────│ │──────────────│
        │ product_id(FK│ │ product_id(FK│ │ user_id (FK) │ │ order_id (FK)│
        │ image_url    │ │ user_id (FK) │ │ product_id(FK│ │ product_id(FK│
        │ is_primary   │ │ order_id (FK)│ │ quantity     │ │ quantity     │
        └──────────────┘ │ rating       │ └──────────────┘ │ unit_price   │
                         │ comment      │                  └──────────────┘
                         └──────────────┘

                              ┌──────────────┐         ┌──────────────┐
                              │ transactions │         │   disputes   │
                              │──────────────│         │──────────────│
                              │ order_id (FK)├────────►│ order_id (FK)│
                              │ user_id (FK) │         │ buyer_id (FK)│
                              │ amount       │         │ seller_id(FK)│
                              │ status       │         │ assigned_to  │
                              │ gateway      │         │ status       │
                              └──────────────┘         └──────┬───────┘
                                                              │
                                              ┌───────────────┼───────────────┐
                                              │               │               │
                                              ▼               ▼               ▼
                                    ┌──────────────┐┌──────────────┐┌──────────────┐
                                    │dispute_msgs  ││dispute_evidence││   tickets   │
                                    │──────────────││──────────────││──────────────│
                                    │dispute_id(FK)││dispute_id(FK)││ user_id (FK) │
                                    │sender_id (FK)││uploaded_by   ││ assigned_to  │
                                    │message       ││file_url      ││ subject      │
                                    └──────────────┘└──────────────┘│ status       │
                                                                    └──────┬───────┘
                                                                           │
                                                                           ▼
                                                                  ┌──────────────┐
                                                                  │ticket_messages│
                                                                  │──────────────│
                                                                  │ticket_id (FK)│
                                                                  │sender_id (FK)│
                                                                  │message       │
                                                                  └──────────────┘

    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │kyc_verification││password_resets│ │user_sessions │ │   payouts    │
    │──────────────│  │──────────────│  │──────────────│ │──────────────│
    │user_id (FK)  │  │user_id (FK)  │  │user_id (FK)  │ │seller_id (FK)│
    │type          │  │token         │  │device_name   │ │amount        │
    │status        │  │expires_at    │  │ip_address    │ │status        │
    │verified_at   │  └──────────────┘  │last_activity │ │method        │
    └──────────────┘                    └──────────────┘ └──────────────┘

                    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
                    │admin_actions │  │ audit_logs   │  │ system_logs  │
                    │──────────────│  │──────────────│  │──────────────│
                    │admin_id (FK) │  │user_id (FK)  │  │user_id       │
                    │action_type   │  │entity_type   │  │level         │
                    │target_type   │  │old_values    │  │message       │
                    │target_id     │  │new_values    │  │context       │
                    └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🗂️ Table Descriptions by Module

### 👥 **User Management Module**

#### `users` - Core user data
**Purpose**: Primary user account information with authentication and status tracking
**Key Features**: 
- Unique username and email constraints
- Account locking mechanism with attempt tracking
- Soft ban functionality with reason tracking
- Email/phone verification timestamps

#### `roles` - Role definitions
**Purpose**: Define available roles and their permissions
**Key Features**:
- Flexible JSON permissions structure
- Role activation/deactivation
- Hierarchical role support through permissions

#### `user_roles` - User-role assignments
**Purpose**: Many-to-many relationship between users and roles
**Key Features**:
- Temporary role assignments with expiration
- Audit trail of who granted roles
- Support for multiple roles per user

---

### 🛍️ **Product Management Module**

#### `categories` - Product categorization
**Purpose**: Hierarchical category structure for products
**Key Features**:
- Self-referencing for parent/child relationships
- URL-friendly slugs
- Sort ordering for display
- Category activation/deactivation

#### `products` - Main product catalog
**Purpose**: Core product information for gaming accounts and social media accounts
**Key Features**:
- Gaming-specific fields (platform, game, account_level)
- Social media fields (platform, account_username)
- Comprehensive metrics (views, sales, ratings)
- Soft delete capability
- Full-text search on name/description

#### `product_images` - Product image management
**Purpose**: Multiple images per product with ordering
**Key Features**:
- Sort ordering for image display
- Primary image designation
- Alt text for accessibility

#### `product_reviews` - Customer reviews
**Purpose**: Product ratings and reviews with verification
**Key Features**:
- Verified purchase validation (must be from completed order)
- 1-5 star rating system with constraints
- Helpful vote tracking
- One review per user per product per order

---

### 📦 **Order Management Module**

#### `orders` - Order tracking
**Purpose**: Complete order lifecycle management
**Key Features**:
- Unique order numbers for customer reference
- Separate buyer and seller tracking
- Comprehensive status timestamps
- Service fee calculation
- Payment method tracking

#### `order_items` - Order line items
**Purpose**: Individual products within orders
**Key Features**:
- Product name snapshot for historical accuracy
- Unit and total price tracking
- Metadata for product snapshot preservation

#### `transactions` - Payment tracking
**Purpose**: Detailed financial transaction logging
**Key Features**:
- Multiple transaction types (payment, refund, payout, etc.)
- Fee tracking separate from main amounts
- Gateway integration support
- Currency support for international expansion

---

### ⚖️ **Dispute Resolution Module**

#### `disputes` - Main dispute tracking
**Purpose**: Order dispute management with assignment
**Key Features**:
- Priority-based dispute handling
- Admin assignment capability
- Status progression tracking
- Resolution documentation

#### `dispute_messages` - Dispute conversations
**Purpose**: Threaded messaging within disputes
**Key Features**:
- Internal admin-only messages
- Chronological message tracking
- Sender identification

#### `dispute_evidence` - File attachments
**Purpose**: Evidence file management for disputes
**Key Features**:
- File metadata tracking (size, type)
- Upload attribution
- Description support

---

### 🎫 **Support System Module**

#### `tickets` - Support ticket management
**Purpose**: Customer support ticket system
**Key Features**:
- Unique ticket numbers
- Category-based organization
- Priority and status tracking
- Response time tracking (first_response_at)

#### `ticket_messages` - Support conversations
**Purpose**: Messaging within support tickets
**Key Features**:
- Internal staff messages
- Chronological threading
- Sender tracking

---

### 🔐 **Security & KYC Module**

#### `kyc_verifications` - Identity verification
**Purpose**: Structured KYC process management
**Key Features**:
- Multiple verification types (email, phone, identity, etc.)
- External provider integration (Persona, etc.)
- Document storage references
- Expiration support for time-sensitive verifications

#### `password_resets` - Secure password recovery
**Purpose**: Token-based password reset system
**Key Features**:
- Unique token generation
- Expiration enforcement
- Usage tracking to prevent reuse
- Security audit trail (IP, user agent)

#### `user_sessions` - Session management
**Purpose**: User session and device tracking
**Key Features**:
- Multi-device session support
- Location and device information
- Activity-based session expiration
- Security monitoring capabilities

---

### 💰 **Financial Module**

#### `payouts` - Seller payment management
**Purpose**: Seller earning withdrawal system
**Key Features**:
- Fee calculation and tracking
- Multiple payout methods
- Status progression with timestamps
- Comprehensive audit trail

---

### 📊 **Admin & Audit Module**

#### `admin_actions` - Administrative activity log
**Purpose**: Track all administrative actions for compliance
**Key Features**:
- Flexible target system (any entity type/ID)
- Metadata storage for action details
- Security context (IP, user agent)

#### `audit_logs` - Data change tracking
**Purpose**: Comprehensive audit trail for data modifications
**Key Features**:
- Before/after value snapshots
- Entity-agnostic design
- User attribution
- Security context

#### `system_logs` - Application logging
**Purpose**: System-wide logging for monitoring and debugging
**Key Features**:
- Structured log levels
- Contextual information storage
- User correlation when applicable

---

## 🔗 Key Relationships Summary

### **One-to-Many Relationships**
- `users` → `products` (seller relationship)
- `users` → `orders` (buyer/seller relationships)
- `orders` → `order_items`
- `products` → `product_images`
- `products` → `product_reviews`
- `disputes` → `dispute_messages`
- `tickets` → `ticket_messages`
- `users` → `kyc_verifications`
- `users` → `payouts`

### **Many-to-Many Relationships**
- `users` ↔ `roles` (via `user_roles`)
- `users` ↔ `products` (via `cart_items`)
- `users` ↔ `products` (via `wishlist_items`)

### **Self-Referencing Relationships**
- `categories` → `categories` (parent/child hierarchy)

---

## 📈 Performance Considerations

### **Strategic Indexing**
```sql
-- High-traffic query indexes
CREATE INDEX idx_products_search ON products(status, category_id, is_featured);
CREATE INDEX idx_orders_user_status ON orders(buyer_id, status, created_at);
CREATE INDEX idx_reviews_product_rating ON product_reviews(product_id, rating, created_at);

-- Full-text search
ALTER TABLE products ADD FULLTEXT(name, description);

-- Audit and logging indexes
CREATE INDEX idx_audit_logs_timeline ON audit_logs(entity_type, created_at);
CREATE INDEX idx_system_logs_monitoring ON system_logs(level, created_at);
```

### **Query Optimization Features**
- Composite indexes for common filter combinations
- Partial indexes on status fields for active records
- Foreign key indexes for join performance
- Timestamp indexes for reporting and analytics

---

## 🛠️ Migration Considerations

### **Breaking Changes from v1.0**
1. **Roles System**: JSON `roles` field → normalized `roles`/`user_roles` tables
2. **Product Categories**: String `category` → FK to `categories` table
3. **Product Images**: JSON `images` → `product_images` table
4. **Order Structure**: Added `seller_id`, `order_number`, service fees
5. **KYC System**: JSON fields → structured `kyc_verifications` table

### **Data Migration Strategy**
1. Create new v2.0 tables alongside existing v1.0 tables
2. Migrate data with transformation logic
3. Update application code to use new schema
4. Drop v1.0 tables after validation
5. Apply all indexes and constraints

### **Rollback Plan**
- Keep v1.0 tables until migration is fully validated
- Implement dual-write capability during transition
- Create reverse migration scripts for emergency rollback

---

## 🔒 Security Enhancements

### **Data Protection**
- Password hashing with bcrypt (12+ rounds)
- Sensitive data encryption for PII
- Audit trail for all data modifications
- Session management with device tracking

### **Access Control**
- Role-based permissions system
- Admin action logging
- Failed login attempt tracking
- Account locking mechanisms

### **Compliance**
- GDPR-compliant audit trails
- Data retention policies support
- User consent tracking capability
- Right to deletion support

---

This v2.0 schema provides a robust, scalable foundation for NXOLand's continued growth while maintaining data integrity and performance at scale.
