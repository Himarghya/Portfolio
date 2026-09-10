import React from 'react';

interface HudBadgeProps {
  label: string;
  variant?: 'cyan' | 'purple' | 'lime' | 'emerald';
  pulse?: boolean;
  className?: string;
}

export const HudBadge: React.FC<HudBadgeProps> = ({
  label,
  variant = 'cyan',
  pulse = true,
  className = ''
}) => {
  const colorMap = {
    cyan: 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_12px_rgba(0,229,255,0.2)]',
    purple: 'border-[#7C3AED]/40 text-[#A78BFA] bg-[#7C3AED]/10 shadow-[0_0_12px_rgba(124,58,237,0.2)]',
    lime: 'border-[#A3FF12]/40 text-[#A3FF12] bg-[#A3FF12]/10 shadow-[0_0_12px_rgba(163,255,18,0.2)]',
    emerald: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
  };

  const dotColorMap = {
    cyan: 'bg-[#00E5FF]',
    purple: 'bg-[#7C3AED]',
    lime: 'bg-[#A3FF12]',
    emerald: 'bg-emerald-400'
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
