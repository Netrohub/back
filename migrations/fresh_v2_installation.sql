-- ================================================================
-- NXOLand Database v2.0 - Fresh Installation
-- Complete database setup with sample data for new installation
-- Execute this script in phpMyAdmin SQL tab for clean v2.0 setup
-- ================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Disable foreign key checks during installation
SET FOREIGN_KEY_CHECKS = 0;

-- ================================================================
-- DROP EXISTING TABLES (Clean Install)
-- ================================================================
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS wishlist_items;
DROP TABLE IF EXISTS dispute_messages;
DROP TABLE IF EXISTS dispute_evidence;
DROP TABLE IF EXISTS ticket_messages;
DROP TABLE IF EXISTS kyc_verifications;
DROP TABLE IF EXISTS password_resets;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS admin_actions;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS system_logs;
DROP TABLE IF EXISTS admin_invites;
DROP TABLE IF EXISTS payouts;
DROP TABLE IF EXISTS disputes;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- ================================================================
-- CREATE v2.0 TABLES
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

-- Create users table
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

-- Create products table
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

-- Create orders table
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

-- Create order_items table
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

-- Create cart_items table
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

-- Create wishlist_items table
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

-- Create disputes table
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

-- Create tickets table
CREATE TABLE `tickets` (
    `id` int NOT NULL AUTO_INCREMENT,
    `ticket_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `user_id` int NOT NULL,
    `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `status` enum('OPEN','IN_PROGRESS','WAITING_FOR_CUSTOMER','RESOLVED','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
    `priority` enum('LOW','MEDIUM','HIGH','URGENT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'MEDIUM',
    `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `assigned_to` int DEFAULT NULL,
    `resolved_at` datetime(3) DEFAULT NULL,
    `first_response_at` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `tickets_ticket_number_key` (`ticket_number`),
    KEY `idx_tickets_ticket_number` (`ticket_number`),
    KEY `idx_tickets_user_id` (`user_id`),
    KEY `idx_tickets_status` (`status`),
    KEY `idx_tickets_priority` (`priority`),
    KEY `idx_tickets_assigned_to` (`assigned_to`),
    KEY `idx_tickets_created_at` (`created_at`),
    CONSTRAINT `tickets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `tickets_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create payouts table
CREATE TABLE `payouts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `seller_id` int NOT NULL,
    `amount` decimal(10,2) NOT NULL,
    `fee_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
    `net_amount` decimal(10,2) NOT NULL,
    `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
    `status` enum('PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    `method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `notes` text COLLATE utf8mb4_unicode_ci,
    `requested_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `processed_at` datetime(3) DEFAULT NULL,
    `completed_at` datetime(3) DEFAULT NULL,
    `failed_at` datetime(3) DEFAULT NULL,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_payouts_seller_id` (`seller_id`),
    KEY `idx_payouts_status` (`status`),
    KEY `idx_payouts_requested_at` (`requested_at`),
    KEY `idx_payouts_created_at` (`created_at`),
    CONSTRAINT `payouts_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create audit_logs table
CREATE TABLE `audit_logs` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int DEFAULT NULL,
    `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `entity_id` int NOT NULL,
    `old_values` json DEFAULT NULL,
    `new_values` json DEFAULT NULL,
    `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `user_agent` text COLLATE utf8mb4_unicode_ci,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_audit_logs_user_id` (`user_id`),
    KEY `idx_audit_logs_action` (`action`),
    KEY `idx_audit_logs_entity_type` (`entity_type`),
    KEY `idx_audit_logs_entity_id` (`entity_id`),
    KEY `idx_audit_logs_created_at` (`created_at`),
    CONSTRAINT `audit_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create system_logs table
CREATE TABLE `system_logs` (
    `id` int NOT NULL AUTO_INCREMENT,
    `level` enum('DEBUG','INFO','WARN','ERROR','FATAL') COLLATE utf8mb4_unicode_ci NOT NULL,
    `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `context` json DEFAULT NULL,
    `user_id` int DEFAULT NULL,
    `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `user_agent` text COLLATE utf8mb4_unicode_ci,
    `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `idx_system_logs_level` (`level`),
    KEY `idx_system_logs_user_id` (`user_id`),
    KEY `idx_system_logs_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- INSERT SEED DATA
-- ================================================================

-- Insert default roles
INSERT INTO roles (name, slug, description, permissions, created_at, updated_at) VALUES
('Super Admin', 'super_admin', 'Full system access', '{"*": ["*"]}', NOW(), NOW()),
('Admin', 'admin', 'Administrative access', '{"users": ["read", "update"], "products": ["*"], "orders": ["*"], "disputes": ["*"]}', NOW(), NOW()),
('Moderator', 'moderator', 'Content moderation', '{"products": ["read", "update", "approve", "reject"], "disputes": ["read", "update"]}', NOW(), NOW()),
('Seller', 'seller', 'Seller permissions', '{"products": ["create", "read", "update"], "orders": ["read"], "payouts": ["read", "create"]}', NOW(), NOW()),
('User', 'user', 'Basic user permissions', '{"products": ["read"], "orders": ["create", "read"]}', NOW(), NOW());

-- Insert sample users
INSERT INTO users (username, name, email, password, email_verified_at, is_active, created_at, updated_at) VALUES
('admin', 'Super Administrator', 'admin@nxoland.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KjKjK.', NOW(), 1, NOW(), NOW()),
('john_seller', 'John Smith', 'john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KjKjK.', NOW(), 1, NOW(), NOW()),
('jane_buyer', 'Jane Doe', 'jane@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KjKjK.', NOW(), 1, NOW(), NOW()),
('mike_gamer', 'Mike Johnson', 'mike@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KjKjK.', NOW(), 1, NOW(), NOW()),
('sarah_social', 'Sarah Wilson', 'sarah@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KjKjK.', NOW(), 1, NOW(), NOW());

-- Assign roles to users
INSERT INTO user_roles (user_id, role_id, granted_at) VALUES
(1, 1, NOW()), -- admin -> super_admin
(2, 4, NOW()), -- john_seller -> seller
(3, 5, NOW()), -- jane_buyer -> user
(4, 4, NOW()), -- mike_gamer -> seller
(5, 4, NOW()); -- sarah_social -> seller

-- Insert categories
INSERT INTO categories (name, slug, description, is_active, sort_order, created_at, updated_at) VALUES
-- Gaming Categories
('PlayStation', 'playstation', 'PlayStation gaming accounts and related services', 1, 1, NOW(), NOW()),
('Xbox', 'xbox', 'Xbox gaming accounts and services', 1, 2, NOW(), NOW()),
('Steam', 'steam', 'Steam gaming platform accounts', 1, 3, NOW(), NOW()),
('Epic Games', 'epic-games', 'Epic Games Store accounts', 1, 4, NOW(), NOW()),
('Nintendo', 'nintendo', 'Nintendo gaming accounts', 1, 5, NOW(), NOW()),
('Mobile Gaming', 'mobile-gaming', 'Mobile gaming accounts', 1, 6, NOW(), NOW()),
-- Social Media Categories
('Instagram', 'instagram', 'Instagram accounts and services', 1, 10, NOW(), NOW()),
('Twitter', 'twitter', 'Twitter accounts and services', 1, 11, NOW(), NOW()),
('TikTok', 'tiktok', 'TikTok accounts and services', 1, 12, NOW(), NOW()),
('YouTube', 'youtube', 'YouTube channels', 1, 13, NOW(), NOW()),
('Facebook', 'facebook', 'Facebook accounts and pages', 1, 14, NOW(), NOW()),
('LinkedIn', 'linkedin', 'LinkedIn professional accounts', 1, 15, NOW(), NOW()),
('Snapchat', 'snapchat', 'Snapchat accounts', 1, 16, NOW(), NOW()),
('Discord', 'discord', 'Discord accounts and servers', 1, 17, NOW(), NOW()),
('Twitch', 'twitch', 'Twitch streaming accounts', 1, 18, NOW(), NOW()),
('Reddit', 'reddit', 'Reddit accounts', 1, 19, NOW(), NOW());

-- Insert sample products
INSERT INTO products (name, slug, description, price, category_id, seller_id, platform, game, account_level, account_username, status, views_count, sales_count, rating_avg, rating_count, is_featured, created_at, updated_at) VALUES
('PS5 Gaming Account - Level 50', 'ps5-gaming-account-level-50', 'High-level PlayStation 5 account with multiple games and achievements', 150.00, 1, 2, 'PlayStation 5', 'Call of Duty', '50', 'ProGamer123', 'ACTIVE', 45, 3, 4.67, 3, 1, NOW(), NOW()),
('Steam Account - 100+ Games', 'steam-account-100-games', 'Steam account with over 100 games including AAA titles', 299.99, 3, 4, 'Steam', 'Various', 'Premium', 'SteamMaster', 'ACTIVE', 120, 8, 4.88, 8, 1, NOW(), NOW()),
('Instagram Influencer Account', 'instagram-influencer-account', 'Instagram account with 50K+ followers in fashion niche', 500.00, 7, 5, 'Instagram', NULL, '50K Followers', '@fashion_queen', 'ACTIVE', 89, 2, 4.50, 2, 0, NOW(), NOW()),
('YouTube Gaming Channel', 'youtube-gaming-channel', 'Monetized YouTube channel focused on gaming content', 750.00, 10, 2, 'YouTube', 'Gaming', '10K Subscribers', 'GameReviews Pro', 'ACTIVE', 67, 1, 5.00, 1, 1, NOW(), NOW()),
('TikTok Viral Account', 'tiktok-viral-account', 'TikTok account with viral dance content and 100K+ followers', 400.00, 9, 5, 'TikTok', NULL, '100K Followers', '@dancestar', 'ACTIVE', 156, 5, 4.40, 5, 0, NOW(), NOW());

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(1, 'https://example.com/images/ps5-account-1.jpg', 'PS5 Account Screenshot 1', 0, 1),
(1, 'https://example.com/images/ps5-account-2.jpg', 'PS5 Account Screenshot 2', 1, 0),
(2, 'https://example.com/images/steam-account-1.jpg', 'Steam Library Screenshot', 0, 1),
(2, 'https://example.com/images/steam-account-2.jpg', 'Steam Profile Screenshot', 1, 0),
(3, 'https://example.com/images/instagram-profile.jpg', 'Instagram Profile Screenshot', 0, 1),
(4, 'https://example.com/images/youtube-channel.jpg', 'YouTube Channel Screenshot', 0, 1),
(5, 'https://example.com/images/tiktok-profile.jpg', 'TikTok Profile Screenshot', 0, 1);

-- Insert sample coupons
INSERT INTO coupons (code, name, description, type, value, min_amount, usage_limit, is_active, expires_at, created_at, updated_at) VALUES
('WELCOME10', 'Welcome Discount', '10% off for new customers', 'PERCENTAGE', 10.00, 50.00, 100, 1, DATE_ADD(NOW(), INTERVAL 30 DAY), NOW(), NOW()),
('SAVE25', 'Save $25', '$25 off orders over $200', 'FIXED_AMOUNT', 25.00, 200.00, 50, 1, DATE_ADD(NOW(), INTERVAL 60 DAY), NOW(), NOW()),
('GAMING20', 'Gaming Special', '20% off gaming accounts', 'PERCENTAGE', 20.00, 100.00, 75, 1, DATE_ADD(NOW(), INTERVAL 45 DAY), NOW(), NOW());

-- Insert sample orders
INSERT INTO orders (order_number, buyer_id, seller_id, subtotal, service_fee, total_amount, status, payment_status, payment_method, payment_completed_at, created_at, updated_at) VALUES
('ORD-20241027-000001', 3, 2, 142.50, 7.50, 150.00, 'COMPLETED', 'PAID', 'credit_card', NOW(), DATE_SUB(NOW(), INTERVAL 2 DAY), NOW()),
('ORD-20241027-000002', 3, 4, 284.99, 15.00, 299.99, 'PROCESSING', 'PAID', 'paypal', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), NOW()),
('ORD-20241027-000003', 4, 5, 475.00, 25.00, 500.00, 'PENDING', 'PENDING', 'bank_transfer', NULL, NOW(), NOW());

-- Insert order items
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price, created_at) VALUES
(1, 1, 'PS5 Gaming Account - Level 50', 1, 150.00, 150.00, DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 2, 'Steam Account - 100+ Games', 1, 299.99, 299.99, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, 3, 'Instagram Influencer Account', 1, 500.00, 500.00, NOW());

-- Insert sample reviews
INSERT INTO product_reviews (product_id, user_id, order_id, rating, title, comment, is_verified, created_at, updated_at) VALUES
(1, 3, 1, 5, 'Amazing Account!', 'Exactly as described. Great level and lots of unlocked content. Highly recommended!', 1, DATE_SUB(NOW(), INTERVAL 1 DAY), NOW()),
(2, 3, 2, 5, 'Incredible Game Library', 'So many games! Worth every penny. Seller was very helpful with the transfer process.', 1, DATE_SUB(NOW(), INTERVAL 12 HOUR), NOW());

-- Insert sample transactions
INSERT INTO transactions (order_id, user_id, type, amount, fee_amount, net_amount, payment_method, status, gateway, created_at, updated_at) VALUES
(1, 3, 'PAYMENT', 150.00, 4.50, 145.50, 'credit_card', 'COMPLETED', 'stripe', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW()),
(2, 3, 'PAYMENT', 299.99, 8.70, 291.29, 'paypal', 'COMPLETED', 'paypal', DATE_SUB(NOW(), INTERVAL 1 DAY), NOW());

-- Insert sample cart items
INSERT INTO cart_items (user_id, product_id, quantity, status, created_at, updated_at) VALUES
(3, 4, 1, 'ACTIVE', NOW(), NOW()),
(4, 5, 1, 'ACTIVE', NOW(), NOW());

-- Insert sample wishlist items
INSERT INTO wishlist_items (user_id, product_id, created_at) VALUES
(3, 5, NOW()),
(4, 3, NOW());

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ================================================================
-- OPTIMIZATION & FINALIZATION
-- ================================================================

-- Analyze tables for optimization
ANALYZE TABLE users, roles, user_roles, categories, products, product_images, 
             orders, order_items, transactions, cart_items, wishlist_items, 
             coupons, disputes, tickets, payouts, audit_logs, system_logs;

-- Update product statistics
UPDATE products p SET 
    rating_avg = COALESCE((SELECT AVG(rating) FROM product_reviews pr WHERE pr.product_id = p.id), 0.00),
    rating_count = COALESCE((SELECT COUNT(*) FROM product_reviews pr WHERE pr.product_id = p.id), 0);

-- ================================================================
-- INSTALLATION COMPLETE
-- ================================================================

COMMIT;

SELECT 
    'SUCCESS' as status, 
    'NXOLand Database v2.0 installed successfully!' as message,
    'Fresh installation with sample data completed.' as details,
    NOW() as completed_at;

-- Installation summary
SELECT 'INSTALLATION SUMMARY' as title;

SELECT 
    'users' as table_name,
    COUNT(*) as record_count,
    'Sample users with different roles' as description
FROM users

UNION ALL

SELECT 
    'products' as table_name,
    COUNT(*) as record_count,
    'Sample gaming and social media accounts' as description
FROM products

UNION ALL

SELECT 
    'categories' as table_name,
    COUNT(*) as record_count,
    'Gaming and social media categories' as description
FROM categories

UNION ALL

SELECT 
    'orders' as table_name,
    COUNT(*) as record_count,
    'Sample orders with different statuses' as description
FROM orders;

SELECT 
    'Database v2.0 is ready for use!' as message,
    'You can now connect your application to the new schema.' as next_step;
