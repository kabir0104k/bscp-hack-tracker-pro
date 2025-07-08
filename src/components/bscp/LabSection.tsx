
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';
import LabCard from './LabCard';
import { Lab } from './types';

interface LabSectionProps {
  title: string;
  labs: Lab[];
  sectionKey: string;
  updateLab: (section: string, labId: string, field: keyof Lab, value: any) => void;
  locked?: boolean;
}

const LabSection = ({ title, labs, sectionKey, updateLab, locked = false }: LabSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const getCompletionStats = (sectionLabs: Lab[]) => {
    const completed = sectionLabs.filter(lab => lab.completed).length;
    return { completed, total: sectionLabs.length, percentage: Math.round((completed / sectionLabs.length) * 100) };
  };

  const stats = getCompletionStats(labs);

  return (
    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer hover:bg-slate-700/20 rounded-lg p-2 -m-2 transition-colors">
              <CardTitle className="flex items-center gap-2">
                {locked && <Lock className="w-5 h-5 text-slate-400" />}
                {title}
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  {stats.completed}/{stats.total}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-400">{stats.percentage}%</span>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CollapsibleTrigger>
          <Progress value={stats.percentage} className="h-2 bg-slate-700" />
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {labs.map((lab) => (
              <LabCard
                key={lab.id}
                lab={lab}
                sectionKey={sectionKey}
                updateLab={updateLab}
                locked={locked}
              />
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default LabSection;
