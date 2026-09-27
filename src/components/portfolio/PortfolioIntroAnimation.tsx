import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Shield, Zap } from 'lucide-react';

interface PortfolioIntroAnimationProps {
  onComplete: () => void;
}

export const PortfolioIntroAnimation: React.FC<PortfolioIntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'exit'>('intro');
  const [progress, setProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Synthesize futuristic high-fidelity intro sound
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // 1. Deep sub-bass pulse
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(75, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.9);

        gain1.gain.setValueAtTime(0.01, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 2.0);

        // 2. Cinematic shimmering high-frequency tone
        setTimeout(() => {
          if (ctx.state === 'closed') return;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(330, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.7);

          gain2.gain.setValueAtTime(0.01, ctx.currentTime);
          gain2.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 1.4);
        }, 220);
      }
    } catch {
      // Audio autoplay restrictions fallback
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

  // Ambient floating background particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vy: number;
      vx: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vy: -(Math.random() * 0.6 + 0.2),
        vx: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.4 ? '#E50914' : '#FFFFFF'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Smooth live numerical percent counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 32);

    return () => clearInterval(interval);
  }, []);

  // Smooth choreographed exit timing
  useEffect(() => {
    const tExit = setTimeout(() => {
      setPhase('exit');
    }, 3600);

    const tComplete = setTimeout(() => {
      onComplete();
    }, 4150);

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

  // Telemetry status text based on progress
  const getStatusText = () => {
    if (progress < 35) return 'INITIALIZING RUNTIME ENVIRONMENT...';
    if (progress < 75) return 'SYNCHRONIZING REPOSITORIES & SYSTEMS...';
    if (progress < 100) return 'CALIBRATING GEOSPATIAL & CLOUD SERVICES...';
    return 'PORTFOLIO READY • LAUNCHING';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === 'exit' ? 0 : 1,
        scale: phase === 'exit' ? 1.05 : 1
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080c] text-white select-none overflow-hidden cursor-pointer will-change-transform"
      style={{ transform: 'translate3d(0,0,0)' }}
      onClick={onComplete}
    >
      {/* Background Floating Ember Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Cyber Grid Overlay with Vignette */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
        }}
      />

      {/* Atmospheric Radial Glow Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E50914]/25 via-red-600/10 to-transparent blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 will-change-transform animate-pulse" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-purple-600/15 to-transparent blur-[90px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-[45%] left-1/2" />

      {/* Center Cinematic Presentation Card */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl">
        
        {/* Animated Layered Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 relative group"
        >
          {/* Orbital Glowing Radar Ring */}
          <div className="absolute -inset-2 rounded-3xl border border-red-500/20 animate-[spin_10s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-3 rounded-3xl border border-dashed border-red-500/15 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

          <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-[#1c1d24] via-[#121319] to-[#0c0d12] backdrop-blur-2xl border border-white/20 shadow-[0_0_45px_rgba(229,9,20,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-center p-3 overflow-hidden">
            {/* Ambient Internal Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E50914]/20 to-transparent pointer-events-none" />

            {/* Glowing Monogram SVG */}
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-white relative z-10 drop-shadow-[0_0_12px_rgba(229,9,20,0.8)]">
              <defs>
                <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="45%" stopColor="#FF3333" />
                  <stop offset="100%" stopColor="#E50914" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 28 22 L 28 78 M 28 50 L 72 50 M 72 22 L 72 78"
                stroke="url(#crestGrad)"
                strokeWidth="8.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Neon Corner Tech Accents */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
          </div>
        </motion.div>

        {/* Creator Name Cyber Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-mono font-semibold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(229,9,20,0.2)] mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
          <span>HIMARGHYA DAS</span>
        </motion.div>

        {/* Hero Cinematic PORTFOLIO Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-1"
        >
          <h1 className="font-bebas text-7xl sm:text-9xl md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 font-extrabold leading-none tracking-[0.12em] drop-shadow-[0_8px_35px_rgba(229,9,20,0.55)]">
            PORTFOLIO
          </h1>

          {/* Smooth Diagonal Chrome Shimmer Beam */}
          <motion.div
            initial={{ x: '-120%' }}
            animate={{ x: '140%' }}
            transition={{ duration: 1.4, delay: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none will-change-transform"
          />
        </motion.div>

        {/* Specialized Tech Capabilities Glass Tags */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-1 max-w-lg"
        >
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono">
            Systems Architecture
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono">
            C++20 &amp; STL
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono">
            PostGIS GIS
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono">
            Full Stack Web
          </span>
        </motion.div>

        {/* Futuristic HUD Loading Engine & Live Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-full max-w-sm sm:max-w-md mt-8 space-y-2.5"
        >
          {/* Progress Metrics Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-0.5">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{getStatusText()}</span>
            </span>
            <span className="font-bold text-red-400 font-mono tracking-wider">{progress}%</span>
          </div>

          {/* High-Tech Glowing Dual Track Progress Bar */}
          <div className="relative w-full h-2 bg-black/60 rounded-full overflow-hidden p-[1px] border border-white/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-red-700 via-[#E50914] to-red-400 rounded-full shadow-[0_0_15px_#E50914] relative will-change-transform"
            >
              {/* Laser Leading Particle Head */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
            </motion.div>
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
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-40 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-[#E50914]/20 backdrop-blur-xl text-zinc-300 hover:text-white border border-white/10 hover:border-[#E50914]/50 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm group active:scale-95"
      >
        <span>Skip Intro</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#E50914]" />
      </motion.button>

      {/* Bottom Interactive Trigger Pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-6 sm:bottom-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-400 hover:text-white transition-all shadow-sm group hover:border-[#E50914]/40"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E50914] animate-pulse" />
        <span>CLICK ANYWHERE OR PRESS SPACE TO ENTER</span>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioIntroAnimation;
