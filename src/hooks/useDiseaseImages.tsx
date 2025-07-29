
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
      console.log('Starting image upload:', { fileName: file.name, fileSize: file.size, fileType: file.type });
      
      // Validate file
      if (!file) {
        throw new Error('No file selected');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB');
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPEG, PNG, GIF, and WebP images are allowed');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `disease-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log('Uploading to storage:', { filePath });

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('disease-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('disease-images')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      // Calculate display order
      const maxOrder = images.length > 0 ? Math.max(...images.map(img => img.display_order)) : -1;
      
      // Insert into database
      const { data, error } = await supabase
        .from('disease_images')
        .insert({
          title,
          description: description || null,
          image_url: publicUrl,
          display_order: maxOrder + 1
        })
        .select()
        .single();

      if (error) {
        console.error('Database insert error:', error);
        // Clean up uploaded file if database insert fails
        await supabase.storage
          .from('disease-images')
          .remove([filePath]);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Database insert successful:', data);

      await fetchImages();
      toast({
        title: "Success",
        description: "Disease image uploaded successfully"
      });

      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      setLoading(true);
      console.log('Deleting image:', { id, imageUrl });

      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('disease-images')
        .remove([fileName]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
      }

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
