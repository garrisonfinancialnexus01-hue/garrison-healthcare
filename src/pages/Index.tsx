
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import HealthServices from "@/components/home/HealthServices";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HealthServices />
      <FeaturedArticles />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
