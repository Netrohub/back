-- Migration: Add username field and populate it
-- This migration adds a username field and populates it with existing name data

-- Step 1: Add username column
ALTER TABLE users ADD COLUMN username VARCHAR(50) NULL;

-- Step 2: Populate username field with existing name data (which contains usernames)
UPDATE users SET username = name WHERE username IS NULL;

-- Step 3: Make username field NOT NULL and UNIQUE
ALTER TABLE users MODIFY COLUMN username VARCHAR(50) NOT NULL;
ALTER TABLE users ADD UNIQUE KEY unique_username (username);

-- Step 4: Update name field to contain proper names instead of usernames
-- For users where name looks like a username (no spaces, contains numbers/special chars)
-- we'll set name to a more appropriate format
UPDATE users 
SET name = CONCAT('User ', id)
WHERE name REGEXP '^[a-zA-Z0-9_]+$' 
  AND LENGTH(name) <= 20 
  AND name NOT LIKE '% %';

-- For the Super Admin, set a proper name
UPDATE users 
SET name = 'Super Administrator'
WHERE name = 'Super Admin';

-- Add index for username field
CREATE INDEX idx_users_username ON users(username);
