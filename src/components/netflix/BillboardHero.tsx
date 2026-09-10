import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BILLBOARD_FEATURED, NetflixItem } from '../../constants/netflixData';
import { Play, Info, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroQuantumCore } from '../3d/HeroQuantumCore';

interface BillboardHeroProps {
  onOpenDetailModal: (item: NetflixItem) => void;
  webglSupported: boolean;
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({ onOpenDetailModal, webglSupported }) => {
  const [muted, setMuted] = useState(true);

  return (
    <section id="home" className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-start overflow-hidden bg-[#141414] select-none pt-20">
      
      {/* Background Cinematic Atmosphere & 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        {/* Dark Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none" />

        {/* 3D Quantum Core or Gradient Visualizer */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 h-full opacity-65 lg:opacity-90 flex items-center justify-center">
          {webglSupported ? (
            <HeroQuantumCore />
          ) : (
            <div className="w-full h-full bg-gradient-to-bl from-red-950/40 via-black to-[#141414]" />
          )}
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-12 w-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-4 sm:space-y-6"
        >
          {/* Netflix N Series Header */}
          <div className="flex items-center gap-2">
            <span className="font-bebas text-2xl sm:text-3xl text-[#E50914] font-black tracking-widest">
              N
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-300 uppercase">
              DEVFLIX ORIGINAL
            </span>
          </div>

          {/* Main Giant Title */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase font-bebas leading-[0.9] drop-shadow-2xl">
              HIMARGHYA DAS
            </h1>
            <p className="text-sm sm:text-lg text-gray-300 font-medium tracking-wide">
              Full Stack Developer &amp; C++ Systems Engineer
            </p>
          </div>

          {/* Metadata Badges: Match, Top 10, Quality */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold">
            <span className="text-emerald-400 font-bold text-sm">
              {BILLBOARD_FEATURED.matchPercentage}% Match
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px] border border-white/20">
              {BILLBOARD_FEATURED.durationOrYear}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold">
              TOP 10
            </span>
            <span className="px-1.5 py-0.5 border border-gray-500 text-gray-300 text-[10px] rounded uppercase font-mono">
              {BILLBOARD_FEATURED.ageRating}
            </span>
            <span className="px-1.5 py-0.5 border border-gray-500 text-gray-300 text-[10px] rounded uppercase font-mono">
              {BILLBOARD_FEATURED.quality}
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed drop-shadow max-w-xl">
            {BILLBOARD_FEATURED.synopsis}
          </p>

          {/* Action Buttons: Play (Explore) & More Info */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded bg-white hover:bg-white/90 text-black font-bold text-sm sm:text-base transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Explore Projects</span>
            </a>

            <button
              onClick={() => onOpenDetailModal(BILLBOARD_FEATURED)}
              className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded bg-gray-500/40 hover:bg-gray-500/60 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>

          {/* Cast / Tech Stack Quick Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-gray-400 font-mono">
            <span className="text-gray-500 font-bold">Starring:</span>
            {BILLBOARD_FEATURED.cast.slice(0, 6).map((tech) => (
              <span key={tech} className="text-gray-300 hover:text-white transition-colors">
                {tech} •
              </span>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Right Side Audio & Maturity Rating Banner */}
      <div className="absolute right-0 bottom-24 flex items-center gap-3 z-30">
        <button
          onClick={() => setMuted(!muted)}
          className="p-2 rounded-full border border-white/30 bg-black/40 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
          title={muted ? "Unmute Ambient Sound" : "Mute"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <div className="bg-black/60 backdrop-blur-md border-l-2 border-gray-400 py-1 pl-3 pr-8 text-xs font-mono text-gray-300">
          TV-MA // Master of Algorithms
        </div>
      </div>

    </section>
  );
};