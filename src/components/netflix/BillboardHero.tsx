import React from 'react';
import { motion } from 'framer-motion';
import { BILLBOARD_FEATURED, NetflixItem } from '../../constants/netflixData';
import { Play, Info, CheckCircle2, ArrowRight } from 'lucide-react';

interface BillboardHeroProps {
  onOpenDetailModal: (item: NetflixItem) => void;
  webglSupported: boolean;
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({ onOpenDetailModal }) => {
  return (
    <section id="home" className="relative w-full min-h-[80vh] flex items-center justify-start bg-[#0e0e11] select-none pt-24 sm:pt-28 pb-16 sm:pb-24 border-b border-zinc-800/80">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-6"
        >
          {/* Tag */}
          <div className="flex items-center gap-2">
            <span className="font-bebas text-2xl text-[#E50914] font-bold tracking-wider">
              N
            </span>
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase font-mono">
              SOFTWARE ENGINEER PORTFOLIO
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase font-bebas leading-none">
              HIMARGHYA DAS
            </h1>
            <p className="text-base sm:text-xl text-zinc-300 font-medium">
              Full Stack Developer &amp; Backend Systems Engineer
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-[11px] border border-zinc-700">
              AVAILABLE FOR HIRE
            </span>
            <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold">
              INDIA / REMOTE
            </span>
            <span className="px-2 py-0.5 border border-zinc-700 text-zinc-400 text-[10px] rounded font-mono">
              C++ • TYPESCRIPT • PYTHON
            </span>
          </div>

          {/* Plain Human Synopsis */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            {BILLBOARD_FEATURED.synopsis}
          </p>

          {/* Real Concrete Metrics Row (Proves real products) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {BILLBOARD_FEATURED.metrics?.map((m) => (
              <div key={m.label} className="p-3 rounded-lg bg-[#15161a] border border-zinc-800">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">{m.label}</div>
                <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#b81d24] text-white font-semibold text-sm transition-colors"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenDetailModal(BILLBOARD_FEATURED)}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm border border-zinc-700 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>Technical Summary</span>
            </button>
          </div>

          {/* Stack Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <span className="text-zinc-500 font-medium">Core Stack:</span>
            {BILLBOARD_FEATURED.cast.map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};