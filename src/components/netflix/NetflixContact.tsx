import React, { useState } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { Send, CheckCircle2, Mail, Github, Linkedin, Copy, Check, ChevronRight } from 'lucide-react';

export const NetflixContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('done');
      const mailtoUrl = `mailto:${SHOWRUNNER_DOSSIER.email}?subject=${encodeURIComponent(formData.subject || 'Role Opportunity // Devflix Portfolio')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SHOWRUNNER_DOSSIER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-12 bg-[#141414] border-t border-white/5 select-none">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
        <span className="font-bebas text-3xl text-[#E50914] font-bold">N ORIGINAL</span>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-bebas">
          Ready to Stream High-Performance Engineering?
        </h3>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          Send a direct message to schedule an interview, discuss technical collaborations, or recruit Himarghya for your team.
        </p>
      </div>

      <div className="max-w-3xl mx-auto rounded-xl bg-[#181818] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6">
        
        {/* Top Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-6 border-b border-white/10">
          <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#E50914]" />
              <div className="text-left">
                <span className="text-[9px] text-gray-500 font-mono block">DIRECT EMAIL</span>
                <span className="text-xs font-semibold text-white truncate max-w-[130px] block">himarghyadas@gmail</span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={SHOWRUNNER_DOSSIER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 transition-colors flex items-center gap-2.5 text-left group"
          >
            <Github className="w-4 h-4 text-gray-300 group-hover:text-white" />
            <div>
              <span className="text-[9px] text-gray-500 font-mono block">SOURCE CODE</span>
              <span className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors">GitHub Profile</span>
            </div>
          </a>

          <a
            href={SHOWRUNNER_DOSSIER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 transition-colors flex items-center gap-2.5 text-left group"
          >
            <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-white" />
            <div>
              <span className="text-[9px] text-gray-500 font-mono block">PROFESSIONAL</span>
              <span className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors">LinkedIn Profile</span>
            </div>
          </a>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-mono uppercase">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Turing"
                className="w-full px-4 py-3 rounded bg-black/60 border border-gray-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-gray-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-mono uppercase">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded bg-black/60 border border-gray-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-mono uppercase">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Software Engineering Opportunity / Technical Discussion"
              className="w-full px-4 py-3 rounded bg-black/60 border border-gray-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-gray-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-mono uppercase">Message *</label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your team, tech stack, or project requirements..."
              className="w-full px-4 py-3 rounded bg-black/60 border border-gray-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-gray-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3.5 rounded bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{status === 'sending' ? 'Transmitting Message...' : 'Send Message / Get In Touch'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {status === 'done' && (
            <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Email client opened with pre-filled message packet!</span>
            </div>
          )}
        </form>

      </div>
    </section>
  );
};