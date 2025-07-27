
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Sending newsletter subscription email to garrisonhealth147@gmail.com");
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'newsletter',
          email: email
        }
      });

      console.log("Newsletter subscription response:", { data, error });

      if (error) {
        console.error("Newsletter subscription error:", error);
        throw error;
      }

      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter. We'll keep you updated with the latest health information.",
        variant: "default",
      });
      
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      toast({
        title: "Subscription Failed",
        description: "Please try again later or contact us directly at garrisonhealth147@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow rounded-r-none"
          required
        />
        <Button 
          type="submit" 
          className="health-btn-primary rounded-l-none px-6"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterForm;
