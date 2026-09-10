import React from 'react';
import { useScrollSpy } from './hooks/useScrollSpy';
import { FluidBackground } from './components/ui/FluidBackground';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TechnologiesSection } from './components/sections/TechnologiesSection';
import { WorkSection } from './components/sections/WorkSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  const sectionIds = ['home', 'about', 'services', 'work', 'process', 'testimonials', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 120);

  return (
    <div className="relative min-h-screen bg-[#F4F6FB] text-[#0F172A] selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Ethereal Silk & Pastel Glow Atmosphere */}
      <FluidBackground />

      {/* Glass Capsule Sticky Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections Matching Reference Layout */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechnologiesSection />
        <WorkSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Clean Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
