import React, { useState } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { Mail, Github, Linkedin, Copy, Check, ArrowRight } from 'lucide-react';

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
      const mailtoUrl = `mailto:${SHOWRUNNER_DOSSIER.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry / Opportunity')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SHOWRUNNER_DOSSIER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-12 bg-[#0e0e11] border-t border-zinc-800 select-none">
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
          Contact Me
        </h3>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">
          Feel free to reach out about full-time software engineering roles, open source projects, or technical consulting.
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-xl bg-[#15161a] border border-zinc-800 p-6 sm:p-8 space-y-6">
        
        {/* Contact links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-6 border-b border-zinc-800">
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E50914]" />
              <div className="text-left">
                <span className="text-[10px] text-zinc-500 font-mono block">EMAIL</span>
                <span className="text-xs font-semibold text-white truncate max-w-[110px] block">himarghyadas</span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={SHOWRUNNER_DOSSIER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-2.5 text-left group"
          >
            <Github className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">CODE</span>
              <span className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors">GitHub</span>
            </div>
          </a>

          <a
            href={SHOWRUNNER_DOSSIER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-2.5 text-left group"
          >
            <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            <div>
              <span className="text-[10px] text-zinc-500 font-mono block">PROFILE</span>
              <span className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors">LinkedIn</span>
            </div>
          </a>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-mono uppercase">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-zinc-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-mono uppercase">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-zinc-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-mono uppercase">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Opportunity / Project inquiry"
              className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-zinc-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-mono uppercase">Message</label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your message here..."
              className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#E50914] transition-colors placeholder-zinc-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 rounded bg-[#E50914] hover:bg-[#b81d24] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </section>
  );
};