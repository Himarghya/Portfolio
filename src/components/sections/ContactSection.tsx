import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../constants/portfolioData';
import { HudBadge } from '../ui/HudBadge';
import { Mail, Github, Linkedin, Send, CheckCircle2, Radio, MessageSquare, ArrowUpRight, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'ready'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('transmitting');
    setTimeout(() => {
      setStatus('ready');
      const mailtoUrl = `mailto:${PERSONAL_INFO.links.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 1000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <HudBadge label="SECTION // 07" variant="cyan" pulse={true} />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl">
            LET'S BUILD SOMETHING <span className="text-glow-cyan text-[#00E5FF]">EXTRAORDINARY.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal">
            Have an idea, a project, or an opportunity? Initiate an encrypted digital transmission or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Links & Connection Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Live Transmission Card */}
            <div className="glass-panel p-6 rounded-2xl border border-[#00E5FF]/30 bg-[#0B1120]/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white">COMMUNICATION NODE</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  CONNECTION ESTABLISHED
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Direct channels are open for high-impact software engineering roles, full-stack systems architecture, or collaborative technical ventures.
              </p>

              {/* Verified Channels */}
              <div className="space-y-3 pt-2">
                {/* Email Chip */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00E5FF]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#00E5FF]" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">PRIMARY TRANSMISSION</div>
                      <div className="text-xs font-mono text-white select-all">{PERSONAL_INFO.links.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00E5FF]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-[#38BDF8]" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">CODEBASE REPOSITORY</div>
                      <div className="text-xs font-mono text-white">github.com // Himarghya Das</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00E5FF]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#7C3AED]" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">PROFESSIONAL NETWORK</div>
                      <div className="text-xs font-mono text-white">linkedin.com // in/himarghya</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>RESPONSE TIME:</span>
              <span className="text-[#00E5FF] font-bold">&lt; 24 HOURS</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Communication Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00E5FF]/30 bg-[#0B1120]/90 shadow-2xl space-y-5 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-xs font-mono font-bold text-white">TRANSMIT PACKET</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">PROTOCOL: MAILTO // DIRECT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Turing"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full Stack Engineering Role / Project Inquiry"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-[#00E5FF] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your requirements, team, or opportunity..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/90 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'transmitting'}
                className="w-full py-3.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-[#05070D] bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                {status === 'transmitting' ? (
                  <span>ENCRYPTING &amp; TRANSMITTING...</span>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {status === 'ready' && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Email client dispatched with pre-populated message payload!</span>
                </div>
              )}
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
