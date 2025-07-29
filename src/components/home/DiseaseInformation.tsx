
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useDiseaseImages } from '@/hooks/useDiseaseImages';
import Autoplay from 'embla-carousel-autoplay';

const DiseaseInformation = () => {
  const { images, loading } = useDiseaseImages();
  const [selectedImage, setSelectedImage] = useState<{url: string; title: string; description?: string} | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Information about Diseases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading visual resources...
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visual resources and educational materials to help you understand various health conditions
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Visual resources coming soon
              </h3>
              <p className="text-gray-500">
                Educational images and infographics will be available here soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {images.map((image) => (
                  <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <CardContent className="p-0">
                          <div 
                            className="relative"
                            onClick={() => setSelectedImage({
                              url: image.image_url,
                              title: image.title,
                              description: image.description || undefined
                            })}
                          >
                            <img
                              src={image.image_url}
                              alt={image.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                              <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 font-semibold">
                                Click to view
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">
                              {image.title}
                            </h3>
                            {image.description && (
                              <p className="text-gray-600 text-sm line-clamp-3">
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
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        )}

        {/* Full Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            {selectedImage && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-600 mb-4">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DiseaseInformation;
