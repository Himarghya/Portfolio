import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileText, ExternalLink, Download, Eye, CheckCircle, Trophy, Sparkles, X, ShieldCheck, Users, Calendar, Clock } from 'lucide-react';

interface CertificateItem {
  id: string;
  type: 'certification' | 'achievement';
  title: string;
  subtitle: string;
  issuer: string;
  issuerBadge?: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  pdfUrl?: string;
  imageUrl?: string;
  awardRank?: string;
  team?: string;
  teamMembers?: string[];
  duration?: string;
  instructor?: string;
  description: string;
  skills: string[];
  accentColor: string;
}

const CERTIFICATE_DATA: CertificateItem[] = [
  {
    id: 'roborush-3-achievement',
    type: 'achievement',
    title: 'RoboRush 3.0 (2025) — 3rd Position',
    subtitle: 'National Level Autonomous Robotics & Hardware Challenge',
    issuer: 'Electronics and Robotics Society (ERS)',
    issuerBadge: 'IIITDM Jabalpur',
    date: '2025',
    awardRank: '3rd Place (Bronze Trophy)',
    team: 'Super Strikers',
    teamMembers: ['Himarghya Das', 'Aditya Rajput', 'Harshal Paranjiya', 'Anuj'],
    imageUrl: '/certificates/roborush-3.0-achievement.png',
    description:
      'Awarded for securing Third Position in RoboRush 3.0 at IIITDM Jabalpur, acknowledging exceptional engineering skills, hardware-software integration, rapid sensor loop tuning, and dedication during high-intensity autonomous robotics rounds.',
    skills: ['Embedded Systems', 'Sensor Integration', 'Robotics Hardware', 'Algorithm Optimization', 'Team Leadership'],
    accentColor: '#F59E0B' // Amber / Gold
  },
  {
    id: 'udemy-fullstack-bootcamp',
    type: 'certification',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    subtitle: 'Comprehensive 62-Hour Professional Full-Stack Certification',
    issuer: 'Udemy',
    issuerBadge: 'Dr. Angela Yu',
    date: 'Sept. 17, 2026',
    duration: '62 Total Hours',
    instructor: 'Dr. Angela Yu (Developer and Lead Instructor)',
    credentialId: 'UC-629e3310-b94c-4f76-a91e-1b90d378d496',
    verifyUrl: 'https://ude.my/UC-629e3310-b94c-4f76-a91e-1b90d378d496',
    pdfUrl: '/certificates/udemy-fullstack-bootcamp.pdf',
    description:
      'Rigorous mastery of modern full-stack web engineering, spanning frontend reactive architecture, backend REST & GraphQL APIs, relational database modeling with PostgreSQL, authentication workflows, cloud deployment, and Web3 decentralized application development.',
    skills: ['React.js', 'Node.js', 'PostgreSQL', 'Express.js', 'REST APIs', 'Authentication & JWT', 'Web3 / DApps'],
    accentColor: '#E50914' // Netflix Red
  }
];

