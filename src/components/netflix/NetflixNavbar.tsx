import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NetflixProfile } from '../../constants/netflixData';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Github,
  ExternalLink,
  X,
  Mail,
  Menu,
  User,
  Sparkles,
  Terminal,
  Home,
  Layers,
  Cpu,
  Clock,
  Trophy,
  Award,
  Send
} from 'lucide-react';

interface NetflixNavbarProps {
  activeProfile: NetflixProfile;
  onSwitchProfile: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenTerminal: () => void;
}

export const NetflixNavbar: React.FC<NetflixNavbarProps> = ({
  activeProfile,
  onSwitchProfile,
  searchQuery,
  onSearchChange,
  onOpenTerminal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      name: 'Home',
      href: '#home',
      icon: Home,
      desc: 'Top & Overview',
      color: 'from-red-500/20 to-rose-500/10 text-red-400 border-red-500/30'
    },
    {
      name: 'Projects',
      href: '#projects',
      icon: Layers,
      desc: '4 Live Systems',
      color: 'from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30'
    },
    {
      name: 'Stack',
      href: '#skills',
      icon: Cpu,
      desc: 'Tech Arsenal',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Timeline',
      href: '#timeline',
      icon: Clock,
      desc: 'Journey & Milestones',
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Achievements',
      href: '#achievements',
      icon: Trophy,
      desc: 'SIH & Hackathons',
      color: 'from-purple-500/20 to-violet-500/10 text-purple-400 border-purple-500/30'
    },
    {
      name: 'Certificates',
      href: '#certificates',
      icon: Award,
      desc: 'Verified Credentials',
      color: 'from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/30'
    },
    {
      name: 'About',
      href: '#about',
      icon: User,
      desc: 'Bio & Engineering',
      color: 'from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30'
    },
    {
      name: 'Contact',
      href: '#contact',
      icon: Send,
      desc: "Let's Connect",
      color: 'from-red-500/20 to-orange-500/10 text-red-400 border-red-500/30'
    }
  ];

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-10 py-2.5 flex items-center justify-between backdrop-blur-xl ${
        isScrolled
          ? 'bg-[#0e0e11]/90 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-[#0e0e11]/60 border-b border-white/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Brand & Desktop Sliding Pill Nav */}
      <div className="flex items-center gap-4 sm:gap-8">
        <a href="#home" className="flex items-center gap-1.5 focus:outline-none group shrink-0">
          <span className="font-bebas text-2xl sm:text-3xl text-[#E50914] group-hover:text-red-400 transition-colors tracking-wider font-bold drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]">
            HIMARGHYA
          </span>
        </a>

        {/* Desktop Links with Smooth Magnetic Sliding Hover Pill */}
        <nav
          onMouseLeave={() => setHoveredLink(null)}
          className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-medium p-1 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
        >
          {navLinks.map((link) => {
            const isHovered = hoveredLink === link.name;

            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                className="relative px-3 py-1.5 rounded-xl transition-colors duration-200 cursor-pointer select-none text-zinc-300 hover:text-white"
              >
                {/* Floating Glass Hover Pill */}
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    className="absolute inset-0 rounded-xl bg-white/[0.09] border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 32
                    }}
                  />
                )}

                {/* Subtle Crimson Laser Underline Accent */}
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover-glow"
                    className="absolute -bottom-0.5 left-2.5 right-2.5 h-[2px] bg-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.9)] rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 32
                    }}
                  />
                )}

                {/* Link Label */}
                <span className="relative z-10 block tracking-tight font-medium text-xs">
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3.5 text-white">
        {/* Search */}
        <div className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-lg px-2.5 py-1 text-xs shadow-inner">
              <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter projects..."
                className="bg-transparent text-white focus:outline-none w-28 sm:w-44 placeholder-zinc-500 text-xs"
              />
              <button onClick={() => { setSearchOpen(false); onSearchChange(''); }}>
                <X className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Interactive CLI Console Button */}
        <button
          onClick={onOpenTerminal}
          className="group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-[#E50914]/20 hover:to-[#E50914]/[0.05] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-[#E50914]/60 shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_20px_rgba(229,9,20,0.35)] cursor-pointer"
          title="Launch Interactive Terminal (CLI)"
        >
          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#E50914]/25 to-red-950/40 border border-[#E50914]/40 flex items-center justify-center text-[#E50914] group-hover:text-red-300 group-hover:border-[#E50914]/80 shadow-[0_0_8px_rgba(229,9,20,0.3)] transition-all">
            <Terminal className="w-3 h-3" />
          </div>
          <span className="font-semibold text-xs tracking-wider">CLI</span>
          <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] text-zinc-400 border border-white/10 group-hover:border-[#E50914]/30 group-hover:text-zinc-300 transition-colors">
            &gt;_
          </span>
        </button>

        {/* Profile Avatar & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-1.5 cursor-pointer p-1 sm:p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all shadow-sm group/profile"
            aria-label="Switch Role Profile"
          >
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${activeProfile.avatarGradient || 'from-emerald-500 to-teal-700'} flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] ring-1 ring-white/20 group-hover/profile:ring-[#E50914]/80 transition-all font-bold text-xs`}>
              <User className="w-3.5 h-3.5 text-white drop-shadow" />
            </div>

            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 group-hover/profile:text-white transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Desktop Profile Dropdown Menu */}
          {profileDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-[#121318]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] py-2 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeProfile.avatarGradient || 'from-emerald-500 to-teal-700'} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">{activeProfile.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono truncate max-w-[140px]">{activeProfile.role}</div>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setProfileDropdown(false); onSwitchProfile(); }}
                  className="w-full text-left px-4 py-2 hover:bg-white/[0.08] text-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E50914]" /> Switch Role
                </button>

                <a
                  href="https://github.com/Himarghya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 hover:bg-white/[0.08] text-zinc-200 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setProfileDropdown(false)}
                  className="px-4 py-2 hover:bg-white/[0.08] text-zinc-200 flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E50914]" /> Contact Me
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-xl border transition-all cursor-pointer ${
            mobileMenuOpen
              ? 'bg-[#E50914]/20 border-[#E50914]/60 text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
              : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-zinc-300 hover:text-white'
          }`}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 📱 Premium Mobile Drawer & Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 top-[54px] bg-black/70 backdrop-blur-md z-40"
            />

            {/* Slide Down Sheet Container */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="lg:hidden absolute top-full left-0 right-0 max-h-[calc(100vh-60px)] overflow-y-auto bg-[#0d0e12]/98 backdrop-blur-3xl border-b border-white/15 p-4 sm:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] z-50 flex flex-col gap-4"
            >
              {/* Profile Card & Role Switcher Header */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeProfile.avatarGradient || 'from-emerald-500 to-teal-700'} flex items-center justify-center text-white shadow-md ring-1 ring-white/20 font-bold text-sm`}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide uppercase">{activeProfile.name}</div>
                    <div className="text-[11px] text-zinc-400 font-mono leading-tight">{activeProfile.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchProfile();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-[#E50914]/20 border border-white/15 hover:border-[#E50914]/40 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Switch</span>
                </button>
              </div>

              {/* 2-Column Mobile Navigation Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handleMobileNavClick}
                      className="group flex flex-col justify-between p-3 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-white/[0.1] hover:to-white/[0.03] active:scale-[0.98] border border-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${link.color} border flex items-center justify-center transition-transform group-hover:scale-105`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white tracking-tight group-hover:text-white">
                          {link.name}
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate mt-0.5 font-sans">
                          {link.desc}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick Action Tools Bar */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Launch Terminal Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-gradient-to-br from-[#E50914]/20 to-red-950/30 border border-[#E50914]/40 hover:border-[#E50914] text-white transition-all cursor-pointer shadow-[0_4px_14px_rgba(229,9,20,0.25)] text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#E50914]/30 border border-[#E50914]/50 flex items-center justify-center text-red-200">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">CLI Console</div>
                    <div className="text-[10px] text-red-300 font-mono">&gt; interactive</div>
                  </div>
                </button>

                {/* GitHub Direct Link */}
                <a
                  href="https://github.com/Himarghya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white transition-all cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-zinc-200">
                    <Github className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1">
                      <span>GitHub</span>
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate">@Himarghya</div>
                  </div>
                </a>
              </div>

              {/* Bottom Quick Contact CTA */}
              <a
                href="#contact"
                onClick={handleMobileNavClick}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#E50914] to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Get In Touch / Hire Me</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};