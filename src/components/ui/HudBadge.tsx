import React from 'react';

interface HudBadgeProps {
  label: string;
  variant?: 'emerald' | 'lime' | 'mint' | 'cyan';
  pulse?: boolean;
  className?: string;
}

export const HudBadge: React.FC<HudBadgeProps> = ({
  label,
  variant = 'emerald',
  pulse = true,
  className = ''
}) => {
  const colorMap = {
    emerald: 'border-[#00FF87]/40 text-[#00FF87] bg-[#00FF87]/10 shadow-[0_0_12px_rgba(0,255,135,0.2)]',
    lime: 'border-[#A3FF12]/40 text-[#A3FF12] bg-[#A3FF12]/10 shadow-[0_0_12px_rgba(163,255,18,0.2)]',
    mint: 'border-[#6EE7B7]/40 text-[#6EE7B7] bg-[#6EE7B7]/10 shadow-[0_0_12px_rgba(110,231,183,0.2)]',
    cyan: 'border-[#00FF87]/40 text-[#00FF87] bg-[#00FF87]/10 shadow-[0_0_12px_rgba(0,255,135,0.2)]'
  };

  const dotColorMap = {
    emerald: 'bg-[#00FF87]',
    lime: 'bg-[#A3FF12]',
    mint: 'bg-[#6EE7B7]',
    cyan: 'bg-[#00FF87]'
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border backdrop-blur-md transition-all duration-300 ${colorMap[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorMap[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColorMap[variant]}`}></span>
        </span>
      )}
      <span>{label}</span>
    </div>
  );
};
