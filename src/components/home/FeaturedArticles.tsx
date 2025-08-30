
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OptimizedImage from "@/components/ui/OptimizedImage";

const FeaturedArticles = () => {
  const latestArticles = [
    {
      id: "understanding-hypertension",
      title: "Understanding High Blood Pressure (Hypertension): A Comprehensive Guide",
      excerpt: "Learn about the silent killer that affects millions worldwide. Comprehensive information about symptoms, causes, prevention and treatment.",
      date: "January 8, 2025",
      readTime: "8 min read",
      image: "/lovable-uploads/0543f5ea-ee91-405a-af24-f372f15921ae.png",
      path: "/articles/understanding-hypertension"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Health Articles</h2>
          <p className="section-subtitle">
            Stay informed with our latest health insights and medical updates
          </p>
        </div>

        {latestArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-garrison-teal mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-garrison-teal transition-colors">
                    <Link to={article.path}>
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={article.path}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="h-20 w-20 text-garrison-teal mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Articles Section Coming Soon
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              We're working on bringing you comprehensive health articles and medical insights. 
              Check back soon for valuable health information and resources.
            </p>
          </div>
        )}

        <div className="text-center">
          <Button asChild className="garrison-btn-primary">
            <Link to="/health-articles">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
