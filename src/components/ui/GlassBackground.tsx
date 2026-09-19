import React from 'react';
import { motion } from 'framer-motion';

export const GlassBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Primary Crimson Neon Light Orb (Top-Right) */}
      <motion.div
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.35, 0.45, 0.35]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute -top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E50914]/45 via-red-600/25 to-transparent blur-[110px] will-change-transform"
      />

      {/* Deep Violet / Indigo Accent Light Orb (Center-Left) */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [0.95, 1.1, 1, 0.95],
          opacity: [0.22, 0.32, 0.22]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute top-[35%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#4f46e5]/30 via-[#7c3aed]/20 to-transparent blur-[120px] will-change-transform"
      />

      {/* Crimson / Ruby Glow Orb (Bottom-Right) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -25, 30, 0],
          scale: [1, 0.95, 1.08, 1],
          opacity: [0.25, 0.38, 0.25]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute bottom-[10%] right-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-[#E50914]/35 via-red-900/25 to-transparent blur-[110px] will-change-transform"
      />

      {/* Subtle Cyan / Blue Sparkle Orb (Bottom-Left) */}
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, 15, -20, 0],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute -bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-r from-blue-600/18 to-teal-500/12 blur-[100px] will-change-transform"
      />

      {/* Top Vignette / Depth Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/50 to-[#0e0e11]/90 pointer-events-none" />
    </div>
  );
};
