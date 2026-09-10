import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { useCyberSound } from './hooks/useCyberSound';
import { BackgroundGrid } from './components/ui/BackgroundGrid';
import { WarpSpeedCanvas } from './components/ui/WarpSpeedCanvas';
import { ScrollTelemetryHUD } from './components/ui/ScrollTelemetryHUD';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { ThrillingSectionWrapper } from './components/ui/ThrillingSectionWrapper';

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
  const { soundEnabled, toggleSound, playHover, playClick, playWarp } = useCyberSound();
  const [scrollVelocity, setScrollVelocity] = useState(0);

  // Initialize Lenis smooth inertial scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleVelocityChange = (vel: number) => {
    setScrollVelocity(vel);
    playWarp(vel);
  };

  return (
    <div className="relative min-h-screen bg-[#05070D] text-[#F8FAFC] selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Cyber Warp Speed Particle Canvas reacting to scroll velocity */}
      <WarpSpeedCanvas onVelocityChange={handleVelocityChange} />

      {/* Cyber Background Mesh & Atmospheric Lighting */}
      <BackgroundGrid />

      {/* Scroll Laser & Altitude Telemetry HUD */}
      <ScrollTelemetryHUD activeSection={activeSection} velocity={scrollVelocity} />

      {/* Top Futuristic Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onHoverSound={playHover}
        onClickSound={playClick}
      />

      {/* Main Thrilling 3D Content Sections */}
      <main className="relative z-10">
        <HeroSection webglSupported={webglSupported} />

        <ThrillingSectionWrapper id="beyond-wrapper">
          <BeyondScreenSection webglSupported={webglSupported} />
        </ThrillingSectionWrapper>

        <ThrillingSectionWrapper id="about-wrapper">
          <AboutSection />
        </ThrillingSectionWrapper>

        <ThrillingSectionWrapper id="skills-wrapper">
          <SkillsSection webglSupported={webglSupported} />
        </ThrillingSectionWrapper>

        <ThrillingSectionWrapper id="projects-wrapper">
          <ProjectsSection webglSupported={webglSupported} />
        </ThrillingSectionWrapper>

        <ThrillingSectionWrapper id="journey-wrapper">
          <JourneySection />
        </ThrillingSectionWrapper>

        <ThrillingSectionWrapper id="terminal-wrapper">
          <TerminalSection />
        </ThrillingSectionWrapper>

        <ThrillingSectionWrapper id="contact-wrapper">
          <ContactSection />
        </ThrillingSectionWrapper>
      </main>

      {/* Bottom Telemetry & Navigation Footer */}
      <Footer />
    </div>
  );
};

export default App;
