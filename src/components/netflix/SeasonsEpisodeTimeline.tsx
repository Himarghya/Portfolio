import React, { useState } from 'react';
import { CAREER_SEASONS } from '../../constants/netflixData';

export const SeasonsEpisodeTimeline: React.FC = () => {
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const currentSeason = CAREER_SEASONS[selectedSeasonIdx];

  return (
    <div id="timeline" className="relative py-12 px-4 sm:px-12 select-none border-t border-zinc-800 bg-[#0e0e11]">
      {/* Header & Season Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold tracking-widest text-[#E50914] uppercase font-mono">
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
        <div className="flex items-center gap-2 bg-[#15161a] p-1 rounded-lg border border-zinc-800 self-start sm:self-auto">
          {CAREER_SEASONS.map((season, idx) => (
            <button
              key={season.season}
              onClick={() => setSelectedSeasonIdx(idx)}
              className={`px-3 py-1.5 rounded text-xs font-semibold font-mono transition-colors ${
                selectedSeasonIdx === idx
                  ? 'bg-[#E50914] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {season.season}
            </button>
          ))}
        </div>
      </div>

      {/* Current Season Title */}
      <div className="mb-4 text-xs font-semibold text-zinc-300 font-mono flex items-center gap-2">
        <span className="text-[#E50914]">●</span>
        <span>{currentSeason.title}</span>
      </div>

      {/* Episodes List Grid */}
      <div className="space-y-3">
        {currentSeason.episodes.map((ep) => (
          <div
            key={ep.epNumber}
            className="p-4 sm:p-5 rounded-lg bg-[#15161a] hover:bg-[#1a1b20] border border-zinc-800 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
          >
            {/* Left Episode Number & Details */}
            <div className="flex items-start sm:items-center gap-4">
              <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-500 group-hover:text-white transition-colors w-8">
                0{ep.epNumber}
              </span>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E50914] transition-colors">
                    {ep.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {ep.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal">
                  {ep.synopsis}
                </p>
              </div>
            </div>

            {/* Right Tech Specs Pill */}
            <div className="text-xs font-mono text-zinc-400 sm:text-right shrink-0">
              <span className="text-[10px] text-zinc-500 block uppercase font-semibold">STACK</span>
              <span className="text-zinc-200 font-medium">{ep.tech}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};