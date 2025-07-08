
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Plus, Target, Brain, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BSCPTracker from '@/components/BSCPTracker';
import WebSecurityPaths from '@/components/WebSecurityPaths';
import ExploitTracker from '@/components/ExploitTracker';

const Index = () => {
  const [dailyStreak, setDailyStreak] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const savedStreak = localStorage.getItem('bscp-daily-streak');
    if (savedStreak) {
      setDailyStreak(parseInt(savedStreak));
    }
  }, []);

  const incrementStreak = () => {
    const newStreak = dailyStreak + 1;
    setDailyStreak(newStreak);
    localStorage.setItem('bscp-daily-streak', newStreak.toString());
    toast({
      title: "🔥 Streak Updated!",
      description: `You're on a ${newStreak} day hacking streak! Keep it up!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
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
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">37</p>
                  <p className="text-slate-400 text-sm">Total BSCP Labs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-400">110+</p>
                  <p className="text-slate-400 text-sm">Exploit Techniques</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{dailyStreak}</p>
                  <p className="text-slate-400 text-sm">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
