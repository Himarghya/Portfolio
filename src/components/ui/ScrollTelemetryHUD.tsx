import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Gauge, Compass } from 'lucide-react';

interface ScrollTelemetryHUDProps {
  activeSection: string;
  velocity: number;
}

export const ScrollTelemetryHUD: React.FC<ScrollTelemetryHUDProps> = ({ activeSection, velocity }) => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrollDepth(Math.round(latest * 4.2));
    });
  }, [scrollY]);

  const absVel = Math.min(100, Math.round(Math.abs(velocity) * 2.5));

  return (
    <>
      {/* Laser Precision Progress Bar along top edge */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-950 z-[100] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#A3FF12] shadow-[0_0_12px_#00E5FF]"
          style={{ scaleX, transformOrigin: '0%' }}
        />
      </div>

      {/* Floating Right Telemetry Panel (Desktop) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none select-none">
        
        {/* Warp Velocity Indicator */}
        <div className="glass-panel px-3 py-2 rounded-xl border border-[#00E5FF]/20 bg-[#0B1120]/80 backdrop-blur-md flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
            <Gauge className="w-3 h-3 text-[#00E5FF]" />
            <span>WARP VELOCITY</span>
          </div>
          <div className="flex items-baseline gap-1 font-mono">
            <span className={`text-base font-bold transition-colors ${absVel > 30 ? 'text-[#A3FF12]' : 'text-white'}`}>
              {absVel}
            </span>
            <span className="text-[9px] text-[#00E5FF]">KM/S</span>
          </div>

          {/* Mini Velocity Meter */}
          <div className="w-20 h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#00E5FF] to-[#A3FF12] transition-all duration-150"
              style={{ width: `${absVel}%` }}
            />
          </div>
        </div>

        {/* Warp Depth Altitude */}
        <div className="glass-panel px-3 py-2 rounded-xl border border-slate-800 bg-[#0B1120]/80 backdrop-blur-md flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
            <Compass className="w-3 h-3 text-[#7C3AED]" />
            <span>SYSTEM DEPTH</span>
          </div>
          <div className="font-mono text-xs font-bold text-[#00E5FF]">
            {scrollDepth.toLocaleString()} <span className="text-[9px] text-slate-400">AU</span>
          </div>
        </div>

        {/* Current Active Sector */}
        <div className="glass-panel px-3 py-1.5 rounded-lg border border-slate-800 bg-[#0B1120]/80 text-[10px] font-mono text-slate-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF12] animate-ping" />
          <span className="uppercase">{activeSection}</span>
        </div>

      </div>
    </>
  );
};
