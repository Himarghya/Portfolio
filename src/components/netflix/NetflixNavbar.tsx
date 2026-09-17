import React, { useState, useEffect } from 'react';
import { NetflixProfile } from '../../constants/netflixData';
import { Search, ChevronDown, Terminal, Github, ExternalLink, X, Mail } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-colors px-4 sm:px-12 py-3.5 flex items-center justify-between ${
        isScrolled
          ? 'bg-[#0e0e11] border-b border-zinc-800'
          : 'bg-[#0e0e11]/90 border-b border-zinc-800/50'
      }`}
    >
      {/* Brand & Nav */}
      <div className="flex items-center gap-6 sm:gap-10">
        <a href="#home" className="flex items-center gap-1.5 focus:outline-none">
          <span className="font-bebas text-2xl sm:text-3xl text-[#E50914] tracking-wider font-bold">
            HIMARGHYA
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4 text-white">
        {/* Search */}
        <div className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded px-2.5 py-1 text-xs">
              <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter stack, projects..."
                className="bg-transparent text-white focus:outline-none w-32 sm:w-48 placeholder-zinc-500 text-xs"
              />
              <button onClick={() => { setSearchOpen(false); onSearchChange(''); }}>
                <X className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* CLI Button */}
        <button
          onClick={onOpenTerminal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors border border-zinc-700"
          title="Terminal"
        >
          <Terminal className="w-3.5 h-3.5 text-[#E50914]" />
          <span>CLI</span>
        </button>

        {/* Profile Avatar */}
        <div className="relative">
          <div
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-300">
              {activeProfile.avatarIcon}
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Profile Menu */}
          {profileDropdown && (
            <div className="absolute right-0 mt-3 w-52 bg-[#15161a] border border-zinc-800 rounded-lg shadow-xl py-2 text-xs z-50">
              <div className="px-4 py-2 border-b border-zinc-800">
                <div className="font-semibold text-white">{activeProfile.name}</div>
                <div className="text-[10px] text-zinc-400 font-mono">{activeProfile.role}</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setProfileDropdown(false); onSwitchProfile(); }}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-200 transition-colors"
                >
                  Switch Role
                </button>

                <a
                  href="https://github.com/Himarghya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 hover:bg-zinc-800 text-zinc-200 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setProfileDropdown(false)}
                  className="px-4 py-2 hover:bg-zinc-800 text-zinc-200 flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E50914]" /> Contact Me
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};