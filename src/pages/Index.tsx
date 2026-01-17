import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import ClipPreview from "@/components/sections/ClipPreview";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ClipPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
