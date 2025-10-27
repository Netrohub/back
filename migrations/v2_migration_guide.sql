-- ================================================================
-- NXOLand Database Migration v1.0 → v2.0
-- Complete migration script with data transformation
-- ================================================================

-- Step 1: Create new v2.0 tables
-- (Run the Prisma migration for schema-v2.prisma first)

-- Step 2: Migrate existing data from v1.0 to v2.0 structure

-- ================================================================
-- USERS & ROLES MIGRATION
-- ================================================================

-- 2.1: Insert default roles
INSERT INTO roles (name, slug, description, permissions, created_at, updated_at) VALUES
('Super Admin', 'super_admin', 'Full system access', '{"*": ["*"]}', NOW(), NOW()),
('Admin', 'admin', 'Administrative access', '{"users": ["read", "update"], "products": ["*"], "orders": ["*"], "disputes": ["*"]}', NOW(), NOW()),
('Moderator', 'moderator', 'Content moderation', '{"products": ["read", "update", "approve", "reject"], "disputes": ["read", "update"]}', NOW(), NOW()),
('Seller', 'seller', 'Seller permissions', '{"products": ["create", "read", "update"], "orders": ["read"], "payouts": ["read", "create"]}', NOW(), NOW()),
('User', 'user', 'Basic user permissions', '{"products": ["read"], "orders": ["create", "read"]}', NOW(), NOW());

-- 2.2: Copy users data (v1.0 → v2.0)
INSERT INTO users (
    id, username, name, email, password, phone, avatar,
    email_verified_at, phone_verified_at, is_active,
    last_login_at, login_attempts, locked_until,
    created_at, updated_at
)
SELECT 
    id, 
    COALESCE(username, CONCAT('user_', id)) as username, -- Handle missing usernames
    name, 
    email, 
    password, 
    phone, 
    avatar,
    email_verified_at,
    phone_verified_at,
    is_active,
    last_login_at,
    login_attempts,
    locked_until,
    created_at,
    updated_at
FROM users_v1; -- Assuming v1 table is renamed to users_v1

-- 2.3: Migrate user roles from JSON to normalized structure
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT DISTINCT 
    u.id as user_id,
    r.id as role_id,
    u.created_at as granted_at
FROM users_v1 u
CROSS JOIN JSON_TABLE(u.roles, '$[*]' COLUMNS (role_name VARCHAR(50) PATH '$')) jt
INNER JOIN roles r ON r.slug = CASE 
    WHEN jt.role_name = 'super_admin' THEN 'super_admin'
    WHEN jt.role_name = 'admin' THEN 'admin'
    WHEN jt.role_name = 'moderator' THEN 'moderator'
    WHEN jt.role_name = 'seller' THEN 'seller'
    ELSE 'user'
END;

-- ================================================================
-- CATEGORIES MIGRATION
-- ================================================================

-- 2.4: Create default categories (if not already populated)
INSERT INTO categories (name, slug, description, is_active, sort_order, created_at, updated_at) VALUES
-- Gaming Categories
('PlayStation', 'playstation', 'PlayStation gaming accounts', true, 1, NOW(), NOW()),
('Xbox', 'xbox', 'Xbox gaming accounts', true, 2, NOW(), NOW()),
('Steam', 'steam', 'Steam gaming accounts', true, 3, NOW(), NOW()),
('Epic Games', 'epic-games', 'Epic Games accounts', true, 4, NOW(), NOW()),
('Nintendo', 'nintendo', 'Nintendo gaming accounts', true, 5, NOW(), NOW()),
('Mobile Gaming', 'mobile-gaming', 'Mobile gaming accounts', true, 6, NOW(), NOW()),
-- Social Media Categories
('Instagram', 'instagram', 'Instagram accounts', true, 10, NOW(), NOW()),
('Twitter', 'twitter', 'Twitter accounts', true, 11, NOW(), NOW()),
('TikTok', 'tiktok', 'TikTok accounts', true, 12, NOW(), NOW()),
('YouTube', 'youtube', 'YouTube channels', true, 13, NOW(), NOW()),
('Facebook', 'facebook', 'Facebook accounts', true, 14, NOW(), NOW()),
('LinkedIn', 'linkedin', 'LinkedIn accounts', true, 15, NOW(), NOW()),
('Snapchat', 'snapchat', 'Snapchat accounts', true, 16, NOW(), NOW()),
('Discord', 'discord', 'Discord accounts', true, 17, NOW(), NOW()),
('Twitch', 'twitch', 'Twitch accounts', true, 18, NOW(), NOW()),
('Reddit', 'reddit', 'Reddit accounts', true, 19, NOW(), NOW());

