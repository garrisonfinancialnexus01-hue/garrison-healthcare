
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useDiseaseImages } from '@/hooks/useDiseaseImages';
import Autoplay from 'embla-carousel-autoplay';

// Default disease information images
const defaultImages = [
  {
    id: 'malaria',
    title: 'Malaria - Brief Overview',
    description: 'Comprehensive information about malaria including causes, symptoms, prevention, and complications.',
    image_url: '/lovable-uploads/59226d07-51df-4bb3-ba33-eb3a7dc9456a.png'
  },
  {
    id: 'diabetes',
    title: 'Diabetes Mellitus (DM) - Brief Overview',
    description: 'Complete guide to diabetes including causes, symptoms, prevention methods, and potential complications.',
    image_url: '/lovable-uploads/e2a17387-27f6-40ff-8f9a-ee5ea13667b3.png'
  },
  {
    id: 'hypertension',
    title: 'High Blood Pressure (HTN) - Brief Overview',
    description: 'Detailed information about hypertension including causes, symptoms, prevention, and complications.',
    image_url: '/lovable-uploads/687c3a62-9e5f-4117-ad6a-2d8dcd3776ca.png'
  },
  {
    id: 'kidney-failure',
    title: 'Kidney Failure - Brief Overview',
    description: 'Essential information about kidney failure including causes, symptoms, prevention, and complications.',
    image_url: '/lovable-uploads/e7d11e2b-904c-4c77-a8e9-a01d2f010014.png'
  },
  {
    id: 'heart-failure',
    title: 'Heart Failure - Brief Overview',
    description: 'Comprehensive overview of heart failure including causes, symptoms, prevention, and complications.',
    image_url: '/lovable-uploads/01490dfc-86a0-413e-b808-0044f10ad81e.png'
  }
];

const DiseaseInformation = () => {
  const { images, loading } = useDiseaseImages();
  const [selectedImage, setSelectedImage] = useState<{url: string; title: string; description?: string} | null>(null);

  // Combine uploaded images with default images
  const allImages = [...images, ...defaultImages];

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

        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem key={image.id || `default-${index}`} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <CardContent className="p-0">
                        <div 
                          className="relative group"
                          onClick={() => setSelectedImage({
                            url: image.image_url,
                            title: image.title,
                            description: image.description || undefined
                          })}
                        >
                          <img
                            src={image.image_url}
                            alt={image.title}
                            className="w-full h-64 object-cover rounded-t-lg transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                            <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-center p-4">
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                                <span className="font-semibold text-lg block mb-1">Click to view</span>
                                <span className="text-sm">Tap for full-screen preview</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
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
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white shadow-lg" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white shadow-lg" />
          </Carousel>
        </div>

        {/* Full Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0">
            {selectedImage && (
              <div className="relative">
                <div className="p-6 bg-white">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedImage.title}
                    </h3>
                    {selectedImage.description && (
                      <p className="text-gray-600 max-w-3xl mx-auto">
                        {selectedImage.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center px-6 pb-6">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
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
