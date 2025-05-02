
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HealthCard from "../ui/HealthCard";
import { Button } from "@/components/ui/button";

const featuredArticles = [
  {
    id: 1,
    title: "Understanding Diabetes: Symptoms, Causes, and Management",
    excerpt: "Learn about the different types of diabetes, common symptoms, and effective management strategies.",
    image: "/lovable-uploads/010d885b-6a86-4fa9-b298-275e7ce0ecb1.png",
    date: "April 12, 2025",
    slug: "understanding-diabetes"
  },
  {
    id: 2,
    title: "Understanding Malaria: Causes, Symptoms, and Prevention",
    excerpt: "Learn about malaria, a disease caused by parasites transmitted through mosquito bites, and how to protect yourself.",
    image: "/lovable-uploads/da1d8d36-dad9-431e-a9b8-b02f8c75075e.png",
    date: "May 2, 2025",
    slug: "understanding-malaria"
  },
  {
    id: 3,
    title: "The Importance of Mental Health: Breaking the Stigma",
    excerpt: "Discover why mental health is as important as physical health and how to seek help when needed.",
    image: "/placeholder.svg",
    date: "April 10, 2025",
    slug: "importance-of-mental-health"
  }
];

const FeaturedArticles = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Latest Health Articles</h2>
          <p className="mt-4 text-muted-foreground">
            Stay informed with our latest articles on health topics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <HealthCard key={article.id} className="flex flex-col h-full">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                <h3 className="text-xl font-semibold mb-2">
                  <Link to={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
              </div>
              <Link 
                to={`/articles/${article.slug}`}
                className="inline-flex items-center text-health-red-dark hover:text-health-red transition-colors font-medium"
              >
                Read more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </HealthCard>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="health-btn-primary px-6 py-3">
            <Link to="/articles">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
