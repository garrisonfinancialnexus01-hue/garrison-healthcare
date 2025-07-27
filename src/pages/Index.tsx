
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CallToAction from "@/components/home/CallToAction";
import DiseaseInformationCarousel from "@/components/home/DiseaseInformationCarousel";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <DiseaseInformationCarousel />
      <FeaturedArticles />
      <WhyChooseUs />
      <CallToAction />
    </Layout>
  );
};

export default Index;
