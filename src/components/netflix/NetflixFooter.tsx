import React from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { ArrowUp } from 'lucide-react';

export const NetflixFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0e11] text-zinc-500 py-12 px-4 sm:px-12 border-t border-zinc-800 text-xs select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Email link */}
        <div className="text-zinc-400">
          Direct email: <a href={`mailto:${SHOWRUNNER_DOSSIER.email}`} className="text-zinc-200 hover:text-white underline">{SHOWRUNNER_DOSSIER.email}</a>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="space-y-2">
            <a href="#home" className="block hover:text-zinc-300 transition-colors">Home</a>
            <a href="#projects" className="block hover:text-zinc-300 transition-colors">Projects</a>
            <a href="#skills" className="block hover:text-zinc-300 transition-colors">Stack</a>
            <a href="#timeline" className="block hover:text-zinc-300 transition-colors">Timeline</a>
          </div>

          <div className="space-y-2">
            <a href={SHOWRUNNER_DOSSIER.github} target="_blank" rel="noopener noreferrer" className="block hover:text-zinc-300 transition-colors">GitHub</a>
            <a href={SHOWRUNNER_DOSSIER.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:text-zinc-300 transition-colors">LinkedIn</a>
            <a href="#about" className="block hover:text-zinc-300 transition-colors">About</a>
            <a href="#contact" className="block hover:text-zinc-300 transition-colors">Contact</a>
          </div>

          <div className="space-y-2">
            <span className="block text-zinc-400 font-semibold">Core Technologies</span>
            <span className="block">React &amp; TypeScript</span>
            <span className="block">C++20 &amp; Python</span>
            <span className="block">PostgreSQL &amp; PostGIS</span>
          </div>

          <div className="space-y-2">
            <span className="block text-zinc-400 font-semibold">Navigation</span>
            <button
              onClick={scrollToTop}
              className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Himarghya Das. All rights reserved.</span>
          <span>Open source &amp; scalable engineering.</span>
        </div>

      </div>
    </footer>
  );
};