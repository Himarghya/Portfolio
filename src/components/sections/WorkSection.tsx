import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CloudRain, Waves, Activity } from 'lucide-react';
import { SELECTED_WORKS } from '../../constants/portfolioData';

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase block">
              FEATURED PROJECTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Selected Work
            </h2>
          </div>

          <a
            href="https://github.com/Himarghya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Large Showcase Mockup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SELECTED_WORKS.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="frosted-card frosted-card-hover rounded-3xl p-5 shadow-glass flex flex-col justify-between group cursor-pointer border border-white/90"
            >
              {/* Mockup Preview Area */}
              <div className={`w-full h-56 rounded-2xl bg-gradient-to-br ${work.imageBg} border border-white/80 p-5 flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/80 text-[10px] font-bold text-slate-700 shadow-sm">
                    {work.category}
                  </span>
                  {work.previewType === 'weather' && <CloudRain className="w-5 h-5 text-blue-600" />}
                  {work.previewType === 'ocean' && <Waves className="w-5 h-5 text-cyan-600" />}
                  {work.previewType === 'hospital' && <Activity className="w-5 h-5 text-emerald-600" />}
                </div>

                {/* Internal UI Card Representation */}
                <div className="bg-white/85 rounded-xl p-3.5 shadow-md border border-white/90 space-y-2 transform group-hover:scale-[1.03] transition-transform">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{work.title}</span>
                    <span className="text-[9px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">v2.0</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-3/4 rounded-full" />
                  </div>
                </div>

              </div>

              {/* Bottom Card Info */}
              <div className="pt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {work.category}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
