
-- Create a table for disease images if it doesn't exist
CREATE TABLE IF NOT EXISTS public.disease_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for the disease_images table
ALTER TABLE public.disease_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for the frontend)
CREATE POLICY "Anyone can view disease images" 
  ON public.disease_images 
  FOR SELECT 
  USING (true);

-- Create policy for authenticated users to manage images (for admin)
CREATE POLICY "Authenticated users can manage disease images" 
  ON public.disease_images 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create trigger for updating the updated_at column
CREATE OR REPLACE TRIGGER update_disease_images_updated_at
  BEFORE UPDATE ON public.disease_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add the disease_images table to realtime publication for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.disease_images;

-- Set replica identity for realtime updates
ALTER TABLE public.disease_images REPLICA IDENTITY FULL;
