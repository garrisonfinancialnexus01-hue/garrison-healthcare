
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import HealthCard from "@/components/ui/HealthCard";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client only if both URL and key are available
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log Supabase initialization status for debugging
console.log("Supabase initialization:", {
  urlAvailable: !!supabaseUrl,
  keyAvailable: !!supabaseAnonKey,
  clientCreated: !!supabase
});

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <HealthCard>
        <div className="flex">
          <div className="mr-4">
            <div className="h-10 w-10 rounded-full bg-health-green-light flex items-center justify-center">
              <MapPin className="h-5 w-5 text-health-green-dark" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Location</h3>
            <p className="text-muted-foreground">Ntinda, Kampala, Uganda</p>
          </div>
        </div>
      </HealthCard>
      
      <HealthCard>
        <div className="flex">
          <div className="mr-4">
            <div className="h-10 w-10 rounded-full bg-health-green-light flex items-center justify-center">
              <Phone className="h-5 w-5 text-health-green-dark" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">
              <a href="tel:+256756530349" className="hover:text-primary transition-colors">
                +256 756 530 349
              </a>
            </p>
          </div>
        </div>
      </HealthCard>
      
      <HealthCard>
        <div className="flex">
          <div className="mr-4">
            <div className="h-10 w-10 rounded-full bg-health-green-light flex items-center justify-center">
              <Mail className="h-5 w-5 text-health-green-dark" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">
              <a href="mailto:garrisonhealth147@gmail.com" className="hover:text-primary transition-colors">
                garrisonhealth147@gmail.com
              </a>
            </p>
          </div>
        </div>
      </HealthCard>
      
      <HealthCard>
        <div className="flex">
          <div className="mr-4">
            <div className="h-10 w-10 rounded-full bg-health-green-light flex items-center justify-center">
              <Clock className="h-5 w-5 text-health-green-dark" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
            <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
      </HealthCard>
    </div>
  );
};

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Verify Supabase client is initialized
      if (!supabase) {
        console.error("Supabase client is not initialized. Check your environment variables.");
        throw new Error("Supabase client is not available - check your project settings");
      }
      
      // Log the attempt to call the function
      console.log("Attempting to call Supabase Edge Function with data:", {
        to: 'garrisonhealth147@gmail.com',
        subject: formData.subject,
        name: formData.name,
        email: formData.email
      });
      
      // Call the edge function to send email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          to: 'garrisonhealth147@gmail.com',
          subject: `Contact Form: ${formData.subject}`,
          content: `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone}
            
            Message:
            ${formData.message}
          `
        }
      });

      // Log the response for debugging
      console.log("Edge function response:", { data, error });

      if (error) throw error;

      toast({
        title: "Message sent successfully",
        description: "Thanks for reaching out! We'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
          required
        ></textarea>
      </div>
      
      <Button type="submit" className="health-btn-primary px-6 py-3" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

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
            For urgent inquiries, please call us directly at:
          </p>
          <div className="flex justify-center">
            <a 
              href="tel:+256756530349" 
              className="inline-flex items-center justify-center px-6 py-3 bg-health-red-light text-health-red-dark font-semibold rounded-md hover:bg-health-red transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              +256 756 530 349
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
