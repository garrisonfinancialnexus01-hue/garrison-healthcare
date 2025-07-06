
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-6xl font-bold text-garrison-teal mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Sorry, we couldn't find the page you're looking for. 
              The page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="garrison-btn-primary">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button asChild className="garrison-btn-outline">
              <Link to="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
          
          <div className="mt-12">
            <Button 
              onClick={() => window.history.back()} 
              variant="ghost" 
              className="text-garrison-teal hover:text-garrison-teal-dark"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back to Previous Page
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
