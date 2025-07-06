
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-garrison-teal to-garrison-teal-dark text-white py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your Health, <span className="text-garrison-red">Our Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Comprehensive healthcare services and reliable medical information 
              for you and your family in Uganda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild className="garrison-btn-secondary text-lg px-8 py-4">
                <Link to="/services">
                  Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-garrison-teal text-lg px-8 py-4">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-garrison-red" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-white/80">Trusted Care</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-garrison-red" />
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-white/80">Patients Served</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-garrison-red" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="inline-block p-8 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                <div className="text-6xl font-bold">G</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
