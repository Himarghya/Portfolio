import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Sparkles, TrendingUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/portfolioData';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* "HELLO, I'M" label */}
            <div className="inline-block text-xs font-bold tracking-widest text-[#7C3AED] uppercase">
              HELLO, I'M
            </div>

            {/* Main Name & Colored Subtitle */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                {PERSONAL_INFO.name}
              </h1>
              <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                {PERSONAL_INFO.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {PERSONAL_INFO.intro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Dark Pill Button */}
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0F172A] hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Frosted Glass Download CV Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-800 bg-white/80 border border-white hover:bg-white shadow-glass-sm hover:shadow-glass transition-all duration-200"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 text-slate-600" />
              </a>
            </div>

            {/* Trusted By / Tech Ecosystem Row */}
            <div className="pt-8 border-t border-slate-200/60 space-y-2.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Trusted by &amp; Tech Stack
              </span>
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-slate-500 font-semibold text-sm">
                <span className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-bold text-slate-800">Google</span> Cloud
                </span>
                <span className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-bold text-slate-800">Microsoft</span>
                </span>
                <span className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-bold text-slate-800">PostgreSQL</span>
                </span>
                <span className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-bold text-slate-800">Docker</span>
                </span>
                <span className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-bold text-slate-800">React</span>
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Hero Graphic: Translucent Portrait Frame & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end"
          >
            {/* Main Frosted Translucent Portrait Card */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[36px] p-3 frosted-card overflow-hidden shadow-glass group">
              
              {/* Internal Portrait Container */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-gradient-to-b from-slate-100 via-indigo-50/40 to-purple-100/60 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                />

                {/* Soft ambient inner light */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Top-Right Badge: "4+ Years Experience" */}
              <div className="absolute top-6 right-6 frosted-card px-4 py-3 rounded-2xl shadow-glass flex flex-col items-center text-center animate-bounce-slow">
                <span className="text-2xl font-extrabold text-slate-900 leading-none">4+</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight mt-1">
                  Years of<br />Experience
                </span>
              </div>

              {/* Floating Bottom-Right Badge: "System Impact +120%" with Sparkline Chart */}
              <div className="absolute bottom-6 right-6 frosted-card px-4 py-3 rounded-2xl shadow-glass space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-medium text-slate-500">System Impact</span>
                  <span className="text-xs font-bold text-indigo-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +120%
                  </span>
                </div>
                {/* SVG Sparkline */}
                <div className="w-32 h-6">
                  <svg viewBox="0 0 120 24" className="w-full h-full overflow-visible">
                    <path
                      d="M 0 18 Q 20 22, 40 14 T 80 8 T 120 2"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Floating Iridescent 3D Crystal Orb */}
              <div className="absolute bottom-16 -left-4 w-14 h-14 rounded-full bg-gradient-to-tr from-white/90 via-indigo-200/80 to-purple-300/80 backdrop-blur-xl border border-white p-1 shadow-glass flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
