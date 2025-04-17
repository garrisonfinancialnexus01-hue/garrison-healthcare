
import { Heart, BookOpen, Stethoscope, Users, Image as ImageIcon, ChevronDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const services = [
  {
    icon: Heart,
    title: "Health Information",
    description: "Access accurate and up-to-date medical information on various health conditions.",
    link: "/services#information",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Medical information resources",
        hdSrc: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Digital health information",
        hdSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Medical reference materials",
        hdSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health guides and publications",
        hdSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Digital health resources",
        hdSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
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
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health consultation session",
        hdSrc: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1579684453397-57b996e60df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Telehealth consultation",
        hdSrc: "https://images.unsplash.com/photo-1579684453397-57b996e60df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Telehealth appointment",
        hdSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health innovation consultation",
        hdSrc: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Team health consultation",
        hdSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
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
        alt: "Health education workshop",
        hdSrc: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health literacy resources",
        hdSrc: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Digital health education",
        hdSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Health data visualization",
        hdSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Interactive health learning",
        hdSrc: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
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
        alt: "Community health meetup",
        hdSrc: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Support group session",
        hdSrc: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Wellness group activity",
        hdSrc: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Support network meeting",
        hdSrc: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      },
      {
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        alt: "Community health initiative",
        hdSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=100"
      }
    ]
  }
];

const ImageGallery = ({ images }: { images: { src: string; alt: string; hdSrc: string }[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-between">
          <span className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            View Image Gallery
          </span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-background">
        <DropdownMenuGroup>
          {images.map((image, index) => (
            <DropdownMenuItem key={index} asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer flex items-center py-2 px-1 hover:bg-accent rounded-sm">
                    <div className="h-10 w-10 mr-3 overflow-hidden rounded-sm">
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    </div>
                    <div className="text-sm truncate">{image.alt}</div>
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
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
            <HealthCard key={index} className="text-center flex flex-col">
              <div className="inline-flex items-center justify-center p-3 bg-health-green-light rounded-full mb-4">
                <service.icon className="h-6 w-6 text-health-green-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              {service.gallery && service.gallery.length > 0 && (
                <div className="mt-auto mb-4 w-full">
                  <div className="flex items-center mb-2">
                    <ImageIcon className="h-4 w-4 mr-1 text-health-green-dark" />
                    <span className="text-sm font-medium text-health-green-dark">Gallery</span>
                  </div>
                  <ImageGallery images={service.gallery} />
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
