
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const diseaseData = [
  {
    id: 1,
    title: "Malaria",
    image: "/lovable-uploads/ea21532b-804b-4585-bfe0-3aac552068b9.png",
    description: "A dangerous disease caused by parasites transmitted through infected mosquito bites",
    category: "Infectious Disease"
  },
  {
    id: 2,
    title: "Diabetes Mellitus (DM)",
    image: "/lovable-uploads/0f7998a7-8347-4d12-b379-43ebda7e50b5.png",
    description: "A chronic condition where the body struggles to manage blood sugar levels",
    category: "Metabolic Disorder"
  },
  {
    id: 3,
    title: "High Blood Pressure (HTN)",
    image: "/lovable-uploads/03e59c53-1f2c-414b-9cc9-5848ca351789.png",
    description: "A condition where blood pushes too hard against artery walls over time",
    category: "Cardiovascular"
  },
  {
    id: 4,
    title: "Kidney Failure",
    image: "/lovable-uploads/9cf6d955-32e6-4160-8420-1ae7135a4cde.png",
    description: "Occurs when kidneys can no longer filter waste and fluids from the blood",
    category: "Renal Disease"
  },
  {
    id: 5,
    title: "Heart Failure",
    image: "/lovable-uploads/e7a1a62e-7383-42db-a420-6697044e6f1f.png",
    description: "Occurs when the heart can't pump blood effectively, leading to fatigue",
    category: "Cardiovascular"
  }
];

const DiseaseInformation = () => {
  const [selectedImage, setSelectedImage] = useState<typeof diseaseData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (disease: typeof diseaseData[0]) => {
    setSelectedImage(disease);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm font-medium bg-garrison-teal/10 text-garrison-teal border-garrison-teal/20">
            Health Education
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Information about Common Diseases
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed about common health conditions. Click on any image to view detailed information
            including symptoms, causes, prevention, and complications.
          </p>
        </div>

        {/* Disease Carousel */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {diseaseData.map((disease) => (
                <CarouselItem key={disease.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white border border-gray-200">
                    <CardContent className="p-0">
                      {/* Image Container */}
                      <div 
                        className="relative overflow-hidden rounded-t-lg bg-gray-100"
                        onClick={() => handleImageClick(disease)}
                      >
                        <img
                          src={disease.image}
                          alt={disease.title}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                            <ZoomIn className="h-6 w-6 text-garrison-teal" />
                          </div>
                        </div>
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-garrison-teal text-white text-xs">
                            {disease.category}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {disease.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {disease.description}
                        </p>
                        <div className="mt-4 flex items-center text-garrison-teal text-sm font-medium group-hover:text-garrison-teal-dark transition-colors">
                          <span>Click to view details</span>
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 hover:bg-white hover:border-garrison-teal text-garrison-teal" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 hover:bg-white hover:border-garrison-teal text-garrison-teal" />
          </Carousel>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-garrison-teal/5 to-blue-50 border-garrison-teal/10 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Need Professional Medical Advice?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                While this information is educational, it's not a substitute for professional medical diagnosis 
                and treatment. Consult with our qualified healthcare professionals for personalized care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge className="bg-garrison-teal text-white px-4 py-2 text-sm">
                  📞 Tel: +256-756-530349 / +256-761-281222
                </Badge>
                <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">
                  ✉️ Email: garrisonhealth147@gmail.com
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Modal */}
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden bg-white">
            <DialogTitle className="sr-only">
              {selectedImage?.title} - Disease Information
            </DialogTitle>
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="text-white">
                    <Badge className="mb-2 bg-garrison-teal">
                      {selectedImage.category}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                    <p className="text-white/90">{selectedImage.description}</p>
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
