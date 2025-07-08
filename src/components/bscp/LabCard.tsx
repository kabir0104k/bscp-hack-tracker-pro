
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
      case 'Apprentice': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Practitioner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="border border-slate-700/50 rounded-lg p-4 space-y-3 hover:border-slate-600/50 transition-colors">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={lab.completed}
          onCheckedChange={(checked) => updateLab(sectionKey, lab.id, 'completed', checked)}
          className="mt-1"
          disabled={locked}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-medium ${lab.completed ? 'line-through text-slate-400' : 'text-white'}`}>
              {lab.name}
            </h4>
            {lab.completed && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />}
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(lab.difficulty)}>
              {lab.difficulty}
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {lab.category}
            </Badge>
          </div>
          <Textarea
            placeholder="Add your notes, payload, or solution approach..."
            value={lab.notes}
            onChange={(e) => updateLab(sectionKey, lab.id, 'notes', e.target.value)}
            className="min-h-[60px] bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
            disabled={locked}
          />
        </div>
      </div>
    </div>
  );
};

export default LabCard;
