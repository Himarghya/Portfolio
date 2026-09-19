import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, Eye, Download, ExternalLink, Users, Instagram, X } from 'lucide-react';

interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  issuerBadge: string;
  date: string;
  awardRank: string;
  team: string;
  teamMembers?: string[];
  imageUrl: string;
  galleryImages: string[];
  instagramUrl?: string;
  description: string;
  skills: string[];
  accentColor: string;
}

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'can-you-hack-it-hackathon',
    title: 'CAN YOU HACK IT — 1st Position (Winners 🏆)',
    subtitle: '24-Hour Intensive Product & Engineering Hackathon Sprint',
    issuer: 'THINKBUILDSHIP & Globus Infocom',
    issuerBadge: '24-Hour Hackathon',
    date: '2025',
    awardRank: '1st Place (Winners 🥇)',
    team: 'Still Standing (Quick Teams)',
    imageUrl: '/certificates/canyouhackit-winners.jpg',
    galleryImages: [
      '/certificates/canyouhackit-winners.jpg',
      '/certificates/canyouhackit-group.jpg'
    ],
    instagramUrl: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE0NDAwNTQ3MTkyMjk5?story_media_id=3716531304344154391_48185590868&stkn=Znh0YWNsc3pzb3Aw',
    description:
      'Secured First Place (Winners) in the high-stakes 24-hour non-stop "CAN YOU HACK IT" Hackathon organized by THINKBUILDSHIP & Globus Infocom. Architected, coded, and presented an end-to-end production software solution under extreme time constraints with Team Still Standing.',
    skills: ['Rapid Full-Stack Prototyping', 'System Architecture', '24h Hackathon Sprint', 'Team Leadership', 'Live Product Demo'],
    accentColor: '#10B981' // Emerald Champion Green
  },
  {
    id: 'roborush-3-achievement',
    title: 'RoboRush 3.0 (2025) — 3rd Position',
    subtitle: 'National Level Autonomous Robotics & Hardware Challenge',
    issuer: 'Electronics and Robotics Society (ERS)',
    issuerBadge: 'IIITDM Jabalpur',
    date: '2025',
    awardRank: '3rd Place (Bronze Trophy 🥉)',
    team: 'Super Strikers',
    teamMembers: ['Himarghya Das', 'Aditya Rajput', 'Harshal Paranjiya', 'Anuj'],
    imageUrl: '/certificates/roborush-3.0-achievement.png',
    galleryImages: ['/certificates/roborush-3.0-achievement.png'],
    description:
      'Awarded for securing Third Position in RoboRush 3.0 at IIITDM Jabalpur, acknowledging exceptional engineering skills, hardware-software integration, rapid sensor loop tuning, and dedication during high-intensity autonomous robotics rounds.',
    skills: ['Embedded Systems', 'Sensor Integration', 'Robotics Hardware', 'Algorithm Optimization', 'Team Leadership'],
    accentColor: '#F59E0B' // Amber / Gold
  }
];

export const NetflixAchievements: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const handleOpenModal = (item: AchievementItem) => {
    setSelectedItem(item);
    setActiveImageIdx(0);
  };

  return (
    <section id="achievements" className="relative px-4 sm:px-12 py-10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Trophy className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Competitive Honors &amp; Hackathons
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Honors &amp; Achievements
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            1st Place Hackathon victories, robotics podium finishes, and competitive engineering awards.
          </p>
        </div>
      </div>

      {/* Grid of Achievement Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {ACHIEVEMENTS_DATA.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="group relative rounded-2xl bg-gradient-to-b from-[#14151c]/90 to-[#0e0f14]/95 border border-white/10 hover:border-white/25 backdrop-blur-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Accent Ribbon */}
            <div
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
              style={{
                background: `linear-gradient(90deg, ${item.accentColor}, rgba(255,255,255,0.2))`
              }}
            />

            {/* Card Content Header & Preview */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl border flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${item.accentColor}18`,
                      borderColor: `${item.accentColor}40`,
                      color: item.accentColor
                    }}
                  >
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-300 uppercase">
                        {item.issuer}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-zinc-300 border border-white/10">
                        {item.issuerBadge}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">{item.date}</span>
                  </div>
                </div>

                {/* Rank Badge */}
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 border"
                  style={{
                    backgroundColor: `${item.accentColor}18`,
                    borderColor: `${item.accentColor}40`,
                    color: item.accentColor
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.awardRank}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Visual Image Preview */}
              <div
                onClick={() => handleOpenModal(item)}
                className="relative mb-5 rounded-xl overflow-hidden border border-white/15 group/img cursor-pointer bg-black/40 aspect-[16/9]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4" />
                    View High-Res Photo &amp; Gallery
                  </span>
                </div>
              </div>

              {/* Team Members List (If present) */}
              {item.teamMembers && (
                <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Team: {item.team}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.teamMembers.map((member) => (
                      <span
                        key={member}
                        className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                          member.includes('Himarghya')
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-bold'
                            : 'bg-white/[0.06] text-zinc-400 border border-white/[0.06]'
                        }`}
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-zinc-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3">
              <button
                onClick={() => handleOpenModal(item)}
                className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect Achievement</span>
              </button>

              <div className="flex items-center gap-2">
                {item.instagramUrl && (
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 border border-pink-500/40 text-xs font-bold text-pink-200 hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Story</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <a
                  href={item.imageUrl}
                  download="Himarghya_Das_Achievement.jpg"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
                  title="Download Photo"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-[#121319] border border-white/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg border"
                    style={{
                      backgroundColor: `${selectedItem.accentColor}20`,
                      borderColor: `${selectedItem.accentColor}50`,
                      color: selectedItem.accentColor
                    }}
                  >
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                      {selectedItem.title}
                    </h4>
                    <span className="text-xs text-zinc-400 font-mono">
                      {selectedItem.issuer} • {selectedItem.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Preview */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black/60 flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full max-h-[60vh] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-black flex items-center justify-center">
                    <img
                      src={selectedItem.galleryImages[activeImageIdx]}
                      alt={selectedItem.title}
                      className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    />
                  </div>

                  {/* Gallery Thumbnails */}
                  {selectedItem.galleryImages.length > 1 && (
                    <div className="flex items-center gap-3 mt-4">
                      {selectedItem.galleryImages.map((img, idx) => (
                        <button
                          key={img}
                          onClick={() => setActiveImageIdx(idx)}
                          className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            activeImageIdx === idx
                              ? 'border-emerald-500 scale-105 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#121319] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-zinc-400">
                  <span>
                    Team: <strong className="text-zinc-200">{selectedItem.team}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedItem.instagramUrl && (
                    <a
                      href={selectedItem.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 border border-pink-500/40 text-xs font-bold text-pink-200 hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(236,72,153,0.3)]"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span>Instagram Story</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <a
                    href={selectedItem.galleryImages[activeImageIdx]}
                    download="Achievement_Photo.jpg"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Current Photo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
