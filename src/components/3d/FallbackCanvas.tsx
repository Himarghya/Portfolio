import React from 'react';

interface FallbackCanvasProps {
  title?: string;
  subtitle?: string;
}

export const FallbackCanvas: React.FC<FallbackCanvasProps> = ({
  title = "QUANTUM CORE SIMULATOR",
  subtitle = "Interactive 2D/CSS Matrix Simulation Active"
}) => {
  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#020704] border border-[#00FF87]/20 shadow-[inset_0_0_50px_rgba(0,255,135,0.08)]">
      {/* Background Radar Rings */}
      <div className="absolute w-[320px] h-[320px] rounded-full border border-[#00FF87]/15 animate-ping opacity-25" />
      <div className="absolute w-[240px] h-[240px] rounded-full border border-[#10B981]/25 animate-pulse" />
      <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-[#00FF87]/40 animate-spin-slow" />
      <div className="absolute w-[120px] h-[120px] rounded-full border border-[#A3FF12]/30 animate-spin-reverse-slow" />

      {/* Central Pulsing Core */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#00FF87] via-[#10B981] to-[#A3FF12] animate-pulse shadow-[0_0_35px_rgba(0,255,135,0.6)] flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#020704] border border-white/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#00FF87] animate-ping" />
          </div>
        </div>
        <div className="font-mono text-xs text-[#00FF87] tracking-widest uppercase mb-1">{title}</div>
        <div className="text-[11px] font-mono text-slate-400 max-w-[220px]">{subtitle}</div>
      </div>

      {/* Orbiting particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#00FF87] shadow-[0_0_8px_#00FF87] animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12] animate-ping" />
      </div>
    </div>
  );
};
