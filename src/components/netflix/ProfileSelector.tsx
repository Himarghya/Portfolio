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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0e11] text-white px-4 select-none overflow-y-auto min-h-screen"
    >
      {/* Brand Top */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 flex items-center gap-2">
        <span className="font-bebas text-2xl sm:text-3xl text-[#E50914] font-bold tracking-wider">
          HIMARGHYA
        </span>
      </div>

      <div className="text-center space-y-2 mb-10 max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
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
            {/* Avatar Card */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-[#15161a] border border-zinc-800 group-hover:border-[#E50914] transition-colors flex flex-col items-center justify-center">
              <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-300 group-hover:text-white">
                {profile.avatarIcon}
              </span>
            </div>

            {/* Profile Label */}
            <div className="mt-2.5 text-center">
              <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-white font-semibold block">
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
          className="flex items-center gap-2 px-6 py-2.5 bg-[#E50914] hover:bg-[#b81d24] text-white text-xs tracking-wider uppercase font-semibold rounded font-mono transition-colors"
        >
          <span>Enter Portfolio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
