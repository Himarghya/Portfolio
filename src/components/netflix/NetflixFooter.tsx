import React from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const NetflixFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101010] text-gray-500 py-12 px-4 sm:px-12 border-t border-white/5 text-xs select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Questions hotline */}
        <div className="text-gray-400">
          Questions? Direct email to <a href={`mailto:${SHOWRUNNER_DOSSIER.email}`} className="text-white hover:underline">{SHOWRUNNER_DOSSIER.email}</a>
        </div>

        {/* Multi-column link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="space-y-2.5">
            <a href="#home" className="block hover:underline">Billboard Home</a>
            <a href="#projects" className="block hover:underline">Trending Projects</a>
            <a href="#skills" className="block hover:underline">Top 10 Stack</a>
            <a href="#timeline" className="block hover:underline">Episodes &amp; Seasons</a>
          </div>

          <div className="space-y-2.5">
            <a href={SHOWRUNNER_DOSSIER.github} target="_blank" rel="noopener noreferrer" className="block hover:underline">GitHub Repository</a>
            <a href={SHOWRUNNER_DOSSIER.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:underline">LinkedIn Network</a>
            <a href="#about" className="block hover:underline">About Showrunner</a>
            <a href="#contact" className="block hover:underline">Contact / Hire</a>
          </div>

          <div className="space-y-2.5">
            <span className="block text-gray-400 font-semibold">Technical Specs</span>
            <span className="block">React 18 + TypeScript</span>
            <span className="block">Three.js WebGL Core</span>
            <span className="block">Tailwind CSS 3.4</span>
          </div>

          <div className="space-y-2.5">
            <span className="block text-gray-400 font-semibold">Quality &amp; Audio</span>
            <span className="block">4K Ultra HD Streaming</span>
            <span className="block">Dolby 5.1 Telemetry</span>
            <button
              onClick={scrollToTop}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181818] hover:bg-[#252525] text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Service Code Button */}
        <div className="pt-4">
          <div className="inline-block px-2 py-1 border border-gray-700 text-gray-400 text-[10px] font-mono hover:border-gray-500 cursor-pointer">
            SERVICE CODE: HD-2026-DEVFLIX
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-2 text-[11px] text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} HIMARGHYA DAS // DEVFLIX PORTFOLIO EDITION. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED WITH PASSION &amp; RIGOR</span>
        </div>

      </div>
    </footer>
  );
};