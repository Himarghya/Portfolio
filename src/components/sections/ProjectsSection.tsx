import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../../constants/portfolioData';
import { Project } from '../../types';
import { HudBadge } from '../ui/HudBadge';
import { ProjectGlobe3D } from '../3d/ProjectGlobe3D';
import { OceanSphere3D } from '../3d/OceanSphere3D';
import {
  Github,
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle2,
  Activity,
  BookOpen,
  ChevronRight,
  Layers
} from 'lucide-react';

interface ProjectsSectionProps {
  webglSupported: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ webglSupported }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Calculate smooth horizontal transform percentage
  const x = useTransform(scrollYProgress, [0, 1], ['2%', `-${(PROJECTS.length - 1) * 76}%`]);

  // Transform scroll progress into active slide index indicator
  const activeSlideProgress = useTransform(scrollYProgress, [0, 1], [1, PROJECTS.length]);
  const [slideNum, setSlideNum] = useState(1);

  React.useEffect(() => {
    return activeSlideProgress.on('change', (latest) => {
      setSlideNum(Math.min(PROJECTS.length, Math.max(1, Math.round(latest))));
    });
  }, [activeSlideProgress]);

  const renderProjectVisual = (project: Project) => {
    switch (project.type3D) {
      case 'weather-globe':
        return webglSupported ? (
          <ProjectGlobe3D />
        ) : (
          <div className="w-full h-[240px] sm:h-[280px] rounded-xl bg-gradient-to-br from-emerald-950/40 via-[#020704] to-emerald-900/40 border border-[#00FF87]/20 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 rounded-full border border-[#00FF87]/40 flex items-center justify-center mb-3 animate-pulse">
              <span className="text-2xl">🌦️</span>
            </div>
            <span className="font-mono text-xs text-[#00FF87] font-bold">RADAR GIS VISUALIZER ACTIVE</span>
          </div>
        );

      case 'ocean-sphere':
        return webglSupported ? (
          <OceanSphere3D />
        ) : (
          <div className="w-full h-[240px] sm:h-[280px] rounded-xl bg-gradient-to-br from-emerald-950/40 via-[#020704] to-teal-950/40 border border-[#00FF87]/20 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 rounded-full border border-[#00FF87]/40 flex items-center justify-center mb-3 animate-pulse">
              <span className="text-2xl">🌊</span>
            </div>
            <span className="font-mono text-xs text-[#00FF87] font-bold">BATHYMETRIC TELEMETRY READY</span>
          </div>
        );

      case 'medical-hud':
        return (
          <div className="w-full h-[240px] sm:h-[280px] rounded-xl overflow-hidden bg-[#031008] border border-emerald-500/30 p-4 sm:p-5 flex flex-col justify-between relative">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-bold">CLINICAL TELEMETRY HUD</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">PATIENT // ACTIVE</span>
            </div>

            {/* Realtime Graph Simulation */}
            <div className="space-y-2 sm:space-y-3 my-auto">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-400" /> VITAL METRICS:</span>
                <span className="text-emerald-400 font-bold">STABLE 98.4%</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-4/5 animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center pt-2">
                <div className="p-1.5 rounded bg-[#020704] border border-emerald-500/20 text-emerald-300">
                  <div className="text-[8px] text-slate-500">DOCTORS</div>
                  ONLINE
                </div>
                <div className="p-1.5 rounded bg-[#020704] border border-emerald-500/20 text-emerald-300">
                  <div className="text-[8px] text-slate-500">APPOINTMENTS</div>
                  SYNCED
                </div>
                <div className="p-1.5 rounded bg-[#020704] border border-emerald-500/20 text-emerald-300">
                  <div className="text-[8px] text-slate-500">RECORDS</div>
                  SECURE
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-emerald-500/20">
              <span>DB: POSTGRESQL POOL</span>
              <span>REST API: OK</span>
            </div>
          </div>
        );

      case 'card-deck':
        return (
          <div className="w-full h-[240px] sm:h-[280px] rounded-xl overflow-hidden bg-[#0A1208] border border-lime-500/30 p-4 sm:p-5 flex flex-col justify-between relative group">
            <div className="flex items-center justify-between border-b border-lime-500/20 pb-2 sm:pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#A3FF12]" />
                <span className="text-xs font-mono text-[#A3FF12] font-bold">CARD ARCHIVE ENGINE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">REST API / INDEXED</span>
            </div>

            {/* Card Preview Stack */}
            <div className="relative h-24 sm:h-28 flex items-center justify-center my-auto">
              <div className="absolute w-40 h-20 rounded-lg bg-emerald-950/40 border border-emerald-500/20 transform -rotate-6 -translate-y-2" />
              <div className="absolute w-44 h-22 rounded-lg bg-[#040E08] border border-[#A3FF12]/40 shadow-xl flex flex-col justify-center p-3 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="text-[10px] font-mono text-[#A3FF12] font-bold">CATALOG ID #8492-X</div>
                <div className="text-xs font-semibold text-white truncate">The Cybernetic Codex</div>
                <div className="text-[9px] text-slate-400 font-mono mt-1">EJS + Postgres Aggregation</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-lime-500/20">
              <span>DYNAMIC SSR VIEWS</span>
              <span>FILTER: REALTIME</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative h-[340vh] border-t border-slate-900 bg-[#020704]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 lg:py-10 z-10">
        
        {/* Top Sticky Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-950 pb-3 sm:pb-4">
            <div className="flex items-center gap-3">
              <HudBadge label="SECTION // 04" variant="emerald" pulse={false} />
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                  SELECTED <span className="text-glow-emerald text-[#00FF87]">WORKS</span>
                </h2>
                <span className="hidden md:inline text-xs font-mono text-slate-500 uppercase">
                  // PINNED HORIZONTAL MATRIX
                </span>
              </div>
            </div>

            {/* Interactive Telemetry Deck Indicator */}
            <div className="flex items-center gap-3">
              <div className="glass-panel px-3 py-1.5 rounded-lg border border-emerald-900/60 text-xs font-mono text-slate-300 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#00FF87]" />
                <span>DECK:</span>
                <span className="text-[#00FF87] font-bold">
                  0{slideNum} / 0{PROJECTS.length}
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <span>SCROLL DOWN TO ADVANCE</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#00FF87] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Cards Track */}
        <div className="w-full flex items-center overflow-visible my-auto">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-12 lg:px-20 will-change-transform"
          >
            {PROJECTS.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  className="w-[88vw] sm:w-[75vw] lg:w-[68vw] xl:w-[60vw] max-w-[880px] shrink-0 rounded-2xl border border-emerald-950 hover:border-[#00FF87]/50 bg-gradient-to-b from-[#040E08] to-[#020704] p-5 sm:p-7 lg:p-8 shadow-2xl transition-all duration-300 relative group"
                >
                  {/* Cyber Corner Decals */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00FF87]" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00FF87]" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00FF87]/60" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00FF87]/60" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    
                    {/* Visualizer Column */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative rounded-xl overflow-hidden shadow-lg border border-emerald-950">
                        {renderProjectVisual(project)}
                      </div>
                    </div>

                    {/* Information Column */}
                    <div className={`lg:col-span-6 space-y-3.5 sm:space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      
                      {/* Number & Category Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-black text-xl sm:text-2xl text-emerald-900">
                            {project.number}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-emerald-900/60 bg-[#020704] text-emerald-300">
                            {project.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          PROD_READY
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-0.5">
                        <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wide">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-[#00FF87]">
                          // {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                        {project.description}
                      </p>

                      {/* Key Highlights */}
                      <ul className="space-y-1.5 text-xs font-mono text-slate-400 hidden sm:block">
                        {project.highlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#020704] border border-[#00FF87]/20 text-emerald-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-emerald-950">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#020704] border border-emerald-900/60 text-slate-200 hover:text-[#00FF87] hover:border-[#00FF87]/50 transition-all"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>CODE</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#00FF87]/15 border border-[#00FF87]/50 text-[#00FF87] hover:bg-[#00FF87]/25 transition-all"
                          >
                            <span>LIVE</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.caseStudyAvailable && (
                          <button
                            onClick={() => setSelectedCaseStudy(project)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white transition-colors ml-auto"
                          >
                            <span>SPEC</span>
                            <Sparkles className="w-3.5 h-3.5 text-[#A3FF12]" />
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Horizontal Scrubber Track Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-emerald-950">
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-ping" />
              <span>HORIZONTAL SCROLLING ACTIVE</span>
            </div>

            {/* Custom Track Progress Bar */}
            <div className="flex-1 max-w-md h-1.5 bg-emerald-950 rounded-full overflow-hidden mx-4 hidden sm:block">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00FF87] to-[#A3FF12]"
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ['25%', '100%'])
                }}
              />
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#00FF87]">
              <span>[ 01 — 0{PROJECTS.length} ]</span>
            </div>
          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-2xl border border-[#00FF87]/40 bg-[#040E08]/95 shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#020704] border border-emerald-950 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00FF87] uppercase">// ARCHITECTURAL SPECIFICATION</span>
                <h3 className="text-2xl font-bold font-mono text-white">{selectedCaseStudy.title}</h3>
                <p className="text-sm font-mono text-slate-400">{selectedCaseStudy.subtitle}</p>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-mono">
                <div className="p-4 rounded-xl bg-[#020704] border border-emerald-950">
                  <h4 className="text-xs font-bold text-[#A3FF12] uppercase mb-2">System Overview & Objective</h4>
                  <p className="text-xs text-slate-300">{selectedCaseStudy.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#020704] border border-emerald-950 space-y-2">
                  <h4 className="text-xs font-bold text-[#00FF87] uppercase">Engineering Decisions</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedCaseStudy.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00FF87]">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedCaseStudy.techStack.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-950 flex justify-end">
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-5 py-2 rounded-lg bg-[#00FF87] text-[#020704] font-mono text-xs font-bold hover:bg-[#00FF87]/90"
                >
                  CLOSE SPEC
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};