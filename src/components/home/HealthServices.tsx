
import { Heart, BookOpen, Stethoscope, Users, Image } from "lucide-react";
import { Link } from "react-router-dom";
import HealthCard from "../ui/HealthCard";
import { AspectRatio } from "../ui/aspect-ratio";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "../ui/carousel";

const services = [
  {
    icon: Heart,
    title: "Health Information",
    description: "Access accurate and up-to-date medical information on various health conditions.",
    link: "/services#information",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Medical information resources"
      },
      {
        src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Digital health information"
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
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health consultation session"
      },
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Telehealth consultation"
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
        src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health education workshop"
      },
      {
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health literacy resources"
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
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Community health meetup"
      },
      {
        src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Support group session"
      }
    ]
  }
];

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
            <HealthCard key={index} className="text-center flex flex-col">
              <div className="inline-flex items-center justify-center p-3 bg-health-green-light rounded-full mb-4">
                <service.icon className="h-6 w-6 text-health-green-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              {service.gallery && service.gallery.length > 0 && (
                <div className="mt-auto mb-4 w-full">
                  <div className="flex items-center mb-2">
                    <Image className="h-4 w-4 mr-1 text-health-green-dark" />
                    <span className="text-sm font-medium text-health-green-dark">Gallery</span>
                  </div>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {service.gallery.map((image, i) => (
                        <CarouselItem key={i}>
                          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="object-cover w-full h-full transition-all hover:scale-105"
                            />
                          </AspectRatio>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-2">
                      <CarouselPrevious className="relative static translate-y-0 -left-0 mr-2 h-6 w-6" />
                      <CarouselNext className="relative static translate-y-0 -right-0 h-6 w-6" />
                    </div>
                  </Carousel>
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
