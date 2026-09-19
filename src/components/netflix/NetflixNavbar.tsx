import React, { useState, useEffect } from 'react';
import { NetflixProfile } from '../../constants/netflixData';
import { Search, ChevronDown, Terminal, Github, ExternalLink, X, Mail, Menu } from 'lucide-react';

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

        {/* CLI Button (Visible on mobile too as icon) */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-200 hover:text-white transition-all border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#E50914]/50 cursor-pointer"
          title="Terminal CLI"
        >
          <Terminal className="w-3.5 h-3.5 text-[#E50914]" />
          <span className="hidden sm:inline">CLI</span>
        </button>

        {/* Profile Avatar */}
        <div className="relative">
          <div
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-1 cursor-pointer p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center text-[11px] font-mono font-bold text-white shadow-sm">
              {activeProfile.avatarIcon}
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Profile Menu */}
          {profileDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-[#121318]/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] py-2 text-xs z-50">
              <div className="px-4 py-2 border-b border-white/10">
                <div className="font-semibold text-white">{activeProfile.name}</div>
                <div className="text-[10px] text-zinc-400 font-mono">{activeProfile.role}</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setProfileDropdown(false); onSwitchProfile(); }}
                  className="w-full text-left px-4 py-2 hover:bg-white/[0.08] text-zinc-200 transition-colors"
                >
                  Switch Role
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