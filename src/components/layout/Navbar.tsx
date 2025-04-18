
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/5f86d8ae-8d01-43ca-af29-6b10e8827151.png" alt="Garrison Health Logo" className="h-12 w-auto" />
              <span className="ml-2 text-xl font-bold text-foreground">Garrison Health</span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="rounded-md p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/articles" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              Health Articles
            </Link>
            <Link to="/services" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/contact" className="text-base font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href="tel:+256756530349" className="flex items-center text-health-green-dark hover:text-primary transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              <span>+256756530349</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-health-green-light"
            onClick={toggleMenu}
          >
            Home
          </Link>
          
          <Link 
            to="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-health-green-light"
            onClick={toggleMenu}
          >
            About
          </Link>
          
          <Link 
            to="/articles" 
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-health-green-light"
            onClick={toggleMenu}
          >
            Health Articles
          </Link>
          
          <Link 
            to="/services" 
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-health-green-light"
            onClick={toggleMenu}
          >
            Services
          </Link>
          
          <Link 
            to="/contact" 
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-health-green-light"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          
          <a 
            href="tel:+256756530349" 
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-health-green-light"
            onClick={toggleMenu}
          >
            <Phone className="h-4 w-4 mr-2" />
            <span>+256756530349</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
