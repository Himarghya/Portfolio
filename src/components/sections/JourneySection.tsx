import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE } from '../../constants/portfolioData';
import { HudBadge } from '../ui/HudBadge';
import { Terminal, Layers, Brain, Globe, Sparkles } from 'lucide-react';

const getMilestoneIcon = (icon: string) => {
  switch (icon) {
    case 'Terminal': return <Terminal className="w-5 h-5 text-[#00FF87]" />;
    case 'Layers': return <Layers className="w-5 h-5 text-[#6EE7B7]" />;
    case 'Brain': return <Brain className="w-5 h-5 text-[#A3FF12]" />;
    case 'Globe': return <Globe className="w-5 h-5 text-[#10B981]" />;
    default: return <Sparkles className="w-5 h-5 text-[#00FF87]" />;
  }
};

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <HudBadge label="SECTION // 05" variant="emerald" pulse={false} />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            MY <span className="text-glow-emerald text-[#00FF87]">JOURNEY</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal">
            Evolutionary milestones across systems architecture, algorithmic problem solving, and intelligent digital platforms.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          
          {/* Glowing Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FF87] via-[#10B981] to-[#A3FF12] transform sm:-translate-x-1/2 opacity-40 shadow-[0_0_15px_rgba(0,255,135,0.4)]" />

          <div className="space-y-12 sm:space-y-16">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Center Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-10 h-10 rounded-full bg-[#020704] border-2 border-[#00FF87] shadow-[0_0_20px_rgba(0,255,135,0.5)] flex items-center justify-center">
                      {getMilestoneIcon(item.icon)}
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Card Content Column */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div className="glass-panel p-6 rounded-xl border border-emerald-950 hover:border-[#00FF87]/40 transition-all duration-300 relative group bg-[#040E08]/80">
                      
                      {/* Top Milestone Meta */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-[#00FF87]">
                          {item.year}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase border ${
                          item.status === 'CURRENT FOCUS'
                            ? 'bg-[#A3FF12]/10 text-[#A3FF12] border-[#A3FF12]/40 animate-pulse'
                            : 'bg-[#020704] text-slate-400 border-emerald-950'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-lg font-bold font-mono text-white mb-2 group-hover:text-[#00FF87] transition-colors">
                        {item.title}
                      </h3>

                      {/* Milestone Description */}
                      <p className="text-xs text-slate-300 font-mono leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-emerald-950">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-emerald-950 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
