
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
      setLoading(true);
      console.log('Fetching disease images...');
      
      const { data, error } = await supabase
        .from('disease_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching images:', error);
        throw error;
      }
      
      console.log('Fetched images:', data);
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching disease images:', error);
      toast({
        title: "Error",
        description: "Failed to fetch disease images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, title: string, description: string = '') => {
    try {
      console.log('Starting image upload:', { 
        filename: file.name, 
        size: file.size,
        type: file.type,
        title, 
        description 
      });
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substr(2, 9);
      const fileName = `${timestamp}-${randomString}.${fileExt}`;
      const filePath = `disease-images/${fileName}`;

      console.log('Uploading to path:', filePath);

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('disease-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        if (uploadError.message.includes('The resource already exists')) {
          throw new Error('A file with this name already exists. Please try again.');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('disease-images')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      // Verify the URL is accessible
      if (!publicUrl || publicUrl.includes('undefined')) {
        throw new Error('Failed to generate public URL for the uploaded image');
      }

      // Insert record into database
      const insertData = {
        title: title.trim(),
        description: description.trim() || null,
        image_url: publicUrl,
        display_order: images.length
      };

      console.log('Inserting into database with:', insertData);

      const { data: result, error: insertError } = await supabase
        .from('disease_images')
        .insert([insertData])
        .select()
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        console.error('Insert error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        
        // Clean up uploaded file if database insert fails
        try {
          await supabase.storage
            .from('disease-images')
            .remove([filePath]);
          console.log('Cleaned up uploaded file after database error');
        } catch (cleanupError) {
          console.error('Failed to cleanup uploaded file:', cleanupError);
        }
        
        throw new Error(`Database error: ${insertError.message}`);
      }

      console.log('Database insert successful:', result);

      // Refresh images
      await fetchImages();

      return result;
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Re-throw with a user-friendly message
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred while uploading the image');
      }
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      console.log('Deleting image:', { id, imageUrl });
      
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `disease-images/${fileName}`;

      console.log('Deleting file at path:', filePath);

      // Delete from database first
      const { error: dbError } = await supabase
        .from('disease_images')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error('Database delete error:', dbError);
        throw dbError;
      }

      // Then delete from storage
      const { error: storageError } = await supabase.storage
        .from('disease-images')
        .remove([filePath]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
        // Don't throw here as the database record is already deleted
      }

      console.log('Delete successful');

      toast({
        title: "Success",
        description: "Disease image deleted successfully",
      });

      // Refresh images
      await fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateImage = async (id: string, title: string, description: string) => {
    try {
      console.log('Updating image:', { id, title, description });
      
      const { error } = await supabase
        .from('disease_images')
        .update({ 
          title: title.trim(), 
          description: description.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      console.log('Update successful');

      toast({
        title: "Success",
        description: "Disease image updated successfully",
      });

      // Refresh images
      await fetchImages();
    } catch (error) {
      console.error('Error updating image:', error);
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchImages();

    // Set up real-time subscription
    const channel = supabase
      .channel('disease-images-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'disease_images' },
        (payload) => {
          console.log('Real-time update received:', payload);
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
    updateImage,
    refetch: fetchImages
  };
};
