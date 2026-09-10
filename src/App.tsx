import React from 'react';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { BackgroundGrid } from './components/ui/BackgroundGrid';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { SectionDeckNavigator } from './components/ui/SectionDeckNavigator';
import { ScrollSnapWrapper } from './components/ui/ScrollSnapWrapper';

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
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'beyond', label: '3D Cosmos' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'terminal', label: 'CLI' },
    { id: 'contact', label: 'Contact' },
  ];

  const sectionIds = sections.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds, 120);
  const { isSupported: webglSupported } = useWebGLSupport();

  return (
    <div className="relative min-h-screen bg-[#040711] text-[#F8FAFC] selection:bg-[#00F2FE]/20 selection:text-[#00F2FE]">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Lightweight Aurora Background Atmosphere */}
      <BackgroundGrid />

      {/* Top Futuristic Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Interactive Right-side Deck Navigator with Click-To-Stop Snapping */}
      <SectionDeckNavigator sections={sections} activeSection={activeSection} />

      {/* Main Fast & Fluid Snap Sections */}
      <main className="relative z-10">
        <ScrollSnapWrapper id="hero">
          <HeroSection webglSupported={webglSupported} />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="beyond">
          <BeyondScreenSection webglSupported={webglSupported} />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="about">
          <AboutSection />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="skills">
          <SkillsSection webglSupported={webglSupported} />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="projects">
          <ProjectsSection webglSupported={webglSupported} />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="journey">
          <JourneySection />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="terminal">
          <TerminalSection />
        </ScrollSnapWrapper>

        <ScrollSnapWrapper id="contact">
          <ContactSection />
        </ScrollSnapWrapper>
      </main>

      {/* Bottom Telemetry & Navigation Footer */}
      <Footer />
    </div>
  );
};

export default App;
