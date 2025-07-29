
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Trash2, Eye, Plus, AlertCircle } from 'lucide-react';
import { useDiseaseImages } from '@/hooks/useDiseaseImages';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DiseaseImagesManager = () => {
  const { images, loading, uploadImage, deleteImage } = useDiseaseImages();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError(null);
    
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only JPEG, PNG, GIF, and WebP images are allowed');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      setUploadError('Please select a file and enter a title');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      await uploadImage(selectedFile, title, description);
      
      // Reset form
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsDialogOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await deleteImage(id, imageUrl);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-garrison-teal">
            Updates - Disease Information Images
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="garrison-btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Disease Information Image</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {uploadError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}
                
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter image title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter image description (optional)"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image * (Max 5MB, JPEG/PNG/GIF/WebP only)</Label>
                  <Input
                    id="image"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="cursor-pointer"
                  />
                </div>
                
                {previewUrl && (
                  <div className="border rounded-lg p-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Preview:
                    </Label>
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-48 object-contain mx-auto rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpload}
                    disabled={!selectedFile || !title.trim() || isUploading}
                    className="garrison-btn-primary"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading && images.length === 0 ? (
          <div className="text-center py-8">Loading images...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No disease information images uploaded yet. Click "Add New Image" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="border rounded-lg p-4 space-y-3">
                <img 
                  src={image.image_url} 
                  alt={image.title}
                  className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => setSelectedImagePreview(image.image_url)}
                />
                <div>
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                  )}
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedImagePreview(image.image_url)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(image.id, image.image_url)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Image Preview Dialog */}
        <Dialog open={!!selectedImagePreview} onOpenChange={() => setSelectedImagePreview(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>
            {selectedImagePreview && (
              <div className="flex justify-center">
                <img 
                  src={selectedImagePreview} 
                  alt="Full preview"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DiseaseImagesManager;
