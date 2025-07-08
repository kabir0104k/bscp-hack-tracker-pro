
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <div className="bg-[#21262d] border border-[#30363d] rounded-lg">
      <div className="p-6 border-b border-[#30363d]">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-3">
            {locked && <Lock className="w-5 h-5 text-[#8b949e]" />}
            <h3 className="text-xl font-semibold text-[#f0f6fc]">{title}</h3>
            <Badge className="bg-[#161b22] text-[#e6edf3] border-[#30363d] hover:bg-[#30363d]">
              {stats.completed}/{stats.total}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#f0f6fc]">{stats.percentage}%</span>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Progress 
            value={stats.percentage} 
            className="h-2 bg-[#161b22] [&>div]:bg-[#238636]" 
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="p-6 space-y-4">
          {labs.map((lab) => (
            <LabCard
              key={lab.id}
              lab={lab}
              sectionKey={sectionKey}
              updateLab={updateLab}
              locked={locked}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LabSection;
