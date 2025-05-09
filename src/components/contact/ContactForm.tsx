
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSupabaseClient } from "@/hooks/useSupabaseClient";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const supabase = useSupabaseClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (attempts = 0): Promise<boolean> => {
    try {
      if (!supabase) {
        throw new Error("Email service unavailable - using fallback method");
      }
      
      console.log(`Sending email attempt ${attempts + 1}`);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          to: 'garrisonhealth147@gmail.com',
          subject: `Contact Form: ${formData.subject}`,
          content: `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone || 'Not provided'}
            
            Message:
            ${formData.message}
          `,
          from_email: formData.email,
          from_name: formData.name
        }
      });

      console.log("Email sending response:", { data, error });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Email sending attempt ${attempts + 1} failed:`, error);
      
      // If we haven't reached max retries, try again
      if (attempts < 2) {
        console.log(`Retrying... (${attempts + 1}/2)`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return sendEmail(attempts + 1);
      }
      
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if form data is valid
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      const success = await sendEmail();
      
      if (success) {
        toast({
          title: "Message sent successfully",
          description: "Thanks for reaching out! We'll get back to you soon.",
          variant: "default",
        });
        resetForm();
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      // Fallback method if all attempts fail
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1);
        toast({
          title: "Retrying to send message",
          description: "We're having some difficulties. Trying again...",
          variant: "default",
        });
        
        // Try again after a short delay
        setTimeout(() => handleSubmit(e), 2000);
        return;
      }
      
      // If all retries fail, use mailto fallback
      const mailtoLink = `mailto:garrisonhealth147@gmail.com?subject=Contact Form: ${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoLink);
      
      toast({
        title: "Alternative email method used",
        description: "Please complete sending the email from your email client.",
        variant: "default",
      });
      
      resetForm();
    } finally {
      setLoading(false);
      setRetryCount(0);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <Input
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
          <Input
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
          <Input
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
          <Input
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
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
          required
        />
      </div>
      
      <Button type="submit" className="health-btn-primary px-6 py-3" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
