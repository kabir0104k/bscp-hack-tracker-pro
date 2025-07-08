
export interface Lab {
  id: string;
  name: string;
  category: string;
  difficulty: 'Apprentice' | 'Practitioner' | 'Expert';
  completed: boolean;
  notes: string;
}
