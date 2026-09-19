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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Top Technologies &amp; Systems
          </h3>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-zinc-400 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] shadow-[0_0_6px_rgba(229,9,20,0.8)]" />
            CORE TECHNICAL STACK
          </span>
        </div>
      </div>

      {/* Left Slider Arrow (Desktop Only) */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/40 hover:bg-black/70 backdrop-blur-xl text-white items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-all rounded-r-xl border-y border-r border-white/15 shadow-xl cursor-pointer"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Slider Arrow (Desktop Only) */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 h-3/5 w-10 sm:w-12 bg-black/40 hover:bg-black/70 backdrop-blur-xl text-white items-center justify-center opacity-0 group-hover/top10:opacity-100 transition-all rounded-l-xl border-y border-l border-white/15 shadow-xl cursor-pointer"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Top 10 Cards Slider */}
      <div
        ref={rowRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-4 scroll-smooth pl-2"
      >
        {TOP_TEN_SKILLS.map((skill) => (
          <div
            key={skill.rank}
            className="flex items-end shrink-0 relative group/card cursor-pointer"
          >
            {/* Giant Outlined Rank Number */}
            <div className="netflix-top10-rank translate-y-3 sm:translate-y-5 -mr-4 sm:-mr-6 z-0 select-none pointer-events-none opacity-80">
              {skill.rank}
            </div>

            {/* Glass Poster Card */}
            <div className="w-48 sm:w-56 h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 hover:border-[#E50914]/60 shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.22),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col justify-between p-4 sm:p-5 relative z-10 transition-all duration-300 hover:-translate-y-1">
              
              {/* Top Card Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#E50914] font-bold px-2 py-0.5 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 shadow-[0_0_8px_rgba(229,9,20,0.3)]">
                  #{skill.rank}
                </span>
                <span className="text-[10px] font-mono text-zinc-300 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10">
                  {skill.rating}
                </span>
              </div>

              {/* Main Content */}
              <div className="my-auto space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-bold font-bebas text-white tracking-wide group-hover/card:text-[#E50914] transition-colors leading-tight">
                  {skill.name}
                </h4>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {skill.category}
                </div>
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed font-normal">
                  {skill.desc}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-2.5 border-t border-white/10 flex flex-wrap gap-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.05] backdrop-blur-md text-zinc-300 border border-white/[0.08]"
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