import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import CircularProgress from './bscp/CircularProgress';
import LabSection from './bscp/LabSection';
import { Lab } from './bscp/types';

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

  const totalCompleted = Object.values(labs).flat().filter(lab => lab.completed).length;
  const totalLabs = Object.values(labs).flat().length;
  const overallProgress = Math.round((totalCompleted / totalLabs) * 100);

  const coreStats = getCompletionStats(labs.core);
  const specificStats = getCompletionStats(labs.specific);
  const mysteryUnlocked = coreStats.completed >= 15 && specificStats.completed >= 5;
  const examUnlocked = coreStats.completed === coreStats.total && specificStats.completed === specificStats.total && getCompletionStats(labs.mystery).completed === getCompletionStats(labs.mystery).total;

  return (
    <div className="space-y-8">
      {/* BSCP Official Progress Header */}
      <div className="bg-gray-800 border border-gray-700 p-8 rounded">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            🎯 BSCP Official Progress
          </h2>
          <CircularProgress value={overallProgress} size={140} />
          <div className="text-center space-y-2">
            <div className="text-gray-300 text-lg">{totalCompleted} of {totalLabs} labs completed</div>
            <div className="flex gap-4 justify-center">
              <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                Core: {coreStats.completed}/{coreStats.total}
              </Badge>
              <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                Specific: {specificStats.completed}/{specificStats.total}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <LabSection 
          title="🔧 Core Labs" 
          labs={labs.core} 
          sectionKey="core" 
          updateLab={updateLab}
          locked={false}
        />
        <LabSection 
          title="🎯 Specific Labs" 
          labs={labs.specific} 
          sectionKey="specific" 
          updateLab={updateLab}
          locked={false}
        />
        <LabSection 
          title="🔮 Mystery Labs" 
          labs={labs.mystery} 
          sectionKey="mystery" 
          updateLab={updateLab}
          locked={!mysteryUnlocked}
        />
        <LabSection 
          title="🏆 Practice Exam" 
          labs={labs.exam} 
          sectionKey="exam" 
          updateLab={updateLab}
          locked={!examUnlocked}
        />
      </div>

      {!mysteryUnlocked && (
        <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded">
          <p className="text-gray-400">🔒 Complete 15+ Core Labs and 5+ Specific Labs to unlock Mystery Labs</p>
        </div>
      )}

      {!examUnlocked && (
        <div className="text-center p-4 bg-gray-800 border border-gray-700 rounded">
          <p className="text-gray-400">🔒 Complete all other sections to unlock the Practice Exam</p>
        </div>
      )}
    </div>
  );
};

export default BSCPTracker;
