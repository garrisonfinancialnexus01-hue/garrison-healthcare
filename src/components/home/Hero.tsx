
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-garrison-teal to-garrison-teal-dark text-white py-12 md:py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Your Health, <span className="text-garrison-red">Our Priority</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-white/90 px-2 sm:px-0">
              Comprehensive healthcare services and reliable medical information 
              for you and your family in Uganda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 px-4 sm:px-0">
              <Button asChild className="garrison-btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                <Link to="/services">
                  Our Services <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button asChild className="bg-white text-garrison-teal hover:bg-gray-50 border-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 px-4 sm:px-0">
              <div className="text-center">
                <Shield className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-garrison-red" />
                <div className="text-xl md:text-2xl font-bold">100%</div>
                <div className="text-xs md:text-sm text-white/80">Trusted Care</div>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-garrison-red" />
                <div className="text-xl md:text-2xl font-bold">1000+</div>
                <div className="text-xs md:text-sm text-white/80">Patients Served</div>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-garrison-red" />
                <div className="text-xl md:text-2xl font-bold">24/7</div>
                <div className="text-xs md:text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>
          
          <div className="text-center lg:text-right mt-8 lg:mt-0">
            <div className="inline-block p-4 md:p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full flex items-center justify-center overflow-hidden mx-auto">
                <OptimizedImage 
                  src="/lovable-uploads/15493dd0-712c-488a-abae-d3afb022d31f.png" 
                  alt="Garrison Healthcare Logo" 
                  className="w-36 h-36 md:w-48 md:h-48"
                  objectFit="contain"
                  priority={true}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
