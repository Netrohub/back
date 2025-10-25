-- Enhanced Database Schema Migration
-- This migration adds improved validation, admin management, and audit logging

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN is_active BOOLEAN DEFAULT TRUE,
ADD COLUMN last_login_at DATETIME NULL,
ADD COLUMN login_attempts INT DEFAULT 0,
ADD COLUMN locked_until DATETIME NULL;

-- Add indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_roles ON users(roles);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Create admin_actions table
CREATE TABLE admin_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id INT NOT NULL,
    description TEXT,
    metadata JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_admin_actions_admin_id (admin_id),
    INDEX idx_admin_actions_action_type (action_type),
    INDEX idx_admin_actions_target_type (target_type)
);

-- Create system_logs table
CREATE TABLE system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    context JSON,
    user_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_system_logs_level (level),
    INDEX idx_system_logs_user_id (user_id),
    INDEX idx_system_logs_created_at (created_at)
);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT NOT NULL,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_logs_user_id (user_id),
    INDEX idx_audit_logs_action (action),
    INDEX idx_audit_logs_entity_type (entity_type),
    INDEX idx_audit_logs_created_at (created_at)
);

-- Create admin_invites table
CREATE TABLE admin_invites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    invited_by INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_admin_invites_email (email),
    INDEX idx_admin_invites_token (token),
    INDEX idx_admin_invites_expires_at (expires_at)
);

-- Enhance disputes table
ALTER TABLE disputes 
ADD COLUMN assigned_to INT NULL,
ADD COLUMN priority VARCHAR(20) DEFAULT 'medium';

-- Add indexes for disputes
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_priority ON disputes(priority);
CREATE INDEX idx_disputes_assigned_to ON disputes(assigned_to);

-- Add foreign key for assigned_to
ALTER TABLE disputes 
ADD FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL;

-- Create a default super admin user (password: Admin123!)
INSERT INTO users (name, email, password, roles, is_active, kyc_verified, kyc_completed_at, created_at, updated_at)
VALUES (
    'Super Admin',
    'admin@nxoland.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KjKjK.', -- Admin123!
    '["super_admin"]',
    TRUE,
    TRUE,
    NOW(),
    NOW(),
    NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
