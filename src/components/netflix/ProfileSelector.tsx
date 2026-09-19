import React from 'react';
import { motion } from 'framer-motion';
import { NETFLIX_PROFILES, NetflixProfile } from '../../constants/netflixData';
import { ArrowRight, User } from 'lucide-react';

interface ProfileSelectorProps {
  onSelectProfile: (profile: NetflixProfile) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0e11]/80 backdrop-blur-3xl text-white px-4 select-none overflow-y-auto min-h-screen"
    >
      {/* Brand Top */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 flex items-center gap-2">
        <span className="font-bebas text-2xl sm:text-3xl text-[#E50914] font-bold tracking-wider drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]">
          HIMARGHYA
        </span>
      </div>

      <div className="text-center space-y-2 mb-10 max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans drop-shadow-md">
          Select a role to begin
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Choose a role to browse relevant engineering highlights and repositories.
        </p>
      </div>

      {/* Profiles Grid */}
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 max-w-4xl px-4">
        {NETFLIX_PROFILES.map((profile, index) => (
          <div
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            className="group flex flex-col items-center cursor-pointer w-28 sm:w-36 focus:outline-none"
          >
            {/* Glass Avatar Card with Vibrant Profile Gradient */}
            <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${profile.avatarGradient} border border-white/20 group-hover:border-white group-hover:shadow-[0_0_35px_rgba(229,9,20,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 flex flex-col items-center justify-center group-hover:-translate-y-1 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/15" />
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform relative z-10 drop-shadow-md" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-white/90 mt-1 uppercase relative z-10">
                {profile.avatarIcon}
              </span>
            </div>

            {/* Profile Label */}
            <div className="mt-3 text-center">
              <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-white font-semibold block transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                {profile.role.split('&')[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-10">
        <button
          onClick={() => onSelectProfile(NETFLIX_PROFILES[0])}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#E50914] hover:bg-[#b81d24] text-white text-xs tracking-wider uppercase font-semibold rounded-xl font-mono transition-all shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] cursor-pointer"
        >
          <span>Enter Portfolio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
