import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PortfolioIntroAnimationProps {
  onComplete: () => void;
}

export const PortfolioIntroAnimation: React.FC<PortfolioIntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'exit'>('intro');
  const [statusIndex, setStatusIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const statusMessages = [
    'INITIALIZING RUNTIME ENVIRONMENT...',
    'SYNCHRONIZING REPOSITORIES & SYSTEMS...',
    'PORTFOLIO READY • LAUNCHING'
  ];

  // Synthesize lightweight futuristic intro sound
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Warm sub-bass pulse
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(65, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(36, ctx.currentTime + 0.8);

        gain1.gain.setValueAtTime(0.01, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 1.9);

        // Shimmer accent
        setTimeout(() => {
          if (ctx.state === 'closed') return;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(220, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.6);

          gain2.gain.setValueAtTime(0.01, ctx.currentTime);
          gain2.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 1.3);
        }, 250);
      }
    } catch {
      // Audio autoplay fallback
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Telemetry status text cycle (extended for elegant pacing)
  useEffect(() => {
    const s1 = setTimeout(() => setStatusIndex(1), 1300);
    const s2 = setTimeout(() => setStatusIndex(2), 2600);
    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
    };
  }, []);

  // Smooth choreographed exit timing (held longer for cinematic impact)
  useEffect(() => {
    const tExit = setTimeout(() => {
      setPhase('exit');
    }, 3800);

    const tComplete = setTimeout(() => {
      onComplete();
    }, 4350);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(tExit);
      clearTimeout(tComplete);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === 'exit' ? 0 : 1,
        scale: phase === 'exit' ? 1.04 : 1
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090a0f] text-white select-none overflow-hidden cursor-pointer will-change-transform"
      style={{ transform: 'translate3d(0,0,0)' }}
      onClick={onComplete}
    >
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px'
        }}
      />

      {/* GPU Accelerated Ambient Light Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E50914]/30 via-red-600/15 to-transparent blur-[90px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 will-change-transform animate-pulse" />

      {/* Center Presentation */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-xl">
        
        {/* Animated Monogram Emblem */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 relative"
        >
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-xl border border-white/15 shadow-[0_0_35px_rgba(229,9,20,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center">
            {/* Glowing Monogram SVG */}
            <svg viewBox="0 0 100 100" className="w-11 h-11 text-white">
              <defs>
                <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#E50914" />
                  <stop offset="100%" stopColor="#990000" />
                </linearGradient>
              </defs>
              <path
                d="M 26 24 L 26 76 M 26 50 L 74 50 M 74 24 L 74 76"
                stroke="url(#crestGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Tech Corner Points */}
            <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-[#E50914]" />
            <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-[#E50914]" />
            <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-[#E50914]" />
            <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-[#E50914]" />
          </div>
        </motion.div>

        {/* Creator Name Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-1.5"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E50914]" />
          <h2 className="font-mono text-xs sm:text-sm tracking-[0.3em] text-zinc-300 font-semibold uppercase">
            HIMARGHYA DAS
          </h2>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#E50914]" />
        </motion.div>

        {/* Hero PORTFOLIO Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-1"
        >
          <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 font-extrabold leading-none tracking-widest drop-shadow-[0_4px_25px_rgba(229,9,20,0.45)]">
            PORTFOLIO
          </h1>

          {/* Smooth Light Sweep */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '130%' }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none will-change-transform"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-xs sm:text-sm text-zinc-400 font-sans tracking-wide max-w-md mt-0.5"
        >
          Full Stack Developer &bull; Backend Systems &bull; High Performance Web
        </motion.p>

        {/* Ultra-Smooth Continuous Hardware-Accelerated Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-full max-w-xs sm:max-w-sm mt-7 space-y-2"
        >
          {/* Progress Bar Track */}
          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden p-[0.5px] border border-white/10 shadow-inner">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.5, ease: [0.25, 1, 0.5, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-red-600 via-[#E50914] to-red-400 rounded-full shadow-[0_0_10px_#E50914] will-change-transform"
            />
          </div>

          {/* Status Telemetry */}
          <div className="flex items-center justify-center text-[10px] sm:text-xs font-mono text-zinc-400 h-5">
            <span className="flex items-center gap-1.5 text-zinc-300 transition-opacity duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
              {statusMessages[statusIndex]}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Skip Intro Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-40 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] backdrop-blur-xl text-zinc-300 hover:text-white border border-white/10 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm group"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </motion.button>

      {/* Bottom Hint */}
      <div className="absolute bottom-6 sm:bottom-8 z-30 text-[11px] font-mono text-zinc-500 tracking-wider">
        CLICK ANYWHERE TO ENTER
      </div>
    </motion.div>
  );
};

export default PortfolioIntroAnimation;
