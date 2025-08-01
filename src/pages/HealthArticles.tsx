
import Layout from "@/components/layout/Layout";
import { Search, Calendar, User, ArrowRight, BookOpen, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const HealthArticles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubscribe = async () => {
    const emailInput = document.getElementById('newsletter-email') as HTMLInputElement;
    const email = emailInput?.value;

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'newsletter',
          email: email
        }
      });

      if (error) throw error;

      toast({
        title: "Subscribed Successfully!",
        description: "Thank you for subscribing to our newsletter.",
      });
      emailInput.value = '';
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const articles = [
    {
      id: 1,
      title: "Understanding High Blood Pressure (Hypertension): A Comprehensive Guide",
      excerpt: "Learn everything you need to know about hypertension - the silent killer that affects millions worldwide. Discover symptoms, causes, treatments, and prevention strategies.",
      image: "/lovable-uploads/0543f5ea-ee91-405a-af24-f372f15921ae.png",
      date: "January 8, 2025",
      author: "Garrison Health Team",
      category: "Cardiovascular Health",
      tags: ["Hypertension", "Blood Pressure", "Heart Health", "Prevention"],
      slug: "/articles/understanding-hypertension"
    }
  ];

  const categories = ["All", ...new Set(articles.map(article => article.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 mr-4 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">Health Articles</h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
            Evidence-based health information from trusted medical professionals. 
            Stay informed about the latest medical insights and healthcare recommendations.
          </p>
          <div className="flex items-center justify-center">
            <BookOpen className="h-8 w-8 mr-3" />
            <span className="text-lg">Medically reviewed and regularly updated content</span>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="garrison-card p-8 bg-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
                  Search Health Articles
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-garrison-teal" />
                  <input
                    type="text"
                    id="search"
                    placeholder="Search for health topics, conditions, treatments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-garrison-teal transition-colors"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
                  Filter by Medical Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-garrison-teal transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Health Articles</h2>
              <p className="text-gray-600">
                Showing {filteredArticles.length} medical article{filteredArticles.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Heart className="h-4 w-4 text-garrison-red" />
              <span>Medically Reviewed Content</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <BookOpen className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No articles found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try adjusting your search terms or category filter.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-garrison-teal hover:bg-garrison-teal-dark text-white px-8 py-3 rounded-lg font-semibold"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 mx-auto mb-6 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Healthy, Stay Informed</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest health articles, medical breakthroughs, 
              and wellness tips from our expert medical team.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white font-medium"
                id="newsletter-email"
              />
              <Button 
                className="bg-garrison-red hover:bg-garrison-red-dark text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-lg"
                onClick={handleNewsletterSubscribe}
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Join thousands of health-conscious individuals staying informed about their wellbeing.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HealthArticles;
