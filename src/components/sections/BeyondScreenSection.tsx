import React from 'react';
import { motion } from 'framer-motion';
import { BeyondTheScreen3D } from '../3d/BeyondTheScreen3D';
import { FallbackCanvas } from '../3d/FallbackCanvas';
import { HudBadge } from '../ui/HudBadge';
import { Orbit, Compass, Eye } from 'lucide-react';

interface BeyondScreenSectionProps {
  webglSupported: boolean;
}

export const BeyondScreenSection: React.FC<BeyondScreenSectionProps> = ({ webglSupported }) => {
  return (
    <section id="beyond" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HudBadge label="SECTION // 01" variant="purple" pulse={false} />
              <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest">// 3D SPATIAL LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              BEYOND THE <span className="text-glow-purple text-[#A78BFA]">SCREEN</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal">
              Explore the systems, ideas, and digital worlds I build. An interactive 3D topology connecting software layers, data pipelines, and computational logic.
            </p>
          </div>

          {/* Interactive Guide HUD */}
          <div className="glass-panel px-4 py-3 rounded-xl border border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-[#00E5FF]">
              <Orbit className="w-3.5 h-3.5" />
              <span>DRAG TO ROTATE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#A3FF12]">
              <Compass className="w-3.5 h-3.5" />
              <span>SCROLL TO ZOOM</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#EC4899]">
              <Eye className="w-3.5 h-3.5" />
              <span>CLICK NODES TO INSPECT</span>
            </div>
          </div>
        </div>

        {/* 3D Canvas Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {webglSupported ? <BeyondTheScreen3D /> : <FallbackCanvas title="3D NEURAL COSMOS" subtitle="Interactive 3D simulation active" />}
        </motion.div>

        {/* Feature Cards below 3D scene */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="glass-panel p-4 rounded-xl border border-slate-800/80">
            <div className="font-mono text-xs text-[#00E5FF] mb-1">01 // ARCHITECTURAL TOPOLOGY</div>
            <p className="text-xs text-slate-400">Microservices, spatial GIS databases, and real-time telemetry pipelines structured in balance.</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800/80">
            <div className="font-mono text-xs text-[#7C3AED] mb-1">02 // ALGORITHMIC RIGOR</div>
            <p className="text-xs text-slate-400">High efficiency C++ algorithmic patterns with robust time and memory bounds.</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800/80">
            <div className="font-mono text-xs text-[#A3FF12] mb-1">03 // IMMERSIVE EXPERIENCES</div>
            <p className="text-xs text-slate-400">Fusing WebGL, 3D physics, and crisp responsive interfaces for modern user empowerment.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
