
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DiseaseImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
}

const DiseaseInformation = () => {
  const [selectedImage, setSelectedImage] = useState<DiseaseImage | null>(null);
  const [emblaApi, setEmblaApi] = useState<any>(null);

  // Fetch disease images from Supabase
  const { data: diseaseImages = [], isLoading } = useQuery({
    queryKey: ['disease-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('disease_images')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as DiseaseImage[];
    },
  });

  // Default images with the uploaded ones
  const defaultImages: DiseaseImage[] = [
    {
      id: 'malaria',
      title: 'Malaria',
      description: 'Brief overview of malaria disease',
      image_url: '/lovable-uploads/3501b742-2bd7-43e4-b37d-e5e02fba3685.png',
      display_order: 1,
    },
    {
      id: 'diabetes',
      title: 'Diabetes Mellitus (DM)',
      description: 'Brief overview of diabetes disease',
      image_url: '/lovable-uploads/c844c6d6-b0cf-4f5c-95fd-3643732e01cd.png',
      display_order: 2,
    },
    {
      id: 'hypertension',
      title: 'High Blood Pressure (HTN)',
      description: 'Brief overview of hypertension',
      image_url: '/lovable-uploads/60b9a807-180b-4154-a7bd-67456df7e144.png',
      display_order: 3,
    },
    {
      id: 'kidney',
      title: 'Kidney Failure',
      description: 'Brief overview of kidney failure',
      image_url: '/lovable-uploads/04649f92-19d0-42f3-8144-16a6b1cd3472.png',
      display_order: 4,
    },
    {
      id: 'heart',
      title: 'Heart Failure',
      description: 'Brief overview of heart failure',
      image_url: '/lovable-uploads/b4929094-efa1-4671-8921-b01afd83db65.png',
      display_order: 5,
    },
  ];

  // Use database images if available, otherwise use default images
  const imagesToDisplay = diseaseImages.length > 0 ? diseaseImages : defaultImages;

  // Auto-slide functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoSlide = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(autoSlide);
  }, [emblaApi]);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-garrison-navy mb-4">
              Information about Diseases
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Loading visual resources...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-garrison-navy mb-4">
            Information about Diseases
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about common diseases, their symptoms, causes, and prevention methods through our visual resources.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setEmblaApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {imagesToDisplay.map((image) => (
                <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                      <CardContent className="p-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              onClick={() => setSelectedImage(image)}
                              className="relative overflow-hidden rounded-lg group"
                            >
                              <img
                                src={image.image_url}
                                alt={image.title}
                                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4">
                                  <h3 className="text-white font-semibold text-lg mb-1">
                                    {image.title}
                                  </h3>
                                  {image.description && (
                                    <p className="text-white/90 text-sm">
                                      {image.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </DialogTrigger>
                        </Dialog>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/80 hover:bg-white border-garrison-teal/20 hover:border-garrison-teal" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/80 hover:bg-white border-garrison-teal/20 hover:border-garrison-teal" />
          </Carousel>

          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-6 md:hidden space-x-2">
            {imagesToDisplay.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-garrison-teal transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Full-screen image dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              {selectedImage && (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Tap any image to view it in full screen. Images automatically slide every 4 seconds.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiseaseInformation;
