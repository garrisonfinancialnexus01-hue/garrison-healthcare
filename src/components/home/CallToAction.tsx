
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact us today to schedule a consultation or learn more about our healthcare services. 
          Your health journey starts here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="garrison-btn-primary text-lg px-8 py-4">
            <Link to="/contact">
              Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild className="garrison-btn-outline text-lg px-8 py-4">
            <a href="tel:+256745101519">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +256 745 101 519
            </a>
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Emergency? Call us 24/7 at +256 745 101 519</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
