
import Layout from "@/components/layout/Layout";
import { FileText, UserCheck, BookOpen, MessageSquare, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Comprehensive healthcare solutions tailored to meet your needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Information about Diseases */}
          <div id="diseases" className="mb-20">
            <div className="garrison-card p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <FileText className="h-12 w-12 text-garrison-teal mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">Information about Diseases</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Access comprehensive, medically-reviewed information about various health conditions, 
                    their symptoms, causes, treatments, and prevention strategies. Our disease information 
                    library is regularly updated with the latest medical research and guidelines.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Detailed disease profiles and symptoms
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Treatment options and medications
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Prevention and lifestyle recommendations
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Visual aids and infographics
                    </li>
                  </ul>
                  <Button className="garrison-btn-primary">
                    Browse Disease Information
                  </Button>
                </div>
                <div className="lg:text-center">
                  <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-garrison-teal mx-auto mb-4" />
                      <p className="text-gray-600">Disease Information Images</p>
                      <p className="text-sm text-gray-500">Visual resources coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Consultations */}
          <div id="consultations" className="mb-20">
            <div className="garrison-card p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <div className="flex items-center mb-6">
                    <UserCheck className="h-12 w-12 text-garrison-teal mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">Health Consultations</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Get professional health advice from our qualified practitioners. Our consultation 
                    services provide personalized medical guidance to help you make informed decisions 
                    about your health and treatment options.
                  </p>
                  
                  {/* Consultant Profile */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Meet Your Health Consultant</h3>
                    <h4 className="text-lg font-medium text-garrison-teal mb-3">Immaculate Nakamya</h4>
                    <p className="text-gray-600 mb-4">
                      Health Practitioner at Garrison Health with extensive experience in primary healthcare, 
                      preventive medicine, and patient education. Dedicated to providing compassionate, 
                      evidence-based healthcare guidance.
                    </p>
                    <p className="text-sm text-gray-700 italic mb-4">
                      "Consult Immaculate Nakamya, a health practitioner at Garrison Health."
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="garrison-btn-primary">
                      <a 
                        href="https://wa.me/256745101519?text=Hello%20Immaculate,%20I%20would%20like%20to%20schedule%20a%20health%20consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp Consultation
                      </a>
                    </Button>
                    <Button asChild className="garrison-btn-outline">
                      <a href="tel:+256745101519">
                        Call +256 745 101 519
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="lg:order-1 lg:text-center">
                  <div className="w-64 h-64 mx-auto rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="/lovable-uploads/0f7260d9-52be-4b86-baed-073721b4feee.png" 
                      alt="Immaculate Nakamya - Health Practitioner at Garrison Health" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">Immaculate Nakamya</h3>
                    <p className="text-garrison-teal font-medium">Health Practitioner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Education */}
          <div id="education" className="mb-20">
            <div className="garrison-card p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <BookOpen className="h-12 w-12 text-garrison-teal mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">Health Education</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Stay informed with our weekly health education programs. We provide regularly updated 
                    educational content covering various health topics, preventive care strategies, and 
                    wellness tips tailored for the Ugandan context.
                  </p>
                  
                  <div className="bg-garrison-red/10 border-l-4 border-garrison-red p-4 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-garrison-red mr-2" />
                      <span className="font-semibold text-garrison-red">Updated Weekly</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      New health education content is published every week to keep you informed 
                      about the latest health trends and recommendations.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Weekly health tips and advice
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Preventive care guidelines
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Seasonal health recommendations
                    </li>
                    <li className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-garrison-red rounded-full mr-3"></div>
                      Community health initiatives
                    </li>
                  </ul>
                  
                  <Button asChild className="garrison-btn-primary">
                    <Link to="/health-articles">
                      View Health Education Content
                    </Link>
                  </Button>
                </div>
                <div className="lg:text-center">
                  <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="h-16 w-16 text-garrison-teal mx-auto mb-4" />
                      <p className="text-gray-600">Weekly Health Education</p>
                      <p className="text-sm text-gray-500">Updated every week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today to learn more about our services or schedule a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="garrison-btn-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild className="garrison-btn-outline">
              <a href="tel:+256745101519">Call Now</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
