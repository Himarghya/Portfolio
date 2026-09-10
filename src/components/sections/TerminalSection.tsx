import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../../constants/portfolioData';
import { HudBadge } from '../ui/HudBadge';
import { Github, CornerDownLeft, Check, Copy } from 'lucide-react';

interface TerminalHistoryItem {
  id: string;
  command: string;
  output: string | string[] | React.ReactNode;
}

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      id: 'init-1',
      command: 'whoami',
      output: 'himarghya@developer // Full Stack Developer & C++ Systems Engineer'
    },
    {
      id: 'init-2',
      command: 'current_focus',
      output: 'Full Stack Development + AI/ML + Real-time Telemetry Platforms'
    },
    {
      id: 'init-3',
      command: 'languages',
      output: 'C++ (Advanced) | JavaScript | TypeScript | Python | SQL'
    },
    {
      id: 'init-4',
      command: 'mission',
      output: PERSONAL_INFO.mission
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let response: string | string[] | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = [
          'AVAILABLE SYSTEM COMMANDS:',
          '  whoami       - Display identity and developer profile',
          '  skills       - List all technical arsenals and competencies',
          '  projects     - List primary engineering projects',
          '  mission      - Display engineering mission & philosophy',
          '  languages    - View core programming languages',
          '  contact      - Get contact endpoints & transmission info',
          '  neofetch     - Display system info & tech specs',
          '  clear        - Flush terminal buffer',
          '  help         - Show this command manual'
        ];
        break;

      case 'whoami':
        response = `User: ${PERSONAL_INFO.name} | Status: ${PERSONAL_INFO.status} | Location: ${PERSONAL_INFO.location}`;
        break;

      case 'current_focus':
        response = 'Full Stack Development + AI/ML Exploration + High Performance C++ Algorithms';
        break;

      case 'languages':
        response = 'C++ (C++17/20) | JavaScript (ESNext) | TypeScript | Python 3 | SQL / PostGIS';
        break;

      case 'mission':
        response = PERSONAL_INFO.mission;
        break;

      case 'skills':
        response = SKILL_CATEGORIES.map(c => `[${c.category}]: ${c.skills.map(s => s.name).join(', ')}`);
        break;

      case 'projects':
        response = PROJECTS.map(p => `• [${p.number}] ${p.title} - ${p.subtitle} (${p.techStack.join(', ')})`);
        break;

      case 'contact':
        response = [
          `Email:    ${PERSONAL_INFO.links.email}`,
          `GitHub:   ${PERSONAL_INFO.links.github}`,
          `LinkedIn: ${PERSONAL_INFO.links.linkedin}`
        ];
        break;

      case 'neofetch':
        response = [
          '  ██████╗  ███████╗  OS: QuantumOS x86_64 v2026',
          '  ██╔══██╗ ██╔════╝  HOST: Himarghya Core Terminal',
          '  ██████╔╝ ███████╗  KERNEL: C++20 / Linux / WebGL',
          '  ██╔══██╗ ╚════██║  UPTIME: 100% Continuous Flow',
          '  ██████╔╝ ███████║  PACKAGES: React, TypeScript, FastAPI, Docker',
          '  ╚═════╝  ╚══════╝  SHELL: zsh / bash / cyber-sh'
        ];
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        response = `command not found: "${cmd}". Type "help" for a list of available system commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), command: inputVal, output: response }
    ]);
    setInputVal('');
  };

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(`Himarghya Das - Full Stack Developer & C++ Programmer | ${PERSONAL_INFO.links.email}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HudBadge label="SECTION // 06" variant="emerald" pulse={false} />
              <span className="text-xs font-mono text-[#00FF87] uppercase tracking-widest">// CLI INTERFACE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              CODE. BUILD. <span className="text-glow-emerald text-[#00FF87]">REPEAT.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal">
              An interactive Unix-style developer console. Query the profile, inspect dependencies, or view system telemetry in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#040E08] border border-[#00FF87]/30 text-white hover:text-[#00FF87] hover:border-[#00FF87]/70 text-xs font-mono transition-all shadow-lg"
            >
              <Github className="w-4 h-4 text-[#00FF87]" />
              <span>GITHUB REPOSITORY</span>
            </a>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-[#00FF87]/30 bg-[#020704] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-3 bg-[#040E08] border-b border-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">himarghya@quantum-core:~ (zsh)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyProfile}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#020704] border border-emerald-900/60 text-[10px] font-mono text-slate-400 hover:text-white"
                title="Copy developer spec"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED' : 'COPY SPEC'}</span>
              </button>
              <span className="text-[10px] font-mono text-[#00FF87] hidden sm:inline">UTF-8 // READY</span>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-6 font-mono text-xs sm:text-sm text-slate-300 min-h-[340px] max-h-[480px] overflow-y-auto space-y-4 cursor-text"
          >
            {/* Intro text */}
            <div className="text-slate-500 text-xs leading-relaxed border-b border-emerald-950/80 pb-3">
              Antigravity Quantum Shell v2.4 (x86_64-quantum-linux)<br />
              Type <span className="text-[#00FF87]">"help"</span> for commands, or explore <span className="text-[#A3FF12]">"projects"</span>, <span className="text-[#6EE7B7]">"skills"</span>, <span className="text-[#10B981]">"neofetch"</span>.
            </div>

            {/* History Output */}
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[#00FF87] font-bold">himarghya@core:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <div className="pl-4 text-slate-300">
                  {Array.isArray(item.output) ? (
                    <div className="space-y-1">
                      {item.output.map((line, idx) => (
                        <div key={idx} className="whitespace-pre-wrap">{line}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{item.output}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Live Interactive Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
              <span className="text-[#00FF87] font-bold shrink-0">himarghya@core:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type a command (e.g. help, skills, projects)..."
                className="w-full bg-transparent text-white font-mono focus:outline-none placeholder-slate-600 caret-[#00FF87]"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="text-slate-600 hover:text-[#00FF87]">
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>

            <div ref={terminalEndRef} />
          </div>

        </div>

        {/* Quick Command Helper Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono">
          <span className="text-slate-500">QUICK COMMANDS:</span>
          {['help', 'neofetch', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInputVal(cmd);
                inputRef.current?.focus();
              }}
              className="px-2.5 py-1 rounded bg-[#040E08] border border-emerald-950 text-slate-400 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-colors"
            >
              ${cmd}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
