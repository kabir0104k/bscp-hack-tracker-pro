
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { Lab } from './types';

interface LabCardProps {
  lab: Lab;
  sectionKey: string;
  updateLab: (section: string, labId: string, field: keyof Lab, value: any) => void;
  locked?: boolean;
}

const LabCard = ({ lab, sectionKey, updateLab, locked = false }: LabCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Apprentice': return 'bg-[#238636] text-[#f0f6fc] border-[#2ea043]';
      case 'Practitioner': return 'bg-[#d29922] text-[#24292f] border-[#fb8500]';
      case 'Expert': return 'bg-[#da3633] text-[#f0f6fc] border-[#f85149]';
      default: return 'bg-[#21262d] text-[#e6edf3] border-[#30363d]';
    }
  };

  return (
    <div className="border border-[#30363d] rounded-lg p-4 space-y-3 bg-[#161b22]">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={lab.completed}
          onCheckedChange={(checked) => updateLab(sectionKey, lab.id, 'completed', checked)}
          className="mt-1"
          disabled={locked}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-medium ${lab.completed ? 'line-through text-[#8b949e]' : 'text-[#f0f6fc]'}`}>
              {lab.name}
            </h4>
            {lab.completed && <CheckCircle className="w-5 h-5 text-[#238636] flex-shrink-0" />}
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(lab.difficulty)}>
              {lab.difficulty}
            </Badge>
            <Badge className="bg-[#21262d] text-[#e6edf3] border-[#30363d] hover:bg-[#30363d]">
              {lab.category}
            </Badge>
          </div>
          <Textarea
            placeholder="Add your notes, payload, or solution approach..."
            value={lab.notes}
            onChange={(e) => updateLab(sectionKey, lab.id, 'notes', e.target.value)}
            className="min-h-[60px] bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:border-[#58a6ff]"
            disabled={locked}
          />
        </div>
      </div>
    </div>
  );
};

export default LabCard;
