import React, { useState } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import {
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  ExternalLink,
  Terminal,
  Send,
  Check,
  Sparkles
} from 'lucide-react';

export const NetflixFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SHOWRUNNER_DOSSIER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative z-20 text-zinc-400 py-16 px-4 sm:px-10 border-t border-white/10 select-none bg-gradient-to-b from-transparent via-black/40 to-black/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Header Card: Brand, Mission & Quick Socials */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bebas text-3xl sm:text-4xl text-[#E50914] tracking-wider font-bold drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]">
                HIMARGHYA
              </span>
              <span className="text-zinc-600 font-sans font-light text-2xl">/</span>
              <span className="text-zinc-300 font-mono text-xs tracking-wider uppercase font-semibold">
                Portfolio Dossier
              </span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
              Software Engineer specializing in distributed systems, backend architectures, PostgreSQL query optimization, and modern React applications.
            </p>
          </div>

          {/* Contact Pill & Social Action Hub */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Direct Copy Email Pill */}
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] border border-white/10 hover:border-white/20 transition-all text-xs font-mono text-zinc-300 hover:text-white cursor-pointer shadow-sm"
              title="Click to copy email address"
            >
              <Mail className="w-3.5 h-3.5 text-[#E50914]" />
              <span>{SHOWRUNNER_DOSSIER.email}</span>
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300">Copy</span>
              )}
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href={SHOWRUNNER_DOSSIER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={SHOWRUNNER_DOSSIER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://himarghya-blog.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/blog flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E50914]/15 hover:bg-[#E50914] border border-[#E50914]/30 hover:border-[#E50914] text-white transition-all text-xs font-semibold shadow-[0_2px_12px_rgba(229,9,20,0.25)] hover:shadow-[0_0_20px_rgba(229,9,20,0.6)] cursor-pointer"
                title="Visit Live Technical Blog"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E50914] group-hover/blog:text-white transition-colors" />
                <span>Blog ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Structured Link Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pt-2 text-xs">
          
          {/* Column 1: Portfolio Navigation */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-zinc-200 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-[#E50914]" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <a href="#home" className="hover:text-white transition-colors block py-0.5">Home &amp; Hero</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors block py-0.5">Featured Systems</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors block py-0.5">Technology Stack</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-white transition-colors block py-0.5">Career Timeline</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Highlights & Journal */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-zinc-200 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-purple-500" />
              <span>Showcase</span>
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <a href="#achievements" className="hover:text-white transition-colors block py-0.5">Hackathons &amp; Awards</a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-white transition-colors block py-0.5">Verified Credentials</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors block py-0.5">Engineering Philosophy</a>
              </li>
              <li>
                <a
                  href="https://himarghya-blog.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[#E50914] hover:text-red-400 font-medium transition-colors py-0.5"
                >
                  <span>Technical Blog</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Competencies */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-zinc-200 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-emerald-500" />
              <span>Expertise</span>
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li className="flex items-center gap-1.5">
                <span className="text-zinc-600 font-mono">/</span>
                <span>Distributed Job Queues</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-zinc-600 font-mono">/</span>
                <span>Modern C++20 &amp; Systems</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-zinc-600 font-mono">/</span>
                <span>PostgreSQL &amp; PostGIS GIS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-zinc-600 font-mono">/</span>
                <span>React &amp; TypeScript Web</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Status & Back to Top */}
          <div className="space-y-4">
            <h4 className="font-mono text-zinc-200 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1 h-3 rounded-full bg-sky-500" />
              <span>Availability</span>
            </h4>
            
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for Roles</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                Full-stack &amp; Backend software engineering positions.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] text-zinc-200 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer font-medium shadow-sm"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Back to top</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Colophon */}
        <div className="pt-6 border-t border-white/10 text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Himarghya Das.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 font-mono text-[10px]">
            <span>ENGINEERED WITH REACT &amp; TYPESCRIPT</span>
            <span className="text-zinc-700">•</span>
            <span>TAILWIND CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};