-- ================================================================
-- PRODUCTS MIGRATION
-- ================================================================

-- 2.5: Migrate products with category mapping
INSERT INTO products (
    id, name, slug, description, price, discount_price, category_id, seller_id,
    platform, game, account_level, account_username, status, stock_quantity,
    delivery_time, setup_instructions, views_count, sales_count, rating_avg,
    rating_count, is_featured, featured_until, metadata, created_at, updated_at
)
SELECT 
    p.id,
    p.name,
    LOWER(REPLACE(REPLACE(p.name, ' ', '-'), '/', '-')) as slug, -- Generate slug
    p.description,
    p.price,
    NULL as discount_price, -- Add discount logic if needed
    COALESCE(c.id, 1) as category_id, -- Map to category or default to first category
    p.seller_id,
    p.category as platform, -- Use old category as platform
    NULL as game, -- Extract from metadata if available
    NULL as account_level, -- Extract from metadata if available  
    NULL as account_username, -- Extract from metadata if available
    CASE p.status 
        WHEN 'active' THEN 'ACTIVE'
        WHEN 'pending' THEN 'PENDING'
        WHEN 'inactive' THEN 'INACTIVE'
        ELSE 'DRAFT'
    END as status,
    1 as stock_quantity,
    'instant' as delivery_time,
    NULL as setup_instructions,
    0 as views_count, -- Initialize counters
    0 as sales_count,
    0.00 as rating_avg,
    0 as rating_count,
    false as is_featured,
    NULL as featured_until,
    NULL as metadata,
    p.created_at,
    p.updated_at
FROM products_v1 p
LEFT JOIN categories c ON c.slug = LOWER(REPLACE(p.category, ' ', '-'));

-- 2.6: Migrate product images from JSON to table
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT 
    p.id as product_id,
    jt.image_url,
    p.name as alt_text,
    jt.index_key as sort_order,
    CASE WHEN jt.index_key = 0 THEN true ELSE false END as is_primary
FROM products_v1 p
CROSS JOIN JSON_TABLE(
    COALESCE(p.images, '[]'), 
    '$[*]' COLUMNS (
        index_key FOR ORDINALITY,
        image_url VARCHAR(500) PATH '$'
    )
) jt
WHERE p.images IS NOT NULL AND JSON_LENGTH(p.images) > 0;

-- ================================================================
-- ORDERS MIGRATION
-- ================================================================

-- 2.7: Migrate orders with enhanced structure
INSERT INTO orders (
    id, order_number, buyer_id, seller_id, subtotal, service_fee, 
    discount_amount, total_amount, status, payment_status, payment_method,
    payment_transaction_id, buyer_email, buyer_phone, notes, metadata,
    payment_completed_at, created_at, updated_at
)
SELECT 
    o.id,
    CONCAT('ORD-', DATE_FORMAT(o.created_at, '%Y%m%d'), '-', LPAD(o.id, 6, '0')) as order_number,
    o.user_id as buyer_id,
    COALESCE(
        (SELECT oi.product_id FROM order_items_v1 oi 
         JOIN products_v1 p ON oi.product_id = p.id 
         WHERE oi.order_id = o.id LIMIT 1), 
        o.user_id
    ) as seller_id, -- Get seller from first product or fallback to buyer
    o.total_amount * 0.95 as subtotal, -- Assume 5% service fee
    o.total_amount * 0.05 as service_fee,
    0.00 as discount_amount,
    o.total_amount,
    CASE o.status
        WHEN 'pending' THEN 'PENDING'
        WHEN 'processing' THEN 'PROCESSING'
        WHEN 'completed' THEN 'COMPLETED'
        WHEN 'cancelled' THEN 'CANCELLED'
        ELSE 'PENDING'
    END as status,
    CASE o.payment_status
        WHEN 'pending' THEN 'PENDING'
        WHEN 'paid' THEN 'PAID'
        WHEN 'failed' THEN 'FAILED'
        ELSE 'PENDING'
    END as payment_status,
    o.payment_method,
    NULL as payment_transaction_id, -- Add if available
    NULL as buyer_email, -- Extract from user if needed
    NULL as buyer_phone, -- Extract from user if needed
    NULL as notes,
    NULL as metadata,
    CASE WHEN o.payment_status = 'paid' THEN o.updated_at ELSE NULL END as payment_completed_at,
    o.created_at,
    o.updated_at
