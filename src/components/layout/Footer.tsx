
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/469e8eca-bd74-4a95-bbd5-ad3ca0a46078.png" 
                alt="Garrison Health Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Garrison Health</h3>
                <p className="text-sm text-garrison-red italic">Your health, Our priority</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Providing comprehensive healthcare services and reliable medical information 
              to improve the health and wellbeing of our community in Uganda and beyond.
            </p>
            <p className="text-sm text-gray-400">
              Founded by <span className="text-garrison-teal font-semibold">Isiah Kasule</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-garrison-teal">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/health-articles" className="text-gray-300 hover:text-white transition-colors">Health Articles</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-garrison-teal">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-garrison-red mt-1 flex-shrink-0" />
                <span className="text-gray-300">Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-garrison-red flex-shrink-0" />
                <div>
                  <a href="tel:+256745101519" className="text-gray-300 hover:text-white transition-colors block">
                    +256 745 101 519
                  </a>
                  <a href="tel:+256761281222" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                    +256 761 281 222 (Alt)
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-garrison-red flex-shrink-0" />
                <a href="mailto:garrisonhealth147@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  garrisonhealth147@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Garrison Health. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Heart className="h-4 w-4 text-garrison-red mr-2" />
              <span className="text-gray-400 text-sm">Made with care for your health</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
