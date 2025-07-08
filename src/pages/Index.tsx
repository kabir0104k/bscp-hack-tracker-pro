
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BSCPTracker from '@/components/BSCPTracker';
import WebSecurityPaths from '@/components/WebSecurityPaths';
import ExploitTracker from '@/components/ExploitTracker';

const Index = () => {
  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastStreakDate, setLastStreakDate] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const savedStreak = localStorage.getItem('bscp-daily-streak');
    const savedDate = localStorage.getItem('bscp-last-streak-date');
    if (savedStreak) {
      setDailyStreak(parseInt(savedStreak));
    }
    if (savedDate) {
      setLastStreakDate(savedDate);
    }
  }, []);

  const incrementStreak = () => {
    const today = new Date().toDateString();
    
    if (lastStreakDate === today) {
      toast({
        title: "⏰ Already Updated Today!",
        description: "You can only update your streak once per day. Come back tomorrow!",
        variant: "destructive",
      });
      return;
    }

    const newStreak = dailyStreak + 1;
    setDailyStreak(newStreak);
    setLastStreakDate(today);
    localStorage.setItem('bscp-daily-streak', newStreak.toString());
    localStorage.setItem('bscp-last-streak-date', today);
    toast({
      title: "🔥 Streak Updated!",
      description: `You're on a ${newStreak} day hacking streak! Keep it up!`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                BSCP Smart Tracker
              </h1>
              <p className="text-slate-400 mt-1">Master the Burp Suite Certified Practitioner</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-lg border border-orange-500/30">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="font-semibold">Daily Streak: {dailyStreak} Days</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={incrementStreak}
                  className="w-8 h-8 p-0 hover:bg-orange-500/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* BSCP Official Progress */}
        <BSCPTracker />

        {/* Web Security Academy Paths */}
        <WebSecurityPaths />

        {/* Exploit Progress Tracker */}
        <ExploitTracker />
      </div>
    </div>
  );
};

export default Index;
