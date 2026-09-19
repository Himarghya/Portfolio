import React from 'react';
import { motion } from 'framer-motion';
import { BILLBOARD_FEATURED, NetflixItem } from '../../constants/netflixData';
import { Play, Info, CheckCircle2, ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
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
          {/* Tag */}
          <div className="flex items-center gap-2">
            <span className="font-bebas text-xl sm:text-2xl text-[#E50914] font-bold tracking-wider drop-shadow-[0_0_12px_rgba(229,9,20,0.5)]">
              H
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-400 uppercase font-mono">
              SOFTWARE ENGINEER PORTFOLIO
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase font-bebas leading-tight drop-shadow-md">
              HIMARGHYA DAS
            </h1>
            <p className="text-sm sm:text-xl text-zinc-300 font-medium">
              Full Stack Developer &amp; Backend Systems Engineer
            </p>
          </div>

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

          {/* Stack Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <span className="text-zinc-400 font-medium text-[11px] sm:text-xs">Core Stack:</span>
            {BILLBOARD_FEATURED.cast.map((tech) => (
              <span key={tech} className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md bg-white/[0.04] backdrop-blur-md text-zinc-300 border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-[10px] sm:text-xs">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Quantum Core & Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]"
        >
          {/* Ambient Glowing Background Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E50914]/25 via-red-600/10 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10" />

          {/* 3D Core Canvas */}
          <div className="w-full h-full relative flex items-center justify-center">
            <HeroQuantumCore />

            {/* Floating Holographic Telemetry Pill 1 (Top Left) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 left-0 sm:left-2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-xl border border-white/15 shadow-[0_8px_25px_rgba(0,0,0,0.6)] text-[10px] sm:text-[11px] font-mono text-zinc-200 pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Zap className="w-3.5 h-3.5 text-[#E50914]" />
              <span>PostGIS • &lt;50ms</span>
            </motion.div>

            {/* Floating Holographic Telemetry Pill 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-4 left-0 sm:left-2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-xl border border-white/15 shadow-[0_8px_25px_rgba(0,0,0,0.6)] text-[10px] sm:text-[11px] font-mono text-zinc-200 pointer-events-none"
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Polaris Offline PWA</span>
            </motion.div>

            {/* Floating Holographic Telemetry Pill 3 (Right) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-xl border border-white/15 shadow-[0_8px_25px_rgba(0,0,0,0.6)] text-[10px] sm:text-[11px] font-mono text-zinc-200 pointer-events-none"
            >
              <Cpu className="w-3.5 h-3.5 text-[#E50914]" />
              <span>10k+ ops/sec Queue</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};