import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NetflixItem } from '../../constants/netflixData';
import { X, Play, Github, CheckCircle2, Star, Sparkles, ExternalLink } from 'lucide-react';
import { ProjectGlobe3D } from '../3d/ProjectGlobe3D';
import { OceanSphere3D } from '../3d/OceanSphere3D';

interface NetflixDetailModalProps {
  item: NetflixItem | null;
  onClose: () => void;
  webglSupported: boolean;
}

export const NetflixDetailModal: React.FC<NetflixDetailModalProps> = ({
  item,
  onClose,
  webglSupported
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#181818] border border-white/10 shadow-2xl z-10 text-white select-none no-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#181818]/80 hover:bg-white text-white hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Hero Area */}
          <div className={`relative w-full min-h-[260px] sm:min-h-[340px] bg-gradient-to-br ${item.backdropColor} p-6 sm:p-10 flex flex-col justify-end overflow-hidden`}>
            
            {/* Optional 3D Model in Banner */}
            {item.type3D === 'weather-globe' && webglSupported && (
              <div className="absolute right-4 top-4 bottom-4 w-1/2 opacity-75 hidden sm:block">
                <ProjectGlobe3D />
              </div>
            )}
            {item.type3D === 'ocean-sphere' && webglSupported && (
              <div className="absolute right-4 top-4 bottom-4 w-1/2 opacity-75 hidden sm:block">
                <OceanSphere3D />
              </div>
            )}

            {/* Banner Meta & Title */}
            <div className="relative z-10 space-y-3 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="font-bebas text-2xl text-[#E50914] font-bold">N</span>
                <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">{item.category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-bebas tracking-wide text-white leading-tight">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-gray-300">{item.subtitle}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 rounded bg-white hover:bg-white/90 text-black font-bold text-sm transition-all hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Live Demo</span>
                  </a>
                )}

                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent pointer-events-none" />
          </div>

          {/* Modal Body Info */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Specs & Cast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Synopsis & Highlights */}
              <div className="md:col-span-8 space-y-4">
                
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                  <span className="text-emerald-400 font-bold">{item.matchPercentage}% Match</span>
                  <span className="text-gray-400">{item.durationOrYear}</span>
                  <span className="px-1.5 py-0.5 border border-gray-600 rounded text-[10px] uppercase font-mono">{item.ageRating}</span>
                  <span className="px-1.5 py-0.5 border border-gray-600 rounded text-[10px] uppercase font-mono">{item.quality}</span>
                </div>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                  {item.detailedOverview || item.synopsis}
                </p>

                {/* Key Engineering Highlights */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold font-mono text-gray-400 uppercase">Key Architecture Decisions:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-mono">
                    {item.keyHighlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: Cast & Genres */}
              <div className="md:col-span-4 space-y-4 text-xs font-mono bg-black/30 p-4 rounded-lg border border-white/5">
                <div>
                  <span className="text-gray-500 block uppercase font-bold text-[10px] mb-1">Cast (Tech Stack):</span>
                  <div className="flex flex-wrap gap-1">
                    {item.cast.map(c => (
                      <span key={c} className="px-2 py-0.5 rounded bg-white/10 text-gray-200 text-[11px]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 block uppercase font-bold text-[10px] mb-1">Genres:</span>
                  <div className="text-gray-300">
                    {item.genres.join(', ')}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 block uppercase font-bold text-[10px] mb-1">Tags:</span>
                  <div className="text-gray-400">
                    {item.tags.join(' • ')}
                  </div>
                </div>
              </div>

            </div>

            {/* Episodes List (if present) */}
            {item.episodes && item.episodes.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-bebas tracking-wide text-white">
                    Episodes // Architectural Milestones
                  </h3>
                  <span className="text-xs font-mono text-gray-400">{item.episodes.length} Episodes</span>
                </div>

                <div className="space-y-2">
                  {item.episodes.map(ep => (
                    <div key={ep.episodeNumber} className="p-3.5 rounded bg-black/40 border border-white/5 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="text-xl font-bold font-bebas text-gray-500 w-6">0{ep.episodeNumber}</span>
                        <div>
                          <div className="text-sm font-bold text-white">{ep.title}</div>
                          <p className="text-xs text-gray-400 mt-0.5">{ep.description}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0">{ep.tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};