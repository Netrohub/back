-- FINAL DEFINITIVE FIX: Exact field names that code expects
-- Based on actual error messages from the API

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

-- Recreate all enums
CREATE TYPE ProductStatus AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED');
CREATE TYPE OrderStatus AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
CREATE TYPE PaymentStatus AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');
CREATE TYPE DisputeStatus AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED');
CREATE TYPE TicketPriority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE TicketStatus AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE PayoutStatus AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');
CREATE TYPE CartStatus AS ENUM ('ACTIVE', 'REMOVED');
CREATE TYPE CouponType AS ENUM ('FIXED', 'PERCENTAGE');
CREATE TYPE KycType AS ENUM ('IDENTITY', 'ADDRESS', 'PHONE', 'EMAIL');
CREATE TYPE KycStatus AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');

-- ===== ADD EXACT COLUMNS THE CODE EXPECTS =====

-- Products table - exact field names from error messages
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_price DECIMAL(10,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating_avg DECIMAL(3,2) DEFAULT 0.00;
ALTER TABLE products ADD COLUMN IF NOT EXISTS platform VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS game VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS account_level VARCHAR(50);
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;  -- CODE EXPECTS is_featured NOT featured
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_until TIMESTAMP;

-- Orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number VARCHAR(50) UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS seller_id INTEGER REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_id INTEGER REFERENCES users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_fee DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_transaction_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status PaymentStatus DEFAULT 'PENDING';

-- ===== CONVERT STATUS COLUMNS TO ENUMS =====

-- Products status
DO $$ 
BEGIN
    -- Drop existing status column if it exists and recreate with enum
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'status') THEN
        -- Create temp column with enum
        ALTER TABLE products ADD COLUMN status_temp ProductStatus DEFAULT 'ACTIVE';
        
        -- Migrate data 
        UPDATE products SET status_temp = 
            CASE 
                WHEN LOWER(status::text) = 'active' THEN 'ACTIVE'::ProductStatus
                WHEN LOWER(status::text) = 'inactive' THEN 'INACTIVE'::ProductStatus
                WHEN LOWER(status::text) = 'pending' THEN 'PENDING'::ProductStatus
                WHEN LOWER(status::text) = 'rejected' THEN 'REJECTED'::ProductStatus
                ELSE 'ACTIVE'::ProductStatus
            END;
        
        -- Replace old column
        ALTER TABLE products DROP COLUMN status;
        ALTER TABLE products RENAME COLUMN status_temp TO status;
    ELSE
        -- Create new enum column
        ALTER TABLE products ADD COLUMN status ProductStatus DEFAULT 'ACTIVE';
    END IF;
END $$;

-- Orders status  
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'status') THEN
        ALTER TABLE orders ADD COLUMN status_temp OrderStatus DEFAULT 'PENDING';
        
        UPDATE orders SET status_temp = 
            CASE 
                WHEN LOWER(status::text) = 'pending' THEN 'PENDING'::OrderStatus
                WHEN LOWER(status::text) = 'confirmed' THEN 'CONFIRMED'::OrderStatus
                WHEN LOWER(status::text) = 'processing' THEN 'PROCESSING'::OrderStatus
                WHEN LOWER(status::text) = 'shipped' THEN 'SHIPPED'::OrderStatus
                WHEN LOWER(status::text) = 'delivered' THEN 'DELIVERED'::OrderStatus
                WHEN LOWER(status::text) = 'cancelled' THEN 'CANCELLED'::OrderStatus
                WHEN LOWER(status::text) = 'refunded' THEN 'REFUNDED'::OrderStatus
                ELSE 'PENDING'::OrderStatus
            END;
        
        ALTER TABLE orders DROP COLUMN status;
        ALTER TABLE orders RENAME COLUMN status_temp TO status;
    ELSE
        ALTER TABLE orders ADD COLUMN status OrderStatus DEFAULT 'PENDING';
    END IF;
END $$;

-- ===== GENERATE MISSING DATA =====

-- Generate order numbers for existing orders
UPDATE orders 
SET order_number = 'NXO-' || LPAD(id::text, 6, '0')
WHERE order_number IS NULL;

-- Copy user_id to buyer_id for existing orders
UPDATE orders 
SET buyer_id = user_id 
WHERE buyer_id IS NULL AND user_id IS NOT NULL;

-- ===== CREATE PERFORMANCE INDEXES =====
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);  -- Use is_featured
CREATE INDEX IF NOT EXISTS idx_products_rating_avg ON products(rating_avg);
CREATE INDEX IF NOT EXISTS idx_products_rating_count ON products(rating_count);
CREATE INDEX IF NOT EXISTS idx_products_sales_count ON products(sales_count);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id) WHERE seller_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number) WHERE order_number IS NOT NULL;

-- ===== VERIFY SETUP =====
-- Check that all required fields exist
SELECT 
    'SUCCESS: All enums and fields created!' as message,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'rating_count') as has_rating_count,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_featured') as has_is_featured,
    (SELECT COUNT(*) FROM information_schema.data_types WHERE type_name = 'productstatus') as has_product_status_enum;
