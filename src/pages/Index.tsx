
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { CTA } from "@/components/home/CTA";
import DiseaseInformation from "@/components/home/DiseaseInformation";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <WhyChooseUs />
      <DiseaseInformation />
      <Testimonials />
      <FeaturedArticles />
      <CTA />
    </Layout>
  );
};

export default Index;
