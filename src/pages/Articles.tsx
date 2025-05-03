import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HealthCard from "@/components/ui/HealthCard";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock health articles data - keeping only diabetes, malaria, and hypertension
const healthArticles = [
  {
    id: 1,
    title: "Understanding Diabetes: Symptoms, Causes, and Management",
    excerpt: "Learn about the different types of diabetes, common symptoms, and effective management strategies.",
    image: "/lovable-uploads/010d885b-6a86-4fa9-b298-275e7ce0ecb1.png",
    category: "Chronic Diseases",
    date: "April 12, 2025",
    slug: "understanding-diabetes",
    tags: ["Diabetes", "Chronic Diseases", "Health Management"]
  },
  {
    id: 2,
    title: "Understanding Malaria: Causes, Symptoms, and Prevention",
    excerpt: "Learn about malaria, a disease caused by parasites transmitted through mosquito bites, and how to protect yourself.",
    image: "/lovable-uploads/da1d8d36-dad9-431e-a9b8-b02f8c75075e.png",
    category: "Infectious Diseases",
    date: "May 2, 2025",
    slug: "understanding-malaria",
    tags: ["Malaria", "Infectious Diseases", "Prevention", "Travel Health"]
  },
  {
    id: 3,
    title: "Understanding High Blood Pressure (Hypertension)",
    excerpt: "Learn about the causes, symptoms, and management strategies for high blood pressure, a common condition affecting arteries.",
    image: "/lovable-uploads/191cda90-e826-4e3f-8c1e-13d09dd334e5.png",
    category: "Cardiovascular Health",
    date: "May 3, 2025",
    slug: "understanding-hypertension",
    tags: ["Hypertension", "Blood Pressure", "Cardiovascular Health", "Heart Disease"]
  }
];

// Extract all unique categories from articles
const allCategories = ["All", ...new Set(healthArticles.map(article => article.category))];

// Extract all unique tags from articles
const allTags = [...new Set(healthArticles.flatMap(article => article.tags))];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");

  // Filter articles based on search term, category, and tag
  const filteredArticles = healthArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <Layout>
      <div className="bg-health-green-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Health Articles</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest health information and resources
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and filter bar */}
          <div className="mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-health-green/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search */}
                <div className="relative">
                  <label htmlFor="search" className="text-sm font-medium text-muted-foreground block mb-2">
                    Search Articles
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      placeholder="Search by keyword..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Category filter */}
                <div>
                  <label htmlFor="category" className="text-sm font-medium text-muted-foreground block mb-2">
                    Filter by Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
                  >
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Tag filter */}
                <div>
                  <label htmlFor="tag" className="text-sm font-medium text-muted-foreground block mb-2">
                    Filter by Tag
                  </label>
                  <select
                    id="tag"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-4 py-2 border border-health-green-light rounded-md focus:outline-none focus:ring-2 focus:ring-health-green focus:border-transparent"
                  >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredArticles.length} of {healthArticles.length} articles
            </p>
          </div>
          
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <HealthCard key={article.id} className="flex flex-col h-full">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="bg-health-green-light text-sm px-3 py-1 rounded-full text-health-green-dark">
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground ml-auto">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <Link to={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs bg-health-red-light/50 text-health-red-dark px-2 py-1 rounded-full"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to={`/articles/${article.slug}`}
                    className="inline-flex items-center text-health-red-dark hover:text-health-red transition-colors font-medium"
                  >
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </HealthCard>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No articles match your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedTag("");
                  }}
                  className="border-health-green text-health-green-dark hover:bg-health-green-light"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-health-red-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Subscribe to receive the latest health articles, tips, and resources directly in your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none"
              />
              <Button className="health-btn-primary rounded-l-none px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
