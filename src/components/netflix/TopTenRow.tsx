import React, { useRef } from 'react';
import { TOP_TEN_SKILLS } from '../../constants/netflixData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div id="skills" className="relative py-8 px-4 sm:px-12 select-none group/top10">
      {/* Row Title */}
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Top Technologies &amp; Systems
          </h3>
          <span className="text-xs text-zinc-500 font-mono hidden md:inline">
            // CORE TECHNICAL STACK
          </span>
        </div>
      </div>

      {/* Left Slider Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-all rounded-r border-y border-r border-zinc-700"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-all rounded-l border-y border-l border-zinc-700"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Top 10 Cards Slider */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth pl-2"
      >
        {TOP_TEN_SKILLS.map((skill) => (
          <div
            key={skill.rank}
            className="flex items-end shrink-0 relative group/card cursor-pointer"
          >
            {/* Giant Outlined Rank Number */}
            <div className="netflix-top10-rank translate-y-3 sm:translate-y-5 -mr-4 sm:-mr-6 z-0 select-none pointer-events-none">
              {skill.rank}
            </div>

            {/* Poster Card */}
            <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-lg bg-[#15161a] border border-zinc-800 hover:border-zinc-600 transition-colors shadow-lg overflow-hidden flex flex-col justify-between p-4 relative z-10">
              
              {/* Top Card Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E50914] font-bold">
                  #{skill.rank}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {skill.rating}
                </span>
              </div>

              {/* Main Content */}
              <div className="my-auto space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-bold font-bebas text-white tracking-wide group-hover/card:text-[#E50914] transition-colors">
                  {skill.name}
                </h4>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  {skill.category}
                </div>
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-2 border-t border-zinc-800 flex flex-wrap gap-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};