
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedArticles = () => {
  const articles = [
    {
      id: 1,
      title: "Understanding Diabetes: A Comprehensive Guide",
      excerpt: "Learn about diabetes types, symptoms, management, and prevention strategies.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "December 15, 2024",
      author: "Dr. Health Expert",
      category: "Chronic Diseases"
    },
    {
      id: 2,
      title: "Heart Health: Prevention and Early Detection",
      excerpt: "Essential information about maintaining cardiovascular health and recognizing warning signs.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
      date: "December 12, 2024",
      author: "Medical Team",
      category: "Cardiovascular"
    },
    {
      id: 3,
      title: "Mental Health Awareness in Uganda",
      excerpt: "Breaking the stigma around mental health and promoting wellness in our communities.",
      image: "https://images.unsplash.com/photo-1559757160-f5fd5d9b5297?w=400&h=250&fit=crop",
      date: "December 10, 2024",
      author: "Garrison Health",
      category: "Mental Health"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Health Articles</h2>
          <p className="section-subtitle">
            Stay informed with our latest health insights and medical updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <article key={article.id} className="garrison-card overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-garrison-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{article.date}</span>
                  <User className="h-4 w-4 ml-4 mr-2" />
                  <span>{article.author}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-garrison-teal transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                
                <Link 
                  to="/health-articles"
                  className="inline-flex items-center text-garrison-teal hover:text-garrison-red font-semibold transition-colors"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

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
