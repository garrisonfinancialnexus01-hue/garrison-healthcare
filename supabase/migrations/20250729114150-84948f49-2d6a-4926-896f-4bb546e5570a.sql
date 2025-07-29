
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow admin insert disease images" ON public.disease_images;
DROP POLICY IF EXISTS "Allow admin update disease images" ON public.disease_images;
DROP POLICY IF EXISTS "Allow admin delete disease images" ON public.disease_images;

-- Create more permissive policies for authenticated users
CREATE POLICY "Allow authenticated insert disease images" 
ON public.disease_images 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update disease images" 
ON public.disease_images 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete disease images" 
ON public.disease_images 
FOR DELETE 
TO authenticated 
USING (true);

-- Keep the public read policy as is
-- This allows the frontend to display images to all users
