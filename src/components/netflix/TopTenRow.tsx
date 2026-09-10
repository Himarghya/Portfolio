import React, { useRef } from 'react';
import { TOP_TEN_SKILLS } from '../../constants/netflixData';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const TopTenRow: React.FC = () => {
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
    <div id="skills" className="relative py-6 sm:py-8 px-4 sm:px-12 select-none group/top10">
      {/* Row Title */}
      <div className="flex items-baseline justify-between mb-3 sm:mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg sm:text-2xl font-bold text-white tracking-wide hover:text-[#E50914] transition-colors">
            Top 10 Technologies in Himarghya's Stack Today
          </h3>
          <span className="text-xs text-gray-500 font-mono hidden md:inline">
            // RANKED BY RIGOR &amp; MASTERY
          </span>
        </div>
      </div>

      {/* Left Slider Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-all duration-300 rounded-r"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-all duration-300 rounded-l"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Top 10 Cards Slider */}
      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-6 scroll-smooth pl-2"
      >
        {TOP_TEN_SKILLS.map((skill) => (
          <div
            key={skill.rank}
            className="flex items-end shrink-0 relative group/card cursor-pointer"
          >
            {/* Giant Stylized Rank Number */}
            <div className="netflix-top10-rank translate-y-3 sm:translate-y-5 -mr-4 sm:-mr-6 z-0 select-none pointer-events-none">
              {skill.rank}
            </div>

            {/* Poster Card */}
            <div className="w-44 sm:w-52 h-64 sm:h-72 rounded-lg bg-[#181818] border border-white/10 group-hover/card:border-[#E50914] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between p-4 relative z-10 group-hover/card:scale-105 group-hover/card:shadow-[0_0_25px_rgba(229,9,20,0.4)]">
              
              {/* Top Card Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E50914] font-bold">
                  N STACK #{skill.rank}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {skill.match}%
                </span>
              </div>

              {/* Main Content */}
              <div className="my-auto space-y-1">
                <h4 className="text-xl sm:text-2xl font-bold font-bebas text-white tracking-wide group-hover/card:text-[#E50914] transition-colors">
                  {skill.name}
                </h4>
                <div className="text-[10px] font-mono text-gray-400 uppercase">
                  {skill.category}
                </div>
                <p className="text-[11px] text-gray-300 line-clamp-3 leading-relaxed pt-1">
                  {skill.desc}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Red Accent bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E50914] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};