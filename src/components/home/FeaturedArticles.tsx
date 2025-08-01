
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedArticles = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Understanding High Blood Pressure (Hypertension): A Comprehensive Guide",
      excerpt: "Learn everything you need to know about hypertension - the silent killer that affects millions worldwide. Discover symptoms, causes, treatments, and prevention strategies.",
      image: "/lovable-uploads/0543f5ea-ee91-405a-af24-f372f15921ae.png",
      date: "January 8, 2025",
      author: "Garrison Healthcare Team",
      category: "Cardiovascular Health",
      tags: ["Hypertension", "Blood Pressure", "Heart Health", "Prevention"],
      slug: "/articles/understanding-hypertension"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Health Articles</h2>
          <p className="section-subtitle">
            Evidence-based health information from trusted medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article) => (
            <article key={article.id} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-garrison-red text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {article.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">{article.date}</span>
                  <User className="h-4 w-4 mr-2" />
                  <span>{article.author}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-garrison-teal transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center text-xs bg-garrison-teal/10 text-garrison-teal-dark px-3 py-1 rounded-full font-medium">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button asChild className="w-full bg-gradient-to-r from-garrison-teal to-garrison-teal-dark hover:from-garrison-teal-dark hover:to-garrison-teal text-white font-semibold py-3 rounded-lg transition-all duration-300 group">
                  <Link to={article.slug}>
                    Read Full Article 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark hover:from-garrison-teal-dark hover:to-garrison-teal text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
            <Link to="/health-articles">
              View All Health Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
