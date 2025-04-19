
import Layout from "@/components/layout/Layout";
import { Heart, ThumbsUp, Lightbulb, Award } from "lucide-react";
import HealthCard from "@/components/ui/HealthCard";

const About = () => {
  return (
    <Layout>
      <div className="bg-health-green-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">About Garrison Health</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn about our mission, vision, and the team behind Garrison Health
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Garrison Health, our mission is to provide accurate, accessible, and culturally relevant health information to empower individuals to make informed decisions about their health and wellbeing.
              </p>
              <p className="text-muted-foreground mb-6">
                We are committed to improving health literacy and promoting preventive healthcare measures in our communities. We believe that access to reliable health information is a fundamental right and a key component of healthcare equity.
              </p>
              <p className="text-muted-foreground">
                Through our platform, we aim to bridge the gap between complex medical information and public understanding, making health knowledge accessible to all.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                alt="Garrison Health Mission"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-health-green-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and interactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <HealthCard className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-health-red-light rounded-full mb-4">
                <Heart className="h-6 w-6 text-health-red-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-muted-foreground">We approach our work with empathy and understanding of the diverse health needs in our communities.</p>
            </HealthCard>
            
            <HealthCard className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-health-red-light rounded-full mb-4">
                <ThumbsUp className="h-6 w-6 text-health-red-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-muted-foreground">We uphold the highest standards of honesty, transparency, and ethical conduct in all our operations.</p>
            </HealthCard>
            
            <HealthCard className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-health-red-light rounded-full mb-4">
                <Lightbulb className="h-6 w-6 text-health-red-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">We continuously seek new and better ways to deliver health information and services to our audiences.</p>
            </HealthCard>
            
            <HealthCard className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-health-red-light rounded-full mb-4">
                <Award className="h-6 w-6 text-health-red-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">We strive for excellence in the quality and accuracy of the health information we provide.</p>
            </HealthCard>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <img
                src="/lovable-uploads/260a8d31-4c30-4748-9759-f5cbdb710afc.png"
                alt="Isiah Kasule"
                className="w-full max-w-md rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-title mb-6">Our Founder</h2>
              <h3 className="text-2xl font-semibold mb-4">Isiah Kasule</h3>
              <p className="text-muted-foreground mb-6">
                Isiah Kasule is the visionary founder and CEO of Garrison Health. With a background in healthcare and a passion for health education, Isiah established Garrison Health to address the gap in accessible, reliable health information in Uganda and beyond.
              </p>
              <p className="text-muted-foreground mb-6">
                Having witnessed firsthand the challenges many people face in accessing accurate health information, Isiah was motivated to create a platform that would empower individuals with knowledge about their health, enabling them to make informed decisions and take proactive steps towards better health outcomes.
              </p>
              <p className="text-muted-foreground">
                Under Isiah's leadership, Garrison Health has grown from a small local initiative to a trusted source of health information, serving communities across Uganda with plans for expansion throughout East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
