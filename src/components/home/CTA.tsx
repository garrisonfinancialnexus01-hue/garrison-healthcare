
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 bg-health-red-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Have health questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our team of healthcare professionals is ready to provide you with accurate information and guidance on your health concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="health-btn-primary px-6 py-3 text-base">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-3 text-base border-health-green flex items-center justify-center">
              <a href="tel:+256761281222">
                <Phone className="mr-2 h-5 w-5" />
                Call: +256 761 281 222
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
