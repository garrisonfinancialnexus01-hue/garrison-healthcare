
-- Create table for disease information images
CREATE TABLE IF NOT EXISTS public.disease_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for security
ALTER TABLE public.disease_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for the frontend to display images)
CREATE POLICY "Allow public read access to disease images" 
ON public.disease_images 
FOR SELECT 
USING (true);

-- Create policy for authenticated insert (admin uploads)
CREATE POLICY "Allow admin insert disease images" 
ON public.disease_images 
FOR INSERT 
WITH CHECK (true);

-- Create policy for authenticated update (admin edits)
CREATE POLICY "Allow admin update disease images" 
ON public.disease_images 
FOR UPDATE 
USING (true);

-- Create policy for authenticated delete (admin deletes)
CREATE POLICY "Allow admin delete disease images" 
ON public.disease_images 
FOR DELETE 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_disease_images_updated_at
BEFORE UPDATE ON public.disease_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for automatic updates
ALTER TABLE public.disease_images REPLICA IDENTITY FULL;
