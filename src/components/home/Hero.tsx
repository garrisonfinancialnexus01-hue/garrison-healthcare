
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-health-green-light py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Health, <span className="text-health-red-dark">Our Priority</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Garrison Health provides reliable medical information and resources to help you make informed decisions about your health and wellbeing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild className="health-btn-primary px-6 py-3 text-base">
                <Link to="/articles">
                  Browse Health Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-6 py-3 text-base border-health-red text-health-red-dark hover:bg-health-red-light hover:text-health-red-dark">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/lovable-uploads/d3c3b86e-3882-4112-b6e3-6890acabf27d.png"
              alt="Garrison Health Logo"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
