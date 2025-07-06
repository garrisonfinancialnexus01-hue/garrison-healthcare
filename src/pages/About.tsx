
import Layout from "@/components/layout/Layout";
import { Users, Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Garrison Health</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Dedicated to improving healthcare accessibility and education in Uganda
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Garrison Health was founded with a simple yet powerful vision: to make quality healthcare 
                information and services accessible to everyone in Uganda. We recognized the critical need 
                for reliable health education and professional medical guidance in our communities.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our journey began with the understanding that health literacy is fundamental to 
                individual and community wellbeing. We're committed to bridging the gap between 
                complex medical information and public understanding.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to serve our community with dedication, providing comprehensive 
                healthcare services and educational resources that empower individuals to make 
                informed decisions about their health.
              </p>
            </div>
            <div className="lg:text-center">
              <div className="inline-block p-8 bg-garrison-teal/10 rounded-2xl">
                <div className="w-64 h-64 bg-garrison-teal/20 rounded-full flex items-center justify-center">
                  <Heart className="h-24 w-24 text-garrison-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Founder</h2>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 bg-garrison-teal rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-4xl font-bold">IK</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Isiah Kasule</h3>
            <p className="text-lg text-garrison-teal font-semibold mb-6">Founder & CEO</p>
            
            <p className="text-lg text-gray-600 mb-6">
              Isiah Kasule is a visionary healthcare advocate and the driving force behind Garrison Health. 
              With a deep commitment to improving healthcare accessibility in Uganda, Isiah founded the 
              organization to address the critical gaps in health education and medical services.
            </p>
            
            <p className="text-lg text-gray-600">
              His passion for community health and dedication to empowering individuals through knowledge 
              has shaped Garrison Health's mission to be a trusted partner in everyone's health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-garrison-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide accessible, reliable healthcare information and professional medical services 
                that empower individuals and communities to achieve optimal health and wellbeing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-garrison-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be Uganda's leading healthcare education and service provider, creating healthier 
                communities through knowledge, compassion, and quality care.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-garrison-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Compassion, integrity, excellence, and accessibility guide everything we do. 
                We believe healthcare is a fundamental right that should be available to all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
