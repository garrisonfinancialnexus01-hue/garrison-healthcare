
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, Brain, Pill, Activity, Users, Clock, Shield } from "lucide-react";
import DiseaseInformation from "@/components/home/DiseaseInformation";

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "General Consultation",
      description: "Comprehensive health assessments and medical consultations with experienced healthcare professionals.",
      features: ["Health screenings", "Symptom evaluation", "Treatment planning", "Follow-up care"]
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Chronic Disease Management",
      description: "Specialized care for diabetes, hypertension, heart disease, and other chronic conditions.",
      features: ["Diabetes management", "Blood pressure monitoring", "Medication management", "Lifestyle counseling"]
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Mental Health Support",
      description: "Professional mental health services including counseling and therapy sessions.",
      features: ["Stress management", "Anxiety treatment", "Depression support", "Behavioral therapy"]
    },
    {
      icon: <Pill className="h-8 w-8" />,
      title: "Medication Consultation",
      description: "Expert guidance on medication management, interactions, and treatment optimization.",
      features: ["Drug interactions", "Dosage optimization", "Side effect management", "Generic alternatives"]
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Preventive Care",
      description: "Proactive healthcare services focused on disease prevention and health maintenance.",
      features: ["Vaccinations", "Health screenings", "Wellness programs", "Risk assessments"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Health",
      description: "Comprehensive healthcare services for the entire family, from pediatrics to geriatrics.",
      features: ["Pediatric care", "Adult medicine", "Geriatric care", "Family planning"]
    }
  ];

  const consultationModes = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Video Consultations",
      description: "Face-to-face consultations from the comfort of your home",
      availability: "Available 24/7"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Phone Consultations",
      description: "Quick medical advice and follow-up consultations",
      availability: "Emergency support"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Chat Consultations",
      description: "Text-based consultations for non-urgent medical queries",
      availability: "Instant responses"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Healthcare Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Comprehensive healthcare solutions designed to meet your medical needs with professional care and convenience.
            </p>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-garrison-teal">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-garrison-navy mb-4">
              Medical Services We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From routine check-ups to specialized treatments, we provide comprehensive healthcare services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="text-garrison-teal mb-4">{service.icon}</div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-garrison-teal rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Information Section */}
      <DiseaseInformation />

      {/* Consultation Modes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-garrison-navy mb-4">
              Consultation Options
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the consultation method that works best for you. All options provide the same quality of care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationModes.map((mode, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-garrison-teal/10 rounded-full flex items-center justify-center text-garrison-teal mb-4">
                    {mode.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{mode.title}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    {mode.description}
                  </CardDescription>
                  <div className="text-sm font-semibold text-garrison-teal">
                    {mode.availability}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="garrison-btn-primary">
              Schedule Your Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-garrison-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Emergency Care?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our medical team is available 24/7 for urgent health concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-garrison-teal">
              Call Emergency Line
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-garrison-teal">
              Start Emergency Chat
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
