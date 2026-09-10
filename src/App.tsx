import React from 'react';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { BackgroundGrid } from './components/ui/BackgroundGrid';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { BeyondScreenSection } from './components/sections/BeyondScreenSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { JourneySection } from './components/sections/JourneySection';
import { TerminalSection } from './components/sections/TerminalSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  const sectionIds = ['hero', 'beyond', 'about', 'skills', 'projects', 'journey', 'terminal', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 150);
  const { isSupported: webglSupported } = useWebGLSupport();

  return (
    <div className="relative min-h-screen bg-[#05070D] text-[#F8FAFC] selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Cyber Background Mesh & Atmospheric Lighting */}
      <BackgroundGrid />

      {/* Top Futuristic Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection webglSupported={webglSupported} />
        <BeyondScreenSection webglSupported={webglSupported} />
        <AboutSection />
        <SkillsSection webglSupported={webglSupported} />
        <ProjectsSection webglSupported={webglSupported} />
        <JourneySection />
        <TerminalSection />
        <ContactSection />
      </main>

      {/* Bottom Telemetry & Navigation Footer */}
      <Footer />
    </div>
  );
};

export default App;
