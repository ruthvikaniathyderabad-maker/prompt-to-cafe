import { Clock, MapPin, Phone, Mail, Wifi, Car, Leaf, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const BusinessInfo = () => {
  const hours = [
    { day: "Monday", time: "7:00 AM - 8:00 PM", isToday: false },
    { day: "Tuesday", time: "7:00 AM - 8:00 PM", isToday: true },
    { day: "Wednesday", time: "7:00 AM - 8:00 PM", isToday: false },
    { day: "Thursday", time: "7:00 AM - 9:00 PM", isToday: false },
    { day: "Friday", time: "7:00 AM - 9:00 PM", isToday: false },
    { day: "Saturday", time: "8:00 AM - 9:00 PM", isToday: false },
    { day: "Sunday", time: "8:00 AM - 7:00 PM", isToday: false }
  ];

  const amenities = [
    { icon: Wifi, name: "Free WiFi", color: "text-blue-500" },
    { icon: Car, name: "Parking", color: "text-green-500" },
    { icon: Leaf, name: "Eco-Friendly", color: "text-emerald-500" },
    { icon: Users, name: "Pet Friendly", color: "text-purple-500" }
  ];

  return (
    <section id="hours" className="py-20 bg-cream-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Business Hours */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Clock className="w-6 h-6 mr-3 text-accent" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hours.map((schedule, index) => (
                <div 
                  key={index}
                  className={`flex justify-between items-center py-2 px-3 rounded-lg transition-cafe ${
                    schedule.isToday 
                      ? "bg-accent/10 border-l-4 border-accent" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <span className={`font-medium ${
                    schedule.isToday ? "text-accent" : "text-foreground"
                  }`}>
                    {schedule.day}
                  </span>
                  <span className={`${
                    schedule.isToday ? "text-accent font-semibold" : "text-muted-foreground"
                  }`}>
                    {schedule.time}
                  </span>
                  {schedule.isToday && (
                    <Badge className="bg-success text-success-foreground ml-2">
                      Open Now
                    </Badge>
                  )}
                </div>
              ))}

              {/* Live Status */}
              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-success">Currently Open</p>
                    <p className="text-sm text-muted-foreground">Light crowd • Perfect time to visit</p>
                  </div>
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Location */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <MapPin className="w-6 h-6 mr-3 text-accent" />
                Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Address */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">123 Artisan Street</p>
                    <p className="text-muted-foreground">Coffee District, CA 94102</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <a href="tel:+14155551234" className="text-foreground hover:text-accent transition-cafe">
                    (415) 555-1234
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <a href="mailto:hello@artisancafe.com" className="text-foreground hover:text-accent transition-cafe">
                    hello@artisancafe.com
                  </a>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-foreground mb-4">Amenities</h4>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity, index) => {
                    const IconComponent = amenity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <IconComponent className={`w-4 h-4 ${amenity.color}`} />
                        <span className="text-sm text-muted-foreground">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Section */}
        <div id="contact" className="mt-16">
          <Card className="shadow-coffee">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Join Our Community
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Be the first to know about new menu items, special events, and exclusive offers. 
                Plus, get sustainability tips and meet fellow coffee lovers!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  WhatsApp Updates
                </Button>
                <Button variant="outline" className="flex-1">
                  Email Newsletter
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
                <div className="text-center">
                  <p className="font-semibold text-foreground text-lg">2.5k+</p>
                  <p>Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-lg">98%</p>
                  <p>Satisfaction Rate</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-lg">4.9★</p>
                  <p>Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};