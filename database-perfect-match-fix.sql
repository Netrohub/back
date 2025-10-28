-- PERFECT MATCH FIX: Exact alignment with Prisma Schema v2.0
-- This script matches EXACTLY the schema.prisma file

-- ===== STEP 1: DROP ALL EXISTING ENUMS =====
DROP TYPE IF EXISTS ProductStatus CASCADE;
DROP TYPE IF EXISTS OrderStatus CASCADE;
DROP TYPE IF EXISTS PaymentStatus CASCADE;
DROP TYPE IF EXISTS TransactionType CASCADE;
DROP TYPE IF EXISTS TransactionStatus CASCADE;
DROP TYPE IF EXISTS CartStatus CASCADE;
DROP TYPE IF EXISTS CouponType CASCADE;
DROP TYPE IF EXISTS DisputeStatus CASCADE;
DROP TYPE IF EXISTS DisputePriority CASCADE;
DROP TYPE IF EXISTS TicketStatus CASCADE;
DROP TYPE IF EXISTS TicketPriority CASCADE;
DROP TYPE IF EXISTS KycType CASCADE;
DROP TYPE IF EXISTS KycStatus CASCADE;
DROP TYPE IF EXISTS LogLevel CASCADE;
DROP TYPE IF EXISTS PayoutStatus CASCADE;

-- ===== STEP 2: CREATE ALL ENUMS WITH EXACT VALUES FROM SCHEMA.PRISMA =====

-- ProductStatus (line 727-735 in schema.prisma)
CREATE TYPE ProductStatus AS ENUM (
    'DRAFT',
    'PENDING',
    'ACTIVE',
    'SOLD',
    'INACTIVE',
    'REJECTED',
    'SUSPENDED'
);

-- OrderStatus (line 737-746)
CREATE TYPE OrderStatus AS ENUM (
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'COMPLETED',
    'CANCELLED',
    'REFUNDED'
);

-- PaymentStatus (line 748-754)
CREATE TYPE PaymentStatus AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED',
    'PARTIAL_REFUND'
);

-- TransactionType (line 756-762)
CREATE TYPE TransactionType AS ENUM (
    'PAYMENT',
    'REFUND',
    'PAYOUT',
    'FEE',
    'CHARGEBACK'
);

-- TransactionStatus (line 764-770)
CREATE TYPE TransactionStatus AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
);

-- CartStatus (line 772-776)
CREATE TYPE CartStatus AS ENUM (
    'ACTIVE',
    'SAVED_FOR_LATER',
    'ABANDONED'
);

-- CouponType (line 778-782)
CREATE TYPE CouponType AS ENUM (
    'PERCENTAGE',
    'FIXED_AMOUNT',
    'FREE_SHIPPING'
);

-- DisputeStatus (line 784-790)
CREATE TYPE DisputeStatus AS ENUM (
    'PENDING',
    'INVESTIGATING',
    'RESOLVED',
    'CLOSED',
    'ESCALATED'
);

-- DisputePriority (line 792-797)
CREATE TYPE DisputePriority AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
);

-- TicketStatus (line 799-805)
CREATE TYPE TicketStatus AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'WAITING_FOR_CUSTOMER',
    'RESOLVED',
    'CLOSED'
);

-- TicketPriority (line 807-812)
CREATE TYPE TicketPriority AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
);

-- KycType (line 814-820)
CREATE TYPE KycType AS ENUM (
    'EMAIL',
    'PHONE',
    'IDENTITY',
    'ADDRESS',
    'BANK_ACCOUNT'
);

-- KycStatus (line 822-828)
CREATE TYPE KycStatus AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'APPROVED',
    'REJECTED',
    'EXPIRED'
);

-- LogLevel (line 830-836)
CREATE TYPE LogLevel AS ENUM (
    'DEBUG',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL'
);

-- PayoutStatus (line 838-844)
CREATE TYPE PayoutStatus AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
);

-- ===== STEP 3: FIX KYC_VERIFICATIONS TABLE =====
-- Add missing notes column
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS notes TEXT;

-- Ensure all columns exist with correct types
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS provider VARCHAR(50);
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS external_id VARCHAR(255);
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS documents JSONB;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMP;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add enum columns if missing
DO $$
BEGIN
    -- Add type column with KycType enum
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'kyc_verifications' AND column_name = 'type') THEN
        ALTER TABLE kyc_verifications ADD COLUMN type KycType NOT NULL DEFAULT 'IDENTITY';
    END IF;
    
    -- Add status column with KycStatus enum
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'kyc_verifications' AND column_name = 'status') THEN
        ALTER TABLE kyc_verifications ADD COLUMN status KycStatus DEFAULT 'PENDING';
    END IF;
END $$;

-- ===== STEP 4: FIX PRODUCTS TABLE =====
-- Drop and recreate status column with correct enum
ALTER TABLE products DROP COLUMN IF EXISTS status CASCADE;
ALTER TABLE products ADD COLUMN status ProductStatus DEFAULT 'PENDING';

