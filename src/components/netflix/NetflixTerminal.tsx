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
      command: 'portfolio --version',
      output: 'Himarghya Das Portfolio Diagnostic Engine v2026.1 (x86_64-portfolio-core)'
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
          'PORTFOLIO CONSOLE COMMANDS:',
          '  whoami       - Display showrunner / developer profile',
          '  projects     - List all streaming releases & live projects',
          '  skills       - View top 10 stack rankings',
          '  certs        - View accredited certifications & achievements',
          '  contact      - Direct email and transmission endpoints',
          '  hire         - Instructions to hire Himarghya Das',
          '  tudum        - Play sound effect indicator',
          '  clear        - Flush terminal screen'
        ];
        break;

      case 'certs':
      case 'certificates':
      case 'achievements':
      case 'awards':
        response = [
          '🏆 ACCREDITATIONS & ACHIEVEMENTS:',
          '  • [🥇 1st Place Winner] CAN YOU HACK IT (24-Hour Hackathon) — THINKBUILDSHIP & Globus Infocom (Team Still Standing)',
          '  • [🥉 3rd Place] RoboRush 3.0 (2025) — ERS, IIITDM Jabalpur (Team Super Strikers)',
          '  • [📜 Verified 62-Hour Fullstack] The Complete Full-Stack Web Development Bootcamp (Udemy / Dr. Angela Yu)',
          '    Credential ID: UC-629e3310-b94c-4f76-a91e-1b90d378d496'
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
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#101116]/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] font-mono select-none">
        
        {/* Terminal Header */}
        <div className="px-5 py-3.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            <span className="ml-2 text-xs text-zinc-300 font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#E50914] drop-shadow-[0_0_6px_rgba(229,9,20,0.6)]" />
              <span>portfolio-cli:~ (zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 text-[10px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button onClick={onClose} className="p-1 hover:text-[#E50914] text-zinc-400 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Screen */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 text-xs text-zinc-300 min-h-[320px] max-h-[440px] overflow-y-auto space-y-3 cursor-text bg-black/50 backdrop-blur-sm"
        >
          {history.map(item => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[#E50914] font-bold drop-shadow-[0_0_6px_rgba(229,9,20,0.4)]">himarghya@portfolio:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 text-zinc-300">
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
            <span className="text-[#E50914] font-bold shrink-0 drop-shadow-[0_0_6px_rgba(229,9,20,0.4)]">himarghya@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type help, projects, skills, hire..."
              className="w-full bg-transparent text-white focus:outline-none placeholder-zinc-600 caret-[#E50914]"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="text-zinc-500 hover:text-white cursor-pointer">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
          <div ref={terminalEndRef} />
        </div>

        {/* Helper Footer Chips */}
        <div className="px-4 py-2.5 bg-white/[0.03] border-t border-white/10 flex flex-wrap items-center gap-2 text-[10px]">
          <span className="text-zinc-400">SHORTCUTS:</span>
          {['help', 'projects', 'skills', 'hire', 'tudum', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => { setInputVal(cmd); inputRef.current?.focus(); }}
              className="px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-[#E50914] hover:border-[#E50914]/50 transition-all cursor-pointer"
            >
              ${cmd}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};