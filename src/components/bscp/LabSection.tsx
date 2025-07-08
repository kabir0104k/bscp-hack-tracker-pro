
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
    <div className="bg-gray-800 border border-gray-700 rounded">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-3">
            {locked && <Lock className="w-5 h-5 text-gray-400" />}
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <Badge className="bg-gray-700 text-gray-300 border-gray-600">
              {stats.completed}/{stats.total}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{stats.percentage}%</span>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <Progress value={stats.percentage} className="h-2 bg-gray-700 mt-4" />
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
