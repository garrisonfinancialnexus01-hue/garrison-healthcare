
-- Create a table for disease information images
CREATE TABLE public.disease_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to control access
ALTER TABLE public.disease_images ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view disease images (public access)
CREATE POLICY "Anyone can view disease images" 
  ON public.disease_images 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy that allows authenticated users to manage disease images
CREATE POLICY "Authenticated users can manage disease images" 
  ON public.disease_images 
  FOR ALL 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a storage bucket for disease images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('disease-images', 'disease-images', true);

-- Create storage policies
CREATE POLICY "Anyone can view disease images in storage" 
  ON storage.objects 
  FOR SELECT 
  TO public
  USING (bucket_id = 'disease-images');

CREATE POLICY "Authenticated users can upload disease images" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated
  WITH CHECK (bucket_id = 'disease-images');

CREATE POLICY "Authenticated users can update disease images" 
  ON storage.objects 
  FOR UPDATE 
  TO authenticated
  USING (bucket_id = 'disease-images');

CREATE POLICY "Authenticated users can delete disease images" 
  ON storage.objects 
  FOR DELETE 
  TO authenticated
  USING (bucket_id = 'disease-images');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_disease_images_updated_at 
    BEFORE UPDATE ON public.disease_images 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
