import React, { useState } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { CheckCircle2, Terminal, Code2, Globe, Cpu, Sparkles, Copy, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const NetflixAbout: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SHOWRUNNER_DOSSIER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-12 bg-gradient-to-b from-[#141414] via-[#101010] to-[#141414] border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cinematic Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#E50914] text-white font-bebas text-base font-bold shadow-md shadow-red-950/50">
              N
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#E50914] uppercase font-mono">
              ORIGINAL DOSSIER // BIOGRAPHY
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-bebas text-white tracking-wide uppercase leading-none">
                ABOUT THE SHOWRUNNER <span className="text-gray-500 font-light">//</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">HIMARGHYA DAS</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1.5 flex items-center gap-2">
                <span>RATED TV-MA</span>
                <span className="text-gray-600">•</span>
                <span>LEAD FULL-STACK ARCHITECT &amp; C++ SYSTEMS DEVELOPER</span>
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: READY FOR PRODUCTION</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Left Column: Creator Identity Card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-2xl overflow-hidden bg-[#181818]/90 border border-white/10 p-6 sm:p-8 shadow-2xl hover:border-[#E50914]/40 transition-all duration-300 relative flex flex-col justify-between group">
              
              {/* Card top subtle badge */}
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-28 h-28 bg-[#E50914]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#E50914]/15 transition-all duration-500" />

              <div>
                {/* Profile Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E50914] via-rose-700 to-red-950 flex items-center justify-center text-2xl font-bold font-bebas text-white shadow-lg shadow-red-950/60 border border-white/20">
                        HD
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#141414] rounded-full p-0.5" title="Verified Engineer">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-white font-bebas tracking-wide">{SHOWRUNNER_DOSSIER.name}</h4>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold">
                          PRO
                        </span>
                      </div>
                      <span className="text-xs text-[#E50914] font-mono tracking-wide">{SHOWRUNNER_DOSSIER.roleTitle}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                    SEASON 2026
                  </span>
                </div>

                {/* Bio snippet */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal italic">
                    "{SHOWRUNNER_DOSSIER.bio}"
                  </p>
                </div>

                {/* Quick Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {SHOWRUNNER_DOSSIER.stats.map(s => (
                    <div key={s.label} className="p-3.5 rounded-xl bg-black/50 border border-white/5 hover:border-white/15 transition-all">
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{s.label}</div>
                      <div className="text-lg sm:text-xl font-bold font-bebas text-white mt-0.5 tracking-wide flex items-center gap-1.5">
                        <span className="text-[#E50914]">#</span>
                        <span>{s.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED TALENT
                </span>
                <span className="text-gray-500">HD-ORIGINAL-CORE</span>
              </div>

            </div>
          </div>

          {/* Right Column: Engineering Philosophy & Capabilities */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold">
                  // THE ARCHITECTURAL MANIFESTO
                </span>
                <h4 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-bebas">
                  Crafting High-Throughput Engines with Pixel-Perfect Interfaces
                </h4>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Software engineering is more than just passing tests—it is about orchestrating systems that scale under load while remaining delightful to interact with. Whether optimizing spatial SQL queries on massive meteorological datasets or writing zero-overhead C++ graph traversal engines, I treat every codebase like a premier release.
              </p>
            </div>

            {/* 3 Interactive Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#181818]/90 border border-white/10 hover:border-[#E50914]/50 transition-all duration-300 space-y-2 group">
                <div className="w-10 h-10 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914] group-hover:scale-110 group-hover:bg-[#E50914] group-hover:text-white transition-all">
                  <Code2 className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-base text-white font-bebas tracking-wide">Modern Web</h5>
                <p className="text-xs text-gray-400 leading-normal">React 18, Next.js, TypeScript, Tailwind, and GPU-accelerated canvas UI.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#181818]/90 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 space-y-2 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Terminal className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-base text-white font-bebas tracking-wide">C++ Rigor</h5>
                <p className="text-xs text-gray-400 leading-normal">Deterministic memory bounds, cache locality, SIMD, and graph algorithms.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#181818]/90 border border-white/10 hover:border-blue-500/50 transition-all duration-300 space-y-2 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Globe className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-base text-white font-bebas tracking-wide">Cloud &amp; Data</h5>
                <p className="text-xs text-gray-400 leading-normal">PostgreSQL, PostGIS, high-throughput microservices, and Docker CI/CD.</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-950/50 hover:scale-105 active:scale-95"
              >
                <span>Hire Himarghya</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/Himarghya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 border border-white/15 hover:scale-105 active:scale-95"
              >
                <span>GitHub Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white text-xs font-mono transition-all border border-white/10"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : SHOWRUNNER_DOSSIER.email}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};