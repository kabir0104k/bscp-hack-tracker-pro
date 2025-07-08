
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface PathLab {
  id: string;
  name: string;
  difficulty: 'Apprentice' | 'Practitioner' | 'Expert';
  completed: boolean;
}

interface SecurityPath {
  id: string;
  name: string;
  icon: string;
  labs: PathLab[];
  expanded: boolean;
}

const WebSecurityPaths = () => {
  const [paths, setPaths] = useState<SecurityPath[]>([
    {
      id: 'auth',
      name: 'Authentication',
      icon: '🔐',
      expanded: false,
      labs: [
        { id: 'auth1', name: 'Username enumeration via different responses', difficulty: 'Apprentice', completed: false },
        { id: 'auth2', name: '2FA simple bypass', difficulty: 'Apprentice', completed: false },
        { id: 'auth3', name: 'Password reset broken logic', difficulty: 'Apprentice', completed: false },
        { id: 'auth4', name: 'Username enumeration via subtly different responses', difficulty: 'Practitioner', completed: false },
        { id: 'auth5', name: 'Username enumeration via response timing', difficulty: 'Practitioner', completed: false },
        { id: 'auth6', name: 'Broken brute-force protection, IP block', difficulty: 'Practitioner', completed: false },
        { id: 'auth7', name: 'Username enumeration via account lock', difficulty: 'Practitioner', completed: false },
        { id: 'auth8', name: '2FA broken logic', difficulty: 'Practitioner', completed: false },
        { id: 'auth9', name: 'Brute-forcing a stay-logged-in cookie', difficulty: 'Practitioner', completed: false },
        { id: 'auth10', name: 'Offline password cracking', difficulty: 'Practitioner', completed: false },
        { id: 'auth11', name: 'Password reset poisoning via middleware', difficulty: 'Practitioner', completed: false },
        { id: 'auth12', name: 'Password brute-force via password change', difficulty: 'Practitioner', completed: false },
        { id: 'auth13', name: 'Broken brute-force protection, multiple credentials per request', difficulty: 'Expert', completed: false },
        { id: 'auth14', name: '2FA bypass using a brute-force attack', difficulty: 'Expert', completed: false },
      ]
    },
    {
      id: 'sqli',
      name: 'SQL Injection',
      icon: '💉',
      expanded: false,
      labs: [
        { id: 'sqli1', name: 'SQL injection vulnerability in WHERE clause allowing retrieval of hidden data', difficulty: 'Apprentice', completed: false },
        { id: 'sqli2', name: 'SQL injection vulnerability allowing login bypass', difficulty: 'Apprentice', completed: false },
        { id: 'sqli3', name: 'SQL injection UNION attack, determining the number of columns returned by the query', difficulty: 'Apprentice', completed: false },
        { id: 'sqli4', name: 'SQL injection UNION attack, finding a column containing text', difficulty: 'Apprentice', completed: false },
        { id: 'sqli5', name: 'SQL injection UNION attack, retrieving data from other tables', difficulty: 'Apprentice', completed: false },
        { id: 'sqli6', name: 'SQL injection UNION attack, retrieving multiple values in a single column', difficulty: 'Apprentice', completed: false },
        { id: 'sqli7', name: 'SQL injection attack, querying the database type and version on Oracle', difficulty: 'Practitioner', completed: false },
        { id: 'sqli8', name: 'SQL injection attack, querying the database type and version on MySQL and Microsoft', difficulty: 'Practitioner', completed: false },
        { id: 'sqli9', name: 'SQL injection attack, listing the database contents on non-Oracle databases', difficulty: 'Practitioner', completed: false },
        { id: 'sqli10', name: 'SQL injection attack, listing the database contents on Oracle', difficulty: 'Practitioner', completed: false },
        { id: 'sqli11', name: 'Blind SQL injection with conditional responses', difficulty: 'Practitioner', completed: false },
        { id: 'sqli12', name: 'Blind SQL injection with conditional errors', difficulty: 'Practitioner', completed: false },
        { id: 'sqli13', name: 'Visible error-based SQL injection', difficulty: 'Practitioner', completed: false },
        { id: 'sqli14', name: 'Blind SQL injection with time delays', difficulty: 'Practitioner', completed: false },
        { id: 'sqli15', name: 'Blind SQL injection with time delays and information retrieval', difficulty: 'Practitioner', completed: false },
        { id: 'sqli16', name: 'Blind SQL injection with out-of-band interaction', difficulty: 'Practitioner', completed: false },
        { id: 'sqli17', name: 'Blind SQL injection with out-of-band data exfiltration', difficulty: 'Practitioner', completed: false },
        { id: 'sqli18', name: 'SQL injection with filter bypass via XML encoding', difficulty: 'Expert', completed: false },
      ]
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting',
      icon: '🚨',
      expanded: false,
      labs: [
        { id: 'xss1', name: 'Reflected XSS into HTML context with nothing encoded', difficulty: 'Apprentice', completed: false },
        { id: 'xss2', name: 'Stored XSS into HTML context with nothing encoded', difficulty: 'Apprentice', completed: false },
        { id: 'xss3', name: 'DOM XSS in document.write sink using source location.search', difficulty: 'Apprentice', completed: false },
        { id: 'xss4', name: 'DOM XSS in innerHTML sink using source location.search', difficulty: 'Apprentice', completed: false },
        { id: 'xss5', name: 'DOM XSS in jQuery anchor href attribute sink using location.search source', difficulty: 'Apprentice', completed: false },
        { id: 'xss6', name: 'DOM XSS in jQuery selector sink using a hashchange event', difficulty: 'Apprentice', completed: false },
        { id: 'xss7', name: 'Reflected XSS into attribute with angle brackets HTML-encoded', difficulty: 'Practitioner', completed: false },
        { id: 'xss8', name: 'Stored XSS into anchor href attribute with double quotes HTML-encoded', difficulty: 'Practitioner', completed: false },
        { id: 'xss9', name: 'Reflected XSS into a JavaScript string with angle brackets HTML encoded', difficulty: 'Practitioner', completed: false },
        { id: 'xss10', name: 'DOM XSS in document.write sink using source location.search inside a select element', difficulty: 'Practitioner', completed: false },
        { id: 'xss11', name: 'DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded', difficulty: 'Practitioner', completed: false },
        { id: 'xss12', name: 'Reflected DOM XSS', difficulty: 'Practitioner', completed: false },
        { id: 'xss13', name: 'Stored DOM XSS', difficulty: 'Practitioner', completed: false },
        { id: 'xss14', name: 'Exploiting cross-site scripting to steal cookies', difficulty: 'Practitioner', completed: false },
        { id: 'xss15', name: 'Exploiting cross-site scripting to capture passwords', difficulty: 'Practitioner', completed: false },
        { id: 'xss16', name: 'Exploiting XSS to perform CSRF', difficulty: 'Practitioner', completed: false },
        { id: 'xss17', name: 'Reflected XSS into HTML context with most tags and attributes blocked', difficulty: 'Expert', completed: false },
        { id: 'xss18', name: 'Reflected XSS into HTML context with all tags blocked except custom ones', difficulty: 'Expert', completed: false },
        { id: 'xss19', name: 'Reflected XSS with some SVG markup allowed', difficulty: 'Expert', completed: false },
        { id: 'xss20', name: 'Reflected XSS in canonical link tag', difficulty: 'Expert', completed: false },
        { id: 'xss21', name: 'Reflected XSS into a JavaScript string with single quote and backslash escaped', difficulty: 'Expert', completed: false },
        { id: 'xss22', name: 'Reflected XSS into a JavaScript string with angle brackets and double quotes HTML-encoded and single quotes escaped', difficulty: 'Expert', completed: false },
        { id: 'xss23', name: 'Stored XSS into onclick event with angle brackets and double quotes HTML-encoded and single quotes and backslash escaped', difficulty: 'Expert', completed: false },
        { id: 'xss24', name: 'Reflected XSS into a template literal with angle brackets, single, double quotes, backslash and backticks Unicode-escaped', difficulty: 'Expert', completed: false },
        { id: 'xss25', name: 'Reflected XSS with event handlers and href attributes blocked', difficulty: 'Expert', completed: false },
        { id: 'xss26', name: 'Reflected XSS in a JavaScript URL with some characters blocked', difficulty: 'Expert', completed: false },
        { id: 'xss27', name: 'Reflected XSS with AngularJS sandbox escape without strings', difficulty: 'Expert', completed: false },
        { id: 'xss28', name: 'Reflected XSS with AngularJS sandbox escape and CSP', difficulty: 'Expert', completed: false },
        { id: 'xss29', name: 'Reflected XSS protected by very strict CSP, with dangling markup attack', difficulty: 'Expert', completed: false },
        { id: 'xss30', name: 'Reflected XSS protected by CSP, with CSP bypass', difficulty: 'Expert', completed: false },
      ]
    },
    {
      id: 'access',
      name: 'Access Control',
      icon: '🛡️',
      expanded: false,
      labs: [
        { id: 'access1', name: 'Unprotected admin functionality', difficulty: 'Apprentice', completed: false },
        { id: 'access2', name: 'Unprotected admin functionality with unpredictable URL', difficulty: 'Apprentice', completed: false },
        { id: 'access3', name: 'User role controlled by request parameter', difficulty: 'Apprentice', completed: false },
        { id: 'access4', name: 'User role can be modified in user profile', difficulty: 'Apprentice', completed: false },
        { id: 'access5', name: 'User ID controlled by request parameter', difficulty: 'Apprentice', completed: false },
        { id: 'access6', name: 'User ID controlled by request parameter, with unpredictable user IDs', difficulty: 'Apprentice', completed: false },
        { id: 'access7', name: 'User ID controlled by request parameter with data leakage in redirect', difficulty: 'Apprentice', completed: false },
        { id: 'access8', name: 'User ID controlled by request parameter with password disclosure', difficulty: 'Apprentice', completed: false },
        { id: 'access9', name: 'Insecure direct object references', difficulty: 'Apprentice', completed: false },
        { id: 'access10', name: 'URL-based access control can be circumvented', difficulty: 'Practitioner', completed: false },
        { id: 'access11', name: 'Method-based access control can be circumvented', difficulty: 'Practitioner', completed: false },
        { id: 'access12', name: 'Multi-step process with no access control on one step', difficulty: 'Practitioner', completed: false },
        { id: 'access13', name: 'Referer-based access control', difficulty: 'Practitioner', completed: false },
      ]
    },
    {
      id: 'csrf',
      name: 'CSRF',
      icon: '🔄',
      expanded: false,
      labs: [
        { id: 'csrf1', name: 'CSRF vulnerability with no defenses', difficulty: 'Apprentice', completed: false },
        { id: 'csrf2', name: 'CSRF where token validation depends on request method', difficulty: 'Practitioner', completed: false },
        { id: 'csrf3', name: 'CSRF where token validation depends on token being present', difficulty: 'Practitioner', completed: false },
        { id: 'csrf4', name: 'CSRF where token is not tied to user session', difficulty: 'Practitioner', completed: false },
        { id: 'csrf5', name: 'CSRF where token is tied to non-session cookie', difficulty: 'Practitioner', completed: false },
        { id: 'csrf6', name: 'CSRF where token is duplicated in cookie', difficulty: 'Practitioner', completed: false },
        { id: 'csrf7', name: 'SameSite Lax bypass via method override', difficulty: 'Practitioner', completed: false },
        { id: 'csrf8', name: 'SameSite Strict bypass via client-side redirect', difficulty: 'Practitioner', completed: false },
        { id: 'csrf9', name: 'SameSite Strict bypass via sibling domain', difficulty: 'Practitioner', completed: false },
        { id: 'csrf10', name: 'SameSite Lax bypass via cookie refresh', difficulty: 'Practitioner', completed: false },
        { id: 'csrf11', name: 'CSRF where Referer validation depends on header being present', difficulty: 'Practitioner', completed: false },
        { id: 'csrf12', name: 'CSRF with broken Referer validation', difficulty: 'Practitioner', completed: false },
      ]
    },
    {
      id: 'ssrf',
      name: 'SSRF',
      icon: '🔗',
      expanded: false,
      labs: [
        { id: 'ssrf1', name: 'Basic SSRF against the local server', difficulty: 'Apprentice', completed: false },
        { id: 'ssrf2', name: 'Basic SSRF against another back-end system', difficulty: 'Apprentice', completed: false },
        { id: 'ssrf3', name: 'SSRF with blacklist-based input filter', difficulty: 'Practitioner', completed: false },
        { id: 'ssrf4', name: 'SSRF with filter bypass via open redirection vulnerability', difficulty: 'Practitioner', completed: false },
        { id: 'ssrf5', name: 'Blind SSRF with out-of-band detection', difficulty: 'Practitioner', completed: false },
        { id: 'ssrf6', name: 'SSRF with whitelist-based input filter', difficulty: 'Expert', completed: false },
        { id: 'ssrf7', name: 'Blind SSRF with Shellshock exploitation', difficulty: 'Expert', completed: false },
      ]
    }
  ]);

  useEffect(() => {
    const savedPaths = localStorage.getItem('websec-paths');
    if (savedPaths) {
      setPaths(JSON.parse(savedPaths));
    }
  }, []);

  const updateLab = (pathId: string, labId: string, completed: boolean) => {
    const updatedPaths = paths.map(path =>
      path.id === pathId
        ? {
            ...path,
            labs: path.labs.map(lab =>
              lab.id === labId ? { ...lab, completed } : lab
            )
          }
        : path
    );
    setPaths(updatedPaths);
    localStorage.setItem('websec-paths', JSON.stringify(updatedPaths));
  };

  const togglePath = (pathId: string) => {
    const updatedPaths = paths.map(path =>
      path.id === pathId ? { ...path, expanded: !path.expanded } : path
    );
    setPaths(updatedPaths);
  };

  const getPathStats = (path: SecurityPath) => {
    const completed = path.labs.filter(lab => lab.completed).length;
    return { completed, total: path.labs.length, percentage: Math.round((completed / path.labs.length) * 100) };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Apprentice': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Practitioner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const totalCompleted = paths.reduce((acc, path) => acc + path.labs.filter(lab => lab.completed).length, 0);
  const totalLabs = paths.reduce((acc, path) => acc + path.labs.length, 0);
  const overallProgress = Math.round((totalCompleted / totalLabs) * 100);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-cyan-900/30 to-slate-900/80 border-cyan-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6" />
            🧠 Full Web Security Academy Paths
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-cyan-400">{overallProgress}%</div>
            <div className="text-slate-400">{totalCompleted} of {totalLabs} labs completed</div>
            <Progress value={overallProgress} className="h-3 bg-slate-700" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {paths.map((path) => {
          const stats = getPathStats(path);
          return (
            <Card key={path.id} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
              <Collapsible open={path.expanded} onOpenChange={() => togglePath(path.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {path.expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                        <span className="text-2xl">{path.icon}</span>
                        <CardTitle className="flex items-center gap-2">
                          {path.name}
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                            {stats.completed}/{stats.total}
                          </Badge>
                        </CardTitle>
                      </div>
                      <span className="text-xl font-bold text-cyan-400">{stats.percentage}%</span>
                    </div>
                    <Progress value={stats.percentage} className="h-2 bg-slate-700" />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-3">
                    {path.labs.map((lab) => (
                      <div key={lab.id} className="flex items-center gap-3 p-3 border border-slate-700/50 rounded-lg hover:border-slate-600/50 transition-colors">
                        <Checkbox
                          checked={lab.completed}
                          onCheckedChange={(checked) => updateLab(path.id, lab.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <div className={`font-medium ${lab.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                            {lab.name}
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(lab.difficulty)}>
                          {lab.difficulty}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WebSecurityPaths;
