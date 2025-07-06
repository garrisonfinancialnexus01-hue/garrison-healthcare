
import Layout from "@/components/layout/Layout";
import { Search, Calendar, User, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HealthArticles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const articles = [
    {
      id: 1,
      title: "Understanding Diabetes: Types, Symptoms, and Management",
      excerpt: "A comprehensive guide to understanding diabetes, its different types, warning signs, and effective management strategies for better health outcomes.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "December 15, 2024",
      author: "Dr. Health Expert",
      category: "Chronic Diseases",
      tags: ["Diabetes", "Blood Sugar", "Health Management"]
    },
    {
      id: 2,
      title: "Heart Health: Prevention and Early Detection",
      excerpt: "Essential information about maintaining cardiovascular health, recognizing warning signs, and preventing heart disease through lifestyle changes.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
      date: "December 12, 2024",
      author: "Garrison Health Team",
      category: "Cardiovascular",
      tags: ["Heart Health", "Prevention", "Cardiovascular"]
    },
    {
      id: 3,
      title: "Mental Health Awareness in Uganda",
      excerpt: "Breaking the stigma around mental health and promoting wellness in our communities. Learn about resources and support available.",
      image: "https://images.unsplash.com/photo-1559757160-f5fd5d9b5297?w=400&h=250&fit=crop",
      date: "December 10, 2024",
      author: "Immaculate Nakamya",
      category: "Mental Health",
      tags: ["Mental Health", "Community", "Wellness"]
    },
    {
      id: 4,
      title: "Malaria Prevention and Treatment in Uganda",
      excerpt: "Current strategies for malaria prevention, early detection, and treatment options available in Uganda's healthcare system.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      date: "December 8, 2024",
      author: "Dr. Health Expert",
      category: "Infectious Diseases",
      tags: ["Malaria", "Prevention", "Treatment"]
    },
    {
      id: 5,
      title: "Nutrition Guidelines for Ugandan Families",
      excerpt: "Practical nutrition advice for families, including local food recommendations and meal planning for optimal health.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
      date: "December 5, 2024",
      author: "Garrison Health Team",
      category: "Nutrition",
      tags: ["Nutrition", "Family Health", "Local Foods"]
    },
    {
      id: 6,
      title: "Women's Health: Maternal and Reproductive Care",
      excerpt: "Comprehensive guide to women's health issues, including maternal care, reproductive health, and preventive screenings.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      date: "December 3, 2024",
      author: "Immaculate Nakamya",
      category: "Women's Health",
      tags: ["Women's Health", "Maternal Care", "Reproductive Health"]
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
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Health Articles</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
            Stay informed with our comprehensive health articles and medical insights
          </p>
          <div className="flex items-center justify-center">
            <BookOpen className="h-8 w-8 mr-3" />
            <span className="text-lg">Updated regularly with the latest health information</span>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="garrison-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Articles
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="search"
                    placeholder="Search health articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-garrison-teal focus:border-transparent"
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredArticles.length} of {articles.length} articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full garrison-btn-outline group-hover:garrison-btn-primary transition-colors">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search terms or category filter</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="garrison-btn-primary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter for the latest health articles and medical updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-garrison-red hover:bg-garrison-red-dark text-white px-6 py-3 rounded-lg font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HealthArticles;
