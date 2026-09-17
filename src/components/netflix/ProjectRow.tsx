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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all rounded-r border-y border-r border-zinc-700"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all rounded-l border-y border-l border-zinc-700"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Scrollable Row */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-72 sm:w-80 lg:w-96 shrink-0 group relative cursor-pointer"
            onClick={() => onOpenDetailModal(item)}
          >
            {/* Card Shell */}
            <div className="rounded-lg bg-[#15161a] border border-zinc-800 hover:border-zinc-600 transition-colors p-5 flex flex-col justify-between h-full space-y-4">
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-[#E50914] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px] border border-zinc-700">
                    {item.durationOrYear}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#E50914] transition-colors leading-tight">
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
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                  {item.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="p-2 rounded bg-zinc-900/90 border border-zinc-800/80">
                      <div className="text-[9px] font-mono text-zinc-400 uppercase">{m.label}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Chips & Action Links */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.cast.slice(0, 3).map((c) => (
                    <span key={c} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/50">
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
                      className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenDetailModal(item); }}
                    className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
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