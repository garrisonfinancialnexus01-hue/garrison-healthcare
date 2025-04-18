import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-health-green-light text-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <img src="/lovable-uploads/5f86d8ae-8d01-43ca-af29-6b10e8827151.png" alt="Garrison Health Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold">Garrison Health</span>
            </div>
            
            <p className="mt-4 text-sm">
              Providing reliable medical information and healthcare services to improve the health and wellbeing of our community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/articles" className="text-sm hover:text-primary transition-colors">Health Articles</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#consultations" className="text-sm hover:text-primary transition-colors">
                  Health Consultations
                </Link>
              </li>
              <li>
                <Link to="/services#information" className="text-sm hover:text-primary transition-colors">
                  Medical Information
                </Link>
              </li>
              <li>
                <Link to="/services#education" className="text-sm hover:text-primary transition-colors">
                  Health Education
                </Link>
              </li>
              <li>
                <Link to="/services#resources" className="text-sm hover:text-primary transition-colors">
                  Health Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-health-red" />
                <span className="text-sm">Ntinda, Kampala, Uganda</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-health-red" />
                <div className="text-sm">
                  <a href="tel:+256756530349" className="hover:text-primary transition-colors block font-medium">
                    +256 756 530 349
                  </a>
                  <a href="tel:+256761281222" className="hover:text-primary transition-colors block text-muted-foreground">
                    Alternative: +256 761 281 222
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-health-red" />
                <a href="mailto:garrisonhealth147@gmail.com" className="text-sm hover:text-primary transition-colors">
                  garrisonhealth147@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-health-green">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Garrison Health. All rights reserved. Founded by Isiah Kasule.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
