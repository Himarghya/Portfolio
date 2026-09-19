import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const GlassBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Cyber Grid with Perspective */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#E50914]/15 via-purple-600/10 to-transparent blur-[120px] transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Cyber Scanning Laser Line Accent */}
      <motion.div
        animate={{
          y: ['-10%', '110%'],
          opacity: [0, 0.6, 0.8, 0.6, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/50 to-transparent shadow-[0_0_15px_rgba(229,9,20,0.6)]"
      />

      {/* Primary Crimson Neon Light Orb (Top-Right Hero Glow) */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -35, 20, 0],
          scale: [1, 1.12, 0.94, 1],
          opacity: [0.4, 0.55, 0.4]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute -top-[12%] right-[5%] w-[680px] h-[680px] rounded-full bg-gradient-to-br from-[#E50914]/50 via-red-600/30 to-transparent blur-[120px] will-change-transform"
      />

      {/* Deep Violet / Sapphire Accent Light Orb (Center-Left) */}
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 45, -25, 0],
          scale: [0.92, 1.15, 1, 0.92],
          opacity: [0.25, 0.38, 0.25]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute top-[30%] -left-[12%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#4f46e5]/35 via-[#7c3aed]/25 to-transparent blur-[130px] will-change-transform"
      />

      {/* Ruby / Crimson Deep Orb (Bottom-Right) */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -30, 35, 0],
          scale: [1, 0.92, 1.1, 1],
          opacity: [0.28, 0.42, 0.28]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute bottom-[8%] right-[12%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#E50914]/40 via-red-950/30 to-transparent blur-[115px] will-change-transform"
      />

      {/* Cyan / Teal Ambient Glow (Bottom-Left) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, 20, -25, 0],
          opacity: [0.15, 0.28, 0.15]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute -bottom-[8%] left-[8%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/22 to-cyan-500/18 blur-[110px] will-change-transform"
      />

      {/* Ambient Floating Dust Stars */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + (i % 5) * 1.5,
              repeat: Infinity,
              delay: (i % 6) * 0.8,
              ease: 'easeInOut'
            }}
            style={{
              left: `${(i * 19 + 7) % 96}%`,
              top: `${(i * 23 + 11) % 92}%`
            }}
            className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        ))}
      </div>

      {/* Radial Vignette Mask */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/40 to-[#0e0e11]/85 pointer-events-none" />
    </div>
  );
};
