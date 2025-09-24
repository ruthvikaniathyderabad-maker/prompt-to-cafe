import { useState } from "react";
import { Gift, Star, Trophy, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

export const LoyaltyWidget = () => {
  const [points, setPoints] = useState(850);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpin, setLastSpin] = useState<Date | null>(null);
  const { toast } = useToast();

  const prizes = [
    "Free Coffee ☕",
    "10% Off 💫",
    "Free Pastry 🥐",
    "Double Points ⭐",
    "Free Lunch 🥗",
    "20% Off 🎉",
    "Free Drink 🧋",
    "Loyalty Points 💎"
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setLastSpin(new Date());
    
    // Simulate spin
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setIsSpinning(false);
      setPoints(prev => prev + Math.floor(Math.random() * 100) + 50);
      
      toast({
        title: "🎉 Congratulations!",
        description: `You won: ${randomPrize}`,
        duration: 5000,
      });
    }, 3000);
  };

  const canSpin = !lastSpin || (Date.now() - lastSpin.getTime()) > 24 * 60 * 60 * 1000; // 24 hours

  const nextRewardAt = 1000;
  const progressToNext = (points / nextRewardAt) * 100;

  const rewards = [
    { points: 100, reward: "Free Coffee", unlocked: points >= 100 },
    { points: 250, reward: "Free Pastry", unlocked: points >= 250 },
    { points: 500, reward: "10% Off Next Order", unlocked: points >= 500 },
    { points: 1000, reward: "Free Lunch", unlocked: points >= 1000 },
    { points: 2000, reward: "VIP Status", unlocked: points >= 2000 }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Loyalty Rewards
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Earn points with every purchase and unlock exclusive rewards. The more you visit, the more you save!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Spin Wheel */}
          <Card className="shadow-warm hover:shadow-coffee transition-cafe">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Gift className="w-6 h-6 mr-3 text-accent" />
                Daily Spin Wheel
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative mb-6">
                {/* Wheel */}
                <div 
                  className={`w-48 h-48 mx-auto rounded-full bg-coffee-gradient border-8 border-accent/20 flex items-center justify-center relative ${
                    isSpinning ? 'animate-spin' : ''
                  }`}
                  style={{ 
                    background: `conic-gradient(
                      from 0deg,
                      hsl(var(--primary)) 0deg 45deg,
                      hsl(var(--accent)) 45deg 90deg,
                      hsl(var(--success)) 90deg 135deg,
                      hsl(var(--primary)) 135deg 180deg,
                      hsl(var(--accent)) 180deg 225deg,
                      hsl(var(--success)) 225deg 270deg,
                      hsl(var(--primary)) 270deg 315deg,
                      hsl(var(--accent)) 315deg 360deg
                    )`,
                    animationDuration: isSpinning ? '3s' : '0s',
                    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                >
                  <div className="w-32 h-32 bg-background rounded-full flex items-center justify-center shadow-inner">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-accent"></div>
                </div>
              </div>

              <Button
                onClick={spinWheel}
                disabled={!canSpin || isSpinning}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
              >
                {isSpinning ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                    Spinning...
                  </>
                ) : canSpin ? (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Spin for Prize!
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Come back tomorrow
                  </>
                )}
              </Button>

              {!canSpin && (
                <p className="text-sm text-muted-foreground mt-2">
                  You can spin once every 24 hours
                </p>
              )}
            </CardContent>
          </Card>

          {/* Points & Rewards */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-6 h-6 mr-3 text-accent" />
                  Your Points
                </div>
                <Badge className="bg-accent text-accent-foreground text-lg px-3 py-1">
                  {points} pts
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Progress to Next Reward */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress to Free Lunch</span>
                  <span className="text-sm font-medium">{points}/{nextRewardAt}</span>
                </div>
                <Progress value={Math.min(progressToNext, 100)} className="h-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {nextRewardAt - points} points to go!
                </p>
              </div>

              {/* Rewards List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Available Rewards</h4>
                {rewards.map((reward, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-cafe ${
                      reward.unlocked 
                        ? "bg-success/10 border-success/20" 
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {reward.unlocked ? (
                        <Trophy className="w-5 h-5 text-success" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                      )}
                      <div>
                        <p className={`font-medium ${
                          reward.unlocked ? "text-success" : "text-muted-foreground"
                        }`}>
                          {reward.reward}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reward.points} points
                        </p>
                      </div>
                    </div>
                    
                    {reward.unlocked && (
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                        Claim
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Earn More Points */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-foreground mb-3">Earn More Points</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coffee Purchase</span>
                    <span className="font-medium">10 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Food Purchase</span>
                    <span className="font-medium">25 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Photo Share</span>
                    <span className="font-medium">15 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Friend Referral</span>
                    <span className="font-medium">100 pts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};