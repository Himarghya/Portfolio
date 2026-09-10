import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  cyberCorners?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  cyberCorners = true,
  hoverEffect = true,
}) => {
  return (
    <div
      className={`relative rounded-xl border border-[#00FF87]/15 bg-[#040E08]/80 backdrop-blur-xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:border-[#00FF87]/40 hover:bg-[#07180E]/90 hover:shadow-[0_0_30px_rgba(0,255,135,0.12)]' : ''
      } ${glow ? 'shadow-[0_0_25px_rgba(0,255,135,0.08)]' : ''} ${className}`}
    >
      {cyberCorners && (
        <>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00FF87]/60 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00FF87]/60 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00FF87]/60 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00FF87]/60 rounded-br-sm pointer-events-none" />
        </>
      )}
      {children}
    </div>
  );
};
