import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileText, ExternalLink, Download, Eye, ShieldCheck, Clock, CheckCircle2, X } from 'lucide-react';

interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  issuerBadge: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  pdfUrl: string;
  imageUrl: string;
  duration: string;
  instructor: string;
  description: string;
  skills: string[];
  accentColor: string;
}

const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'udemy-fullstack-bootcamp',
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
    imageUrl: '/certificates/udemy-fullstack-bootcamp.png',
    description:
      'Rigorous mastery of modern full-stack web engineering, spanning frontend reactive architecture, backend REST & GraphQL APIs, relational database modeling with PostgreSQL, authentication workflows, cloud deployment, and Web3 decentralized application development.',
    skills: ['React.js', 'Node.js', 'PostgreSQL', 'Express.js', 'REST APIs', 'Authentication & JWT', 'Web3 / DApps'],
    accentColor: '#E50914' // Netflix Red
  }
];

export const NetflixCertificates: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CertificateItem | null>(null);
  const [modalViewMode, setModalViewMode] = useState<'image' | 'pdf'>('image');

  const handleOpenModal = (item: CertificateItem, mode: 'image' | 'pdf' = 'image') => {
    setSelectedItem(item);
    setModalViewMode(mode);
  };

  return (
    <section id="certificates" className="relative px-4 sm:px-12 py-10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914]">
              <Award className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E50914]">
              Verified Credentials &amp; Licenses
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Accredited Certifications
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Industry accredited technical masteries, in-depth bootcamps, and verified credentials.
          </p>
        </div>
      </div>

      {/* Grid of Certificate Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {CERTIFICATES_DATA.map((item) => (
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
                    <Award className="w-5 h-5" />
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
                    <span className="text-xs text-zinc-500">{item.date} • {item.duration}</span>
                  </div>
                </div>

                {/* Verified Badge */}
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Credential
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-300 transition-colors mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Visual Certificate Image Preview */}
              <div
                onClick={() => handleOpenModal(item, 'image')}
                className="relative mb-4 rounded-xl overflow-hidden border border-white/15 group/img cursor-pointer bg-black/40 aspect-[16/10]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-contain p-2 bg-[#f8f9fa] group-hover/img:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center">
                  <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4" />
                    Inspect Certificate Image
                  </span>
                </div>
              </div>

              {/* PDF Document Quick Bar */}
              <div
                onClick={() => handleOpenModal(item, 'pdf')}
                className="mb-4 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#E50914]" />
                  <span className="text-xs text-zinc-300 font-mono">
                    ID: {item.credentialId}
                  </span>
                </div>
                <span className="text-xs text-red-400 font-semibold hover:underline flex items-center gap-1">
                  <span>View PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

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
            <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 flex-wrap">
              <button
                onClick={() => handleOpenModal(item, 'image')}
                className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-red-400 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect Certificate</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={item.pdfUrl}
                  download="Himarghya_Das_Udemy_Fullstack_Certificate.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
                  title="Download Official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>

                <a
                  href={item.imageUrl}
                  download="Himarghya_Das_Udemy_Fullstack_Certificate.png"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Image</span>
                </a>

                <a
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E50914] hover:bg-red-700 text-xs font-bold text-white shadow-[0_0_12px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                >
                  <span>Verify on Udemy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / PDF & Certificate Modal */}
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
                    <Award className="w-5 h-5" />
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

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/[0.08] p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => setModalViewMode('image')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                        modalViewMode === 'image'
                          ? 'bg-white text-black shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Image
                    </button>
                    <button
                      onClick={() => setModalViewMode('pdf')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                        modalViewMode === 'pdf'
                          ? 'bg-[#E50914] text-white shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      PDF
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body Preview */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black/60 flex flex-col items-center justify-center min-h-[350px]">
                {modalViewMode === 'image' ? (
                  <div className="relative w-full rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-white flex items-center justify-center p-2 sm:p-4">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-auto max-h-[62vh] object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[62vh] rounded-xl overflow-hidden border border-white/15 bg-zinc-950 flex flex-col">
                    <iframe
                      src={`${selectedItem.pdfUrl}#toolbar=0&navpanes=0`}
                      className="w-full h-full border-none"
                      title={selectedItem.title}
                    />
                  </div>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#121319] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-zinc-400 font-mono">
                  Credential ID: <strong className="text-zinc-200">{selectedItem.credentialId}</strong>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={selectedItem.pdfUrl}
                    download="Himarghya_Das_Certificate.pdf"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <a
                    href={selectedItem.imageUrl}
                    download="Himarghya_Das_Certificate.png"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </a>

                  <a
                    href={selectedItem.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E50914] hover:bg-red-700 text-xs font-bold text-white shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                  >
                    <span>Verify on Udemy</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
