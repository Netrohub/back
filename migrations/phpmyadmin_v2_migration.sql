-- ================================================================
-- NXOLand Database v2.0 Migration - phpMyAdmin Compatible
-- Complete migration from v1.0 to v2.0 with table creation
-- Execute this script in phpMyAdmin SQL tab
-- ================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Disable foreign key checks during migration
SET FOREIGN_KEY_CHECKS = 0;

-- ================================================================
-- STEP 1: BACKUP EXISTING TABLES (Rename to _v1)
-- ================================================================

-- Backup existing tables by renaming them
RENAME TABLE 
    users TO users_v1,
    products TO products_v1,
    orders TO orders_v1,
    order_items TO order_items_v1,
    cart TO cart_v1,
    wishlist TO wishlist_v1;

-- Backup other tables if they exist
RENAME TABLE disputes TO disputes_v1;
RENAME TABLE tickets TO tickets_v1;
RENAME TABLE admin_actions TO admin_actions_v1;
RENAME TABLE audit_logs TO audit_logs_v1;
RENAME TABLE system_logs TO system_logs_v1;
RENAME TABLE payouts TO payouts_v1;

-- ================================================================
-- STEP 2: CREATE v2.0 TABLES (DDL)
-- ================================================================

-- Create roles table
CREATE TABLE `roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `permissions` json,
    `is_active` tinyint(1) NOT NULL DEFAULT '1',
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `roles_name_key` (`name`),
    UNIQUE KEY `roles_slug_key` (`slug`),
    KEY `idx_roles_slug` (`slug`),
    KEY `idx_roles_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create users table (v2)
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `avatar` text COLLATE utf8mb4_unicode_ci,
    `email_verified_at` datetime(3) DEFAULT NULL,
    `phone_verified_at` datetime(3) DEFAULT NULL,
    `is_active` tinyint(1) NOT NULL DEFAULT '1',
    `is_banned` tinyint(1) NOT NULL DEFAULT '0',
    `banned_until` datetime(3) DEFAULT NULL,
    `ban_reason` text COLLATE utf8mb4_unicode_ci,
    `last_login_at` datetime(3) DEFAULT NULL,
    `login_attempts` int NOT NULL DEFAULT '0',
    `locked_until` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_username_key` (`username`),
    UNIQUE KEY `users_email_key` (`email`),
    KEY `idx_users_email` (`email`),
    KEY `idx_users_username` (`username`),
    KEY `idx_users_is_active` (`is_active`),
    KEY `idx_users_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create user_roles table
CREATE TABLE `user_roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `role_id` int NOT NULL,
    `granted_by` int DEFAULT NULL,
    `granted_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_roles_user_id_role_id_key` (`user_id`,`role_id`),
    KEY `idx_user_roles_user_id` (`user_id`),
    KEY `idx_user_roles_role_id` (`role_id`),
    CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create categories table
CREATE TABLE `categories` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `parent_id` int DEFAULT NULL,
    `sort_order` int NOT NULL DEFAULT '0',
    `is_active` tinyint(1) NOT NULL DEFAULT '1',
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `categories_slug_key` (`slug`),
    KEY `idx_categories_slug` (`slug`),
    KEY `idx_categories_parent_id` (`parent_id`),
    KEY `idx_categories_is_active` (`is_active`),
    KEY `idx_categories_sort_order` (`sort_order`),
    CONSTRAINT `categories_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create products table (v2)
CREATE TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `price` decimal(10,2) NOT NULL,
    `discount_price` decimal(10,2) DEFAULT NULL,
    `category_id` int NOT NULL,
    `seller_id` int NOT NULL,
    `platform` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `game` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `account_level` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `account_username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `status` enum('DRAFT','PENDING','ACTIVE','SOLD','INACTIVE','REJECTED','SUSPENDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    `stock_quantity` int NOT NULL DEFAULT '1',
    `delivery_time` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
    `setup_instructions` text COLLATE utf8mb4_unicode_ci,
    `views_count` int NOT NULL DEFAULT '0',
    `sales_count` int NOT NULL DEFAULT '0',
    `rating_avg` decimal(3,2) NOT NULL DEFAULT '0.00',
    `rating_count` int NOT NULL DEFAULT '0',
    `is_featured` tinyint(1) NOT NULL DEFAULT '0',
    `featured_until` datetime(3) DEFAULT NULL,
    `metadata` json DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `deleted_at` datetime(3) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `products_slug_key` (`slug`),
    KEY `idx_products_category_id` (`category_id`),
    KEY `idx_products_seller_id` (`seller_id`),
    KEY `idx_products_status` (`status`),
    KEY `idx_products_is_featured` (`is_featured`),
    KEY `idx_products_price` (`price`),
    KEY `idx_products_rating_avg` (`rating_avg`),
    KEY `idx_products_views_count` (`views_count`),
    KEY `idx_products_sales_count` (`sales_count`),
    KEY `idx_products_created_at` (`created_at`),
    KEY `idx_products_platform` (`platform`),
    FULLTEXT KEY `products_name_description_fulltext` (`name`,`description`),
    CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `products_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create product_images table
