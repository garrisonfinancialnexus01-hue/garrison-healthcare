
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DiseaseImage {
  id: string;
  title: string;
  image_url: string;
  description?: string;
}

const DiseaseInformation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<DiseaseImage | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Disease information images data
  const diseaseImages: DiseaseImage[] = [
    {
      id: "malaria",
      title: "Malaria - Brief Overview",
      image_url: "/lovable-uploads/e23db825-cdfe-460f-bff7-c52cc133a391.png",
      description: "Comprehensive information about Malaria symptoms, causes, prevention and treatment"
    },
    {
      id: "diabetes",
      title: "Diabetes Mellitus (DM) - Brief Overview", 
      image_url: "/lovable-uploads/c8b40f55-6c21-4628-956a-97f928b08e18.png",
      description: "Complete guide to understanding Diabetes, its management and complications"
    },
    {
      id: "hypertension",
      title: "High Blood Pressure (HTN) - Brief Overview",
      image_url: "/lovable-uploads/889a0030-090a-4d12-92f7-a15697b5b575.png", 
      description: "Essential information about Hypertension prevention and management"
    },
    {
      id: "kidney-failure",
      title: "Kidney Failure - Brief Overview",
      image_url: "/lovable-uploads/e19a6c34-e597-4cdc-98e4-3966b457c4ef.png",
      description: "Understanding Kidney Failure signs, causes and treatment options"
    },
    {
      id: "heart-failure", 
      title: "Heart Failure - Brief Overview",
      image_url: "/lovable-uploads/0b4fb8c6-49ba-4be7-9b94-37b854dcffc9.png",
      description: "Comprehensive overview of Heart Failure symptoms and management"
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % diseaseImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, diseaseImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % diseaseImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + diseaseImages.length) % diseaseImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const openModal = (image: DiseaseImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-garrison-teal/5 to-garrison-red/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Information about Diseases
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive, medically-reviewed information about various health conditions.
            Tap on any image to view it in detail.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {diseaseImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="w-full flex-shrink-0 cursor-pointer group"
                  onClick={() => openModal(image)}
                >
                  <div className="relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-[500px] md:h-[600px] object-contain bg-white transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
                    
                    {/* Overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-2xl">
                      <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>
                      <p className="text-white/90 text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-garrison-teal/20"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5 text-garrison-teal" />
            </Button>
            
            <Button
              variant="outline"
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-garrison-teal/20"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5 text-garrison-teal" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {diseaseImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-garrison-red w-8' 
                    : 'bg-gray-300 hover:bg-garrison-teal'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
            {diseaseImages.map((image, index) => (
              <button
                key={image.id}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentSlide 
                    ? 'border-garrison-red shadow-lg scale-110' 
                    : 'border-gray-300 hover:border-garrison-teal opacity-70 hover:opacity-100'
                }`}
                onClick={() => goToSlide(index)}
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Modal for Full View */}
        <Dialog open={!!selectedImage} onOpenChange={() => closeModal()}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
            {selectedImage && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -top-12 right-0 bg-white/90 hover:bg-white z-50"
                  onClick={closeModal}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-gray-600">{selectedImage.description}</p>
                  </div>
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
