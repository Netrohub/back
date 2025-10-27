-- EMERGENCY FIX V2: Add ALL missing v2.0 fields and enums
-- Fixed logic for existing status columns

-- ===== CREATE ALL MISSING ENUMS =====
DO $$ BEGIN
    CREATE TYPE ProductStatus AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE OrderStatus AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE PaymentStatus AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE DisputeStatus AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE TicketPriority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE TicketStatus AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE PayoutStatus AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE CartStatus AS ENUM ('ACTIVE', 'REMOVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE CouponType AS ENUM ('FIXED', 'PERCENTAGE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE KycType AS ENUM ('IDENTITY', 'ADDRESS', 'PHONE', 'EMAIL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE KycStatus AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ===== ADD ALL MISSING COLUMNS TO PRODUCTS =====
DO $$ BEGIN
    ALTER TABLE products ADD COLUMN rating_count INTEGER DEFAULT 0;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN discount_price DECIMAL(10,2);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN sales_count INTEGER DEFAULT 0;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN views_count INTEGER DEFAULT 0;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN rating_avg DECIMAL(3,2) DEFAULT 0.00;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN platform VARCHAR(100);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN game VARCHAR(100);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN account_level VARCHAR(50);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN featured BOOLEAN DEFAULT false;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE products ADD COLUMN featured_until TIMESTAMP;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- ===== CONVERT PRODUCTS STATUS TO ENUM (SAFE METHOD) =====
DO $$ 
DECLARE
    status_column_type text;
BEGIN
    -- Check if status column exists and its type
    SELECT data_type INTO status_column_type
    FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'status';
    
    IF status_column_type IS NOT NULL AND status_column_type != 'USER-DEFINED' THEN
        -- Status exists but is not enum, convert it
        RAISE NOTICE 'Converting products.status from % to ProductStatus enum', status_column_type;
        
        -- Add temporary column
        ALTER TABLE products ADD COLUMN status_temp ProductStatus DEFAULT 'ACTIVE';
        
        -- Convert existing values
        UPDATE products SET status_temp = 
            CASE 
                WHEN LOWER(status::text) = 'active' THEN 'ACTIVE'::ProductStatus
                WHEN LOWER(status::text) = 'inactive' THEN 'INACTIVE'::ProductStatus
                WHEN LOWER(status::text) = 'pending' THEN 'PENDING'::ProductStatus
                WHEN LOWER(status::text) = 'rejected' THEN 'REJECTED'::ProductStatus
                ELSE 'ACTIVE'::ProductStatus
            END;
        
        -- Drop old column and rename new one
        ALTER TABLE products DROP COLUMN status;
        ALTER TABLE products RENAME COLUMN status_temp TO status;
        
        RAISE NOTICE 'Products status column converted to enum successfully';
    ELSIF status_column_type IS NULL THEN
        -- Status column doesn't exist, create it
        ALTER TABLE products ADD COLUMN status ProductStatus DEFAULT 'ACTIVE';
        RAISE NOTICE 'Products status column created as enum';
    ELSE
        RAISE NOTICE 'Products status column already exists as enum, skipping';
    END IF;
END $$;

-- ===== ADD MISSING COLUMNS TO ORDERS =====
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN order_number VARCHAR(50) UNIQUE;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN seller_id INTEGER REFERENCES users(id);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN buyer_id INTEGER REFERENCES users(id);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN service_fee DECIMAL(10,2) DEFAULT 0.00;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN subtotal DECIMAL(10,2) DEFAULT 0.00;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN payment_transaction_id VARCHAR(255);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- ===== CONVERT ORDERS STATUS TO ENUM (SAFE METHOD) =====
DO $$ 
DECLARE
    status_column_type text;
BEGIN
    -- Check if status column exists and its type
    SELECT data_type INTO status_column_type
    FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'status';
    
    IF status_column_type IS NOT NULL AND status_column_type != 'USER-DEFINED' THEN
        -- Status exists but is not enum, convert it
        RAISE NOTICE 'Converting orders.status from % to OrderStatus enum', status_column_type;
        
        -- Add temporary column
        ALTER TABLE orders ADD COLUMN status_temp OrderStatus DEFAULT 'PENDING';
        
        -- Convert existing values
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
        
        -- Drop old column and rename new one
        ALTER TABLE orders DROP COLUMN status;
        ALTER TABLE orders RENAME COLUMN status_temp TO status;
        
        RAISE NOTICE 'Orders status column converted to enum successfully';
    ELSIF status_column_type IS NULL THEN
        -- Status column doesn't exist, create it
        ALTER TABLE orders ADD COLUMN status OrderStatus DEFAULT 'PENDING';
        RAISE NOTICE 'Orders status column created as enum';
    ELSE
        RAISE NOTICE 'Orders status column already exists as enum, skipping';
    END IF;
END $$;

-- Add payment_status to orders
DO $$ BEGIN
    ALTER TABLE orders ADD COLUMN payment_status PaymentStatus DEFAULT 'PENDING';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- ===== GENERATE ORDER NUMBERS FOR EXISTING ORDERS =====
DO $$ BEGIN
    UPDATE orders 
    SET order_number = 'NXO-' || LPAD(id::text, 6, '0')
    WHERE order_number IS NULL;
EXCEPTION
    WHEN OTHERS THEN null;
END $$;

-- ===== UPDATE USER_ID TO BUYER_ID IN ORDERS =====
DO $$ BEGIN
    UPDATE orders SET buyer_id = user_id WHERE buyer_id IS NULL AND user_id IS NOT NULL;
EXCEPTION
    WHEN OTHERS THEN null;
END $$;

-- ===== CREATE MISSING INDEXES =====
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_rating_avg ON products(rating_avg);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_seller_id ON orders(seller_id);

-- SUCCESS MESSAGE
SELECT 'EMERGENCY FIX V2 COMPLETE! 🚀 All missing fields and enums added!' as message;
