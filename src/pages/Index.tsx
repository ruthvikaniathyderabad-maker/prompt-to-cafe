import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MenuSection } from "@/components/MenuSection";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BusinessInfo } from "@/components/BusinessInfo";
import { LoyaltyWidget } from "@/components/LoyaltyWidget";
import { Chatbot } from "@/components/Chatbot";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Menu Section */}
      <MenuSection />
      
      {/* Photo Gallery */}
      <PhotoGallery />
      
      {/* Business Info & Hours */}
      <BusinessInfo />
      
      {/* Loyalty Widget */}
      <LoyaltyWidget />
      
      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      
      <Toaster />
    </main>
  );
};

export default Index;