FROM orders_v1 o;

-- 2.8: Migrate order items
INSERT INTO order_items (
    id, order_id, product_id, product_name, quantity, unit_price, total_price, metadata
)
SELECT 
    oi.id,
    oi.order_id,
    oi.product_id,
    COALESCE(p.name, 'Unknown Product') as product_name,
    oi.quantity,
    oi.price as unit_price,
    oi.price * oi.quantity as total_price,
    NULL as metadata
FROM order_items_v1 oi
LEFT JOIN products_v1 p ON oi.product_id = p.id;

-- ================================================================
-- CART & WISHLIST MIGRATION
-- ================================================================

-- 2.9: Migrate cart items with status enum
INSERT INTO cart_items (id, user_id, product_id, quantity, status, created_at, updated_at)
SELECT 
    id, 
    user_id, 
    product_id, 
    quantity,
    CASE status 
        WHEN 'active' THEN 'ACTIVE'
        WHEN 'saved' THEN 'SAVED_FOR_LATER'
        ELSE 'ACTIVE'
    END as status,
    created_at, 
    updated_at
FROM cart_v1;

-- 2.10: Migrate wishlist items
INSERT INTO wishlist_items (id, user_id, product_id, created_at)
SELECT id, user_id, product_id, created_at
FROM wishlist_v1;

-- ================================================================
-- KYC MIGRATION
-- ================================================================

-- 2.11: Migrate KYC data from JSON to structured table
INSERT INTO kyc_verifications (user_id, type, status, verified_at, created_at, updated_at)
SELECT 
    u.id as user_id,
    'EMAIL' as type,
    CASE WHEN u.kyc_verified = true AND JSON_EXTRACT(u.kyc_status, '$.email') = true 
         THEN 'APPROVED' ELSE 'PENDING' END as status,
    u.email_verified_at as verified_at,
    u.created_at,
    u.updated_at
FROM users_v1 u
WHERE JSON_EXTRACT(u.kyc_status, '$.email') IS NOT NULL

UNION ALL

SELECT 
    u.id as user_id,
    'PHONE' as type,
    CASE WHEN u.kyc_verified = true AND JSON_EXTRACT(u.kyc_status, '$.phone') = true 
         THEN 'APPROVED' ELSE 'PENDING' END as status,
    u.phone_verified_at as verified_at,
    u.created_at,
    u.updated_at
FROM users_v1 u
WHERE JSON_EXTRACT(u.kyc_status, '$.phone') IS NOT NULL

UNION ALL

SELECT 
    u.id as user_id,
    'IDENTITY' as type,
    CASE WHEN u.kyc_verified = true AND JSON_EXTRACT(u.kyc_status, '$.identity') = true 
         THEN 'APPROVED' ELSE 'PENDING' END as status,
    u.identity_verified_at as verified_at,
    u.created_at,
    u.updated_at
FROM users_v1 u
WHERE JSON_EXTRACT(u.kyc_status, '$.identity') IS NOT NULL;

-- ================================================================
-- DISPUTES & TICKETS MIGRATION
-- ================================================================

