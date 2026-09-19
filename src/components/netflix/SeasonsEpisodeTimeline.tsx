import React, { useState } from 'react';
import { CAREER_SEASONS } from '../../constants/netflixData';

export const SeasonsEpisodeTimeline: React.FC = () => {
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const currentSeason = CAREER_SEASONS[selectedSeasonIdx];

  return (
    <div id="timeline" className="relative py-12 px-4 sm:px-12 select-none border-t border-white/10">
      {/* Header & Season Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-widest text-[#E50914] uppercase font-mono drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]">
              PROJECT TIMELINE &amp; MILESTONES
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-bebas uppercase">
            Development History &amp; Releases
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-0.5">
            Key architecture implementations and milestones.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] backdrop-blur-xl p-1.5 rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] self-start sm:self-auto">
          {CAREER_SEASONS.map((season, idx) => (
            <button
              key={season.season}
              onClick={() => setSelectedSeasonIdx(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 cursor-pointer ${
                selectedSeasonIdx === idx
                  ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {season.season}
            </button>
          ))}
        </div>
      </div>

      {/* Current Season Title */}
      <div className="mb-4 text-xs font-semibold text-zinc-300 font-mono flex items-center gap-2">
        <span className="text-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.6)]">●</span>
        <span>{currentSeason.title}</span>
      </div>

      {/* Episodes List Grid */}
      <div className="space-y-3">
        {currentSeason.episodes.map((ep) => (
          <div
            key={ep.epNumber}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.07] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 hover:border-[#E50914]/50 shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_35px_rgba(229,9,20,0.18),inset_0_1px_1px_rgba(255,255,255,0.18)] transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 group hover:-translate-y-0.5"
          >
            {/* Left Episode Number & Details */}
            <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
              <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-500 group-hover:text-[#E50914] transition-colors shrink-0 mt-0.5">
                0{ep.epNumber}
              </span>

              <div className="space-y-1.5 flex-1">
                {/* Title + Status Badge (Guaranteed no badge text wrapping) */}
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E50914] transition-colors leading-snug">
                    {ep.title}
                  </h4>
                  <span className="text-[10px] font-mono whitespace-nowrap px-2.5 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-md text-zinc-300 border border-white/10 shrink-0">
                    {ep.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal">
                  {ep.synopsis}
                </p>
              </div>
            </div>

            {/* Right Tech Specs Pill */}
            <div className="text-xs font-mono text-zinc-400 pl-11 sm:pl-12 lg:pl-0 lg:text-right shrink-0">
              <span className="text-[9px] text-zinc-400 block uppercase font-semibold tracking-wider">STACK</span>
              <span className="text-zinc-200 text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] inline-block mt-0.5 shadow-sm">
                {ep.tech}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};