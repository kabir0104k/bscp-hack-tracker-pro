
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Lock, CheckCircle } from 'lucide-react';

interface Lab {
  id: string;
  name: string;
  category: string;
  difficulty: 'Apprentice' | 'Practitioner' | 'Expert';
  completed: boolean;
  notes: string;
}

const BSCPTracker = () => {
  const [labs, setLabs] = useState<{
    core: Lab[];
    specific: Lab[];
    mystery: Lab[];
    exam: Lab[];
  }>({
    core: [
      { id: 'c1', name: 'SQL injection UNION attack, determining the number of columns', category: 'SQL Injection', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c2', name: 'SQL injection UNION attack, finding a column containing text', category: 'SQL Injection', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c3', name: 'SQL injection UNION attack, retrieving data from other tables', category: 'SQL Injection', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c4', name: 'SQL injection attack, querying the database type and version', category: 'SQL Injection', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c5', name: 'SQL injection attack, listing the database contents', category: 'SQL Injection', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c6', name: 'Blind SQL injection with conditional responses', category: 'SQL Injection', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c7', name: 'Blind SQL injection with conditional errors', category: 'SQL Injection', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c8', name: 'Reflected XSS into HTML context with nothing encoded', category: 'XSS', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c9', name: 'Stored XSS into HTML context with nothing encoded', category: 'XSS', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c10', name: 'DOM XSS in document.write sink using source location.search', category: 'XSS', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c11', name: 'DOM XSS in innerHTML sink using source location.search', category: 'XSS', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c12', name: 'Reflected XSS into attribute with angle brackets HTML-encoded', category: 'XSS', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c13', name: 'Stored XSS into anchor href attribute with double quotes HTML-encoded', category: 'XSS', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c14', name: 'Username enumeration via different responses', category: 'Authentication', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c15', name: 'Username enumeration via subtly different responses', category: 'Authentication', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c16', name: 'Username enumeration via response timing', category: 'Authentication', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c17', name: 'Broken brute-force protection, IP block', category: 'Authentication', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c18', name: 'Unprotected admin functionality', category: 'Access Control', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c19', name: 'Unprotected admin functionality with unpredictable URL', category: 'Access Control', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c20', name: 'User role controlled by request parameter', category: 'Access Control', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c21', name: 'User role can be modified in user profile', category: 'Access Control', difficulty: 'Apprentice', completed: false, notes: '' },
      { id: 'c22', name: 'Basic server-side template injection', category: 'SSTI', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 'c23', name: 'Basic SSRF against the local server', category: 'SSRF', difficulty: 'Apprentice', completed: false, notes: '' },
    ],
    specific: [
      { id: 's1', name: 'Exploiting XXE using external entities to retrieve files', category: 'XXE', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's2', name: 'Exploiting XInclude to retrieve files', category: 'XXE', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's3', name: 'CSRF where token validation depends on request method', category: 'CSRF', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's4', name: 'CSRF where token validation depends on token being present', category: 'CSRF', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's5', name: 'CSRF where token is not tied to user session', category: 'CSRF', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's6', name: 'CSRF where token is tied to non-session cookie', category: 'CSRF', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's7', name: 'CSRF where token is duplicated in cookie', category: 'CSRF', difficulty: 'Practitioner', completed: false, notes: '' },
      { id: 's8', name: 'CSRF where Referer validation depends on header being present', category: 'CSRF', difficulty: 'Practitioner', completed: false, notes: '' },
    ],
    mystery: [
      { id: 'm1', name: 'Advanced SQL injection with time delays', category: 'SQL Injection', difficulty: 'Expert', completed: false, notes: '' },
      { id: 'm2', name: 'DOM XSS in AngularJS expression with angle brackets encoded', category: 'XSS', difficulty: 'Expert', completed: false, notes: '' },
      { id: 'm3', name: 'HTTP request smuggling, basic CL.TE vulnerability', category: 'HTTP Smuggling', difficulty: 'Expert', completed: false, notes: '' },
      { id: 'm4', name: 'Exploiting HTTP request smuggling to bypass front-end security controls', category: 'HTTP Smuggling', difficulty: 'Expert', completed: false, notes: '' },
      { id: 'm5', name: 'Server-side template injection with information disclosure via user-supplied objects', category: 'SSTI', difficulty: 'Expert', completed: false, notes: '' },
    ],
    exam: [
      { id: 'e1', name: 'BSCP Practice Exam (4 hours)', category: 'Exam', difficulty: 'Expert', completed: false, notes: '' },
    ]
  });

  useEffect(() => {
    const savedLabs = localStorage.getItem('bscp-labs');
    if (savedLabs) {
      setLabs(JSON.parse(savedLabs));
    }
  }, []);

  const updateLab = (section: keyof typeof labs, labId: string, field: keyof Lab, value: any) => {
    const updatedLabs = {
      ...labs,
      [section]: labs[section].map(lab =>
        lab.id === labId ? { ...lab, [field]: value } : lab
      )
    };
    setLabs(updatedLabs);
    localStorage.setItem('bscp-labs', JSON.stringify(updatedLabs));
  };

  const getCompletionStats = (section: Lab[]) => {
    const completed = section.filter(lab => lab.completed).length;
    return { completed, total: section.length, percentage: Math.round((completed / section.length) * 100) };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Apprentice': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Practitioner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const totalCompleted = Object.values(labs).flat().filter(lab => lab.completed).length;
  const totalLabs = Object.values(labs).flat().length;
  const overallProgress = Math.round((totalCompleted / totalLabs) * 100);

  const renderSection = (title: string, sectionLabs: Lab[], sectionKey: keyof typeof labs, locked = false) => {
    const stats = getCompletionStats(sectionLabs);
    
    return (
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {locked && <Lock className="w-5 h-5 text-slate-400" />}
              {title}
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                {stats.completed}/{stats.total}
              </Badge>
            </CardTitle>
            <span className="text-2xl font-bold text-purple-400">{stats.percentage}%</span>
          </div>
          <Progress value={stats.percentage} className="h-2 bg-slate-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          {sectionLabs.map((lab) => (
            <div key={lab.id} className="border border-slate-700/50 rounded-lg p-4 space-y-3 hover:border-slate-600/50 transition-colors">
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
          ))}
        </CardContent>
      </Card>
    );
  };

  const coreStats = getCompletionStats(labs.core);
  const specificStats = getCompletionStats(labs.specific);
  const mysteryUnlocked = coreStats.completed >= 15 && specificStats.completed >= 5;
  const examUnlocked = coreStats.completed === coreStats.total && specificStats.completed === specificStats.total && getCompletionStats(labs.mystery).completed === getCompletionStats(labs.mystery).total;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/80 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">🎯 BSCP Official Progress</CardTitle>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-purple-400">{overallProgress}%</div>
            <div className="text-slate-400">{totalCompleted} of {totalLabs} labs completed</div>
            <Progress value={overallProgress} className="h-3 bg-slate-700" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {renderSection("🔧 Core Labs", labs.core, 'core')}
        {renderSection("🎯 Specific Labs", labs.specific, 'specific')}
        {renderSection("🔮 Mystery Labs", labs.mystery, 'mystery', !mysteryUnlocked)}
        {renderSection("🏆 Practice Exam", labs.exam, 'exam', !examUnlocked)}
      </div>

      {!mysteryUnlocked && (
        <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400">🔒 Complete 15+ Core Labs and 5+ Specific Labs to unlock Mystery Labs</p>
        </div>
      )}

      {!examUnlocked && (
        <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400">🔒 Complete all other sections to unlock the Practice Exam</p>
        </div>
      )}
    </div>
  );
};

export default BSCPTracker;
