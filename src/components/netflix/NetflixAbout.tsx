import React, { useState } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { Check, Copy, ArrowUpRight, Terminal, Globe, Code2, MapPin, Sparkles, Shield, Award } from 'lucide-react';

export const NetflixAbout: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SHOWRUNNER_DOSSIER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-12 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-widest text-[#E50914] uppercase font-mono drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]">
              ABOUT THE DEVELOPER
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-bebas text-white tracking-wide uppercase leading-none">
                Showrunner Profile • Himarghya Das
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                Full Stack Developer &amp; Backend Systems Engineer based in India.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 text-xs text-zinc-200 font-mono self-start md:self-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Available for Full-time Roles</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Creator Portrait & Dossier Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] p-6 sm:p-7 space-y-6">
              
              {/* Photo & Identity Hero Frame */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-white/10">
                <div className="relative group/photo shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_25px_rgba(229,9,20,0.35)] relative bg-black/60">
                    <img
                      src="/profile/himarghya-portrait.jpg"
                      alt="Himarghya Das"
                      className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                  </div>
                  {/* Status Indicator Pip */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#12131a]" />
                  </span>
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-xl font-bold text-white tracking-wide">{SHOWRUNNER_DOSSIER.name}</h4>
                  </div>
                  <span className="text-xs text-[#E50914] font-mono font-semibold block drop-shadow-[0_0_6px_rgba(229,9,20,0.4)]">
                    {SHOWRUNNER_DOSSIER.roleTitle}
                  </span>
                  <span className="text-[11px] text-zinc-400 flex items-center justify-center sm:justify-start gap-1 font-mono pt-0.5">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    {SHOWRUNNER_DOSSIER.location}
                  </span>
                </div>
              </div>

              {/* Bio Snippet */}
              <div className="p-4 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {SHOWRUNNER_DOSSIER.bio}
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {SHOWRUNNER_DOSSIER.stats.map(s => (
                  <div key={s.label} className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/20 transition-colors">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">{s.label}</div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Engineering Focus & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E50914] uppercase tracking-widest font-semibold drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                WHAT I WORK ON
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                Reliable backends, fast databases, and clean web frontends
              </h4>

              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                I spend most of my time working on distributed application backends and data pipelines. I care about writing straightforward code, keeping latency low, and choosing the right data structures. I test systems under load and design interfaces that make complex data easy to read.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-[#E50914]/50 shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 space-y-2 hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.3)]">
                  <Code2 className="w-4 h-4" />
                </div>
                <h5 className="font-semibold text-sm text-white">Frontend</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">React 18, TypeScript, Tailwind CSS, and interactive data visualization.</p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 space-y-2 hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-white">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-semibold text-sm text-white">Systems &amp; C++</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">Memory management, data structures, graph traversals, and algorithms.</p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-indigo-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 space-y-2 hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                  <Globe className="w-4 h-4" />
                </div>
                <h5 className="font-semibold text-sm text-white">Backend &amp; GIS</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">FastAPI, PostgreSQL, PostGIS spatial queries, Docker, and Redis.</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_18px_rgba(229,9,20,0.35)] cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Himarghya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl text-white text-xs font-mono uppercase tracking-wider transition-all border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl text-zinc-300 hover:text-white text-xs font-mono transition-all border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] cursor-pointer"
                title="Copy Email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : SHOWRUNNER_DOSSIER.email}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};