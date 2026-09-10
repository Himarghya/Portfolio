import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../constants/portfolioData';
import { HudBadge } from '../ui/HudBadge';
import { SkillUniverse3D } from '../3d/SkillUniverse3D';
import { FallbackCanvas } from '../3d/FallbackCanvas';
import {
  Code2,
  Server,
  Database,
  Brain,
  Wrench,
  Layout,
  Cpu
} from 'lucide-react';

interface SkillsSectionProps {
  webglSupported: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Programming': return <Code2 className="w-4 h-4 text-[#00E5FF]" />;
    case 'Frontend': return <Layout className="w-4 h-4 text-[#38BDF8]" />;
    case 'Backend': return <Server className="w-4 h-4 text-[#22C55E]" />;
    case 'Database': return <Database className="w-4 h-4 text-[#3B82F6]" />;
    case 'AI / ML': return <Brain className="w-4 h-4 text-[#EC4899]" />;
    case 'Tools': return <Wrench className="w-4 h-4 text-[#F43F5E]" />;
    default: return <Cpu className="w-4 h-4 text-[#00E5FF]" />;
  }
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ webglSupported }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.category)];

  const allSkills = SKILL_CATEGORIES.flatMap(c => c.skills);
  const filteredSkills = activeCategory === 'All'
    ? allSkills
    : SKILL_CATEGORIES.find(c => c.category === activeCategory)?.skills || [];

  return (
    <section id="skills" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HudBadge label="SECTION // 03" variant="lime" pulse={false} />
              <span className="text-xs font-mono text-[#A3FF12] uppercase tracking-widest">// ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              THE TECHNOLOGY <span className="text-glow-lime text-[#A3FF12]">STACK</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal">
              A comprehensive matrix of languages, frameworks, distributed architectures, and machine intelligence tools used to architect robust digital systems.
            </p>
          </div>

          {/* Mode Switcher: 2D Grid / 3D Constellation */}
          <div className="flex items-center gap-2 glass-panel p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MATRIX VIEW
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === '3d'
                  ? 'bg-[#A3FF12]/20 text-[#A3FF12] border border-[#A3FF12]/50 shadow-[0_0_12px_rgba(163,255,18,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D CONSTELLATION
            </button>
          </div>
        </div>

        {/* 3D Constellation Mode */}
        {viewMode === '3d' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {webglSupported ? (
              <SkillUniverse3D />
            ) : (
              <FallbackCanvas title="3D SKILL NETWORK" subtitle="Constellation Matrix Simulation" />
            )}
          </motion.div>
        )}

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.15)] font-semibold'
                  : 'bg-[#0B1120]/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative cursor-pointer"
              >
                <div className="glass-panel p-5 rounded-xl border border-slate-800 group-hover:border-[#00E5FF]/40 group-hover:bg-[#0F172A]/90 transition-all duration-300 h-full flex flex-col justify-between">
                  
                  {/* Top Bar */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 group-hover:border-[#00E5FF]/30 transition-colors"
                          style={{ color: skill.color }}
                        >
                          {getCategoryIcon(skill.category)}
                        </div>
                        <div>
                          <h3 className="font-mono font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <div
                        className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 group-hover:animate-ping"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>

                    <p className="text-xs text-slate-300 font-mono line-clamp-2 mb-4 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
