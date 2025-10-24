-- Fix undefined usernames in the users table
-- This script updates users with 'undefined undefined' or similar names

-- Update names for users where the name is 'undefined undefined'
-- or contains 'undefined' (case-insensitive)
-- It sets the name to the part of the email before the '@' symbol.
UPDATE users
SET name = SUBSTRING_INDEX(email, '@', 1)
WHERE name = 'undefined undefined'
   OR name LIKE '%undefined%'
   OR name IS NULL 
   OR name = '';

-- Optional: Verify the changes
SELECT id, name, email, created_at
FROM users
WHERE name LIKE '%undefined%'
   OR name IS NULL 
   OR name = '';
