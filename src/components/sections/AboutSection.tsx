import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, FolderCheck, Users } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill Label */}
        <div className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase mb-3">
          ABOUT ME
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Title & Stats Pill Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Designing with Precision<br />
              <span className="text-slate-800">Building with Purpose</span>
            </h2>

            {/* Stats Capsule Card matching the image */}
            <div className="frosted-card p-6 sm:p-8 rounded-3xl shadow-glass flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/90">
              
              <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">4+</div>
                  <div className="text-xs text-slate-500 font-medium">Years Experience</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-slate-200" />

              <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <FolderCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">30+</div>
                  <div className="text-xs text-slate-500 font-medium">Projects Completed</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-slate-200" />

              <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Code Reliability</div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Bio Text & "More About Me" CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 space-y-6 lg:pt-2"
          >
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {PERSONAL_INFO.aboutText}
            </p>

            <div>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-800 bg-white/80 border border-white hover:bg-white shadow-glass-sm hover:shadow-glass transition-all"
              >
                <span>More About Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
