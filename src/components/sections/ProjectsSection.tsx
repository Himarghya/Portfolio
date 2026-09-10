import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BookOpen
} from 'lucide-react';

interface ProjectsSectionProps {
  webglSupported: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ webglSupported }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const renderProjectVisual = (project: Project) => {
    switch (project.type3D) {
      case 'weather-globe':
        return webglSupported ? (
          <ProjectGlobe3D />
        ) : (
          <div className="w-full h-[280px] rounded-xl bg-gradient-to-br from-cyan-950/40 via-[#05070D] to-blue-950/40 border border-cyan-500/20 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border border-cyan-400/40 flex items-center justify-center mb-3 animate-pulse">
              <span className="text-2xl">🌦️</span>
            </div>
            <span className="font-mono text-xs text-cyan-400 font-bold">RADAR GIS VISUALIZER ACTIVE</span>
          </div>
        );

      case 'ocean-sphere':
        return webglSupported ? (
          <OceanSphere3D />
        ) : (
          <div className="w-full h-[280px] rounded-xl bg-gradient-to-br from-blue-950/40 via-[#05070D] to-indigo-950/40 border border-blue-500/20 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full border border-blue-400/40 flex items-center justify-center mb-3 animate-pulse">
              <span className="text-2xl">🌊</span>
            </div>
            <span className="font-mono text-xs text-blue-400 font-bold">BATHYMETRIC TELEMETRY READY</span>
          </div>
        );

      case 'medical-hud':
        return (
          <div className="w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden bg-[#051118] border border-emerald-500/30 p-5 flex flex-col justify-between relative">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-bold">CLINICAL TELEMETRY HUD</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">PATIENT // ACTIVE</span>
            </div>

            {/* Realtime Graph Simulation */}
            <div className="space-y-3 my-auto">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-400" /> VITAL METRICS:</span>
                <span className="text-emerald-400 font-bold">STABLE 98.4%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-4/5 animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center pt-2">
                <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/20 text-emerald-300">
                  <div className="text-[8px] text-slate-500">DOCTORS</div>
                  ONLINE
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/20 text-emerald-300">
                  <div className="text-[8px] text-slate-500">APPOINTMENTS</div>
                  SYNCED
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-emerald-500/20 text-emerald-300">
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
          <div className="w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden bg-[#100B1A] border border-amber-500/30 p-5 flex flex-col justify-between relative group">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-amber-400 font-bold">CARD ARCHIVE ENGINE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">REST API / INDEXED</span>
            </div>

            {/* Vintage Card Preview Stack */}
            <div className="relative h-32 flex items-center justify-center my-auto">
              <div className="absolute w-44 h-24 rounded-lg bg-amber-950/40 border border-amber-500/20 transform -rotate-6 -translate-y-2" />
              <div className="absolute w-48 h-24 rounded-lg bg-[#1F172B] border border-amber-500/40 shadow-xl flex flex-col justify-center p-3 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="text-[10px] font-mono text-amber-400 font-bold">CATALOG ID #8492-X</div>
                <div className="text-xs font-semibold text-white truncate">The Cybernetic Codex</div>
                <div className="text-[9px] text-slate-400 font-mono mt-1">EJS + Postgres Aggregation</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-amber-500/20">
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
    <section id="projects" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HudBadge label="SECTION // 04" variant="cyan" pulse={false} />
              <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest">// SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              SELECTED <span className="text-glow-cyan text-[#00E5FF]">WORKS</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal">
              Turning ideas into functional digital experiences. Engineered with high-performance frameworks, resilient database schemas, and intelligent telemetry.
            </p>
          </div>

          <div className="glass-panel px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
            TOTAL SYSTEMS: <span className="text-white font-bold">{PROJECTS.length} PRODUCTION RELEASES</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl border border-slate-800 hover:border-[#00E5FF]/40 bg-gradient-to-b from-[#0B1120] to-[#05070D] p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300"
              >
                {/* Cyber Corner Decals */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00E5FF]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00E5FF]" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Left (or Right): Project Visualizer */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group">
                      {renderProjectVisual(project)}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Number & Category Badge */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-2xl sm:text-3xl text-slate-600">
                        {project.number}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono border border-slate-700 bg-slate-900/60 text-slate-300">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-[#00E5FF]">
                        // {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <ul className="space-y-2 text-xs font-mono text-slate-400">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#0B1120] border border-[#00E5FF]/20 text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-[#0B1120] border border-slate-700 text-slate-200 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>SOURCE CODE</span>
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono bg-[#00E5FF]/15 border border-[#00E5FF]/50 text-[#00E5FF] hover:bg-[#00E5FF]/25 transition-all"
                        >
                          <span>LIVE DEMO</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {project.caseStudyAvailable && (
                        <button
                          onClick={() => setSelectedCaseStudy(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white transition-colors"
                        >
                          <span>CASE STUDY</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#A3FF12]" />
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
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
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-2xl border border-[#00E5FF]/40 bg-[#0B1120]/95 shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00E5FF] uppercase">// ARCHITECTURAL SPECIFICATION</span>
                <h3 className="text-2xl font-bold font-mono text-white">{selectedCaseStudy.title}</h3>
                <p className="text-sm font-mono text-slate-400">{selectedCaseStudy.subtitle}</p>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-mono">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-bold text-[#A3FF12] uppercase mb-2">System Overview &amp; Objective</h4>
                  <p className="text-xs text-slate-300">{selectedCaseStudy.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-[#00E5FF] uppercase">Engineering Decisions</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedCaseStudy.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00E5FF]">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedCaseStudy.techStack.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-5 py-2 rounded-lg bg-[#00E5FF] text-[#05070D] font-mono text-xs font-bold hover:bg-[#00E5FF]/90"
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
