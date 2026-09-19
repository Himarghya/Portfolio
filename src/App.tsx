import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NETFLIX_PROFILES, NetflixProfile, NetflixItem, TRENDING_PROJECTS } from './constants/netflixData';
import { PortfolioIntroAnimation } from './components/portfolio/PortfolioIntroAnimation';
import { GlassBackground } from './components/ui/GlassBackground';
import { DragonCursor } from './components/ui/DragonCursor';
import { ProfileSelector } from './components/netflix/ProfileSelector';
import { NetflixNavbar } from './components/netflix/NetflixNavbar';
import { BillboardHero } from './components/netflix/BillboardHero';
import { ProjectRow } from './components/netflix/ProjectRow';
import { TopTenRow } from './components/netflix/TopTenRow';
import { SeasonsEpisodeTimeline } from './components/netflix/SeasonsEpisodeTimeline';
import { NetflixAbout } from './components/netflix/NetflixAbout';
import { NetflixContact } from './components/netflix/NetflixContact';
import { NetflixFooter } from './components/netflix/NetflixFooter';
import { NetflixDetailModal } from './components/netflix/NetflixDetailModal';
import { NetflixTerminal } from './components/netflix/NetflixTerminal';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<NetflixProfile | null>(NETFLIX_PROFILES[0]);
  const [activeModalItem, setActiveModalItem] = useState<NetflixItem | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectProfile = (profile: NetflixProfile) => {
    setSelectedProfile(profile);
  };

  const handleSwitchProfile = () => {
    setSelectedProfile(null);
  };

  // Filter items if searching
  const filteredProjects = searchQuery
    ? TRENDING_PROJECTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cast.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : TRENDING_PROJECTS;

  return (
    <div className="relative min-h-screen bg-[#0e0e11] text-zinc-100 selection:bg-[#E50914] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Ambient Glassmorphism Background Lights */}
      <GlassBackground />

      {/* Animated Cyber Fire Dragon Cursor Tracker */}
      <DragonCursor />

      {/* Portfolio Intro Opening Animation */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <PortfolioIntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Profile Selector Screen */}
      {!selectedProfile ? (
        <ProfileSelector onSelectProfile={handleSelectProfile} />
      ) : (
        <div className="relative">
          {/* Top Sticky Navigation */}
          <NetflixNavbar
            activeProfile={selectedProfile}
            onSwitchProfile={handleSwitchProfile}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenTerminal={() => setTerminalOpen(true)}
          />

          {/* Main Content Area */}
          <main className="relative z-10 pb-16">
            
            {/* Billboard Hero Section */}
            <BillboardHero
              onOpenDetailModal={setActiveModalItem}
              webglSupported={true}
            />

            {/* Consistent Spacing Section Flow */}
            <div className="space-y-12">
              
              {/* Row 1: Projects */}
              <div id="projects">
                <ProjectRow
                  title="Production Projects"
                  subtitle="SYSTEMS ARCHITECTURE &amp; DATA PIPELINES"
                  items={filteredProjects}
                  onOpenDetailModal={setActiveModalItem}
                />
              </div>

              {/* Row 2: Top Technologies */}
              <TopTenRow />

              {/* Row 3: Career Journey */}
              <SeasonsEpisodeTimeline />

              {/* About Section */}
              <NetflixAbout />

              {/* Contact Section */}
              <NetflixContact />

            </div>
          </main>

          {/* Footer */}
          <NetflixFooter />

          {/* Item Detail Modal */}
          <NetflixDetailModal
            item={activeModalItem}
            onClose={() => setActiveModalItem(null)}
            webglSupported={false}
          />

          {/* Developer CLI Modal */}
          <NetflixTerminal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
          />
        </div>
      )}

    </div>
  );
};

export default App;