import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const mailto = `mailto:${PERSONAL_INFO.links.email}?subject=${encodeURIComponent(formData.project || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailto;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase block">
              LET'S CONNECT
            </span>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Have a project in mind?<br />
              <span className="text-slate-700">Let's create something amazing together.</span>
            </h2>

            {/* Direct Contact Items */}
            <div className="space-y-4 pt-4">
              <a
                href={`mailto:${PERSONAL_INFO.links.email}`}
                className="flex items-center gap-3.5 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{PERSONAL_INFO.links.email}</span>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.links.phone}`}
                className="flex items-center gap-3.5 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{PERSONAL_INFO.links.phone}</span>
              </a>

              <div className="flex items-center gap-3.5 text-sm font-medium text-slate-700">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center text-indigo-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{PERSONAL_INFO.links.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Frosted Glass Form & 3D Fluid Hologram Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative"
          >
            <form
              onSubmit={handleSubmit}
              className="frosted-card p-8 sm:p-10 rounded-[32px] shadow-glass space-y-4 border border-white/90 relative z-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>

              <input
                type="text"
                placeholder="Your Project / Subject"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
              />

              <textarea
                rows={4}
                required
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-sm font-semibold text-white bg-[#0F172A] hover:bg-slate-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Email client opened with pre-filled details!</span>
                </div>
              )}
            </form>

            {/* 3D Holographic Fluid Ribbon Element matching bottom right of image */}
            <div className="absolute -bottom-10 -right-8 w-44 h-44 rounded-full bg-gradient-to-tr from-purple-400/30 via-indigo-300/40 to-cyan-300/30 blur-2xl pointer-events-none -z-0" />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
