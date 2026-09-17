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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 overflow-y-auto">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#15161a] border border-zinc-800 shadow-2xl z-10 text-white select-none no-scrollbar p-6 sm:p-8 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#E50914] font-bold uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-xs font-mono text-zinc-500">•</span>
              <span className="text-xs font-mono text-zinc-400">{item.durationOrYear}</span>
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
                <div key={m.label} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
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
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <h4 className="text-xs font-mono text-zinc-400 uppercase font-semibold">Technical Highlights:</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-mono">
                {item.keyHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack & Links */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {item.cast.map(c => (
                <span key={c} className="px-2 py-1 rounded bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800">
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors border border-zinc-700"
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