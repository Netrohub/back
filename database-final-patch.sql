-- FINAL PATCH: Add missing columns to existing kyc_verifications table

-- Add missing columns to kyc_verifications
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS external_id VARCHAR(255);
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS provider VARCHAR(100) DEFAULT 'persona';
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS verification_code VARCHAR(50);
ALTER TABLE kyc_verifications ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP;

-- Create the missing index
CREATE INDEX IF NOT EXISTS idx_kyc_external_id ON kyc_verifications(external_id) WHERE external_id IS NOT NULL;

-- Final verification
SELECT 
    'FINAL PATCH COMPLETE! 🎉' as message,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_featured') as has_is_featured,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'metadata') as has_metadata,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'kyc_verifications' AND column_name = 'external_id') as has_kyc_external_id,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'kyc_verifications' AND column_name = 'provider') as has_kyc_provider,
    (SELECT COUNT(*) FROM pg_type WHERE typname = 'productstatus') as has_productstatus_enum;
