import React, { useState, useEffect } from 'react';
import { NetflixProfile } from '../../constants/netflixData';
import { Search, ChevronDown, Terminal, Github, ExternalLink, X, Mail, Menu, User, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Stack', href: '#skills' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-12 py-3 flex items-center justify-between backdrop-blur-xl ${
        isScrolled
          ? 'bg-[#0e0e11]/85 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]'
          : 'bg-[#0e0e11]/60 border-b border-white/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Brand & Desktop Nav */}
      <div className="flex items-center gap-4 sm:gap-10">
        <a href="#home" className="flex items-center gap-1.5 focus:outline-none group">
          <span className="font-bebas text-2xl sm:text-3xl text-[#E50914] group-hover:text-red-400 transition-colors tracking-wider font-bold drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]">
            HIMARGHYA
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 text-white">
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
                className="bg-transparent text-white focus:outline-none w-28 sm:w-48 placeholder-zinc-500 text-xs"
              />
              <button onClick={() => { setSearchOpen(false); onSearchChange(''); }}>
                <X className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sleek Interactive CLI Console Button */}
        <button
          onClick={onOpenTerminal}
          className="group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.14] hover:to-white/[0.06] text-xs font-mono text-zinc-200 hover:text-white transition-all duration-200 border border-white/10 hover:border-[#E50914]/60 shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(229,9,20,0.3)] cursor-pointer"
          title="Launch Interactive Terminal (CLI)"
        >
          <span className="flex items-center justify-center w-4 h-4 rounded-md bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-[10px] font-bold tracking-tight">
            &gt;_
          </span>
          <span className="hidden sm:inline font-semibold text-xs tracking-wide">CLI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
        </button>

        {/* Profile Avatar & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-2 cursor-pointer p-1 sm:p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all shadow-sm group/profile"
            aria-label="Switch Role Profile"
          >
            {/* Netflix Stylized Gradient Avatar Tile */}
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${activeProfile.avatarGradient || 'from-emerald-500 to-teal-700'} flex items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] ring-1 ring-white/20 group-hover/profile:ring-[#E50914]/80 transition-all font-bold text-xs`}>
              <User className="w-4 h-4 text-white drop-shadow" />
            </div>

            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 group-hover/profile:text-white transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
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
                  className="w-full text-left px-4 py-2 hover:bg-white/[0.08] text-zinc-200 transition-colors flex items-center gap-2"
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
          className="md:hidden p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0e0e11]/95 backdrop-blur-2xl border-b border-white/15 p-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};