export const NetflixCertificates: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'certification' | 'achievement'>('all');
  const [selectedItem, setSelectedItem] = useState<CertificateItem | null>(null);

  const filteredItems = CERTIFICATE_DATA.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <section id="certificates" className="relative px-4 sm:px-12 py-12 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914]">
              <Trophy className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E50914]">
              Accreditation &amp; Honors
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Certificates &amp; Achievements
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Verified credentials, industry masteries, and podium finishes in competitive robotics and software engineering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 bg-white/[0.04] p-1 rounded-xl border border-white/10 backdrop-blur-md self-start sm:self-auto">
          {[
            { key: 'all', label: 'All Honors' },
            { key: 'achievement', label: 'Achievements (Podium)' },
            { key: 'certification', label: 'Certifications' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-xl border flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${item.accentColor}18`,
                      borderColor: `${item.accentColor}40`,
                      color: item.accentColor
                    }}
                  >
                    {item.type === 'achievement' ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      <Award className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                        {item.issuer}
                      </span>
                      {item.issuerBadge && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-zinc-300 border border-white/10">
                          {item.issuerBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">{item.date}</span>
                  </div>
                </div>

                {/* Status / Rank Badge */}
                {item.awardRank ? (
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {item.awardRank}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-300 transition-colors mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Visual Thumbnail / Preview Strip */}
              {item.imageUrl && (
                <div
                  onClick={() => setSelectedItem(item)}
                  className="relative mb-5 rounded-xl overflow-hidden border border-white/15 group/img cursor-pointer bg-black/40 aspect-[16/9]"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Eye className="w-4 h-4" />
                      View High-Res Certificate
                    </span>
                  </div>
                </div>
              )}

              {/* PDF Document Preview Box */}
              {item.pdfUrl && !item.imageUrl && (
                <div
                  onClick={() => setSelectedItem(item)}
                  className="relative mb-5 p-4 rounded-xl border border-white/15 bg-gradient-to-r from-zinc-900/90 to-zinc-950/90 hover:border-white/30 cursor-pointer group/pdf transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] group-hover/pdf:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">Official Certificate PDF</span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/10 px-1.5 py-0.5 rounded">62 Hours</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate max-w-xs">
                        ID: {item.credentialId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-400 group-hover/pdf:text-red-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Preview</span>
                  </div>
                </div>
              )}

              {/* Team Members List (If Achievement) */}
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
              <div className="flex flex-wrap gap-1.5">
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
                onClick={() => setSelectedItem(item)}
                className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-red-400 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect Certificate</span>
              </button>

              <div className="flex items-center gap-2">
                {item.pdfUrl && (
                  <a
                    href={item.pdfUrl}
                    download="Himarghya_Das_Udemy_Fullstack_Certificate.pdf"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
                    title="Download Official PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </a>
                )}

                {item.imageUrl && (
                  <a
                    href={item.imageUrl}
                    download="Himarghya_Das_RoboRush_Certificate.png"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
                    title="Download High-Res Image"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Image</span>
                  </a>
                )}

                {item.verifyUrl && (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E50914] hover:bg-red-700 text-xs font-semibold text-white shadow-[0_0_12px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / PDF & Certificate Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
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
                    {selectedItem.type === 'achievement' ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      <Award className="w-5 h-5" />
                    )}
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
              <div className="flex-1 overflow-y-auto p-6 bg-black/60 flex flex-col items-center justify-center min-h-[350px]">
                {selectedItem.imageUrl ? (
                  <div className="relative w-full rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-black">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                    />
                  </div>
                ) : selectedItem.pdfUrl ? (
                  <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-white/15 bg-zinc-950 flex flex-col">
                    <iframe
                      src={`${selectedItem.pdfUrl}#toolbar=0&navpanes=0`}
                      className="w-full h-full border-none"
                      title={selectedItem.title}
                    />
                  </div>
                ) : null}
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#121319] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-zinc-400">
                  {selectedItem.credentialId && (
                    <span className="font-mono">
                      Credential ID: <strong className="text-zinc-200">{selectedItem.credentialId}</strong>
                    </span>
                  )}
                  {selectedItem.teamMembers && (
                    <span>
                      Team: <strong className="text-zinc-200">{selectedItem.team}</strong> ({selectedItem.teamMembers.join(', ')})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedItem.pdfUrl && (
                    <a
                      href={selectedItem.pdfUrl}
                      download="Certificate.pdf"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </a>
                  )}

                  {selectedItem.imageUrl && (
                    <a
                      href={selectedItem.imageUrl}
                      download="RoboRush_Certificate.png"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Image</span>
                    </a>
                  )}

                  {selectedItem.verifyUrl && (
                    <a
                      href={selectedItem.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E50914] hover:bg-red-700 text-xs font-bold text-white shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                    >
                      <span>Verify on Udemy</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
