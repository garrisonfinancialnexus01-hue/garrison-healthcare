
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DiseaseImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useDiseaseImages = () => {
  const [images, setImages] = useState<DiseaseImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('disease_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching disease images:', error);
      toast({
        title: "Error",
        description: "Failed to load disease images",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, title: string, description: string) => {
    try {
      setLoading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `disease-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('disease-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('disease-images')
        .getPublicUrl(filePath);

      const maxOrder = Math.max(...images.map(img => img.display_order), -1);
      
      const { data, error } = await supabase
        .from('disease_images')
        .insert({
          title,
          description,
          image_url: publicUrl,
          display_order: maxOrder + 1
        })
        .select()
        .single();

      if (error) throw error;

      await fetchImages();
      toast({
        title: "Success",
        description: "Disease image uploaded successfully"
      });

      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      setLoading(true);

      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage
        .from('disease-images')
        .remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from('disease_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchImages();
      toast({
        title: "Success",
        description: "Disease image deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();

    // Set up real-time subscription
    const channel = supabase
      .channel('disease-images-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'disease_images'
        },
        () => {
          fetchImages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    images,
    loading,
    uploadImage,
    deleteImage,
    refetch: fetchImages
  };
};
