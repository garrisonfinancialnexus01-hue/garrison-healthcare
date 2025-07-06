
import { Shield, Heart, Users, Award, Clock, MapPin } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Healthcare",
      description: "Reliable medical information and professional healthcare services you can trust."
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We provide healthcare with empathy, understanding, and genuine care for your wellbeing."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our qualified healthcare professionals are dedicated to your health and recovery."
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "We maintain high standards in all our healthcare services and patient interactions."
    },
    {
      icon: Clock,
      title: "Available Support",
      description: "Get the healthcare support you need when you need it most."
    },
    {
      icon: MapPin,
      title: "Local Presence",
      description: "Serving the Kampala community with accessible healthcare services."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-garrison-teal to-garrison-teal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Garrison Health?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're committed to providing exceptional healthcare services that make a difference in your life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-garrison-red transition-colors">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
