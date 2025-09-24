import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import cafeHero from "@/assets/cafe-hero.jpg";

export const HeroSection = () => {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cafeHero})` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Live Status Badge */}
          <Badge className="mb-6 bg-success text-success-foreground pulse-glow">
            <Sparkles className="w-4 h-4 mr-2" />
            Open Now - Light Crowd
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Artisan Café
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Where every cup tells a story. AI-powered recommendations, sustainable sourcing, 
            and a community that feels like home.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-coffee px-8 py-4 text-lg"
              onClick={scrollToMenu}
            >
              Explore Menu
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-coffee px-8 py-4 text-lg"
              onClick={() => window.open('https://www.opentable.com/r/artisan-cafe-san-francisco', '_blank')}
            >
              Reserve Table
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              AI Assistant
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-white/80 text-sm">AI suggests perfect drinks based on weather & mood</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-2">Sustainable Sourcing</h3>
              <p className="text-white/80 text-sm">Direct trade, organic, locally roasted coffee</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-white/80 text-sm">Earn points, unlock exclusive perks & discounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl float-animation"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-orange-400/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};