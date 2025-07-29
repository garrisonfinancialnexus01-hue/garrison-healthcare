
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DiseaseInformation from "@/components/home/DiseaseInformation";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <DiseaseInformation />
      <FeaturedArticles />
      <WhyChooseUs />
      <CallToAction />
    </Layout>
  );
};

export default Index;
