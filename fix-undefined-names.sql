-- Fix users with "undefined undefined" names
-- This script will update users who have "undefined undefined" as their name

-- First, let's see how many users have this issue
SELECT id, name, email, created_at 
FROM users 
WHERE name = 'undefined undefined' 
OR name LIKE '%undefined%';

-- Update users with "undefined undefined" to use their email prefix as name
UPDATE users 
SET name = SUBSTRING_INDEX(email, '@', 1)
WHERE name = 'undefined undefined' 
OR name LIKE '%undefined%';

-- Verify the fix
SELECT id, name, email, created_at 
FROM users 
WHERE name LIKE '%undefined%';
