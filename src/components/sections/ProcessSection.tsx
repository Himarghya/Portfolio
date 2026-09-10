import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../constants/portfolioData';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-1 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase block">
            MY PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Process I Follow
          </h2>
        </div>

        {/* 5 Process Steps Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="frosted-card frosted-card-hover p-6 rounded-3xl shadow-glass flex flex-col justify-between group border border-white/90"
            >
              <div className="space-y-4">
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xs font-extrabold text-purple-600">
                    {step.step}
                  </div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block w-12 border-t-2 border-dashed border-slate-200" />
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
