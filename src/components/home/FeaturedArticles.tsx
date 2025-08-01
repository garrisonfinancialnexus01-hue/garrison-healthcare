
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedArticles = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Health Articles</h2>
          <p className="section-subtitle">
            Coming soon - Stay tuned for our latest health insights and medical updates
          </p>
        </div>

        <div className="text-center py-16">
          <BookOpen className="h-20 w-20 text-garrison-teal mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Articles Section Coming Soon
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            We're working on bringing you comprehensive health articles and medical insights. 
            Check back soon for valuable health information and resources.
          </p>
          
          <Button asChild className="garrison-btn-primary">
            <Link to="/contact">
              Contact Us for Updates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
