import React from 'react';
import { motion } from 'framer-motion';
import { BILLBOARD_FEATURED, NetflixItem } from '../../constants/netflixData';
import { Play, Info, CheckCircle2, ArrowRight, Zap, Shield, Cpu, Radio } from 'lucide-react';
import { HeroQuantumCore } from '../3d/HeroQuantumCore';

interface BillboardHeroProps {
  onOpenDetailModal: (item: NetflixItem) => void;
  webglSupported: boolean;
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({ onOpenDetailModal }) => {
  return (
    <section id="home" className="relative w-full min-h-[85vh] flex items-center justify-start select-none pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-white/10">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Hero Text, Metrics & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-5 sm:space-y-6"
        >
          {/* Header Tag & Portrait Avatar Identity */}
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="relative group/avatar shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_25px_rgba(229,9,20,0.4)] bg-black/60 relative">
                <img
                  src="/profile/himarghya-portrait.jpg"
                  alt="Himarghya Das"
                  className="w-full h-full object-cover object-center group-hover/avatar:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
              </div>
              {/* Active Pulse Status Beacon */}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#12131a]" />
              </span>
            </div>

            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bebas text-lg sm:text-2xl text-[#E50914] font-bold tracking-wider drop-shadow-[0_0_12px_rgba(229,9,20,0.5)]">
                  H
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-400 uppercase font-mono">
                  SOFTWARE ENGINEER PORTFOLIO
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase font-bebas leading-none drop-shadow-md">
                HIMARGHYA DAS
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-xl text-zinc-300 font-medium">
            Full Stack Developer &amp; Backend Systems Engineer
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/[0.06] backdrop-blur-md text-zinc-200 font-mono text-[10px] sm:text-[11px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              AVAILABLE FOR HIRE
            </span>
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#E50914]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold shadow-[0_0_15px_rgba(229,9,20,0.4)] border border-red-400/30">
              INDIA / REMOTE
            </span>
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-zinc-300 text-[9px] sm:text-[10px] font-mono">
              C++ • TYPESCRIPT • PYTHON
            </span>
          </div>

          {/* Plain Human Synopsis */}
          <p className="text-xs sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            {BILLBOARD_FEATURED.synopsis}
          </p>

          {/* Real Concrete Metrics Row with Glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
            {BILLBOARD_FEATURED.metrics?.map((m) => (
              <div
                key={m.label}
                className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-[#E50914]/40 hover:shadow-[0_8px_30px_rgba(229,9,20,0.15)] transition-all"
              >
                <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase">{m.label}</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5 tracking-tight">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] cursor-pointer text-center"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenDetailModal(BILLBOARD_FEATURED)}
              className="flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl text-zinc-200 hover:text-white font-medium text-sm border border-white/10 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all cursor-pointer text-center"
            >
              <Info className="w-4 h-4" />
              <span>Technical Summary</span>
            </button>
          </div>

          {/* Sleek Core Stack Pill Bar */}
          <div className="pt-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                CORE TECHNICAL ARSENAL
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { name: 'C++20', color: '#00E5FF' },
                { name: 'React', color: '#61DAFB' },
                { name: 'TypeScript', color: '#38BDF8' },
                { name: 'Python', color: '#FACC15' },
                { name: 'FastAPI', color: '#10B981' },
                { name: 'PostgreSQL', color: '#818CF8' },
                { name: 'PostGIS', color: '#00FF87' },
                { name: 'Docker', color: '#38BDF8' }
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="group/pill px-2.5 sm:px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-xl border border-white/10 hover:border-[#E50914]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_4px_15px_rgba(229,9,20,0.2)] transition-all duration-200 flex items-center gap-1.5 cursor-default hover:-translate-y-0.5"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 group-hover/pill:scale-125 transition-transform"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 6px ${tech.color}88` }}
                  />
                  <span className="text-[11px] sm:text-xs font-mono text-zinc-300 group-hover/pill:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Quantum Core Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative w-full"
        >
          {/* Subtle Ambient Glow Under Glass */}
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-purple-600/10 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* Frosted Cyber Glass Console Card */}
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col justify-between p-4 sm:p-5">
            
            {/* Console Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono text-zinc-300 font-bold uppercase tracking-wider">
                  SYS.TELEMETRY • LIVE STREAM
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-md text-[#E50914] font-mono text-[10px] font-bold border border-red-500/20 shadow-[0_0_8px_rgba(229,9,20,0.25)]">
                3D ORBIT ENGINE
              </span>
            </div>

            {/* 3D Core Canvas */}
            <div className="relative w-full my-1">
              <HeroQuantumCore />
            </div>

            {/* Console Bottom Stats & Telemetry Matrix */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              {/* 4 Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.08] hover:border-red-500/40 text-center transition-all duration-200 group/stat">
                  <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    <Zap className="w-2.5 h-2.5 text-[#E50914] group-hover/stat:scale-110 transition-transform" />
                    <span>PostGIS</span>
                  </div>
                  <div className="text-[11px] font-bold text-white mt-1 font-mono">&lt; 50ms</div>
                  <div className="text-[8px] font-mono text-zinc-500 mt-0.5">Spatial Index</div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.08] hover:border-blue-500/40 text-center transition-all duration-200 group/stat">
                  <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    <Shield className="w-2.5 h-2.5 text-blue-400 group-hover/stat:scale-110 transition-transform" />
                    <span>Polaris</span>
                  </div>
                  <div className="text-[11px] font-bold text-white mt-1 font-mono">Offline PWA</div>
                  <div className="text-[8px] font-mono text-zinc-500 mt-0.5">Edge Caching</div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.08] hover:border-emerald-500/40 text-center transition-all duration-200 group/stat">
                  <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    <Radio className="w-2.5 h-2.5 text-emerald-400 group-hover/stat:scale-110 transition-transform" />
                    <span>VarshaNet</span>
                  </div>
                  <div className="text-[11px] font-bold text-white mt-1 font-mono">99.4% Acc</div>
                  <div className="text-[8px] font-mono text-zinc-500 mt-0.5">Radar AI</div>
                </div>

                <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.08] hover:border-purple-500/40 text-center transition-all duration-200 group/stat">
                  <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    <Cpu className="w-2.5 h-2.5 text-purple-400 group-hover/stat:scale-110 transition-transform" />
                    <span>C++ Queue</span>
                  </div>
                  <div className="text-[11px] font-bold text-white mt-1 font-mono">10k+ ops/s</div>
                  <div className="text-[8px] font-mono text-zinc-500 mt-0.5">Lock-Free</div>
                </div>
              </div>

              {/* Micro Status Bar */}
              <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                  <span>CORE: <strong className="text-zinc-200">ACTIVE</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span>RENDER: <strong className="text-zinc-200">60 FPS</strong></span>
                  <span className="text-zinc-600">|</span>
                  <span>SYNC: <strong className="text-emerald-400">VERIFIED</strong></span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};