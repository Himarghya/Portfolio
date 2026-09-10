import React, { useState, useEffect } from 'react';
import { NetflixProfile } from '../../constants/netflixData';
import { Search, Bell, ChevronDown, Terminal, Github, ExternalLink, X, FileText } from 'lucide-react';

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
  const [notificationsOpen, setNotificationsOpen] = useState(false);

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
    { name: 'Top Stack', href: '#skills' },
    { name: 'Seasons', href: '#timeline' },
    { name: 'Showrunner', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-12 py-3.5 sm:py-4 flex items-center justify-between ${
        isScrolled
          ? 'bg-[#141414] shadow-2xl border-b border-white/5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      {/* Left Brand & Navigation Links */}
      <div className="flex items-center gap-6 sm:gap-10">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-1.5 focus:outline-none">
          <span className="font-bebas text-3xl sm:text-4xl text-[#E50914] tracking-wider font-extrabold netflix-text-glow">
            HIMARGHYA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-normal text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Right Controls: Search, CLI, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-5 text-white">
        
        {/* Search Bar */}
        <div className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center bg-black/90 border border-white/40 rounded px-2.5 py-1 text-xs">
              <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Titles, stack, keywords..."
                className="bg-transparent text-white focus:outline-none w-32 sm:w-48 placeholder-gray-500"
              />
              <button onClick={() => { setSearchOpen(false); onSearchChange(''); }}>
                <X className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 hover:text-gray-300 transition-colors"
              title="Search Projects & Stack"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

        {/* Developer CLI Terminal Trigger */}
        <button
          onClick={onOpenTerminal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-gray-300 hover:text-white transition-all border border-white/10"
          title="Open Developer Console"
        >
          <Terminal className="w-3.5 h-3.5 text-[#E50914]" />
          <span>DEBUG_CLI</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 hover:text-gray-300 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E50914]" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-[#181818] border border-gray-700 rounded-lg shadow-2xl p-3 text-xs space-y-2 z-50">
              <div className="font-bold text-gray-400 pb-1 border-b border-gray-800 uppercase tracking-wider text-[10px]">
                Devflix Notifications
              </div>
              <div className="p-2 rounded bg-black/40 hover:bg-black/60 transition-colors">
                <div className="font-bold text-white">✨ VarshaNet 2.0 Deployed</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Big data precipitation GIS pipeline with PostGIS optimization.</div>
              </div>
              <div className="p-2 rounded bg-black/40 hover:bg-black/60 transition-colors">
                <div className="font-bold text-white">🚀 Open for Roles // 2026</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Available for full-time Software Engineer & Full Stack positions.</div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <div
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded ${activeProfile.avatarBg} flex items-center justify-center text-sm shadow`}>
              {activeProfile.avatarIcon}
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Profile Menu Popup */}
          {profileDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-[#181818] border border-gray-700 rounded-lg shadow-2xl py-2 text-xs z-50">
              <div className="px-4 py-2 border-b border-gray-800">
                <div className="font-bold text-white">{activeProfile.name}</div>
                <div className="text-[10px] text-gray-400">{activeProfile.role}</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setProfileDropdown(false); onSwitchProfile(); }}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 text-gray-200 flex items-center justify-between"
                >
                  <span>Switch Profile</span>
                  <span className="text-[10px] text-[#E50914] font-semibold">WHO'S WATCHING</span>
                </button>

                <a
                  href="https://github.com/Himarghya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 hover:bg-white/10 text-gray-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setProfileDropdown(false)}
                  className="px-4 py-2 hover:bg-white/10 text-gray-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#E50914]" /> Contact Showrunner</span>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};