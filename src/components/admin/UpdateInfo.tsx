
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Upload, Image as ImageIcon, Edit } from 'lucide-react';
import { useDiseaseImages, DiseaseImage } from '@/hooks/useDiseaseImages';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const UpdateInfo = () => {
  const { images, loading, uploadImage, deleteImage } = useDiseaseImages();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) return;

    setUploading(true);
    await uploadImage(selectedFile, title, description);
    
    // Reset form
    setSelectedFile(null);
    setTitle('');
    setDescription('');
    setPreviewUrl(null);
    setUploading(false);
  };

  const handleDelete = async (image: DiseaseImage) => {
    if (window.confirm(`Are you sure you want to delete "${image.title}"?`)) {
      await deleteImage(image.id, image.image_url);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Disease Information Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Select Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="mt-1"
            />
          </div>

          {previewUrl && (
            <div className="mt-4">
              <Label>Preview</Label>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="mt-2 max-w-xs rounded-lg border"
              />
            </div>
          )}

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description"
              className="mt-1"
            />
          </div>

          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || !title.trim() || uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Manage Disease Images ({images.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading images...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No disease images uploaded yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="border rounded-lg p-4 space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <img 
                        src={image.image_url} 
                        alt={image.title}
                        className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{image.title}</DialogTitle>
                      </DialogHeader>
                      <img 
                        src={image.image_url} 
                        alt={image.title}
                        className="w-full max-h-[70vh] object-contain rounded"
                      />
                      {image.description && (
                        <p className="text-sm text-gray-600 mt-2">{image.description}</p>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <div>
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                    {image.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateInfo;
