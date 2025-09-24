import { useState } from "react";
import { Filter, Leaf, Award, Zap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "food" | "dessert";
  tags: ("vegan" | "organic" | "gluten-free" | "signature" | "seasonal")[];
  popularity: number;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Signature Cold Brew",
    description: "16-hour slow-steeped Ethiopian beans with vanilla cold foam",
    price: 4.50,
    category: "coffee",
    tags: ["signature", "organic"],
    popularity: 95
  },
  {
    id: "2",
    name: "Artisan Avocado Toast",
    description: "Sourdough, smashed avocado, heirloom tomatoes, microgreens",
    price: 12.00,
    category: "food",
    tags: ["vegan", "organic"],
    popularity: 88
  },
  {
    id: "3",
    name: "Seasonal Pumpkin Latte",
    description: "House-made pumpkin spice, steamed oat milk, cinnamon dust",
    price: 5.25,
    category: "coffee",
    tags: ["seasonal", "vegan"],
    popularity: 92
  },
  {
    id: "4",
    name: "Gluten-Free Banana Bread",
    description: "Warm, moist banana bread made with almond flour",
    price: 4.00,
    category: "dessert",
    tags: ["gluten-free", "organic"],
    popularity: 78
  },
  {
    id: "5",
    name: "Farm Fresh Quinoa Bowl",
    description: "Quinoa, roasted vegetables, tahini dressing, hemp seeds",
    price: 14.00,
    category: "food",
    tags: ["vegan", "organic", "gluten-free"],
    popularity: 85
  }
];

export const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = [
    { id: "all", name: "All Items", icon: "🍽️" },
    { id: "coffee", name: "Coffee", icon: "☕" },
    { id: "food", name: "Food", icon: "🥗" },
    { id: "dessert", name: "Desserts", icon: "🧁" }
  ];

  const availableTags = ["vegan", "organic", "gluten-free", "signature", "seasonal"];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag as any));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "vegan": return <Leaf className="w-3 h-3" />;
      case "organic": return <Leaf className="w-3 h-3" />;
      case "signature": return <Award className="w-3 h-3" />;
      case "seasonal": return <Zap className="w-3 h-3" />;
      default: return null;
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "bg-red-500";
    if (popularity >= 80) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <section id="menu" className="py-20 bg-cream-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Carefully crafted drinks and dishes made with locally sourced, sustainable ingredients
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-cafe"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-cafe capitalize"
                onClick={() => toggleTag(tag)}
              >
                {getTagIcon(tag)}
                <span className="ml-1">{tag}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="shadow-warm hover:shadow-coffee transition-cafe group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-cafe">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getPopularityColor(item.popularity)}`}></div>
                      <span className="text-xs text-muted-foreground">{item.popularity}% popularity</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-accent">${item.price}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {getTagIcon(tag)}
                      <span className="ml-1 capitalize">{tag}</span>
                    </Badge>
                  ))}
                </div>

                {/* AR Preview Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  AR Preview
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No items match your current filters</p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
                setSelectedTags([]);
              }}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};