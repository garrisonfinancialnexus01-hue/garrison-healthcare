
-- Create the disease_images table to store disease information images
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

-- Create policy to allow everyone to read disease images (public data)
CREATE POLICY "Enable read access for everyone" 
  ON public.disease_images 
  FOR SELECT 
  USING (true);

-- Create policy to allow authenticated users to insert disease images
CREATE POLICY "Enable insert for authenticated users only" 
  ON public.disease_images 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update disease images
CREATE POLICY "Enable update for authenticated users only" 
  ON public.disease_images 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete disease images
CREATE POLICY "Enable delete for authenticated users only" 
  ON public.disease_images 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_disease_images_updated_at
  BEFORE UPDATE ON public.disease_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
