import React, { useRef, useState } from 'react';
import { NetflixItem } from '../../constants/netflixData';
import { ChevronLeft, ChevronRight, Play, Info, Github, ExternalLink, Film } from 'lucide-react';

interface ProjectRowProps {
  title: string;
  subtitle?: string;
  items: NetflixItem[];
  onOpenDetailModal: (item: NetflixItem) => void;
}

const ProjectCard: React.FC<{
  item: NetflixItem;
  onOpenDetailModal: (item: NetflixItem) => void;
}> = ({ item, onOpenDetailModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.videoUrl) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
    if (videoRef.current && item.videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.githubUrl) {
      window.open(item.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      onOpenDetailModal(item);
    }
  };

  return (
    <div
      className="w-80 sm:w-96 lg:w-[420px] shrink-0 group relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass Card Shell */}
      <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 hover:border-[#E50914]/60 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(229,9,20,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5">
        
        {/* Media / Video Preview Banner (Clickable -> Opens GitHub) */}
        <div 
          onClick={handleImageClick}
          className="relative w-full h-48 sm:h-52 bg-zinc-950/80 overflow-hidden border-b border-white/10 group/banner cursor-pointer"
          title={`Click to open ${item.title} GitHub repository`}
        >
          {item.videoUrl ? (
            <>
              <video
                ref={videoRef}
                src={item.videoUrl}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/banner:scale-105"
              />
              {/* Fallback & Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121319] via-black/20 to-transparent pointer-events-none" />
              
              {/* Video Indicator Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200">
                <Film className={`w-3 h-3 ${isPlaying ? 'text-[#E50914] animate-pulse' : 'text-zinc-400'}`} />
                <span>{isPlaying ? 'PLAYING DEMO' : 'HOVER TO PLAY'}</span>
              </div>
            </>
          ) : (
            /* Cybernetic Tech Fallback Banner */
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#E50914_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="relative z-10 text-center space-y-1 p-4">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <div className="text-xs font-mono text-zinc-300 font-bold">{item.title}</div>
                <div className="text-[10px] font-mono text-zinc-500">{item.quality}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#121319] via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* GitHub Action Pill Overlay on Hover */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E50914]/90 hover:bg-[#E50914] text-white text-[10px] font-mono font-bold shadow-[0_0_12px_rgba(229,9,20,0.5)] border border-red-300/30 transition-all opacity-90 group-hover/banner:opacity-100 group-hover/banner:scale-105">
            <Github className="w-3 h-3" />
            <span>Open GitHub</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-75" />
          </div>

          {/* Click to open repo banner tip */}
          <div className="absolute bottom-2 left-3 right-3 text-center text-[10px] font-mono text-zinc-400 bg-black/60 backdrop-blur-sm py-0.5 px-2 rounded-md border border-white/10 opacity-0 group-hover/banner:opacity-100 transition-opacity">
            Click banner to open GitHub repo
          </div>
        </div>

        {/* Card Content & Details */}
        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Header & Badges */}
            <div className="flex items-center justify-between gap-2 mb-2">
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

            {/* Description / Synopsis */}
            <p className="text-xs text-zinc-300 leading-relaxed font-normal mt-2.5 line-clamp-3">
              {item.synopsis}
            </p>
          </div>

          {/* Concrete Proof Metrics */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              {item.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="p-2 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase truncate">{m.label}</div>
                  <div className="text-[11px] sm:text-xs font-bold text-white mt-0.5 truncate">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Chips & Action Links */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-[#E50914] backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 hover:border-red-400/40 text-xs font-mono transition-all shadow-sm"
                  title="View GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Code</span>
                </a>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onOpenDetailModal(item); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 text-xs font-mono transition-colors shadow-sm cursor-pointer"
                title="Full Specifications & Architecture"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

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
          <ProjectCard
            key={item.id}
            item={item}
            onOpenDetailModal={onOpenDetailModal}
          />
        ))}
      </div>
    </div>
  );
};