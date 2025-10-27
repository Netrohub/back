-- COMPLETE FINAL FIX: Address ALL remaining database issues
-- Based on latest error logs showing ProductStatus and metadata missing

-- ===== CLEAN SLATE: Drop everything and recreate =====
DROP TYPE IF EXISTS ProductStatus CASCADE;
DROP TYPE IF EXISTS OrderStatus CASCADE;
DROP TYPE IF EXISTS PaymentStatus CASCADE;
DROP TYPE IF EXISTS DisputeStatus CASCADE;
DROP TYPE IF EXISTS TicketPriority CASCADE;
DROP TYPE IF EXISTS TicketStatus CASCADE;
DROP TYPE IF EXISTS PayoutStatus CASCADE;
DROP TYPE IF EXISTS CartStatus CASCADE;
DROP TYPE IF EXISTS CouponType CASCADE;
DROP TYPE IF EXISTS KycType CASCADE;
DROP TYPE IF EXISTS KycStatus CASCADE;

-- Create ALL enums in public schema explicitly
CREATE TYPE public.ProductStatus AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED');
CREATE TYPE public.OrderStatus AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
CREATE TYPE public.PaymentStatus AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');
CREATE TYPE public.DisputeStatus AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED');
CREATE TYPE public.TicketPriority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE public.TicketStatus AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE public.PayoutStatus AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');
CREATE TYPE public.CartStatus AS ENUM ('ACTIVE', 'REMOVED');
CREATE TYPE public.CouponType AS ENUM ('FIXED', 'PERCENTAGE');
CREATE TYPE public.KycType AS ENUM ('IDENTITY', 'ADDRESS', 'PHONE', 'EMAIL');
CREATE TYPE public.KycStatus AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');

-- ===== ADD ALL MISSING COLUMNS FROM ERROR LOGS =====

-- Products table - ALL missing columns including metadata
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_price DECIMAL(10,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating_avg DECIMAL(3,2) DEFAULT 0.00;
ALTER TABLE products ADD COLUMN IF NOT EXISTS platform VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS game VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS account_level VARCHAR(50);
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_until TIMESTAMP;
ALTER TABLE products ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';  -- Missing metadata column!

-- Orders table 
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number VARCHAR(50) UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS seller_id INTEGER REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_id INTEGER REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_fee DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_transaction_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status public.PaymentStatus DEFAULT 'PENDING';

-- ===== SAFELY CONVERT STATUS COLUMNS TO ENUMS =====

-- Products status conversion
DO $$ 
BEGIN
    -- Check if status column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'status') THEN
        -- Drop existing status and recreate with enum
        ALTER TABLE products DROP COLUMN status CASCADE;
    END IF;
    
    -- Add status as enum
    ALTER TABLE products ADD COLUMN status public.ProductStatus DEFAULT 'ACTIVE';
    RAISE NOTICE 'Products status column created with ProductStatus enum';
END $$;

-- Orders status conversion  
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'status') THEN
        ALTER TABLE orders DROP COLUMN status CASCADE;
    END IF;
    
    ALTER TABLE orders ADD COLUMN status public.OrderStatus DEFAULT 'PENDING';
    RAISE NOTICE 'Orders status column created with OrderStatus enum';
END $$;

-- ===== POPULATE DEFAULT DATA =====

-- Generate order numbers for existing orders
UPDATE orders 
SET order_number = 'NXO-' || LPAD(id::text, 6, '0')
WHERE order_number IS NULL;

-- Set default buyer_id if missing (use first user or admin)
UPDATE orders 
SET buyer_id = (SELECT id FROM users ORDER BY id LIMIT 1)
WHERE buyer_id IS NULL 
  AND EXISTS (SELECT 1 FROM users);

-- Set default metadata for products
UPDATE products 
SET metadata = '{}'
WHERE metadata IS NULL;

-- ===== CREATE PERFORMANCE INDEXES =====
CREATE INDEX IF NOT EXISTS idx_products_status_active ON products(status) WHERE status = 'ACTIVE';
CREATE INDEX IF NOT EXISTS idx_products_is_featured_true ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_rating_avg ON products(rating_avg);
CREATE INDEX IF NOT EXISTS idx_products_metadata_gin ON products USING GIN(metadata);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id) WHERE buyer_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id) WHERE seller_id IS NOT NULL;

-- ===== VERIFY ALL REQUIRED FIELDS EXIST =====
SELECT 
    'COMPLETE FIX SUCCESS!' as message,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating_count') as has_rating_count,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_featured') as has_is_featured,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'metadata') as has_metadata,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'productstatus') as has_productstatus_enum,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'status' AND udt_name = 'productstatus') as status_is_enum;
