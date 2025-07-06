
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-garrison-teal rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Garrison Health</h1>
                <p className="text-sm text-garrison-red italic">Your health, Our priority</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-garrison-teal font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-garrison-teal font-medium transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-garrison-teal font-medium transition-colors">
              Services
            </Link>
            <Link to="/health-articles" className="text-gray-700 hover:text-garrison-teal font-medium transition-colors">
              Health Articles
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-garrison-teal font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+256745101519" className="flex items-center text-garrison-teal hover:text-garrison-teal-dark transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">+256 745 101 519</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-garrison-teal font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-garrison-teal font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-garrison-teal font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link to="/health-articles" className="text-gray-700 hover:text-garrison-teal font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Health Articles
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-garrison-teal font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <a href="tel:+256745101519" className="flex items-center text-garrison-teal py-2">
                <Phone className="h-4 w-4 mr-2" />
                +256 745 101 519
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
