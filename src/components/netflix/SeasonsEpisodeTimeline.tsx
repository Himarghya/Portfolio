import React, { useState } from 'react';
import { CAREER_SEASONS } from '../../constants/netflixData';
import { Play, Calendar, CheckCircle2, ChevronDown } from 'lucide-react';

export const SeasonsEpisodeTimeline: React.FC = () => {
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const currentSeason = CAREER_SEASONS[selectedSeasonIdx];

  return (
    <div id="timeline" className="relative py-8 sm:py-12 px-4 sm:px-12 select-none border-t border-white/5 bg-[#141414]">
      
      {/* Header & Season Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#E50914] text-white font-bebas text-sm font-bold shadow-md shadow-red-950/50">
              N
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#E50914] uppercase font-mono">
              CHRONOLOGY // CAREER TIMELINE
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide font-bebas uppercase">
            EPISODES &amp; CAREER SEASONS
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-0.5">
            The chronological releases and technical milestones of Himarghya Das.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="flex items-center gap-2 bg-[#181818] p-1 rounded-lg border border-white/10 self-start sm:self-auto">
          {CAREER_SEASONS.map((season, idx) => (
            <button
              key={season.season}
              onClick={() => setSelectedSeasonIdx(idx)}
              className={`px-3 py-1.5 rounded text-xs font-semibold font-mono transition-all ${
                selectedSeasonIdx === idx
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {season.season}
            </button>
          ))}
        </div>
      </div>

      {/* Current Season Title */}
      <div className="mb-4 text-sm font-semibold text-gray-300 font-mono flex items-center gap-2">
        <span className="text-[#E50914]">●</span>
        <span>{currentSeason.title}</span>
      </div>

      {/* Episodes List Grid */}
      <div className="space-y-3 sm:space-y-4">
        {currentSeason.episodes.map((ep) => (
          <div
            key={ep.epNumber}
            className="p-4 sm:p-5 rounded-lg bg-[#181818] hover:bg-[#202020] border border-white/5 hover:border-[#E50914]/40 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
          >
            {/* Left Episode Number & Thumbnail */}
            <div className="flex items-start sm:items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold font-bebas text-gray-500 group-hover:text-white transition-colors w-8">
                0{ep.epNumber}
              </span>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E50914] transition-colors">
                    {ep.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                    {ep.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {ep.synopsis}
                </p>
              </div>
            </div>

            {/* Right Tech Specs Pill */}
            <div className="text-xs font-mono text-gray-400 sm:text-right shrink-0">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">STACK USED</span>
              <span className="text-white font-medium">{ep.tech}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};