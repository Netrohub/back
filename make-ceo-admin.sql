-- =============================================
-- Make CEO user an admin
-- Email: lilnetro305@gmail.com
-- Username: CEO
-- User ID: 3
-- =============================================

-- Method 1: By email (Recommended)
INSERT INTO user_roles (user_id, role_id, granted_at)
SELECT u.id, r.id, NOW()
FROM users u, roles r
WHERE u.email = 'lilnetro305@gmail.com' AND r.slug = 'admin'
ON CONFLICT (user_id, role_id) DO NOTHING;

-- Method 2: By ID (if you know it's 3)
-- INSERT INTO user_roles (user_id, role_id, granted_at)
-- VALUES (3, (SELECT id FROM roles WHERE slug = 'admin'), NOW())
-- ON CONFLICT DO NOTHING;

-- Verify the user is now admin
SELECT 
    u.id,
    u.username,
    u.email,
    STRING_AGG(r.slug, ', ') as roles
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email = 'lilnetro305@gmail.com'
GROUP BY u.id, u.username, u.email;

-- Expected result:
-- id | username | email                    | roles
-- ---+----------+--------------------------+-------------
--  3 | CEO      | lilnetro305@gmail.com    | user, admin
