
import Layout from "@/components/layout/Layout";
import { Phone, Mail, AlertCircle } from "lucide-react";
import HealthCard from "@/components/ui/HealthCard";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div className="bg-health-green-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our team for any inquiries or support
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our services? Want to learn more about a specific health topic? Our team is here to help. Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <ContactInfo />
              
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                <AlertCircle className="text-amber-600 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  If you don't receive a confirmation within 24 hours, please email us directly at{" "}
                  <a href="mailto:garrisonhealth147@gmail.com" className="font-medium underline hover:text-amber-900">
                    garrisonhealth147@gmail.com
                  </a>{" "}
                  or call our support team.
                </p>
              </div>
            </div>
            
            <div>
              <HealthCard>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </HealthCard>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-health-green-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            For urgent inquiries, please contact us directly through:
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a 
              href="tel:+256756530349" 
              className="inline-flex items-center justify-center px-6 py-3 bg-health-red-light text-health-red-dark font-semibold rounded-md hover:bg-health-red transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              +256 756 530 349
            </a>
            
            <a 
              href="mailto:garrisonhealth147@gmail.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-health-green-light text-health-green-dark font-semibold rounded-md hover:bg-health-green/20 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              garrisonhealth147@gmail.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
