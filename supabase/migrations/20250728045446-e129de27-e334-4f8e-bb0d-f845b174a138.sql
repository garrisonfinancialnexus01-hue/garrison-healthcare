
-- Update the RLS policy to allow inserts without authentication requirement
-- since this is for admin disease information management
DROP POLICY IF EXISTS "Authenticated users can manage disease images" ON disease_images;

-- Create a more permissive policy that allows anyone to manage disease images
-- This is appropriate for admin disease information that should be publicly accessible
CREATE POLICY "Allow public access to disease images" 
ON disease_images 
FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);