CREATE TABLE `product_images` (
    `id` int NOT NULL AUTO_INCREMENT,
    `product_id` int NOT NULL,
    `image_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `sort_order` int NOT NULL DEFAULT '0',
    `is_primary` tinyint(1) NOT NULL DEFAULT '0',
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_product_images_product_id` (`product_id`),
    KEY `idx_product_images_is_primary` (`is_primary`),
    KEY `idx_product_images_sort_order` (`sort_order`),
    CONSTRAINT `product_images_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create product_reviews table
CREATE TABLE `product_reviews` (
    `id` int NOT NULL AUTO_INCREMENT,
    `product_id` int NOT NULL,
    `user_id` int NOT NULL,
    `order_id` int NOT NULL,
    `rating` int NOT NULL,
    `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `comment` text COLLATE utf8mb4_unicode_ci,
    `is_verified` tinyint(1) NOT NULL DEFAULT '0',
    `helpful_count` int NOT NULL DEFAULT '0',
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `product_reviews_user_id_product_id_order_id_key` (`user_id`,`product_id`,`order_id`),
    KEY `idx_product_reviews_product_id` (`product_id`),
    KEY `idx_product_reviews_user_id` (`user_id`),
    KEY `idx_product_reviews_rating` (`rating`),
    KEY `idx_product_reviews_created_at` (`created_at`),
    CONSTRAINT `product_reviews_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `product_reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `product_reviews_chk_1` CHECK ((`rating` >= 1) and (`rating` <= 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create orders table (v2)
CREATE TABLE `orders` (
    `id` int NOT NULL AUTO_INCREMENT,
    `order_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `buyer_id` int NOT NULL,
    `seller_id` int NOT NULL,
    `subtotal` decimal(10,2) NOT NULL,
    `service_fee` decimal(10,2) NOT NULL,
    `discount_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
    `total_amount` decimal(10,2) NOT NULL,
    `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','COMPLETED','CANCELLED','REFUNDED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    `payment_status` enum('PENDING','PAID','FAILED','REFUNDED','PARTIAL_REFUND') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `payment_transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `buyer_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `buyer_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `payment_completed_at` datetime(3) DEFAULT NULL,
    `delivered_at` datetime(3) DEFAULT NULL,
    `completed_at` datetime(3) DEFAULT NULL,
    `cancelled_at` datetime(3) DEFAULT NULL,
    `refunded_at` datetime(3) DEFAULT NULL,
    `notes` text COLLATE utf8mb4_unicode_ci,
    `metadata` json DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `orders_order_number_key` (`order_number`),
    KEY `idx_orders_order_number` (`order_number`),
    KEY `idx_orders_buyer_id` (`buyer_id`),
    KEY `idx_orders_seller_id` (`seller_id`),
    KEY `idx_orders_status` (`status`),
    KEY `idx_orders_payment_status` (`payment_status`),
    KEY `idx_orders_created_at` (`created_at`),
    CONSTRAINT `orders_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `orders_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create order_items table (v2)
CREATE TABLE `order_items` (
    `id` int NOT NULL AUTO_INCREMENT,
    `order_id` int NOT NULL,
    `product_id` int NOT NULL,
    `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `quantity` int NOT NULL,
    `unit_price` decimal(10,2) NOT NULL,
    `total_price` decimal(10,2) NOT NULL,
    `metadata` json DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_order_items_order_id` (`order_id`),
    KEY `idx_order_items_product_id` (`product_id`),
    CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create transactions table
CREATE TABLE `transactions` (
    `id` int NOT NULL AUTO_INCREMENT,
    `order_id` int NOT NULL,
    `user_id` int NOT NULL,
    `type` enum('PAYMENT','REFUND','PAYOUT','FEE','CHARGEBACK') COLLATE utf8mb4_unicode_ci NOT NULL,
    `amount` decimal(10,2) NOT NULL,
    `fee_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
    `net_amount` decimal(10,2) NOT NULL,
    `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
    `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `status` enum('PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `gateway` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `gateway_response` json DEFAULT NULL,
    `processed_at` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_transactions_order_id` (`order_id`),
    KEY `idx_transactions_user_id` (`user_id`),
    KEY `idx_transactions_status` (`status`),
    KEY `idx_transactions_type` (`type`),
    KEY `idx_transactions_created_at` (`created_at`),
    CONSTRAINT `transactions_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create cart_items table (v2)
CREATE TABLE `cart_items` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `product_id` int NOT NULL,
    `quantity` int NOT NULL DEFAULT '1',
    `status` enum('ACTIVE','SAVED_FOR_LATER','ABANDONED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `cart_items_user_id_product_id_status_key` (`user_id`,`product_id`,`status`),
    KEY `idx_cart_items_user_id` (`user_id`),
    KEY `idx_cart_items_product_id` (`product_id`),
    CONSTRAINT `cart_items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `cart_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create wishlist_items table (v2)
CREATE TABLE `wishlist_items` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `product_id` int NOT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `wishlist_items_user_id_product_id_key` (`user_id`,`product_id`),
    KEY `idx_wishlist_items_user_id` (`user_id`),
    KEY `idx_wishlist_items_product_id` (`product_id`),
    CONSTRAINT `wishlist_items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `wishlist_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create coupons table
CREATE TABLE `coupons` (
    `id` int NOT NULL AUTO_INCREMENT,
    `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `type` enum('PERCENTAGE','FIXED_AMOUNT','FREE_SHIPPING') COLLATE utf8mb4_unicode_ci NOT NULL,
    `value` decimal(10,2) NOT NULL,
    `min_amount` decimal(10,2) DEFAULT NULL,
    `max_discount` decimal(10,2) DEFAULT NULL,
    `usage_limit` int DEFAULT NULL,
    `user_limit` int DEFAULT NULL,
    `used_count` int NOT NULL DEFAULT '0',
    `is_active` tinyint(1) NOT NULL DEFAULT '1',
    `starts_at` datetime(3) DEFAULT NULL,
    `expires_at` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `coupons_code_key` (`code`),
    KEY `idx_coupons_code` (`code`),
    KEY `idx_coupons_is_active` (`is_active`),
    KEY `idx_coupons_expires_at` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create disputes table (v2)
CREATE TABLE `disputes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `order_id` int NOT NULL,
    `buyer_id` int NOT NULL,
    `seller_id` int NOT NULL,
    `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `status` enum('PENDING','INVESTIGATING','RESOLVED','CLOSED','ESCALATED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    `priority` enum('LOW','MEDIUM','HIGH','URGENT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MEDIUM',
    `assigned_to` int DEFAULT NULL,
    `resolution` text COLLATE utf8mb4_unicode_ci,
    `resolved_at` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_disputes_order_id` (`order_id`),
    KEY `idx_disputes_buyer_id` (`buyer_id`),
    KEY `idx_disputes_seller_id` (`seller_id`),
    KEY `idx_disputes_status` (`status`),
    KEY `idx_disputes_priority` (`priority`),
    KEY `idx_disputes_assigned_to` (`assigned_to`),
    KEY `idx_disputes_created_at` (`created_at`),
    CONSTRAINT `disputes_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `disputes_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `disputes_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `disputes_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- STEP 3: INSERT DEFAULT DATA
-- ================================================================

-- Insert default roles
INSERT INTO roles (name, slug, description, permissions, created_at, updated_at) VALUES
('Super Admin', 'super_admin', 'Full system access', '{"*": ["*"]}', NOW(), NOW()),
('Admin', 'admin', 'Administrative access', '{"users": ["read", "update"], "products": ["*"], "orders": ["*"], "disputes": ["*"]}', NOW(), NOW()),
('Moderator', 'moderator', 'Content moderation', '{"products": ["read", "update", "approve", "reject"], "disputes": ["read", "update"]}', NOW(), NOW()),
('Seller', 'seller', 'Seller permissions', '{"products": ["create", "read", "update"], "orders": ["read"], "payouts": ["read", "create"]}', NOW(), NOW()),
('User', 'user', 'Basic user permissions', '{"products": ["read"], "orders": ["create", "read"]}', NOW(), NOW());

-- Insert default categories
INSERT INTO categories (name, slug, description, is_active, sort_order, created_at, updated_at) VALUES
-- Gaming Categories
('PlayStation', 'playstation', 'PlayStation gaming accounts', 1, 1, NOW(), NOW()),
('Xbox', 'xbox', 'Xbox gaming accounts', 1, 2, NOW(), NOW()),
('Steam', 'steam', 'Steam gaming accounts', 1, 3, NOW(), NOW()),
('Epic Games', 'epic-games', 'Epic Games accounts', 1, 4, NOW(), NOW()),
('Nintendo', 'nintendo', 'Nintendo gaming accounts', 1, 5, NOW(), NOW()),
('Mobile Gaming', 'mobile-gaming', 'Mobile gaming accounts', 1, 6, NOW(), NOW()),
-- Social Media Categories
('Instagram', 'instagram', 'Instagram accounts', 1, 10, NOW(), NOW()),
('Twitter', 'twitter', 'Twitter accounts', 1, 11, NOW(), NOW()),
('TikTok', 'tiktok', 'TikTok accounts', 1, 12, NOW(), NOW()),
('YouTube', 'youtube', 'YouTube channels', 1, 13, NOW(), NOW()),
('Facebook', 'facebook', 'Facebook accounts', 1, 14, NOW(), NOW()),
('LinkedIn', 'linkedin', 'LinkedIn accounts', 1, 15, NOW(), NOW()),
('Snapchat', 'snapchat', 'Snapchat accounts', 1, 16, NOW(), NOW()),
('Discord', 'discord', 'Discord accounts', 1, 17, NOW(), NOW()),
('Twitch', 'twitch', 'Twitch accounts', 1, 18, NOW(), NOW()),
('Reddit', 'reddit', 'Reddit accounts', 1, 19, NOW(), NOW());

-- ================================================================
-- STEP 4: MIGRATE DATA FROM v1 TO v2
-- ================================================================

-- Migrate users data
INSERT INTO users (
    id, username, name, email, password, phone, avatar,
    email_verified_at, phone_verified_at, is_active,
    last_login_at, login_attempts, locked_until,
    created_at, updated_at
)
SELECT 
    id, 
    COALESCE(username, CONCAT('user_', id)) as username,
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
FROM users_v1;

-- Migrate user roles from JSON to normalized structure
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

-- Migrate products with category mapping
INSERT INTO products (
    id, name, slug, description, price, discount_price, category_id, seller_id,
    platform, game, account_level, account_username, status, stock_quantity,
    delivery_time, setup_instructions, views_count, sales_count, rating_avg,
    rating_count, is_featured, featured_until, metadata, created_at, updated_at
)
SELECT 
    p.id,
    p.name,
    LOWER(REPLACE(REPLACE(REGEXP_REPLACE(p.name, '[^a-zA-Z0-9\\s]', ''), ' ', '-'), '--', '-')) as slug,
    p.description,
    p.price,
    NULL as discount_price,
    COALESCE(c.id, 1) as category_id,
    p.seller_id,
    p.category as platform,
    NULL as game,
    NULL as account_level,  
    NULL as account_username,
    CASE p.status 
        WHEN 'active' THEN 'ACTIVE'
        WHEN 'pending' THEN 'PENDING'
        WHEN 'inactive' THEN 'INACTIVE'
        ELSE 'DRAFT'
    END as status,
    1 as stock_quantity,
    'instant' as delivery_time,
    NULL as setup_instructions,
    0 as views_count,
    0 as sales_count,
    0.00 as rating_avg,
    0 as rating_count,
    0 as is_featured,
    NULL as featured_until,
    NULL as metadata,
    p.created_at,
    p.updated_at
FROM products_v1 p
LEFT JOIN categories c ON c.slug = LOWER(REPLACE(p.category, ' ', '-'));

-- Migrate product images from JSON to table
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT 
    p.id as product_id,
    jt.image_url,
    p.name as alt_text,
    (jt.row_number - 1) as sort_order,
    CASE WHEN jt.row_number = 1 THEN 1 ELSE 0 END as is_primary
FROM products_v1 p
CROSS JOIN JSON_TABLE(
    COALESCE(p.images, '[]'), 
    '$[*]' COLUMNS (
        row_number FOR ORDINALITY,
        image_url VARCHAR(500) PATH '$'
    )
) jt
WHERE p.images IS NOT NULL AND JSON_LENGTH(p.images) > 0;

-- Migrate orders with enhanced structure
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
        (SELECT p.seller_id FROM order_items_v1 oi 
         JOIN products_v1 p ON oi.product_id = p.id 
         WHERE oi.order_id = o.id LIMIT 1), 
        o.user_id
    ) as seller_id,
    o.total_amount * 0.95 as subtotal,
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
    NULL as payment_transaction_id,
    NULL as buyer_email,
    NULL as buyer_phone,
    NULL as notes,
    NULL as metadata,
    CASE WHEN o.payment_status = 'paid' THEN o.updated_at ELSE NULL END as payment_completed_at,
    o.created_at,
    o.updated_at
FROM orders_v1 o;

-- Migrate order items
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

-- Migrate cart items with status enum
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

-- Migrate wishlist items
INSERT INTO wishlist_items (id, user_id, product_id, created_at)
SELECT id, user_id, product_id, created_at
FROM wishlist_v1;

-- Migrate disputes if table exists
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

-- ================================================================
-- STEP 5: POST-MIGRATION UPDATES & VERIFICATION
-- ================================================================

-- Update product sales counts
UPDATE products p SET 
    sales_count = (
        SELECT COALESCE(SUM(oi.quantity), 0)
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.product_id = p.id AND o.status = 'COMPLETED'
    );

-- Set primary images for products without them
UPDATE product_images pi
JOIN (
    SELECT product_id, MIN(id) as first_image_id
    FROM product_images
    GROUP BY product_id
) first_images ON pi.product_id = first_images.product_id AND pi.id = first_images.first_image_id
SET pi.is_primary = 1
WHERE pi.product_id NOT IN (
    SELECT DISTINCT product_id 
    FROM product_images 
    WHERE is_primary = 1
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ================================================================
-- STEP 6: VERIFICATION QUERIES
-- ================================================================

-- Migration verification report
SELECT 
    'MIGRATION VERIFICATION REPORT' as report_title,
    NOW() as generated_at;

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
    (SELECT COUNT(*) FROM orders) - (SELECT COUNT(*) FROM orders_v1) as difference
    
UNION ALL

SELECT 
    'order_items' as table_name,
    (SELECT COUNT(*) FROM order_items_v1) as v1_count,
    (SELECT COUNT(*) FROM order_items) as v2_count,
    (SELECT COUNT(*) FROM order_items) - (SELECT COUNT(*) FROM order_items_v1) as difference;

-- Check for any missing relationships
SELECT 'Missing category mappings' as check_name, COUNT(*) as count
FROM products WHERE category_id = 1;

SELECT 'Products without primary images' as check_name, COUNT(*) as count
FROM products p 
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
WHERE pi.id IS NULL;

-- Performance check
SELECT 'Database optimization' as status, 'Analyzing tables...' as message;
ANALYZE TABLE users, products, orders, order_items, cart_items, wishlist_items, disputes;

-- ================================================================
-- MIGRATION COMPLETED SUCCESSFULLY
-- ================================================================

COMMIT;

SELECT 
    'SUCCESS' as status, 
    'NXOLand Database v2.0 migration completed successfully!' as message,
    NOW() as completed_at;

-- ================================================================
-- CLEANUP INSTRUCTIONS (RUN AFTER VALIDATION)
-- ================================================================

/*
After validating the migration results, you can clean up v1 tables by running:

DROP TABLE IF EXISTS users_v1;
DROP TABLE IF EXISTS products_v1;
DROP TABLE IF EXISTS orders_v1;
DROP TABLE IF EXISTS order_items_v1;
DROP TABLE IF EXISTS cart_v1;
DROP TABLE IF EXISTS wishlist_v1;
DROP TABLE IF EXISTS disputes_v1;
DROP TABLE IF EXISTS tickets_v1;
DROP TABLE IF EXISTS admin_actions_v1;
DROP TABLE IF EXISTS audit_logs_v1;
DROP TABLE IF EXISTS system_logs_v1;
DROP TABLE IF EXISTS payouts_v1;
*/
