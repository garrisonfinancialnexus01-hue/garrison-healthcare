
-- First, let's check and update the RLS policies for disease_images table
-- The current policies are blocking the INSERT operations

-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated delete disease images" ON public.disease_images;
DROP POLICY IF EXISTS "Allow authenticated insert disease images" ON public.disease_images;
DROP POLICY IF EXISTS "Allow authenticated update disease images" ON public.disease_images;

-- Create new, more permissive policies that allow admin operations
-- These policies will allow authenticated users to manage disease images in the admin dashboard

CREATE POLICY "Enable all operations for disease images" 
ON public.disease_images 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Also ensure public can read the images for display on the frontend
CREATE POLICY "Enable read access for everyone" 
ON public.disease_images 
FOR SELECT 
TO public 
USING (true);
