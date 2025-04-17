
import Layout from "@/components/layout/Layout";
import HealthCard from "@/components/ui/HealthCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Heart, 
  Stethoscope, 
  BookOpen, 
  Users, 
  FileText, 
  Video, 
  Globe, 
  MessageCircle 
} from "lucide-react";

const services = [
  {
    id: "information",
    icon: Heart,
    title: "Health Information",
    description: "Access accurate and up-to-date medical information on various health conditions, treatments, and preventive measures. Our content is reviewed by healthcare professionals to ensure accuracy and relevance.",
    features: [
      "Evidence-based health articles",
      "Medical condition guides",
      "Treatment options and information",
      "Preventive healthcare resources",
      "Health tips and advice"
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        alt: "Healthcare information resources"
      },
      {
        src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        alt: "Digital health information"
      }
    ]
  },
  {
    id: "consultations",
    icon: Stethoscope,
    title: "Health Consultations",
    description: "Get professional advice from our team of healthcare professionals. Our consultations are designed to provide you with guidance on your health concerns and direct you to appropriate healthcare services when needed.",
    features: [
      "Virtual health consultations",
      "Medical referrals",
      "Follow-up support",
      "Health risk assessments",
      "Medication guidance"
    ]
  },
  {
    id: "education",
    icon: BookOpen,
    title: "Health Education",
    description: "Learn about preventive healthcare measures and healthy lifestyle practices through our educational resources. Our programs are designed to improve health literacy and empower individuals to take control of their health.",
    features: [
      "Health workshops and seminars",
      "Educational materials",
      "Wellness programs",
      "First aid training",
      "Health literacy resources"
    ]
  },
  {
    id: "support",
    icon: Users,
    title: "Community Support",
    description: "Connect with a community of individuals focused on health and wellness. Share experiences, get support, and learn from others who are navigating similar health journeys.",
    features: [
      "Community forums",
      "Support groups",
      "Peer counseling",
      "Health events and meetups",
      "Volunteer opportunities"
    ]
  }
];

const additionalServices = [
  {
    icon: FileText,
    title: "Health Publications",
    description: "Regular newsletters, guides, and publications on various health topics."
  },
  {
    icon: Video,
    title: "Video Resources",
    description: "Instructional videos, expert interviews, and health demonstrations."
  },
  {
    icon: Globe,
    title: "Outreach Programs",
    description: "Community health initiatives and outreach activities in underserved areas."
  },
  {
    icon: MessageCircle,
    title: "Health Helpline",
    description: "Telephone service providing guidance on health concerns and questions."
  }
];

const ServiceDetail = ({ service }: { service: typeof services[0] }) => {
  return (
    <div id={service.id} className="pt-16 -mt-16 mb-16">
      <HealthCard className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="h-16 w-16 rounded-full bg-health-green-light flex items-center justify-center mb-4">
            <service.icon className="h-8 w-8 text-health-green-dark" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
          <Button asChild className="health-btn-primary px-6 py-3 mt-auto">
            <Link to="/contact">Inquire Now</Link>
          </Button>
        </div>
        
        <div className="md:col-span-2">
          <p className="text-muted-foreground mb-6">{service.description}</p>
          
          <h4 className="text-lg font-semibold mb-4">What we offer:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start mb-2">
                <div className="h-5 w-5 rounded-full bg-health-red-light flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-health-red-dark text-xs">✓</span>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {service.images && service.images.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Resources:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.images.map((image, index) => (
                  <div key={index} className="rounded-md overflow-hidden border border-border">
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="object-cover w-full h-full transition-all hover:scale-105"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </HealthCard>
    </div>
  );
};

const Services = () => {
  return (
    <Layout>
      <div className="bg-health-green-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive health services designed to support your wellbeing
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="px-4 py-2 bg-health-green-light text-foreground rounded-md hover:bg-health-green transition-colors"
              >
                {service.title}
              </a>
            ))}
          </div>
          
          {services.map((service) => (
            <ServiceDetail key={service.id} service={service} />
          ))}
        </div>
      </section>
      
      <section className="py-16 bg-health-green-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Additional Services</h2>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
              Complementary offerings to enhance your healthcare experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <HealthCard key={index} className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-health-red-light rounded-full mb-4">
                  <service.icon className="h-6 w-6 text-health-red-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </HealthCard>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-health-red-light rounded-lg p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to prioritize your health?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Contact us today to learn more about our services and how we can support your health journey.
            </p>
            <Button asChild className="health-btn-primary px-8 py-3 text-base">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
