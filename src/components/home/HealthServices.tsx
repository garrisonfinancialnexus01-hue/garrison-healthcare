
import { Heart, BookOpen, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";
import HealthCard from "../ui/HealthCard";
import { AspectRatio } from "../ui/aspect-ratio";

const services = [
  {
    icon: Heart,
    title: "Health Information",
    description: "Access accurate and up-to-date medical information on various health conditions.",
    link: "/services#information",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    imageAlt: "Medical information illustration"
  },
  {
    icon: Stethoscope,
    title: "Health Consultations",
    description: "Get professional advice from our team of healthcare professionals.",
    link: "/services#consultations"
  },
  {
    icon: BookOpen,
    title: "Health Education",
    description: "Learn about preventive healthcare measures and healthy lifestyle practices.",
    link: "/services#education"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with a community of individuals focused on health and wellness.",
    link: "/services#support"
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
            <HealthCard key={index} className={`text-center ${service.image ? 'flex flex-col' : ''}`}>
              <div className="inline-flex items-center justify-center p-3 bg-health-green-light rounded-full mb-4">
                <service.icon className="h-6 w-6 text-health-green-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              {service.image && (
                <div className="mt-auto mb-4 w-full">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      className="object-cover w-full h-full transition-all hover:scale-105"
                    />
                  </AspectRatio>
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
