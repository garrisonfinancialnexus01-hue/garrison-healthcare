
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
import { useDiseaseImages } from '@/hooks/useDiseaseImages';

const DiseaseInformationCarousel = () => {
  const { images, loading } = useDiseaseImages();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Information about Diseases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading disease information...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Information about Diseases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Disease information will be displayed here once uploaded by administrators.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Information about Diseases
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about various diseases and health conditions through our comprehensive visual guide.
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {images.map((image) => (
                <CarouselItem key={image.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video relative group cursor-pointer">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{image.title}</h3>
                      {image.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => setSelectedImage(image)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedImage?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage?.image_url}
                  alt={selectedImage?.title}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </div>
              {selectedImage?.description && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Description:</h4>
                  <p className="text-gray-700">{selectedImage.description}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DiseaseInformationCarousel;
