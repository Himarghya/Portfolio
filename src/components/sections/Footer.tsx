import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020704] border-t border-emerald-950 py-12 text-slate-400 font-mono text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-emerald-950">
          
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="text-[#00FF87]">HD //</span>
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-slate-500 max-w-md text-[11px] leading-relaxed">
              Crafting intelligent, scalable, and immersive digital systems. Full Stack Web Engineering &amp; C++ Algorithmic Architecture.
            </p>
          </div>

          {/* Social Links & Back To Top */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-4">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#040E08] border border-emerald-900/60 text-slate-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#040E08] border border-emerald-900/60 text-slate-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.links.email}`}
              className="p-2.5 rounded-lg bg-[#040E08] border border-emerald-900/60 text-slate-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#040E08] border border-emerald-900/60 text-slate-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all ml-2"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Legal & Telemetry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
            <span>QUANTUM ENGINE // DESIGNED &amp; ENGINEERED FOR HIMARGHYA DAS</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} HIMARGHYA DAS. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};
