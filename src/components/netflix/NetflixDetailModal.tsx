import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NetflixItem } from '../../constants/netflixData';
import { X, Github, CheckCircle2, Play } from 'lucide-react';

interface NetflixDetailModalProps {
  item: NetflixItem | null;
  onClose: () => void;
  webglSupported: boolean;
}

export const NetflixDetailModal: React.FC<NetflixDetailModalProps> = ({
  item,
  onClose
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121319]/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] z-10 text-white select-none no-scrollbar p-6 sm:p-8 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-zinc-300 hover:text-white border border-white/10 transition-colors shadow-sm cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#E50914] font-bold uppercase tracking-wider drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]">
                {item.category}
              </span>
              <span className="text-xs font-mono text-zinc-500">•</span>
              <span className="text-xs font-mono text-zinc-300 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10">{item.durationOrYear}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-wide text-white">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400">{item.subtitle}</p>
          </div>

          {/* Concrete Metrics Row */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {item.metrics.map((m) => (
                <div key={m.label} className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">{m.label}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-zinc-400 uppercase font-semibold">Overview</h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              {item.detailedOverview || item.synopsis}
            </p>
          </div>

          {/* Key highlights */}
          {item.keyHighlights && (
            <div className="space-y-2 pt-3 border-t border-white/10">
              <h4 className="text-xs font-mono text-zinc-400 uppercase font-semibold">Technical Highlights:</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-mono">
                {item.keyHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(229,9,20,0.4)]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack & Links */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {item.cast.map(c => (
                <span key={c} className="px-2.5 py-1 rounded-md bg-white/[0.05] backdrop-blur-md text-zinc-300 text-xs font-mono border border-white/[0.08]">
                  {c}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-md text-white text-xs font-mono transition-all border border-white/15 shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};