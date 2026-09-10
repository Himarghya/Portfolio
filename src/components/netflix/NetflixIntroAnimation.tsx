import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NetflixIntroAnimationProps {
  onComplete: () => void;
}

export const NetflixIntroAnimation: React.FC<NetflixIntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'radiating' | 'zooming' | 'done'>('drawing');

  // Synthesize authentic Netflix "Ta-Dum" sound via Web Audio API
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        
        // 1. Deep Cinematic Sub-Bass Boom
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(80, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.9);
        
        gain1.gain.setValueAtTime(0.01, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.1);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 2.3);

        // 2. Resonant Metallic Ta-Dum Cello/Anvil Hit
        setTimeout(() => {
          if (ctx.state === 'closed') return;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(140, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 1.2);

          gain2.gain.setValueAtTime(0.01, ctx.currentTime);
          gain2.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 1.9);
        }, 180);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Animation timeline sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('radiating'), 1100);
    const t2 = setTimeout(() => setPhase('zooming'), 2100);
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden select-none cursor-pointer"
      onClick={onComplete}
    >
      {/* Background Ambient Red Bloom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === 'drawing' ? 0.35 : phase === 'radiating' ? 0.9 : 0,
          scale: phase === 'drawing' ? 1 : 1.8
        }}
        transition={{ duration: 1.2 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#E50914]/40 via-red-600/30 to-transparent blur-3xl pointer-events-none"
      />

      {/* Spectral Light Rays (Netflix Signature Light Bars) */}
      {(phase === 'radiating' || phase === 'zooming') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0, opacity: 0, scaleX: 1 }}
              animate={{
                scaleY: [0, 2.5, 6],
                scaleX: [1, 2, 4],
                opacity: [0, 0.9, 0],
                x: (i - 12) * 45
              }}
              transition={{ duration: 1.2, delay: i * 0.02, ease: 'easeOut' }}
              style={{
                background: `linear-gradient(to top, transparent, ${
                  i % 4 === 0 ? '#E50914' : i % 4 === 1 ? '#FF3D47' : i % 4 === 2 ? '#B20710' : '#FF6B72'
                }, transparent)`
              }}
              className="absolute w-2 h-full blur-[1px]"
            />
          ))}
        </div>
      )}

      {/* The Iconic Animated Letter D */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: phase === 'drawing' ? 1 : phase === 'radiating' ? 1.08 : 4.5,
          opacity: phase === 'zooming' ? 0 : 1
        }}
        transition={{
          duration: phase === 'zooming' ? 0.9 : 1.1,
          ease: phase === 'zooming' ? [0.7, 0, 0.84, 0] : [0.16, 1, 0.3, 1]
        }}
        className="relative z-20 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 240 320"
          className="w-48 sm:w-64 md:w-80 h-auto filter drop-shadow-[0_0_35px_rgba(229,9,20,0.85)]"
        >
          <defs>
            {/* Spine Vertical Gradient */}
            <linearGradient id="spineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B20710" />
              <stop offset="45%" stopColor="#E50914" />
              <stop offset="100%" stopColor="#7A0006" />
            </linearGradient>

            {/* Arch Ribbon Gradient */}
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E50914" />
              <stop offset="35%" stopColor="#FF333E" />
              <stop offset="70%" stopColor="#E50914" />
              <stop offset="100%" stopColor="#990000" />
            </linearGradient>

            {/* Inner Shadow Filter */}
            <filter id="ribbonShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-4" dy="0" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Left Vertical Spine Ribbon of "D" */}
          <motion.rect
            x="30"
            y="20"
            width="42"
            height="280"
            rx="3"
            fill="url(#spineGradient)"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
          />

          {/* Curved Sweeping Outer Arch of "D" (Authentic 3D Netflix ribbon fold) */}
          <motion.path
            d="M 68 20 L 135 20 C 195 20, 225 60, 225 160 C 225 260, 195 300, 135 300 L 68 300 L 68 255 L 130 255 C 170 255, 182 225, 182 160 C 182 95, 170 65, 130 65 L 68 65 Z"
            fill="url(#curveGradient)"
            filter="url(#ribbonShadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Shimmering Center Light Streak */}
          <motion.path
            d="M 130 30 C 185 30, 215 70, 215 160 C 215 250, 185 290, 130 290"
            stroke="#FFFFFF"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: phase === 'radiating' ? [0, 0.9, 0] : 0
            }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </svg>
      </motion.div>

      {/* Devflix Original Logo Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: phase === 'zooming' ? 0 : 1,
          y: phase === 'zooming' ? 20 : 0
        }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-16 sm:bottom-20 z-30 flex flex-col items-center gap-1"
      >
        <span className="font-bebas text-2xl sm:text-3xl text-white tracking-[0.3em] uppercase drop-shadow">
          DEVFLIX
        </span>
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E50914] uppercase font-bold">
          AN ORIGINAL EXPERIENCE
        </span>
      </motion.div>

      {/* Skip Intro Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-40 px-3.5 py-1.5 rounded bg-black/60 hover:bg-black/90 text-gray-400 hover:text-white border border-white/20 text-xs font-mono uppercase tracking-wider transition-all duration-200"
      >
        Skip Intro ➔
      </button>
    </motion.div>
  );
};