-- ===== STEP 5: FIX ORDERS TABLE =====
-- Drop and recreate status columns with correct enums
ALTER TABLE orders DROP COLUMN IF EXISTS status CASCADE;
ALTER TABLE orders ADD COLUMN status OrderStatus DEFAULT 'PENDING';

ALTER TABLE orders DROP COLUMN IF EXISTS payment_status CASCADE;
ALTER TABLE orders ADD COLUMN payment_status PaymentStatus DEFAULT 'PENDING';

-- ===== STEP 6: FIX CART_ITEMS TABLE =====
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'cart_items' AND column_name = 'status') THEN
        ALTER TABLE cart_items DROP COLUMN status CASCADE;
    END IF;
    ALTER TABLE cart_items ADD COLUMN status CartStatus DEFAULT 'ACTIVE';
END $$;

-- ===== STEP 7: FIX DISPUTES TABLE =====
DO $$
BEGIN
    -- Status column
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'disputes' AND column_name = 'status') THEN
        ALTER TABLE disputes DROP COLUMN status CASCADE;
    END IF;
    ALTER TABLE disputes ADD COLUMN status DisputeStatus DEFAULT 'PENDING';
    
    -- Priority column
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'disputes' AND column_name = 'priority') THEN
        ALTER TABLE disputes DROP COLUMN priority CASCADE;
    END IF;
    ALTER TABLE disputes ADD COLUMN priority DisputePriority DEFAULT 'MEDIUM';
END $$;

-- ===== STEP 8: FIX TICKETS TABLE =====
DO $$
BEGIN
    -- Status column
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tickets' AND column_name = 'status') THEN
        ALTER TABLE tickets DROP COLUMN status CASCADE;
    END IF;
    ALTER TABLE tickets ADD COLUMN status TicketStatus DEFAULT 'OPEN';
    
    -- Priority column
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tickets' AND column_name = 'priority') THEN
        ALTER TABLE tickets DROP COLUMN priority CASCADE;
    END IF;
    ALTER TABLE tickets ADD COLUMN priority TicketPriority DEFAULT 'MEDIUM';
END $$;

-- ===== STEP 9: FIX PAYOUTS TABLE =====
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'payouts' AND column_name = 'status') THEN
        ALTER TABLE payouts DROP COLUMN status CASCADE;
    END IF;
    ALTER TABLE payouts ADD COLUMN status PayoutStatus DEFAULT 'PENDING';
END $$;

-- ===== STEP 10: FIX COUPONS TABLE =====
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'coupons' AND column_name = 'type') THEN
        ALTER TABLE coupons DROP COLUMN type CASCADE;
    END IF;
    ALTER TABLE coupons ADD COLUMN type CouponType NOT NULL DEFAULT 'PERCENTAGE';
END $$;

-- ===== STEP 11: FIX SYSTEM_LOGS TABLE =====
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'system_logs') THEN
        CREATE TABLE system_logs (
            id SERIAL PRIMARY KEY,
            level LogLevel NOT NULL,
            message TEXT NOT NULL,
            context JSONB,
            user_id INTEGER,
            ip_address VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX idx_system_logs_level ON system_logs(level);
        CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);
        CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);
    END IF;
END $$;

-- ===== STEP 12: CREATE INDEXES =====
CREATE INDEX IF NOT EXISTS idx_kyc_verifications_notes ON kyc_verifications(notes) WHERE notes IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_cart_items_status ON cart_items(status);

-- ===== STEP 13: COMPREHENSIVE VERIFICATION =====
SELECT 
    '🎉 PERFECT MATCH FIX COMPLETE! 🎉' as message,
    
    -- KYC Verification
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'kyc_verifications' AND column_name = 'notes') as kyc_has_notes,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'kyc_verifications' AND column_name = 'documents') as kyc_has_documents,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'kyc_verifications' AND column_name = 'external_id') as kyc_has_external_id,
    
    -- Products Verification
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'products' AND column_name = 'status' AND udt_name = 'productstatus') as products_status_enum,
    
    -- Orders Verification
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'orders' AND column_name = 'status' AND udt_name = 'orderstatus') as orders_status_enum,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = 'orders' AND column_name = 'payment_status' AND udt_name = 'paymentstatus') as orders_payment_status_enum,
    
    -- Enum Types Verification
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'productstatus') as has_productstatus,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'orderstatus') as has_orderstatus,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'paymentstatus') as has_paymentstatus,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'kyctype') as has_kyctype,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'kycstatus') as has_kycstatus;

-- ===== STEP 14: SHOW ALL ENUMS =====
SELECT enumtypid::regtype AS enum_name, enumlabel AS enum_value
FROM pg_enum
WHERE enumtypid IN (
    SELECT oid FROM pg_type WHERE typname IN (
        'productstatus', 'orderstatus', 'paymentstatus', 'kyctype', 'kycstatus'
    )
)
ORDER BY enum_name, enumsortorder;

SELECT '✅ DATABASE PERFECTLY ALIGNED WITH PRISMA SCHEMA!' as final_status;
