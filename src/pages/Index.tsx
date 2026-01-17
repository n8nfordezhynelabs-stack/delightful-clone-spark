import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ApproachSection } from "@/components/home/ApproachSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <ApproachSection />
      <BlogPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;