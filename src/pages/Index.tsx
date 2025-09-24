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
    <main className="min-h-screen flex flex-col items-center bg-neutral-50">
      <div className="w-full max-w-6xl px-4">
        <Navigation />
        <div className="space-y-12 pt-24">
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
        </div>
        {/* Chatbot */}
        <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        <Toaster />
      </div>
    </main>
  );
};

export default Index;