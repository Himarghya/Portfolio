import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/portfolioData';
import { HudBadge } from '../ui/HudBadge';
import { MagneticButton } from '../ui/MagneticButton';
import { CyberGlitchText } from '../ui/CyberGlitchText';
import { HeroQuantumCore } from '../3d/HeroQuantumCore';
import { FallbackCanvas } from '../3d/FallbackCanvas';

interface HeroSectionProps {
  webglSupported: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ webglSupported }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission Brief & Typography */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            {/* System Status Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <HudBadge label={PERSONAL_INFO.status} variant="emerald" pulse={true} />
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-900/60 bg-[#040E08]/60 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12]" />
                <span>LOC: {PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Main Punchy Heading */}
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#00FF87] tracking-widest uppercase block">
                // SYSTEM ARCHITECT &amp; CREATIVE ENGINEER
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                BUILDING THE <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF87] via-[#6EE7B7] to-[#A3FF12]">
                  DIGITAL FUTURE.
                </span>
              </h1>
            </div>

            {/* Subheading & Dynamic Role Glitcher */}
            <div className="space-y-4 max-w-2xl">
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Hi, I'm <span className="text-white font-semibold">{PERSONAL_INFO.name}</span> — a Full Stack Developer, C++ Programmer, and Problem Solver crafting intelligent, scalable, and immersive digital experiences.
              </p>

              {/* Dynamic Animated Roles */}
              <div className="flex items-center gap-2 text-sm sm:text-base font-mono text-slate-400 bg-[#040E08]/80 border border-[#00FF87]/25 rounded-lg px-4 py-2.5 backdrop-blur-md">
                <span className="text-[#00FF87]">$</span>
                <span className="text-slate-400">specialization:</span>
                <CyberGlitchText
                  words={PERSONAL_INFO.roles}
                  interval={3200}
                  className="text-[#00FF87] font-semibold"
                />
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton href="#projects" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Explore My Work
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary" icon={<ArrowUpRight className="w-4 h-4" />}>
                Let's Connect
              </MagneticButton>
            </div>

            {/* Quick Metrics HUD */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full border-t border-emerald-950/80">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="glass-panel p-3 rounded-lg border border-emerald-950 hover:border-[#00FF87]/40 transition-colors">
                  <div className="font-mono text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] font-mono text-[#00FF87]">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{stat.detail}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Quantum Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Interactive 3D Canvas or Graceful Fallback */}
            {webglSupported ? <HeroQuantumCore /> : <FallbackCanvas />}

            {/* Floating Futuristic HUD Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 sm:-bottom-4 right-0 sm:right-4 glass-panel p-3.5 rounded-xl border border-[#00FF87]/40 bg-[#040E08]/90 backdrop-blur-xl shadow-2xl max-w-[260px] pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  CURRENTLY BUILDING
                </span>
              </div>
              <p className="font-mono text-xs font-bold text-white leading-tight">
                INTELLIGENT DIGITAL SYSTEMS
              </p>
              <div className="mt-2 pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[9px] font-mono text-[#00FF87]">
                <span>CORE: v2.4</span>
                <span>STATUS: OPTIMAL</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest text-[#00FF87] uppercase">SCROLL // EXPLORE</span>
        <div className="w-4 h-7 rounded-full border border-[#00FF87]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#00FF87] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
