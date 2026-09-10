import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Beyond Screen', href: '#beyond', id: 'beyond' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Terminal', href: '#terminal', id: 'terminal' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#020704]/90 backdrop-blur-xl border-b border-[#00FF87]/15 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#00FF87]/50 rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#040E08] border border-[#00FF87]/40 group-hover:border-[#00FF87] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,135,0.15)] group-hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]">
            <span className="font-mono font-black text-sm tracking-tighter text-[#00FF87]">HD</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#A3FF12] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold tracking-wider text-sm text-white group-hover:text-[#00FF87] transition-colors">
                HIMARGHYA
              </span>
              <span className="text-[#00FF87] font-mono text-xs">//</span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#6EE7B7] uppercase">
              MATRIX.ACTIVE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#040E08]/80 border border-[#00FF87]/15 rounded-full px-4 py-1.5 backdrop-blur-md shadow-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide uppercase transition-all duration-200 ${
                  isActive
                    ? 'text-[#00FF87] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/40 shadow-[0_0_15px_rgba(0,255,135,0.2)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Button & Terminal Quick Launch */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#terminal"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-[#040E08] border border-emerald-900/60 text-slate-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00FF87]" />
            <span>CLI</span>
          </a>

          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider font-semibold text-[#020704] bg-gradient-to-r from-[#00FF87] to-[#10B981] hover:shadow-[0_0_20px_rgba(0,255,135,0.5)] transition-all duration-300 group"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#040E08] border border-[#00FF87]/30 text-white hover:text-[#00FF87] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-b border-[#00FF87]/20 bg-[#020704]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg font-mono text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-[#00FF87]/10 text-[#00FF87] border-l-2 border-[#00FF87]'
                        : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 rounded-lg text-xs font-mono font-semibold text-[#020704] bg-[#00FF87]"
                >
                  LET'S TALK ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
