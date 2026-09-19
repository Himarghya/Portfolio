import React, { useRef } from 'react';
import { NetflixItem } from '../../constants/netflixData';
import { ChevronLeft, ChevronRight, Play, Info, Github } from 'lucide-react';

interface ProjectRowProps {
  title: string;
  subtitle?: string;
  items: NetflixItem[];
  onOpenDetailModal: (item: NetflixItem) => void;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({
  title,
  subtitle,
  items,
  onOpenDetailModal
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-8 px-4 sm:px-12 select-none group/row">
      {/* Row Title */}
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-zinc-500 font-mono hidden md:inline">
              // {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Left Slider Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/40 hover:bg-black/70 backdrop-blur-xl text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all rounded-r-xl border-y border-r border-white/15 shadow-xl cursor-pointer"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/40 hover:bg-black/70 backdrop-blur-xl text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all rounded-l-xl border-y border-l border-white/15 shadow-xl cursor-pointer"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scrollable Row */}
      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-4 scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-72 sm:w-80 lg:w-96 shrink-0 group relative cursor-pointer"
            onClick={() => onOpenDetailModal(item)}
          >
            {/* Glass Card Shell */}
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 hover:border-[#E50914]/60 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.22),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between h-full space-y-4 hover:-translate-y-1">
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-mono text-[#E50914] font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]">
                    {item.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-md text-zinc-300 font-mono text-[10px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    {item.durationOrYear}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#E50914] transition-colors leading-tight tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">{item.subtitle}</p>
              </div>

              {/* Synopsis */}
              <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed font-normal">
                {item.synopsis}
              </p>

              {/* Concrete Proof Metrics */}
              {item.metrics && item.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  {item.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <div className="text-[9px] font-mono text-zinc-400 uppercase">{m.label}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Chips & Action Links */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.cast.slice(0, 3).map((c) => (
                    <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] backdrop-blur-md text-zinc-300 border border-white/[0.08]">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 transition-colors shadow-sm"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenDetailModal(item); }}
                    className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 transition-colors shadow-sm cursor-pointer"
                    title="Details"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};