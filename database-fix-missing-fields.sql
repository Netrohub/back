-- QUICK FIX: Add missing fields and enums to existing database
-- Run this if you already have a database but missing some fields

-- First, ensure the enums exist
DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE dispute_status AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payout_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE cart_status AS ENUM ('ACTIVE', 'ABANDONED', 'CONVERTED', 'REMOVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE coupon_type AS ENUM ('FIXED', 'PERCENTAGE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE kyc_type AS ENUM ('IDENTITY', 'ADDRESS', 'PHONE', 'EMAIL', 'DOCUMENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE kyc_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Now add missing columns to products table (if they don't exist)
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_price DECIMAL(10,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS account_username VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS delivery_time VARCHAR(50) DEFAULT 'instant';
ALTER TABLE products ADD COLUMN IF NOT EXISTS setup_instructions TEXT;

-- Update products.status column type if needed
DO $$ 
BEGIN
    -- Try to alter the column type
    ALTER TABLE products ALTER COLUMN status TYPE product_status USING status::product_status;
EXCEPTION
    WHEN others THEN
        -- If it fails, the column might already be the right type or have data issues
        RAISE NOTICE 'Could not convert products.status to enum. Check your data.';
END $$;

-- Update stock_quantity default if needed
ALTER TABLE products ALTER COLUMN stock_quantity SET DEFAULT 1;

-- Ensure other important columns exist with proper defaults
ALTER TABLE products ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating_avg DECIMAL(3,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_until TIMESTAMP;

-- Update any null values in critical fields
UPDATE products SET views_count = 0 WHERE views_count IS NULL;
UPDATE products SET sales_count = 0 WHERE sales_count IS NULL;
UPDATE products SET rating_avg = 0 WHERE rating_avg IS NULL;
UPDATE products SET featured = false WHERE featured IS NULL;
UPDATE products SET stock_quantity = 1 WHERE stock_quantity IS NULL OR stock_quantity = 0;
UPDATE products SET delivery_time = 'instant' WHERE delivery_time IS NULL;

COMMIT;

SELECT 'Database fields updated successfully! 🚀' as message;
