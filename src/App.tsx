import React, { useState } from 'react';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { NETFLIX_PROFILES, NetflixProfile, NetflixItem, TRENDING_PROJECTS } from './constants/netflixData';
import { ProfileSelector } from './components/netflix/ProfileSelector';
import { NetflixIntroAnimation } from './components/netflix/NetflixIntroAnimation';
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
import { ScrollLaserProgress } from './components/ui/ScrollLaserProgress';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<NetflixProfile | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<NetflixItem | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSupported: webglSupported } = useWebGLSupport();

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
    <div className="relative min-h-screen bg-[#141414] text-white selection:bg-[#E50914]/30 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Top Stream Laser Progress */}
      <ScrollLaserProgress />

      {/* Iconic Netflix Animated "D" Ribbon Opening Sequence */}
      {showIntro && (
        <NetflixIntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* "Who's Watching?" Profile Selector Screen on Load */}
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

          {/* Main Streaming Dashboard */}
          <main className="relative z-10 pb-12">
            
            {/* Billboard Hero Section */}
            <BillboardHero
              onOpenDetailModal={setActiveModalItem}
              webglSupported={webglSupported}
            />

            {/* Negative Margin Carousel Stacking (Authentic Netflix Layering) */}
            <div className="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20 space-y-6 sm:space-y-10">
              
              {/* Row 1: Trending Projects */}
              <div id="projects">
                <ProjectRow
                  title="Trending Now: Flagship Releases"
                  subtitle="HIGH-CONCURRENCY & PRODUCTION READY"
                  items={filteredProjects}
                  onOpenDetailModal={setActiveModalItem}
                />
              </div>

              {/* Row 2: Top 10 Technologies */}
              <TopTenRow />

              {/* Row 3: Seasons & Episodes (Career Journey) */}
              <SeasonsEpisodeTimeline />

              {/* Showrunner Dossier / About Section */}
              <NetflixAbout />

              {/* Contact / Hire Section */}
              <NetflixContact />

            </div>
          </main>

          {/* Netflix Footer */}
          <NetflixFooter />

          {/* Item Detail Modal */}
          <NetflixDetailModal
            item={activeModalItem}
            onClose={() => setActiveModalItem(null)}
            webglSupported={webglSupported}
          />

          {/* Developer Debug Terminal Console */}
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