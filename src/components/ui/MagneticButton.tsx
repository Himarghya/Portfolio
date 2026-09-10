import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  icon,
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({
      x: distanceX * 0.25,
      y: distanceY * 0.25,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#05070D] font-semibold hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] border border-[#00E5FF]/40',
    secondary:
      'bg-[#0B1120]/80 text-[#00E5FF] hover:bg-[#00E5FF]/15 hover:text-white border border-[#00E5FF]/30 hover:border-[#00E5FF]/70 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]',
    outline:
      'bg-transparent text-slate-200 hover:text-[#00E5FF] border border-slate-700 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/5',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.1 }}
      className="inline-block cursor-pointer"
    >
      <div
        className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium tracking-wide text-sm transition-all duration-300 select-none ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        <span>{children}</span>
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block group" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={disabled ? undefined : onClick} className="inline-block group">
      {content}
    </div>
  );
};
