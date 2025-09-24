import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Coffee, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Chatbot = ({ isOpen, onToggle }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI café assistant ☕ How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["Recommend a drink", "Check hours", "Menu info", "Place order"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let suggestions: string[] = [];

    if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
      response = "Based on the current weather and time, I'd recommend our Signature Cold Brew with vanilla cold foam! It's 95% popular and perfect for the afternoon. Would you like to see more personalized recommendations?";
      suggestions = ["Show more drinks", "Food pairings", "Daily specials"];
    } else if (lowerMessage.includes("hours") || lowerMessage.includes("open")) {
      response = "We're currently open! Today's hours are 7:00 AM - 8:00 PM. We have a light crowd right now - perfect time to visit! 🕐";
      suggestions = ["Get directions", "Check tomorrow", "Make reservation"];
    } else if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
      response = "Our menu features artisan coffee, fresh food, and delicious desserts! We have vegan, gluten-free, and organic options. What type of item interests you most?";
      suggestions = ["Coffee drinks", "Food options", "Desserts", "Dietary filters"];
    } else if (lowerMessage.includes("order") || lowerMessage.includes("buy")) {
      response = "I can help you start an order! You can either visit us in-store or use our WhatsApp ordering for pickup. What would you like to order?";
      suggestions = ["Coffee drinks", "Food items", "WhatsApp order", "Visit store"];
    } else if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
      response = "We're located at 123 Artisan Street, Coffee District, CA 94102. Free parking available and we're pet-friendly! 📍";
      suggestions = ["Get directions", "Check parking", "Store amenities"];
    } else if (lowerMessage.includes("loyalty") || lowerMessage.includes("points")) {
      response = "Great question! Our loyalty program gives you points for every purchase. You can spin our daily wheel for prizes and unlock rewards like free coffee and meals! 🎁";
      suggestions = ["Check my points", "Spin wheel", "View rewards"];
    } else {
      response = "I'm here to help with menu recommendations, store hours, orders, and more! What would you like to know about Artisan Café?";
      suggestions = ["Menu & drinks", "Store info", "Place order", "Loyalty rewards"];
    }

    return {
      id: Date.now().toString(),
      text: response,
      isBot: true,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-coffee transition-cafe ${
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-accent hover:bg-accent/90 pulse-glow"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] shadow-coffee border border-border">
          <CardHeader className="pb-3 bg-coffee-gradient text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Café Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                    <div className={`p-3 rounded-lg ${
                      message.isBot 
                        ? "bg-muted text-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot ? "order-1 mr-2 bg-accent" : "order-2 ml-2 bg-primary"
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mr-2">
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="border-t p-3">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="cursor-pointer text-xs" onClick={() => handleSuggestionClick("What's popular today?")}>
                  <Coffee className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
                <Badge variant="outline" className="cursor-pointer text-xs" onClick={() => handleSuggestionClick("Are you open now?")}>
                  <Clock className="w-3 h-3 mr-1" />
                  Hours
                </Badge>
                <Badge variant="outline" className="cursor-pointer text-xs" onClick={() => handleSuggestionClick("Where are you located?")}>
                  <MapPin className="w-3 h-3 mr-1" />
                  Location
                </Badge>
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-accent hover:bg-accent/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};