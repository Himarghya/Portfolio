import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../constants/portfolioData';
import { HudBadge } from '../ui/HudBadge';
import { CheckCircle2, User } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-12">
          <HudBadge label="SECTION // 02" variant="emerald" pulse={false} />
          <span className="text-xs font-mono text-[#00FF87] uppercase tracking-widest">// DOSSIER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Futuristic Cybernetic Avatar / Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#00FF87]/30 bg-gradient-to-b from-[#040E08] to-[#020704] p-6 shadow-[0_0_40px_rgba(0,255,135,0.1)]">
              
              {/* Corner Cyber Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00FF87]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00FF87]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00FF87]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00FF87]" />

              {/* Holographic Avatar Display */}
              <div className="relative w-full h-[360px] rounded-xl bg-[#030C06] border border-emerald-950 flex flex-col items-center justify-center overflow-hidden p-6">
                
                {/* Background Geometric Grid Animation */}
                <div className="absolute inset-0 bg-[radial-gradient(#00FF87_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                
                {/* Central Futuristic Digital Avatar Emblem */}
                <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-[#00FF87]/20 via-[#10B981]/30 to-[#A3FF12]/20 border-2 border-[#00FF87] p-1 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,135,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#020704] flex flex-col items-center justify-center">
                    <User className="w-10 h-10 text-[#00FF87] mb-1" />
                    <span className="text-[10px] font-mono font-bold text-white tracking-widest">HD</span>
                  </div>
                </div>

                {/* Identity Telemetry Readout */}
                <div className="relative z-10 mt-6 text-center space-y-1">
                  <h3 className="text-xl font-bold font-mono text-white tracking-wide">{PERSONAL_INFO.name}</h3>
                  <div className="text-xs font-mono text-[#00FF87]">{PERSONAL_INFO.roleTitle}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-2">
                    STATUS: ACTIVE_DEVELOPER // 2026
                  </div>
                </div>

                {/* Cyber Scanner Line */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF87] to-transparent animate-scanline pointer-events-none" />
              </div>

              {/* System Specs Tags */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-[#040E08]/80 border border-emerald-900/60 text-slate-300">
                  <span className="text-[#00FF87] block text-[9px]">ENGINEERING CORE</span>
                  Full Stack Systems
                </div>
                <div className="p-2.5 rounded-lg bg-[#040E08]/80 border border-emerald-900/60 text-slate-300">
                  <span className="text-[#A3FF12] block text-[9px]">ALGORITHMIC CORE</span>
                  C++ &amp; Problem Solving
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Bio, Philosophy & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#00FF87] uppercase tracking-wider">// IDENTITY MATRIX</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                WHO <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF87] to-[#A3FF12]">AM I?</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              "{PERSONAL_INFO.bio}"
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              I specialize in bridging the gap between performant lower-level algorithms and high-velocity modern web systems. Whether optimizing spatial geospatial database queries, developing real-time weather analytics platforms, or creating interactive 3D simulations, I focus on clean architecture, precision engineering, and intuitive UX.
            </p>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="glass-panel p-3.5 rounded-xl border border-emerald-950">
                <div className="font-mono text-2xl font-bold text-[#00FF87]">3+</div>
                <div className="text-xs font-mono text-white mt-0.5">Major Projects</div>
                <div className="text-[10px] text-slate-400">Architected &amp; Built</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-emerald-950">
                <div className="font-mono text-2xl font-bold text-[#A3FF12]">Full Stack</div>
                <div className="text-xs font-mono text-white mt-0.5">Modern Web</div>
                <div className="text-[10px] text-slate-400">React, Node, APIs</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-emerald-950">
                <div className="font-mono text-2xl font-bold text-[#6EE7B7]">C++ / DSA</div>
                <div className="text-xs font-mono text-white mt-0.5">Logic &amp; Scale</div>
                <div className="text-[10px] text-slate-400">Memory &amp; Structure</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-emerald-950">
                <div className="font-mono text-2xl font-bold text-[#10B981]">AI / ML</div>
                <div className="text-xs font-mono text-white mt-0.5">Data Insights</div>
                <div className="text-[10px] text-slate-400">Modeling &amp; Vision</div>
              </div>
            </div>

            {/* Animated Digital Signature */}
            <div className="pt-6 border-t border-emerald-950/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">
                  DIGITAL SIGNATURE VERIFICATION
                </span>
                <div className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span className="text-[#00FF87]">//</span>
                  <span className="italic hover:text-[#00FF87] transition-colors">{PERSONAL_INFO.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#040E08] border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VERIFIED IDENTITY</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
