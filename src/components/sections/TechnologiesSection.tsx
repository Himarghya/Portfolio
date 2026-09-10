import React from 'react';
import { motion } from 'framer-motion';
import { TECHNOLOGIES } from '../../constants/portfolioData';
import { Code2, Layers, FileCode, Terminal, Server, Zap, Database, Box, Palette, GitBranch } from 'lucide-react';

const getTechIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className="w-6 h-6 text-[#00599C]" />;
    case 'Layers': return <Layers className="w-6 h-6 text-[#0284C7]" />;
    case 'FileCode': return <FileCode className="w-6 h-6 text-[#3178C6]" />;
    case 'Terminal': return <Terminal className="w-6 h-6 text-[#EAB308]" />;
    case 'Server': return <Server className="w-6 h-6 text-[#16A34A]" />;
    case 'Zap': return <Zap className="w-6 h-6 text-[#0D9488]" />;
    case 'Database': return <Database className="w-6 h-6 text-[#4F46E5]" />;
    case 'Box': return <Box className="w-6 h-6 text-[#0284C7]" />;
    case 'Palette': return <Palette className="w-6 h-6 text-[#06B6D4]" />;
    case 'GitBranch': return <GitBranch className="w-6 h-6 text-[#EA580C]" />;
    default: return <Code2 className="w-6 h-6 text-slate-700" />;
  }
};

export const TechnologiesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-1 mb-10">
          <span className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase block">
            TOOLS &amp; SKILLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technologies I Use
          </h2>
        </div>

        {/* Row of Frosted Glass Tech App Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {TECHNOLOGIES.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="frosted-card frosted-card-hover p-4 rounded-2xl shadow-glass flex flex-col items-center justify-center gap-2.5 text-center group cursor-pointer border border-white/90"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getTechIcon(tech.icon)}
              </div>
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
