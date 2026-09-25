import React from 'react';
import { motion } from 'framer-motion';
import { BILLBOARD_FEATURED, NetflixItem } from '../../constants/netflixData';
import { Play, Info, ArrowRight } from 'lucide-react';
import { HeroQuantumCore } from '../3d/HeroQuantumCore';

interface BillboardHeroProps {
  onOpenDetailModal: (item: NetflixItem) => void;
  webglSupported: boolean;
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({ onOpenDetailModal }) => {
  const [activeHighlight, setActiveHighlight] = React.useState<string | null>(null);

  return (
    <section id="home" className="relative w-full min-h-[85vh] flex items-center justify-start select-none pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-white/10">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Hero Text, Metrics & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-2 lg:order-1 lg:col-span-7 space-y-5 sm:space-y-6"
        >
          {/* Header Tag & Identity */}
          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bebas text-lg sm:text-2xl text-[#E50914] font-bold tracking-wider drop-shadow-[0_0_12px_rgba(229,9,20,0.5)]">
                H
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-400 uppercase font-mono">
                SOFTWARE ENGINEER PORTFOLIO
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase font-bebas leading-none drop-shadow-md">
              HIMARGHYA DAS
            </h1>
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
                  className="group/pill px-2.5 sm:px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-xl border border-white/10 hover:border-[#E50914]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_4px_15px_rgba(229,9,20,0.2)] transition-all duration-200 flex items-center cursor-default hover:-translate-y-0.5"
                >
                  <span className="text-[11px] sm:text-xs font-mono text-zinc-300 group-hover/pill:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Quantum Core Console (Ordered first on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 lg:order-2 lg:col-span-5 relative w-full"
        >
          {/* Subtle Ambient Glow Under Glass */}
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-purple-600/10 to-emerald-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* Frosted Cyber Glass Console Card */}
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col justify-between p-4 sm:p-5">
            
            {/* 3D Core Canvas */}
            <div className="relative w-full my-1">
              <HeroQuantumCore activeHighlight={activeHighlight} />
            </div>

            {/* Developer Profile & Engineering Specs */}
            <div className="pt-3.5 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-white font-bold text-xs tracking-wide">HIMARGHYA DAS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300">
                  DEVELOPER SPECS
                </span>
              </div>

              {/* Key Competencies Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                  <div className="text-[9px] uppercase tracking-wider text-zinc-400">Core Focus</div>
                  <div className="text-white font-semibold mt-0.5">Systems &amp; Full Stack</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                  <div className="text-[9px] uppercase tracking-wider text-zinc-400">Primary Stack</div>
                  <div className="text-white font-semibold mt-0.5">C++20 • TS • React</div>
                </div>
              </div>

              {/* Bio Summary / Philosophy Line */}
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono mb-0.5">ENGINEERING PHILOSOPHY</div>
                <p className="text-[11px] text-zinc-300 font-normal leading-relaxed">
                  Focusing on systems internals, clean code architectures, and high-resilience web software.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};