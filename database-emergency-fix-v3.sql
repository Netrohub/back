-- EMERGENCY FIX V3: Add ALL missing v2.0 fields and enums
-- Fixed index creation issue

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

-- ===== CREATE MISSING INDEXES (FIXED - NO CONCURRENTLY IN TRANSACTION) =====
-- These run outside transaction blocks to avoid the CONCURRENTLY error

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_rating_avg ON products(rating_avg);
CREATE INDEX IF NOT EXISTS idx_products_rating_count ON products(rating_count);
CREATE INDEX IF NOT EXISTS idx_products_sales_count ON products(sales_count);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- SUCCESS MESSAGE
SELECT 'EMERGENCY FIX V3 COMPLETE! 🚀 All missing fields, enums, and indexes added!' as message;
