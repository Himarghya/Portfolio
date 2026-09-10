import React from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { CheckCircle2, User, Award, Terminal, Code2, Globe } from 'lucide-react';

export const NetflixAbout: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-12 bg-[#101010] border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="font-bebas text-2xl text-[#E50914] font-bold">N</span>
          <h3 className="text-2xl sm:text-4xl font-bold font-bebas text-white tracking-wide">
            About the Showrunner // Himarghya Das
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Creator Identity Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden bg-[#181818] border border-white/10 p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-rose-900 flex items-center justify-center text-xl font-bold font-bebas text-white shadow">
                    HD
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">{SHOWRUNNER_DOSSIER.name}</h4>
                    <span className="text-xs text-[#E50914] font-mono">{SHOWRUNNER_DOSSIER.roleTitle}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ACTIVE 2026
                </span>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-6">
                "{SHOWRUNNER_DOSSIER.bio}"
              </p>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {SHOWRUNNER_DOSSIER.stats.map(s => (
                  <div key={s.label} className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">{s.label}</div>
                    <div className="text-base font-bold font-bebas text-white mt-0.5 tracking-wide">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>STATUS: READY TO DEPLOY</span>
                <span className="text-emerald-400 font-semibold">VERIFIED TALENT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest">// THE CREATIVE VISION</span>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-bebas">
                High Performance Meets Intuitive User Experience
              </h4>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Software engineering is more than just passing tests—it is about orchestrating systems that scale under load while remaining delightful to interact with. Whether optimizing spatial SQL queries on massive meteorological datasets or writing zero-overhead C++ graph traversal engines, I treat every codebase like a premier release.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#181818] border border-white/5 space-y-1">
                <Code2 className="w-5 h-5 text-[#E50914] mb-2" />
                <h5 className="font-bold text-sm text-white font-bebas">Modern Web</h5>
                <p className="text-xs text-gray-400">React, Next, TypeScript, responsive UI systems.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#181818] border border-white/5 space-y-1">
                <Terminal className="w-5 h-5 text-emerald-400 mb-2" />
                <h5 className="font-bold text-sm text-white font-bebas">C++ Rigor</h5>
                <p className="text-xs text-gray-400">Algorithm bounds, memory layout, graph theory.</p>
              </div>

              <div className="p-4 rounded-lg bg-[#181818] border border-white/5 space-y-1">
                <Globe className="w-5 h-5 text-blue-400 mb-2" />
                <h5 className="font-bold text-sm text-white font-bebas">Geospatial Data</h5>
                <p className="text-xs text-gray-400">PostGIS, Big Data pipelines, real-time telemetry.</p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-xs font-mono uppercase transition-all shadow-lg"
              >
                Hire Himarghya ➔
              </a>
              <a
                href="https://github.com/Himarghya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-mono uppercase transition-all border border-white/10"
              >
                GitHub Profile
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};