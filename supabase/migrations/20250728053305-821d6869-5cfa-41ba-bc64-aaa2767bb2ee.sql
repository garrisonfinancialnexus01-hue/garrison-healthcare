
-- Check current table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'disease_images' 
AND table_schema = 'public';

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public access to disease images" ON disease_images;
DROP POLICY IF EXISTS "Allow public access to disease images" ON disease_images;
DROP POLICY IF EXISTS "Anyone can view disease images" ON disease_images;
DROP POLICY IF EXISTS "Authenticated users can manage disease images" ON disease_images;

-- Since this is for admin disease information management and should be publicly accessible,
-- create a simple policy that allows all operations without any authentication checks
CREATE POLICY "Allow all operations on disease images" 
ON disease_images 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE disease_images ENABLE ROW LEVEL SECURITY;
