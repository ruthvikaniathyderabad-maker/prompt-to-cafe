import { useState, useRef } from "react";
import { Heart, Camera, Award, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import coffeeSpread from "@/assets/coffee-spread.jpg";
import food1 from "@/assets/food-1.jpg";
import pastries from "@/assets/pastries.jpg";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  likes: number;
  isUserPhoto: boolean;
  tags: string[];
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: coffeeSpread,
    alt: "Artisan coffee drinks with latte art",
    likes: 127,
    isUserPhoto: false,
    tags: ["coffee", "latte-art"]
  },
  {
    id: "2", 
    src: food1,
    alt: "Fresh gourmet sandwich and salad",
    likes: 89,
    isUserPhoto: false,
    tags: ["food", "healthy"]
  },
  {
    id: "3",
    src: pastries,
    alt: "Homemade pastries and desserts",
    likes: 156,
    isUserPhoto: false,
    tags: ["desserts", "bakery"]
  }
];

export const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const categories = [
    { id: "all", name: "All Photos", count: galleryItems.length },
    { id: "coffee", name: "Coffee", count: galleryItems.filter(item => item.tags.includes("coffee")).length },
    { id: "food", name: "Food", count: galleryItems.filter(item => item.tags.includes("food")).length },
    { id: "desserts", name: "Desserts", count: galleryItems.filter(item => item.tags.includes("desserts")).length }
  ];

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.tags.includes(selectedCategory));

  const toggleLike = (id: string) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Photo uploaded successfully! 📸",
        description: "Your photo has been submitted for the monthly challenge. Good luck!",
      });
      
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Moments captured by our community. Share your café experience and win monthly prizes!
          </p>
          
          {/* Upload Button */}
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={triggerFileUpload}
          >
            <Upload className="w-4 h-4 mr-2" />
            Share Your Photo
          </Button>
          
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-cafe"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden shadow-warm hover:shadow-coffee transition-cafe group">
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm mb-2">{item.alt}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Photo Badge */}
                {item.isUserPhoto && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    <Camera className="w-3 h-3 mr-1" />
                    Community
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(item.id)}
                      className={`transition-cafe ${
                        likedPhotos.has(item.id) 
                          ? "text-red-500 hover:text-red-600" 
                          : "text-muted-foreground hover:text-red-500"
                      }`}
                    >
                      <Heart 
                        className={`w-4 h-4 mr-1 ${
                          likedPhotos.has(item.id) ? "fill-current" : ""
                        }`} 
                      />
                      {item.likes + (likedPhotos.has(item.id) ? 1 : 0)}
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Award className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Photo Challenge CTA */}
        <div className="mt-16 text-center bg-card rounded-2xl p-8 shadow-warm">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            📸 Monthly Photo Challenge
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Share your best café moments and win a free month of coffee! 
            Tag us with #ArtisanMoments for a chance to be featured.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              View Winners
            </Button>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={triggerFileUpload}
            >
              Join Challenge
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};