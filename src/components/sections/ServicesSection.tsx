import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Database, Brain, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../constants/portfolioData';

const getServiceIcon = (icon: string) => {
  switch (icon) {
    case 'Layout': return <Layout className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    case 'Database': return <Database className="w-5 h-5" />;
    case 'Brain': return <Brain className="w-5 h-5" />;
    default: return <Layout className="w-5 h-5" />;
  }
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-1 mb-12">
          <span className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase block">
            WHAT I DO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Services I Offer
          </h2>
        </div>

        {/* 4 Frosted Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="frosted-card frosted-card-hover p-7 rounded-3xl shadow-glass flex flex-col justify-between group cursor-pointer border border-white/90"
            >
              <div className="space-y-4">
                {/* Pastel Rounded Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${service.bgSoft}`}>
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom Right Arrow Icon */}
              <div className="pt-6 flex justify-end">
                <div className="w-7 h-7 rounded-full bg-slate-100/80 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
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
