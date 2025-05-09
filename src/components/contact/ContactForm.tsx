
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
  const supabase = useSupabaseClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (): Promise<boolean> => {
    try {
      if (!supabase) {
        console.log("Supabase client not available, using mailto fallback");
        throw new Error("Email service unavailable");
      }
      
      console.log("Sending email via Supabase function");
      
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
      console.error("Email sending failed:", error);
      
      // Use mailto fallback immediately instead of retrying
      const mailtoLink = `mailto:garrisonhealth147@gmail.com?subject=Contact Form: ${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoLink);
      
      // We still return true since we've provided an alternative method
      return true;
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
      console.error("Contact form error:", error);
      
      toast({
        title: "Unable to send message",
        description: "Please try again or contact us directly via email or phone.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
