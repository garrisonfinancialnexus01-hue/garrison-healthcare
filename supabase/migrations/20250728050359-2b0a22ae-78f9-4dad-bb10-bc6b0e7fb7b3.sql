
-- First, drop all existing policies on disease_images table
DROP POLICY IF EXISTS "Allow public access to disease images" ON disease_images;
DROP POLICY IF EXISTS "Anyone can view disease images" ON disease_images;
DROP POLICY IF EXISTS "Authenticated users can manage disease images" ON disease_images;

-- Create a single comprehensive policy that allows all operations without authentication
-- since this is for admin disease information management
CREATE POLICY "Public access to disease images" 
ON disease_images 
FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE disease_images ENABLE ROW LEVEL SECURITY;
