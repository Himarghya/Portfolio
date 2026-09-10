import React, { useRef } from 'react';
import { NetflixItem } from '../../constants/netflixData';
import { ChevronLeft, ChevronRight, Play, Info, Github, Plus, ThumbsUp, Check } from 'lucide-react';

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
    <div className="relative py-6 sm:py-8 px-4 sm:px-12 select-none group/row">
      {/* Row Title */}
      <div className="flex items-baseline justify-between mb-3 sm:mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg sm:text-2xl font-bold text-white tracking-wide hover:text-[#E50914] transition-colors cursor-pointer">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-gray-500 font-mono hidden md:inline">
              // {subtitle}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-[#E50914] opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 cursor-pointer">
          Explore All &gt;
        </span>
      </div>

      {/* Left Slider Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 rounded-r"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 rounded-l"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Scrollable Row */}
      <div
        ref={rowRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-4 scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-64 sm:w-80 lg:w-96 shrink-0 group relative cursor-pointer"
            onClick={() => onOpenDetailModal(item)}
          >
            {/* Card Shell */}
            <div className="relative rounded-lg overflow-hidden bg-[#181818] border border-white/10 group-hover:border-[#E50914]/60 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
              
              {/* Card Banner Thumbnail */}
              <div className={`w-full h-40 sm:h-48 bg-gradient-to-br ${item.backdropColor} p-4 flex flex-col justify-between relative overflow-hidden`}>
                
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bebas text-lg font-bold text-[#E50914]">N</span>
                    <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">{item.category}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[9px] font-bold shadow">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Center Title Display */}
                <div className="z-10 my-auto">
                  <h4 className="text-xl sm:text-2xl font-bold font-bebas text-white tracking-wider leading-tight drop-shadow-md">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-mono line-clamp-1">{item.subtitle}</p>
                </div>

                {/* Bottom Meta */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 z-10 border-t border-white/10 pt-1.5">
                  <span className="text-emerald-400">{item.matchPercentage}% Match</span>
                  <span className="px-1 border border-gray-500 rounded text-[9px]">{item.ageRating}</span>
                  <span>{item.quality}</span>
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Card Hover Details Area */}
              <div className="p-3.5 sm:p-4 bg-[#181818] space-y-2">
                
                {/* Quick Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-white hover:bg-white/80 text-black flex items-center justify-center transition-transform hover:scale-110 shadow"
                        title="Live Demo"
                      >
                        <Play className="w-4 h-4 fill-black" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full border border-gray-600 hover:border-white bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-transform hover:scale-110"
                        title="Source Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenDetailModal(item); }}
                      className="w-8 h-8 rounded-full border border-gray-600 hover:border-white bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-transform hover:scale-110"
                      title="More Info"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-gray-500 uppercase">{item.durationOrYear}</span>
                </div>

                {/* Synopsis snippet */}
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-normal">
                  {item.synopsis}
                </p>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.genres.slice(0, 3).map((g) => (
                    <span key={g} className="text-[10px] text-gray-300 font-mono after:content-['•'] after:ml-1 after:text-gray-600 last:after:content-none">
                      {g}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};