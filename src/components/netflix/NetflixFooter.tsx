import React from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { ArrowUp } from 'lucide-react';

export const NetflixFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-zinc-400 py-14 px-4 sm:px-12 border-t border-white/10 text-xs select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Email link */}
        <div className="text-zinc-400">
          Direct email: <a href={`mailto:${SHOWRUNNER_DOSSIER.email}`} className="text-zinc-200 hover:text-white underline">{SHOWRUNNER_DOSSIER.email}</a>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="space-y-2">
            <a href="#home" className="block hover:text-white transition-colors">Home</a>
            <a href="#projects" className="block hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="block hover:text-white transition-colors">Stack</a>
            <a href="#timeline" className="block hover:text-white transition-colors">Timeline</a>
          </div>

          <div className="space-y-2">
            <a href={SHOWRUNNER_DOSSIER.github} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">GitHub</a>
            <a href={SHOWRUNNER_DOSSIER.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">LinkedIn</a>
            <a href="#about" className="block hover:text-white transition-colors">About</a>
            <a href="#contact" className="block hover:text-white transition-colors">Contact</a>
          </div>

          <div className="space-y-2">
            <span className="block text-zinc-300 font-semibold">Core Technologies</span>
            <span className="block text-zinc-400">React &amp; TypeScript</span>
            <span className="block text-zinc-400">C++20 &amp; Python</span>
            <span className="block text-zinc-400">PostgreSQL &amp; PostGIS</span>
          </div>

          <div className="space-y-2">
            <span className="block text-zinc-300 font-semibold">Navigation</span>
            <button
              onClick={scrollToTop}
              className="mt-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl text-zinc-300 hover:text-white border border-white/10 transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Himarghya Das. All rights reserved.</span>
          <span>Open source &amp; scalable engineering.</span>
        </div>

      </div>
    </footer>
  );
};