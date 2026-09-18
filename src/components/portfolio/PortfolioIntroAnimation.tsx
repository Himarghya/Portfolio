import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PortfolioIntroAnimationProps {
  onComplete: () => void;
}

export const PortfolioIntroAnimation: React.FC<PortfolioIntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initializing' | 'revealing' | 'radiating' | 'burst' | 'done'>('initializing');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT...');
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize futuristic cinematic intro audio swell
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Cinematic deep harmonic sub-bass
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(65, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(36, ctx.currentTime + 1.2);

        gain1.gain.setValueAtTime(0.01, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.15);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 2.6);

        // Futuristic shimmer chord
        setTimeout(() => {
          if (ctx.state === 'closed') return;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(220, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.9);

          gain2.gain.setValueAtTime(0.01, ctx.currentTime);
          gain2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);

          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 1.7);
        }, 300);
      }
    } catch {
      // Audio autoplay policy fallback
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Smooth loading progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + step);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Animation timeline sequence
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('revealing');
      setStatusText('COMPILING SYSTEM ARCHITECTURE & PROJECTS...');
    }, 700);

    const t2 = setTimeout(() => {
      setPhase('radiating');
      setStatusText('PORTFOLIO READY • LAUNCHING INTERFACE');
    }, 1700);

    const t3 = setTimeout(() => {
      setPhase('burst');
    }, 2600);

    const t4 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3100);

    // Keyboard shortcut to skip (Esc / Space / Enter)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090a0f] text-white select-none overflow-hidden cursor-pointer"
      onClick={onComplete}
    >
      {/* Background Cybernetic Grid & Radial Aura */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Atmospheric Glowing Bloom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: phase === 'initializing' ? 0.3 : phase === 'revealing' ? 0.65 : phase === 'radiating' ? 0.9 : 0.1,
          scale: phase === 'burst' ? 2.5 : 1.2
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-[#E50914]/40 via-red-600/20 to-orange-500/15 blur-[120px] pointer-events-none"
      />

      {/* Spectral Light Streaks */}
      {(phase === 'revealing' || phase === 'radiating' || phase === 'burst') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: phase === 'burst' ? [1, 4] : [0, 1.8, 1],
                opacity: phase === 'burst' ? [0.8, 0] : [0, 0.6, 0.2],
                x: (i - 7.5) * 55
              }}
              transition={{ duration: 1.1, delay: i * 0.03, ease: 'easeOut' }}
              style={{
                background: `linear-gradient(to top, transparent, ${
                  i % 3 === 0 ? '#E50914' : i % 3 === 1 ? '#FF4A54' : '#B20710'
                }, transparent)`
              }}
              className="absolute w-[1.5px] h-[70vh] blur-[1px]"
            />
          ))}
        </div>
      )}

      {/* Center Core Presentation */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl">
        
        {/* Animated Monogram Crest / Badge */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{
            scale: phase === 'burst' ? 1.4 : 1,
            opacity: phase === 'burst' ? 0 : 1,
            rotate: 0
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 relative"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-700/80 shadow-[0_0_40px_rgba(229,9,20,0.4)] flex items-center justify-center">
            {/* Glowing Edge Accent */}
            <div className="absolute inset-0 rounded-2xl border border-[#E50914]/50 animate-pulse" />
            
            {/* Monogram Icon Symbol */}
            <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 text-white">
              <defs>
                <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#E50914" />
                  <stop offset="100%" stopColor="#990000" />
                </linearGradient>
              </defs>
              <path
                d="M 26 22 L 26 78 M 26 50 L 74 50 M 74 22 L 74 78"
                stroke="url(#crestGrad)"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Corner Tech Marks */}
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#E50914]" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E50914]" />
            <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#E50914]" />
            <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[#E50914]" />
          </div>
        </motion.div>

        {/* Creator Name Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: phase === 'burst' ? 0 : 1,
            y: phase === 'burst' ? -15 : 0
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#E50914]" />
          <h2 className="font-mono text-xs sm:text-sm tracking-[0.35em] text-zinc-300 font-semibold uppercase">
            HIMARGHYA DAS
          </h2>
          <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#E50914]" />
        </motion.div>

        {/* Hero PORTFOLIO Title with Kinetic Reveal & Shimmer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.1em' }}
          animate={{
            opacity: phase === 'burst' ? 0 : 1,
            scale: phase === 'burst' ? 1.25 : 1,
            letterSpacing: phase === 'radiating' ? '0.22em' : '0.15em'
          }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-2"
        >
          <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 font-extrabold leading-none tracking-wider drop-shadow-[0_4px_30px_rgba(229,9,20,0.5)]">
            PORTFOLIO
          </h1>

          {/* Shimmer Light Sweep Overlay */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'radiating' || phase === 'burst' ? '120%' : '-100%' }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
          />
        </motion.div>

        {/* Subtitle / Engineer Discipline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'burst' ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs sm:text-sm text-zinc-400 font-sans tracking-wide max-w-md mt-1"
        >
          Full Stack Developer &bull; Backend Systems &bull; High Performance Web
        </motion.p>

        {/* High-Tech Dynamic Progress Bar & Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: phase === 'burst' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-xs sm:max-w-sm mt-8 space-y-2.5"
        >
          {/* Progress Bar Track */}
          <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden p-[1px] border border-zinc-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-[#E50914] to-red-400 rounded-full shadow-[0_0_12px_#E50914]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Status Telemetry Info */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
              {statusText}
            </span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
        </motion.div>

      </div>

      {/* Skip Intro Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-40 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 text-xs font-mono uppercase tracking-wider transition-all duration-200 backdrop-blur-md group"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </motion.button>

      {/* Bottom Hint */}
      <div className="absolute bottom-6 sm:bottom-8 z-30 text-[11px] font-mono text-zinc-500 tracking-wider">
        CLICK ANYWHERE OR PRESS ESC TO ENTER
      </div>
    </motion.div>
  );
};

export default PortfolioIntroAnimation;
