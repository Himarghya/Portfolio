import React from 'react';
import { motion } from 'framer-motion';
import { NETFLIX_PROFILES, NetflixProfile } from '../../constants/netflixData';
import { Briefcase, Zap, Terminal, Film, Plus, Sparkles, Shield, Compass, ArrowRight } from 'lucide-react';

interface ProfileSelectorProps {
  onSelectProfile: (profile: NetflixProfile) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  // Custom high-fidelity icon renderer for each profile persona
  const renderProfileVisual = (id: string) => {
    switch (id) {
      case 'recruiter':
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-900/60 border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-400 border-2 border-[#141414] animate-pulse" />
          </div>
        );
      case 'tech_lead':
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#E50914] via-rose-700 to-red-500 flex items-center justify-center shadow-lg shadow-red-950/80 border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white drop-shadow" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E50914] border-2 border-[#141414] animate-pulse" />
          </div>
        );
      case 'developer':
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-950/70 border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#141414] animate-pulse" />
          </div>
        );
      case 'guest':
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-950/70 border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Film className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#141414] animate-pulse" />
          </div>
        );
      default:
        return <Sparkles className="w-8 h-8 text-white" />;
    }
  };

  const getProfileGlow = (id: string) => {
    switch (id) {
      case 'recruiter':
        return 'group-hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] group-hover:border-blue-400';
      case 'tech_lead':
        return 'group-hover:shadow-[0_0_35px_rgba(229,9,20,0.7)] group-hover:border-[#E50914]';
      case 'developer':
        return 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] group-hover:border-emerald-400';
      case 'guest':
        return 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] group-hover:border-amber-400';
      default:
        return 'group-hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] group-hover:border-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141414] text-white px-4 select-none overflow-y-auto min-h-screen relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/3 w-[500px] h-[500px] bg-red-950/15 rounded-full blur-3xl pointer-events-none" />

      {/* Devflix Red Logo Top */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-12 flex items-center gap-2.5 z-20">
        <span className="font-bebas text-3xl sm:text-4xl text-[#E50914] tracking-widest font-extrabold netflix-text-glow">
          DEVFLIX
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 tracking-wider">
          PORTFOLIO EDITION
        </span>
      </div>

      <div className="relative z-10 text-center space-y-3 mb-12 sm:mb-16 mt-16 sm:mt-0">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans drop-shadow-lg">
          Who's watching?
        </h1>
        <p className="text-xs sm:text-base text-gray-400 max-w-lg mx-auto font-normal">
          Choose a tailored streaming profile to explore the engineering works of <span className="text-white font-semibold">Himarghya Das</span>.
        </p>
      </div>

      {/* Profiles Grid */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-5xl px-4">
        {NETFLIX_PROFILES.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectProfile(profile)}
            className="group flex flex-col items-center cursor-pointer w-28 sm:w-36 focus:outline-none"
          >
            {/* Avatar Shell */}
            <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl bg-[#1c1c1c] border-2 border-white/10 ${getProfileGlow(profile.id)} transition-all duration-300 shadow-2xl flex flex-col items-center justify-center overflow-hidden transform group-hover:scale-105 backdrop-blur-sm`}>
              
              {/* Profile Artwork Icon */}
              {renderProfileVisual(profile.id)}

              {/* Glossy Reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Profile Label & Metadata */}
            <div className="mt-3.5 text-center space-y-0.5">
              <span className="text-sm sm:text-base text-gray-300 group-hover:text-white font-bold transition-colors block leading-tight">
                {profile.name}
              </span>
              <span className="text-[10px] text-gray-500 group-hover:text-gray-400 font-mono tracking-wide uppercase block line-clamp-1">
                {profile.role.split('&')[0]}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Add Profile Option (Hire / Direct Contact) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelectProfile(NETFLIX_PROFILES[0])}
          className="group flex flex-col items-center cursor-pointer w-28 sm:w-36"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl border-2 border-dashed border-gray-700 hover:border-white/80 bg-[#181818]/60 hover:bg-[#202020] flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#E50914] group-hover:border-[#E50914] transition-all">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          
          <div className="mt-3.5 text-center space-y-0.5">
            <span className="text-sm sm:text-base text-gray-400 group-hover:text-white font-bold transition-colors block leading-tight">
              Hire Himarghya
            </span>
            <span className="text-[10px] text-gray-500 font-mono tracking-wide uppercase block">
              Direct Contact
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action / Manage Profiles Button */}
      <div className="relative z-10 mt-12 sm:mt-16 flex items-center gap-4">
        <button
          onClick={() => onSelectProfile(NETFLIX_PROFILES[0])}
          className="flex items-center gap-2 px-7 py-2.5 border border-gray-600 hover:border-white text-gray-400 hover:text-black hover:bg-white text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-200 font-semibold rounded-sm font-mono shadow-lg hover:shadow-white/20"
        >
          <span>STREAM PORTFOLIO</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer System Code */}
      <div className="absolute bottom-6 text-[10px] sm:text-[11px] text-gray-600 font-mono tracking-wider flex items-center gap-2 z-20">
        <span>DEVFLIX // HD-2026</span>
        <span>•</span>
        <span>HIGH-CONCURRENCY PORTFOLIO ARCHITECTURE</span>
      </div>
    </motion.div>
  );
};