-- 2.12: Migrate disputes with enhanced structure
INSERT INTO disputes (
    id, order_id, buyer_id, seller_id, reason, description, status, priority,
    assigned_to, resolution, resolved_at, created_at, updated_at
)
SELECT 
    d.id,
    d.order_id,
    d.user_id as buyer_id,
    d.seller_id,
    d.reason,
    d.description,
    CASE d.status
        WHEN 'pending' THEN 'PENDING'
        WHEN 'resolved' THEN 'RESOLVED'
        WHEN 'closed' THEN 'CLOSED'
        ELSE 'PENDING'
    END as status,
    CASE d.priority
        WHEN 'low' THEN 'LOW'
        WHEN 'medium' THEN 'MEDIUM'
        WHEN 'high' THEN 'HIGH'
        WHEN 'urgent' THEN 'URGENT'
        ELSE 'MEDIUM'
    END as priority,
    d.assigned_to,
    d.resolution,
    d.resolved_at,
    d.created_at,
    d.updated_at
FROM disputes_v1 d;

-- 2.13: Migrate tickets with enhanced structure
INSERT INTO tickets (
    id, ticket_number, user_id, subject, message, status, priority, category,
    assigned_to, resolved_at, created_at, updated_at
)
SELECT 
    t.id,
    CONCAT('TKT-', DATE_FORMAT(t.created_at, '%Y%m%d'), '-', LPAD(t.id, 6, '0')) as ticket_number,
    t.user_id,
    t.subject,
    t.message,
    CASE t.status
        WHEN 'open' THEN 'OPEN'
        WHEN 'in_progress' THEN 'IN_PROGRESS'
        WHEN 'resolved' THEN 'RESOLVED'
        WHEN 'closed' THEN 'CLOSED'
        ELSE 'OPEN'
    END as status,
    CASE t.priority
        WHEN 'low' THEN 'LOW'
        WHEN 'medium' THEN 'MEDIUM'
        WHEN 'high' THEN 'HIGH'
        WHEN 'urgent' THEN 'URGENT'
        ELSE 'MEDIUM'
    END as priority,
    t.category,
    t.assigned_to,
    t.resolved_at,
    t.created_at,
    t.updated_at
FROM tickets_v1 t;

-- ================================================================
-- AUDIT & ADMIN MIGRATION
-- ================================================================

-- 2.14: Migrate admin actions (if table exists)
INSERT INTO admin_actions (
    id, admin_id, action_type, target_type, target_id, description, metadata, created_at
)
SELECT id, admin_id, action_type, target_type, target_id, description, metadata, created_at
FROM admin_actions_v1
WHERE admin_actions_v1.created_at IS NOT NULL;

-- 2.15: Migrate audit logs (if table exists)
INSERT INTO audit_logs (
    id, user_id, action, entity_type, entity_id, old_values, new_values, 
    ip_address, user_agent, created_at
)
SELECT 
    id, user_id, action, entity_type, entity_id, old_values, new_values,
    ip_address, user_agent, created_at
FROM audit_logs_v1
WHERE audit_logs_v1.created_at IS NOT NULL;

-- 2.16: Migrate system logs (if table exists)
INSERT INTO system_logs (id, level, message, context, user_id, ip_address, user_agent, created_at)
SELECT 
    id, 
    CASE level
        WHEN 'debug' THEN 'DEBUG'
        WHEN 'info' THEN 'INFO'
        WHEN 'warn' THEN 'WARN'
        WHEN 'error' THEN 'ERROR'
        ELSE 'INFO'
    END as level,
    message, context, user_id, ip_address, user_agent, created_at
FROM system_logs_v1
WHERE system_logs_v1.created_at IS NOT NULL;

