
import { Link } from "react-router-dom";
import { FileText, UserCheck, BookOpen, ArrowRight, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Services = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-garrison-teal to-garrison-red py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive healthcare services designed to meet your needs and improve your well-being
            </p>
          </div>
        </section>

        {/* Services Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Information about Diseases */}
          <section id="diseases" className="mb-20">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-garrison-teal rounded-full flex items-center justify-center mr-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Information about Diseases</h2>
                  <p className="text-gray-600">Access comprehensive information about various health conditions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-garrison-teal">What We Provide</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Detailed disease information and symptoms</li>
                    <li>• Treatment options and recommendations</li>
                    <li>• Prevention strategies and health tips</li>
                    <li>• Risk factors and early warning signs</li>
                    <li>• Latest medical research and updates</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-garrison-teal">Common Conditions We Cover</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Diabetes and blood sugar management</li>
                    <li>• Hypertension and cardiovascular health</li>
                    <li>• Malaria prevention and treatment</li>
                    <li>• Respiratory conditions</li>
                    <li>• Infectious diseases</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/health-articles">
                  <Button className="bg-garrison-teal hover:bg-garrison-teal-dark">
                    Browse Health Articles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Health Consultations */}
          <section id="consultations" className="mb-20">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-garrison-red rounded-full flex items-center justify-center mr-6">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Consultations</h2>
                  <p className="text-gray-600">Get professional health advice from our qualified practitioners</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-garrison-red">Consultation Services</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li>• General health assessments</li>
                    <li>• Symptom evaluation and diagnosis</li>
                    <li>• Treatment planning and follow-up</li>
                    <li>• Preventive care recommendations</li>
                    <li>• Health education and lifestyle guidance</li>
                  </ul>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-garrison-red">Consultation Hours</h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Saturday: 9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Sunday: Emergency consultations only</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-garrison-teal/10 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <img 
                        src="/lovable-uploads/ccf555e1-dfcb-453b-90ee-e04a44befc30.png" 
                        alt="Immaculate Nakamya" 
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Immaculate Nakamya</h4>
                        <p className="text-garrison-teal">Health Practitioner</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-3 text-garrison-teal" />
                      <span>+256 745 101 519</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-3 text-garrison-teal" />
                      <span>info@garrisonhealthcare.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/consultation">
                  <Button className="bg-garrison-red hover:bg-garrison-red-dark">
                    Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Health Education */}
          <section id="education" className="mb-20">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-garrison-teal rounded-full flex items-center justify-center mr-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Education</h2>
                  <p className="text-gray-600">Weekly updated health education materials to keep you informed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-garrison-teal">Educational Resources</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Weekly health tips and updates</li>
                    <li>• Seasonal health awareness campaigns</li>
                    <li>• Nutrition and diet guidelines</li>
                    <li>• Exercise and wellness programs</li>
                    <li>• Mental health and stress management</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-garrison-teal">Learning Formats</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Interactive health articles</li>
                    <li>• Visual infographics and guides</li>
                    <li>• Health checklists and assessments</li>
                    <li>• Community health workshops</li>
                    <li>• Online educational materials</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3 text-garrison-teal">Stay Updated</h4>
                <p className="text-gray-600 mb-4">
                  Subscribe to our health education newsletter to receive weekly updates on important health topics, 
                  seasonal health tips, and the latest medical insights delivered directly to your inbox.
                </p>
                <Button variant="outline" className="border-garrison-teal text-garrison-teal hover:bg-garrison-teal hover:text-white">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
