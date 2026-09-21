import React, { useState, useEffect } from 'react';
import { SHOWRUNNER_DOSSIER } from '../../constants/netflixData';
import { saveStorage, loadStorage, clearStorage } from '../../utils/sessionManager';
import { Mail, Github, Linkedin, Copy, Check, ArrowRight, AlertCircle, Sparkles, Wifi, WifiOff, RotateCcw } from 'lucide-react';

const DRAFT_STORAGE_KEY = 'portfolio_contact_session_draft';

export const NetflixContact: React.FC = () => {
  // Restore session data from LocalStorage/SessionStorage/Cookie upon mount or reload
  const [formData, setFormData] = useState(() =>
    loadStorage(DRAFT_STORAGE_KEY, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  );

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [hasDraft, setHasDraft] = useState(false);

  // Monitor network connectivity & auto-persist draft across session & cookies
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-save form inputs to session and cookie on every keystroke
  useEffect(() => {
    const isNotEmpty = Boolean(formData.name.trim() || formData.email.trim() || formData.subject.trim() || formData.message.trim());
    setHasDraft(isNotEmpty);

    if (isNotEmpty) {
      saveStorage(DRAFT_STORAGE_KEY, formData);
    }
  }, [formData]);

  const handleClearDraft = () => {
    clearStorage(DRAFT_STORAGE_KEY);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setHasDraft(false);
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('done');
      // Clear draft upon successful submission
      clearStorage(DRAFT_STORAGE_KEY);
      setHasDraft(false);

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
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-12 border-t border-white/10 select-none">
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
          Contact Me
        </h3>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">
          Feel free to reach out about full-time software engineering roles, open source projects, or technical consulting.
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] p-6 sm:p-8 space-y-6">
        
        {/* Contact links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-6 border-b border-white/10">
          <div className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]" />
              <div className="text-left">
                <span className="text-[10px] text-zinc-400 font-mono block">EMAIL</span>
                <span className="text-xs font-semibold text-white truncate max-w-[110px] block">himarghyadas</span>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.18] text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={SHOWRUNNER_DOSSIER.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all flex items-center gap-2.5 text-left group"
          >
            <Github className="w-4 h-4 text-zinc-300 group-hover:text-white" />
            <div>
              <span className="text-[10px] text-zinc-400 font-mono block">CODE</span>
              <span className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors">GitHub</span>
            </div>
          </a>

          <a
            href={SHOWRUNNER_DOSSIER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all flex items-center gap-2.5 text-left group"
          >
            <Linkedin className="w-4 h-4 text-zinc-300 group-hover:text-white" />
            <div>
              <span className="text-[10px] text-zinc-400 font-mono block">PROFILE</span>
              <span className="text-xs font-semibold text-white group-hover:text-[#E50914] transition-colors">LinkedIn</span>
            </div>
          </a>
        </div>

        {/* Real-time Session & Offline Persistence Status Bar (only shown if draft exists or offline) */}
        {(!isOnline || hasDraft) && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
            <div className="flex items-center gap-2">
              {!isOnline ? (
                <span className="flex items-center gap-1.5 text-amber-400 font-medium font-mono text-[11px]">
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  Offline Mode • Session data saved locally
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium font-mono text-[11px]">
                  Session draft saved
                </span>
              )}
            </div>

            {hasDraft && (
              <button
                type="button"
                onClick={handleClearDraft}
                className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-red-400 transition-colors cursor-pointer font-mono"
                title="Discard saved draft"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Draft</span>
              </button>
            )}
          </div>
        )}

        {/* Message Form with Custom Cyber Validation */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-300 font-mono uppercase">Name</label>
                {errors.name && (
                  <span className="text-[11px] font-medium text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-[#E50914]" />
                    {errors.name}
                  </span>
                )}
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="Your Name"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border text-white text-sm focus:outline-none transition-all placeholder-zinc-500 shadow-inner ${
                  errors.name
                    ? 'border-[#E50914] bg-[#E50914]/[0.05] shadow-[0_0_12px_rgba(229,9,20,0.3)] focus:border-[#E50914]'
                    : 'border-white/10 focus:border-[#E50914]/70 focus:bg-white/[0.08]'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-300 font-mono uppercase">Email</label>
                {errors.email && (
                  <span className="text-[11px] font-medium text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-[#E50914]" />
                    {errors.email}
                  </span>
                )}
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="you@company.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border text-white text-sm focus:outline-none transition-all placeholder-zinc-500 shadow-inner ${
                  errors.email
                    ? 'border-[#E50914] bg-[#E50914]/[0.05] shadow-[0_0_12px_rgba(229,9,20,0.3)] focus:border-[#E50914]'
                    : 'border-white/10 focus:border-[#E50914]/70 focus:bg-white/[0.08]'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-300 font-mono uppercase">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Opportunity / Project inquiry"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-white text-sm focus:outline-none focus:border-[#E50914]/70 focus:bg-white/[0.08] transition-all placeholder-zinc-500 shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-zinc-300 font-mono uppercase">Message</label>
              {errors.message && (
                <span className="text-[11px] font-medium text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-[#E50914]" />
                  {errors.message}
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              placeholder="Write your message here..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] backdrop-blur-md border text-white text-sm focus:outline-none transition-all placeholder-zinc-500 resize-none shadow-inner ${
                errors.message
                  ? 'border-[#E50914] bg-[#E50914]/[0.05] shadow-[0_0_12px_rgba(229,9,20,0.3)] focus:border-[#E50914]'
                  : 'border-white/10 focus:border-[#E50914]/70 focus:bg-white/[0.08]'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#b81d24] text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{status === 'sending' ? 'Opening Mail Client...' : 'Send Message'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </section>
  );
};