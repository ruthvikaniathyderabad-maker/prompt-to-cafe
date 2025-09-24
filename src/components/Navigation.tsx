import { useState } from "react";
import { Menu, X, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">Artisan Café</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-foreground hover:text-accent transition-cafe"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-accent transition-cafe"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("hours")}
              className="text-foreground hover:text-accent transition-cafe"
            >
              Hours
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-accent transition-cafe"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("menu")}
                className="text-left text-foreground hover:text-accent transition-cafe"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left text-foreground hover:text-accent transition-cafe"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("hours")}
                className="text-left text-foreground hover:text-accent transition-cafe"
              >
                Hours
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-foreground hover:text-accent transition-cafe"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};