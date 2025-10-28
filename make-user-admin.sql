-- ============================================
-- Make User Admin - Quick SQL Script
-- ============================================
-- 
-- This script grants admin role to a user
-- Replace 'USER_EMAIL_HERE' with actual email
--
-- ============================================

-- METHOD 1: Make user admin by EMAIL (Recommended)
-- Replace 'USER_EMAIL_HERE' with actual email address

INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW()
FROM users u, roles r
WHERE u.email = 'USER_EMAIL_HERE' -- ← CHANGE THIS
AND r.slug = 'admin'
ON CONFLICT (user_id, role_id) DO NOTHING;


-- ============================================
-- METHOD 2: Make user admin by USERNAME
-- Uncomment and replace 'USERNAME_HERE'
-- ============================================

/*
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW()
FROM users u, roles r
WHERE u.username = 'USERNAME_HERE' -- ← CHANGE THIS
AND r.slug = 'admin'
ON CONFLICT (user_id, role_id) DO NOTHING;
*/


-- ============================================
-- METHOD 3: Make user admin by USER ID
-- Uncomment and replace USER_ID
-- ============================================

/*
INSERT INTO user_roles (user_id, role_id, granted_at)
VALUES (
    USER_ID,  -- ← CHANGE THIS (e.g., 1, 5, 10)
    (SELECT id FROM roles WHERE slug = 'admin'),
    NOW()
)
ON CONFLICT (user_id, role_id) DO NOTHING;
*/


-- ============================================
-- VERIFICATION: Check if user is now admin
-- Replace 'USER_EMAIL_HERE' with actual email
-- ============================================

SELECT 
    u.id,
    u.username,
    u.email,
    STRING_AGG(r.slug, ', ') as roles,
    STRING_AGG(r.name, ', ') as role_names
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email = 'USER_EMAIL_HERE'  -- ← CHANGE THIS
GROUP BY u.id, u.username, u.email;


-- ============================================
-- HELPER: Find users by partial email
-- ============================================

/*
SELECT id, username, email, created_at
FROM users
WHERE email LIKE '%test%'
OR username LIKE '%test%'
ORDER BY created_at DESC
LIMIT 10;
*/


-- ============================================
-- HELPER: Show all admin users
-- ============================================

/*
SELECT 
    u.id,
    u.username,
    u.email,
    ur.granted_at
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE r.slug = 'admin'
ORDER BY ur.granted_at DESC;
*/


-- ============================================
-- HELPER: Show all available roles
-- ============================================

/*
SELECT id, slug, name, description, is_active
FROM roles
ORDER BY slug;
*/


-- ============================================
-- HELPER: Remove admin role from user
-- ============================================

/*
DELETE FROM user_roles
WHERE user_id = (SELECT id FROM users WHERE email = 'USER_EMAIL_HERE')
AND role_id = (SELECT id FROM roles WHERE slug = 'admin');
*/


-- ============================================
-- ADVANCED: Grant admin to multiple users
-- ============================================

/*
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW()
FROM users u, roles r
WHERE u.email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
)
AND r.slug = 'admin'
ON CONFLICT (user_id, role_id) DO NOTHING;
*/


-- ============================================
-- ADVANCED: Grant admin with expiration
-- ============================================

/*
INSERT INTO user_roles (user_id, role_id, granted_at, expires_at)
VALUES (
    (SELECT id FROM users WHERE email = 'USER_EMAIL_HERE'),
    (SELECT id FROM roles WHERE slug = 'admin'),
    NOW(),
    NOW() + INTERVAL '7 days'  -- Expires in 7 days
)
ON CONFLICT (user_id, role_id) DO NOTHING;
*/


-- ============================================
-- TROUBLESHOOTING: Create admin role if missing
-- ============================================

/*
INSERT INTO roles (name, slug, description, is_active, created_at, updated_at)
VALUES ('Admin', 'admin', 'Full system access', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;
*/
