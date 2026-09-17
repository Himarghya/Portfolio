import React, { useState } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { Check, Copy, ArrowUpRight, Terminal, Globe, Code2 } from 'lucide-react';

export const NetflixAbout: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SHOWRUNNER_DOSSIER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-12 bg-[#0e0e11] border-t border-zinc-800 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-widest text-[#E50914] uppercase font-mono">
              ABOUT ME
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-bebas text-white tracking-wide uppercase leading-none">
                Engineering Background // Himarghya Das
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                Full Stack Developer &amp; Systems Engineer based in India.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 font-mono self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for Full-time Roles</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Creator Identity Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-[#15161a] border border-zinc-800 p-6 space-y-6">
              
              {/* Profile Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg font-bold font-mono text-white">
                    HD
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-wide">{SHOWRUNNER_DOSSIER.name}</h4>
                    <span className="text-xs text-[#E50914] font-mono">{SHOWRUNNER_DOSSIER.roleTitle}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  2026
                </span>
              </div>

              {/* Bio snippet */}
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {SHOWRUNNER_DOSSIER.bio}
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {SHOWRUNNER_DOSSIER.stats.map(s => (
                  <div key={s.label} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">{s.label}</div>
                    <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Engineering Focus */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-semibold">
                // WHAT I WORK ON
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
              <div className="p-4 rounded-lg bg-[#15161a] border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-[#E50914]">
                  <Code2 className="w-4 h-4" />
                </div>
                <h5 className="font-semibold text-sm text-white">Frontend</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">React 18, TypeScript, Tailwind CSS, and map/chart visualization.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#15161a] border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-white">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-semibold text-sm text-white">Systems &amp; C++</h5>
                <p className="text-xs text-zinc-400 leading-relaxed">Memory management, data structures, graph traversals, and algorithms.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#15161a] border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-300">
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
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#E50914] hover:bg-[#b81d24] text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Himarghya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono uppercase tracking-wider transition-colors border border-zinc-700"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-colors border border-zinc-700"
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