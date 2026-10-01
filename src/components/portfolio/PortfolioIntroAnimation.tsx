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
        
        {/* Animated Premium Monogram Emblem */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 relative"
        >
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-[#E50914]/20 blur-2xl pointer-events-none opacity-70" />

          {/* Obsidian Beveled Monogram Glass Tile */}
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-b from-[#1c1d24] via-[#111217] to-[#090a0d] backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center p-3 overflow-hidden">
            {/* Specular Top-Glass Sheen */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Clean Architectural Monogram H */}
            <span className="font-orbitron font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-red-100 to-[#E50914] drop-shadow-[0_2px_16px_rgba(229,9,20,0.6)] select-none">
              H
            </span>
          </div>
        </motion.div>

        {/* Creator Name Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-zinc-300 font-sans">
            HIMARGHYA DAS
          </span>
        </motion.div>

        {/* Hero Cinematic PORTFOLIO Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-1"
        >
          <h1 className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 font-black leading-none tracking-[0.16em] drop-shadow-[0_8px_35px_rgba(229,9,20,0.55)]">
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

        {/* Clean Subtitle Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase font-medium mt-2 font-sans"
        >
          Systems Architecture &bull; Full Stack Engineering
        </motion.p>

        {/* Futuristic HUD Loading Engine & Live Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-full max-w-sm sm:max-w-md mt-8 space-y-2.5"
        >
          {/* Progress Metrics Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-0.5">
            <span className="flex items-center text-zinc-300">
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
