
import { useDiseaseImages } from '@/hooks/useDiseaseImages';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar } from 'lucide-react';

const DiseaseInformation = () => {
  const { images, loading } = useDiseaseImages();

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Information about Diseases
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed about various health conditions and diseases
            </p>
          </div>
          <div className="text-center py-8">
            <div className="animate-pulse">Loading disease information...</div>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Information about Diseases
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed about various health conditions and diseases
            </p>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500">No disease information available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Information about Diseases
          </h2>
          <p className="text-lg text-gray-600">
            Stay informed about various health conditions and diseases
          </p>
          <Badge variant="outline" className="mt-2">
            {images.length} {images.length === 1 ? 'Image' : 'Images'} Available
          </Badge>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="relative cursor-pointer group">
                              <img 
                                src={image.image_url} 
                                alt={image.title}
                                className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                                <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle className="text-xl">{image.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <img 
                                src={image.image_url} 
                                alt={image.title}
                                className="w-full max-h-[70vh] object-contain rounded"
                              />
                              {image.description && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-gray-700">{image.description}</p>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Added on {new Date(image.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2 text-gray-900">
                            {image.title}
                          </h3>
                          {image.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default DiseaseInformation;
