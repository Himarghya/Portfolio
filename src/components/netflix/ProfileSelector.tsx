import React from 'react';
import { motion } from 'framer-motion';
import { NETFLIX_PROFILES, NetflixProfile } from '../../constants/netflixData';
import { PlusCircle } from 'lucide-react';

interface ProfileSelectorProps {
  onSelectProfile: (profile: NetflixProfile) => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelectProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141414] text-white px-4 select-none overflow-y-auto"
    >
      {/* Devflix Red Logo Top */}
      <div className="absolute top-8 left-8 sm:left-12 flex items-center gap-2">
        <span className="font-bebas text-3xl sm:text-4xl text-[#E50914] tracking-wider font-bold">
          DEVFLIX
        </span>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-gray-300">
          PORTFOLIO EDITION
        </span>
      </div>

      <div className="text-center space-y-3 mb-10 sm:mb-14 mt-12 sm:mt-0">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Who's watching?
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
          Choose a profile to stream the custom developer experience of <span className="text-white font-semibold">Himarghya Das</span>.
        </p>
      </div>

      {/* Profiles Grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-4xl">
        {NETFLIX_PROFILES.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => onSelectProfile(profile)}
            className="group flex flex-col items-center cursor-pointer w-28 sm:w-36 focus:outline-none"
          >
            {/* Avatar Card */}
            <div className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg ${profile.avatarBg} border-2 border-transparent group-hover:border-white transition-all duration-300 shadow-2xl flex flex-col items-center justify-center overflow-hidden transform group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(229,9,20,0.5)]`}>
              <span className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">
                {profile.avatarIcon}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Profile Name & Role */}
            <div className="mt-3 text-center">
              <span className="text-sm sm:text-base text-gray-400 group-hover:text-white font-medium transition-colors block">
                {profile.name}
              </span>
              <span className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                {profile.role.split('&')[0]}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Add Profile Option (Recruit Custom Role) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          onClick={() => onSelectProfile(NETFLIX_PROFILES[0])}
          className="group flex flex-col items-center cursor-pointer w-28 sm:w-36"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-dashed border-gray-600 group-hover:border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <PlusCircle className="w-10 h-10 text-gray-500 group-hover:text-white transition-colors" />
          </div>
          <span className="mt-3 text-sm sm:text-base text-gray-400 group-hover:text-white font-medium transition-colors">
            Hire Himarghya
          </span>
        </motion.div>
      </div>

      {/* Bottom Action / Manage Profiles */}
      <div className="mt-14 flex items-center gap-4">
        <button
          onClick={() => onSelectProfile(NETFLIX_PROFILES[0])}
          className="px-6 py-2 border border-gray-600 hover:border-white text-gray-400 hover:text-white text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 font-semibold"
        >
          STREAM PORTFOLIO ➔
        </button>
      </div>

      <div className="absolute bottom-6 text-[11px] text-gray-600 font-mono">
        DEVFLIX // POWERED BY REACT 18 + TYPESCRIPT + THREE.JS
      </div>
    </motion.div>
  );
};