-- 2.17: Migrate payouts (if table exists)
INSERT INTO payouts (
    id, seller_id, amount, fee_amount, net_amount, currency, status, method,
    reference, description, notes, requested_at, processed_at, completed_at,
    created_at, updated_at
)
SELECT 
    id, seller_id, amount, 
    amount * 0.03 as fee_amount, -- Assume 3% fee
    amount * 0.97 as net_amount,
    'USD' as currency,
    CASE status
        WHEN 'pending' THEN 'PENDING'
        WHEN 'processing' THEN 'PROCESSING'
        WHEN 'completed' THEN 'COMPLETED'
        WHEN 'failed' THEN 'FAILED'
        ELSE 'PENDING'
    END as status,
    method, reference, description, notes,
    request_date as requested_at, process_date as processed_at, completed_date as completed_at,
    created_at, updated_at
FROM payouts_v1;

-- ================================================================
-- POST-MIGRATION UPDATES
-- ================================================================

-- 3.1: Update product rating averages and counts
UPDATE products p SET 
    rating_avg = (
        SELECT COALESCE(AVG(rating), 0) 
        FROM product_reviews pr 
        WHERE pr.product_id = p.id
    ),
    rating_count = (
        SELECT COUNT(*) 
        FROM product_reviews pr 
        WHERE pr.product_id = p.id
    );

-- 3.2: Update product sales counts
UPDATE products p SET 
    sales_count = (
        SELECT COALESCE(SUM(oi.quantity), 0)
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.product_id = p.id AND o.status = 'COMPLETED'
    );

-- 3.3: Set primary images for products without them
UPDATE product_images pi
JOIN (
    SELECT product_id, MIN(id) as first_image_id
    FROM product_images
    GROUP BY product_id
) first_images ON pi.product_id = first_images.product_id AND pi.id = first_images.first_image_id
SET pi.is_primary = true
WHERE pi.product_id NOT IN (
    SELECT DISTINCT product_id 
    FROM product_images 
    WHERE is_primary = true
);

-- ================================================================
-- VERIFICATION QUERIES
-- ================================================================

-- Verify migration completeness
SELECT 
    'users' as table_name,
    (SELECT COUNT(*) FROM users_v1) as v1_count,
    (SELECT COUNT(*) FROM users) as v2_count,
    (SELECT COUNT(*) FROM users) - (SELECT COUNT(*) FROM users_v1) as difference
    
UNION ALL

SELECT 
    'products' as table_name,
    (SELECT COUNT(*) FROM products_v1) as v1_count,
    (SELECT COUNT(*) FROM products) as v2_count,
    (SELECT COUNT(*) FROM products) - (SELECT COUNT(*) FROM products_v1) as difference
    
UNION ALL

SELECT 
    'orders' as table_name,
    (SELECT COUNT(*) FROM orders_v1) as v1_count,
    (SELECT COUNT(*) FROM orders) as v2_count,
    (SELECT COUNT(*) FROM orders) - (SELECT COUNT(*) FROM orders_v1) as difference;

-- ================================================================
-- CLEANUP (RUN AFTER VALIDATION)
-- ================================================================

-- After validating the migration, uncomment these to clean up v1 tables:
-- DROP TABLE IF EXISTS users_v1;
-- DROP TABLE IF EXISTS products_v1;
-- DROP TABLE IF EXISTS orders_v1;
-- DROP TABLE IF EXISTS order_items_v1;
-- DROP TABLE IF EXISTS cart_v1;
-- DROP TABLE IF EXISTS wishlist_v1;
-- DROP TABLE IF EXISTS disputes_v1;
-- DROP TABLE IF EXISTS tickets_v1;
-- DROP TABLE IF EXISTS admin_actions_v1;
-- DROP TABLE IF EXISTS audit_logs_v1;
-- DROP TABLE IF EXISTS system_logs_v1;
-- DROP TABLE IF EXISTS payouts_v1;

-- ================================================================
-- PERFORMANCE OPTIMIZATION
-- ================================================================

-- Analyze tables for query optimization
ANALYZE TABLE users, products, orders, order_items, cart_items, wishlist_items, 
             disputes, tickets, kyc_verifications, product_reviews, product_images;

-- Update statistics
FLUSH STATUS;

-- ================================================================
-- MIGRATION COMPLETE
-- ================================================================

SELECT 'Migration to NXOLand Database v2.0 completed successfully!' as status;
