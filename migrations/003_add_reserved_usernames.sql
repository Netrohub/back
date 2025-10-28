-- =============================================
-- Migration: Add reserved_usernames table
-- Optional table for preventing certain usernames
-- =============================================

-- Create reserved_usernames table (optional)
CREATE TABLE IF NOT EXISTS reserved_usernames (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_reserved_usernames_username ON reserved_usernames(LOWER(username));

-- Insert common reserved usernames
INSERT INTO reserved_usernames (username, reason) VALUES
    ('admin', 'System account'),
    ('administrator', 'System account'),
    ('root', 'System account'),
    ('system', 'System account'),
    ('support', 'Official account'),
    ('help', 'Official account'),
    ('info', 'Official account'),
    ('contact', 'Official account'),
    ('nxoland', 'Platform name'),
    ('api', 'Technical term'),
    ('www', 'Technical term'),
    ('mail', 'Technical term'),
    ('email', 'Technical term'),
    ('webmaster', 'Technical term'),
    ('postmaster', 'Technical term'),
    ('hostmaster', 'Technical term'),
    ('moderator', 'Official role'),
    ('mod', 'Official role'),
    ('staff', 'Official role'),
    ('official', 'Official account')
ON CONFLICT (username) DO NOTHING;

-- Success message
SELECT 'Reserved usernames table created successfully!' as message;
