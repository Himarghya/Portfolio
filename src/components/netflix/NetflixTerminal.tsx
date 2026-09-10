import React, { useState, useRef, useEffect } from 'react';
import { X, CornerDownLeft, Copy, Check, Terminal as TerminalIcon } from 'lucide-react';
import { SHOWRUNNER_DOSSIER, TRENDING_PROJECTS, TOP_TEN_SKILLS } from '../../constants/netflixData';

interface NetflixTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetflixTerminal: React.FC<NetflixTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<{ id: string; command: string; output: string | string[] }[]>([
    {
      id: 'init-1',
      command: 'devflix --version',
      output: 'Devflix Terminal Diagnostic Engine v2026.1 (x86_64-netflix-core)'
    },
    {
      id: 'init-2',
      command: 'whoami',
      output: `Showrunner: ${SHOWRUNNER_DOSSIER.name} | Role: ${SHOWRUNNER_DOSSIER.roleTitle} | Status: ${SHOWRUNNER_DOSSIER.status}`
    },
    {
      id: 'init-3',
      command: 'help',
      output: 'Type "projects", "skills", "contact", "hire", "tudum", or "clear".'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let response: string | string[] = '';

    switch (cmd) {
      case 'help':
        response = [
          'DEVFLIX CONSOLE COMMANDS:',
          '  whoami       - Display showrunner / developer profile',
          '  projects     - List all streaming releases & live projects',
          '  skills       - View top 10 stack rankings',
          '  contact      - Direct email and transmission endpoints',
          '  hire         - Instructions to hire Himarghya Das',
          '  tudum        - Play sound effect indicator',
          '  clear        - Flush terminal screen'
        ];
        break;

      case 'whoami':
        response = `User: ${SHOWRUNNER_DOSSIER.name} | Location: ${SHOWRUNNER_DOSSIER.location} | Role: ${SHOWRUNNER_DOSSIER.roleTitle}`;
        break;

      case 'projects':
        response = TRENDING_PROJECTS.map(p => `• [${p.matchPercentage}% Match] ${p.title} (${p.genres.join(', ')})`);
        break;

      case 'skills':
        response = TOP_TEN_SKILLS.map(s => `#${s.rank} ${s.name} (${s.category}) - ${s.match}% Match`);
        break;

      case 'contact':
      case 'hire':
        response = [
          `Email:    ${SHOWRUNNER_DOSSIER.email}`,
          `GitHub:   ${SHOWRUNNER_DOSSIER.github}`,
          `LinkedIn: ${SHOWRUNNER_DOSSIER.linkedin}`
        ];
        break;

      case 'tudum':
        response = '🎵 TUDUM! (Streaming session initialized in 4K HDR)';
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }

    setHistory(prev => [
      ...prev,
      { id: Date.now().toString(), command: inputVal, output: response }
    ]);
    setInputVal('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${SHOWRUNNER_DOSSIER.name} - ${SHOWRUNNER_DOSSIER.roleTitle} | ${SHOWRUNNER_DOSSIER.email}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-xl overflow-hidden bg-[#101010] border border-gray-700 shadow-2xl font-mono select-none">
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#181818] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <div className="w-3 h-3 rounded-full bg-yellow-600" />
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="ml-2 text-xs text-gray-300 font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#E50914]" />
              <span>devflix-cli:~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/40 hover:bg-black/80 border border-gray-700 text-[10px] text-gray-300"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button onClick={onClose} className="p-1 hover:text-[#E50914] text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Screen */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 text-xs text-gray-300 min-h-[320px] max-h-[440px] overflow-y-auto space-y-3 cursor-text bg-black/90"
        >
          {history.map(item => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-[#E50914] font-bold">himarghya@devflix:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 text-gray-300">
                {Array.isArray(item.output) ? (
                  item.output.map((line, idx) => <div key={idx}>{line}</div>)
                ) : (
                  <div>{item.output}</div>
                )}
              </div>
            </div>
          ))}

          {/* Prompt Form */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
            <span className="text-[#E50914] font-bold shrink-0">himarghya@devflix:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type help, projects, skills, hire..."
              className="w-full bg-transparent text-white focus:outline-none placeholder-gray-600 caret-[#E50914]"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="text-gray-500 hover:text-white">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
          <div ref={terminalEndRef} />
        </div>

        {/* Helper Footer Chips */}
        <div className="px-4 py-2 bg-[#181818] border-t border-gray-800 flex flex-wrap items-center gap-2 text-[10px]">
          <span className="text-gray-500">SHORTCUTS:</span>
          {['help', 'projects', 'skills', 'hire', 'tudum', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => { setInputVal(cmd); inputRef.current?.focus(); }}
              className="px-2 py-0.5 rounded bg-black/50 border border-gray-700 text-gray-400 hover:text-[#E50914] hover:border-[#E50914]/40"
            >
              ${cmd}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};