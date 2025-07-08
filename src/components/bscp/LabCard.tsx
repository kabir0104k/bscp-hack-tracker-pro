
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
      case 'Apprentice': return 'bg-green-800 text-green-300 border-green-700';
      case 'Practitioner': return 'bg-yellow-800 text-yellow-300 border-yellow-700';
      case 'Expert': return 'bg-red-800 text-red-300 border-red-700';
      default: return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="border border-gray-700 rounded p-4 space-y-3 bg-gray-850">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={lab.completed}
          onCheckedChange={(checked) => updateLab(sectionKey, lab.id, 'completed', checked)}
          className="mt-1"
          disabled={locked}
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-medium ${lab.completed ? 'line-through text-gray-400' : 'text-white'}`}>
              {lab.name}
            </h4>
            {lab.completed && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />}
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(lab.difficulty)}>
              {lab.difficulty}
            </Badge>
            <Badge className="bg-gray-700 text-gray-300 border-gray-600">
              {lab.category}
            </Badge>
          </div>
          <Textarea
            placeholder="Add your notes, payload, or solution approach..."
            value={lab.notes}
            onChange={(e) => updateLab(sectionKey, lab.id, 'notes', e.target.value)}
            className="min-h-[60px] bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            disabled={locked}
          />
        </div>
      </div>
    </div>
  );
};

export default LabCard;
