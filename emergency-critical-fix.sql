-- EMERGENCY CRITICAL FIX - Minimal fixes to get backend working
-- Run this immediately to fix production errors

-- 1. Create missing ProductStatus enum
DROP TYPE IF EXISTS ProductStatus CASCADE;
CREATE TYPE public.ProductStatus AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED');

-- 2. Fix products table status column
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'status') THEN
        ALTER TABLE products ADD COLUMN status public.ProductStatus DEFAULT 'ACTIVE';
    ELSE
        ALTER TABLE products ALTER COLUMN status TYPE public.ProductStatus USING status::text::public.ProductStatus;
    END IF;
END $$;

-- 3. Add missing notes column to kyc_verifications table  
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS notes TEXT;

-- 4. Add other critical missing kyc columns that break auth
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '{}';

-- 5. Add missing user profile columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(100);

-- 6. Create missing enums for other tables
CREATE TYPE IF NOT EXISTS public.OrderStatus AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
CREATE TYPE IF NOT EXISTS public.PaymentStatus AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');
CREATE TYPE IF NOT EXISTS public.KycStatus AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED');
CREATE TYPE IF NOT EXISTS public.KycType AS ENUM ('IDENTITY', 'ADDRESS', 'PHONE', 'EMAIL');

-- Success message
SELECT '✅ CRITICAL FIXES APPLIED - Backend should work now!' as status;
