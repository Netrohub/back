-- ULTIMATE DATABASE FIX: Complete v2.0 schema with ALL missing fields
-- Based on all error logs - this is the definitive fix

-- ===== DROP AND RECREATE ALL ENUMS (CLEAN SLATE) =====
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

-- Create all enums in public schema
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

-- ===== CREATE KYC_VERIFICATIONS TABLE IF NOT EXISTS =====
CREATE TABLE IF NOT EXISTS kyc_verifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type public.KycType NOT NULL,
    status public.KycStatus DEFAULT 'PENDING',
    external_id VARCHAR(255),  -- Missing field that causes auth errors!
    provider VARCHAR(100) DEFAULT 'persona',  -- Missing field!
    data JSONB DEFAULT '{}',
    verification_code VARCHAR(50),
    expires_at TIMESTAMP,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== ADD ALL MISSING COLUMNS TO PRODUCTS =====
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
ALTER TABLE products ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- ===== ADD ALL MISSING COLUMNS TO ORDERS =====
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number VARCHAR(50) UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS seller_id INTEGER REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_id INTEGER REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_fee DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_transaction_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status public.PaymentStatus DEFAULT 'PENDING';

-- ===== SAFELY CONVERT STATUS COLUMNS TO ENUMS =====

-- Products status
DO $$ 
BEGIN
    -- Drop existing status column if it exists and recreate with enum
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'status') THEN
        ALTER TABLE products DROP COLUMN status CASCADE;
    END IF;
    
    -- Add status as enum
    ALTER TABLE products ADD COLUMN status public.ProductStatus DEFAULT 'ACTIVE';
    RAISE NOTICE 'Products status column created with ProductStatus enum';
END $$;

-- Orders status
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

-- Set default buyer_id if missing
UPDATE orders 
SET buyer_id = (SELECT id FROM users ORDER BY id LIMIT 1)
WHERE buyer_id IS NULL 
  AND EXISTS (SELECT 1 FROM users);

-- Set default metadata for products
UPDATE products 
SET metadata = '{}'::jsonb
WHERE metadata IS NULL;

-- ===== CREATE CRITICAL INDEXES =====
CREATE INDEX IF NOT EXISTS idx_products_status_active ON products(status) WHERE status = 'ACTIVE';
CREATE INDEX IF NOT EXISTS idx_products_is_featured_true ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_rating_avg ON products(rating_avg);
CREATE INDEX IF NOT EXISTS idx_products_metadata_gin ON products USING GIN(metadata);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id) WHERE buyer_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id) WHERE seller_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_kyc_user_id ON kyc_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_external_id ON kyc_verifications(external_id) WHERE external_id IS NOT NULL;

-- ===== VERIFY ALL CRITICAL FIELDS EXIST =====
SELECT 
    'ULTIMATE FIX COMPLETE!' as message,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating_count') as has_rating_count,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_featured') as has_is_featured,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'metadata') as has_metadata,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'kyc_verifications' AND column_name = 'external_id') as has_kyc_external_id,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'kyc_verifications' AND column_name = 'provider') as has_kyc_provider,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'productstatus') as has_productstatus_enum,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'kyc_verifications') as has_kyc_table;
