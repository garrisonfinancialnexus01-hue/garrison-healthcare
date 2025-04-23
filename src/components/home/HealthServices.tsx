
import { Heart, BookOpen, Stethoscope, Users, GalleryVertical } from "lucide-react";
import { Link } from "react-router-dom";
import HealthCard from "../ui/HealthCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const services = [
  {
    icon: Heart,
    title: "Information about diseases",
    description: "Access accurate and up-to-date medical information on various health conditions.",
    link: "/services#information",
    gallery: [
      {
        src: "/lovable-uploads/26521903-4164-446d-913f-8d65fb9b2185.png",
        alt: "Malaria disease information overview",
        hdSrc: "/lovable-uploads/26521903-4164-446d-913f-8d65fb9b2185.png"
      },
      {
        src: "/lovable-uploads/ec63752e-79d7-4f86-97e6-757c1e8ac0e7.png",
        alt: "Diabetes mellitus disease information",
        hdSrc: "/lovable-uploads/ec63752e-79d7-4f86-97e6-757c1e8ac0e7.png"
      },
      {
        src: "/lovable-uploads/b43a88c7-e45c-4495-af0b-9301e64f9147.png",
        alt: "High blood pressure (HTN) information",
        hdSrc: "/lovable-uploads/b43a88c7-e45c-4495-af0b-9301e64f9147.png"
      },
      {
        src: "/lovable-uploads/ccf555e1-dfcb-453b-90ee-e04a44befc30.png",
        alt: "Kidney failure information overview",
        hdSrc: "/lovable-uploads/ccf555e1-dfcb-453b-90ee-e04a44befc30.png"
      },
      {
        src: "/lovable-uploads/a8f42de6-c556-4699-b2fd-5f42a8644036.png",
        alt: "Heart failure disease information",
        hdSrc: "/lovable-uploads/a8f42de6-c556-4699-b2fd-5f42a8644036.png"
      }
    ]
  },
  {
    icon: Stethoscope,
    title: "Health Consultations",
    description: "Get professional advice from our team of healthcare professionals.",
    link: "/services#consultations",
    gallery: [
      {
        src: "/lovable-uploads/0c377822-93f1-4059-a8f7-e8d945f865be.png",
        alt: "Health consultation with smiling doctor",
        hdSrc: "/lovable-uploads/0c377822-93f1-4059-a8f7-e8d945f865be.png"
      },
      {
        src: "/lovable-uploads/149bf20d-3f0b-4bc2-b53b-44cec7cbb3c4.png",
        alt: "Doctor and patient reviewing documents",
        hdSrc: "/lovable-uploads/149bf20d-3f0b-4bc2-b53b-44cec7cbb3c4.png"
      },
      {
        src: "/lovable-uploads/f6f114d0-cc75-4332-8af8-85699dbf10dc.png",
        alt: "Female healthcare professional consulting patient",
        hdSrc: "/lovable-uploads/f6f114d0-cc75-4332-8af8-85699dbf10dc.png"
      }
    ]
  },
  {
    icon: BookOpen,
    title: "Health Education",
    description: "Learn about preventive healthcare measures and healthy lifestyle practices.",
    link: "/services#education",
    gallery: [
      {
        src: "/lovable-uploads/4c22f431-e2e6-4d39-9282-713e55c19c72.png",
        alt: "USAID Health Education Community Session",
        hdSrc: "/lovable-uploads/4c22f431-e2e6-4d39-9282-713e55c19c72.png"
      },
      {
        src: "/lovable-uploads/497e76d6-65b9-4a2a-b2f9-0ff14cffb6ee.png",
        alt: "Healthcare professional discussing with patient",
        hdSrc: "/lovable-uploads/497e76d6-65b9-4a2a-b2f9-0ff14cffb6ee.png"
      },
      {
        src: "/lovable-uploads/0372b9e0-0341-420f-8d15-691ed91263bd.png",
        alt: "Community health education session",
        hdSrc: "/lovable-uploads/0372b9e0-0341-420f-8d15-691ed91263bd.png"
      }
    ]
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with a community of individuals focused on health and wellness.",
    link: "/services#support",
    gallery: [
      {
        src: "/lovable-uploads/76f07cf1-1066-4fb0-a7c8-c2d6f73a3b93.png",
        alt: "Health education for children and families",
        hdSrc: "/lovable-uploads/76f07cf1-1066-4fb0-a7c8-c2d6f73a3b93.png"
      },
      {
        src: "/lovable-uploads/9ee79168-7296-4163-9356-30e85d6bea9e.png",
        alt: "Community-focused health awareness event",
        hdSrc: "/lovable-uploads/9ee79168-7296-4163-9356-30e85d6bea9e.png"
      },
      {
        src: "/lovable-uploads/e4869e10-cd9f-4d51-8bd1-e3893bb72d8c.png",
        alt: "Family health education outreach and support",
        hdSrc: "/lovable-uploads/e4869e10-cd9f-4d51-8bd1-e3893bb72d8c.png"
      }
    ]
  }
];

const VerticalImageGallery = ({ images }: { images: { src: string; alt: string; hdSrc: string }[] }) => {
  return (
    <div className="space-y-2">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div className="cursor-pointer group rounded-md overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">View</span>
                </div>
              </div>
              <p className="text-xs mt-1 text-muted-foreground line-clamp-1">{image.alt}</p>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium">{image.alt}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                High quality version of the image
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted rounded-md overflow-hidden">
              <img
                src={image.hdSrc}
                alt={image.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

const HealthServices = () => {
  return (
    <section className="py-16 bg-health-green-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            Comprehensive health services to support your wellbeing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <HealthCard key={index} className="text-center flex flex-col h-full">
              <div className="inline-flex items-center justify-center p-3 bg-health-green-light rounded-full mb-4">
                <service.icon className="h-6 w-6 text-health-green-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              {service.gallery && service.gallery.length > 0 && (
                <div className="mt-auto mb-4 w-full">
                  <div className="flex items-center mb-2">
                    <GalleryVertical className="h-4 w-4 mr-1 text-health-green-dark" />
                    <span className="text-sm font-medium text-health-green-dark">Gallery</span>
                  </div>
                  <div className="h-[180px]">
                    <ScrollArea className="h-full">
                      <VerticalImageGallery images={service.gallery.slice(0, 3)} />
                    </ScrollArea>
                  </div>
                </div>
              )}
              
              <Link 
                to={service.link}
                className="inline-flex items-center text-health-red-dark hover:text-health-red transition-colors font-medium mt-auto"
              >
                Learn more
              </Link>
            </HealthCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthServices;
