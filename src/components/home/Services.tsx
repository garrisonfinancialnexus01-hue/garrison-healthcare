
import { Link } from "react-router-dom";
import { FileText, UserCheck, BookOpen, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Information about Diseases",
      description: "Access comprehensive information about various health conditions, symptoms, and treatments.",
      link: "/services#diseases"
    },
    {
      icon: UserCheck,
      title: "Health Consultations",
      description: "Get professional health advice from our qualified practitioners.",
      link: "/services#consultations"
    },
    {
      icon: BookOpen,
      title: "Health Education",
      description: "Weekly updated health education materials to keep you informed.",
      link: "/services#education"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive healthcare services designed to meet your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="garrison-card p-8 text-center group hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-garrison-teal rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-garrison-red transition-colors">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link 
                to={service.link}
                className="inline-flex items-center text-garrison-teal hover:text-garrison-red font-semibold transition-colors"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
