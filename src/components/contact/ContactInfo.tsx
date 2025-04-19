
import HealthCard from "@/components/ui/HealthCard";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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

export default ContactInfo;
