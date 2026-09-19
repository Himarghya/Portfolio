import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 120): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'hero');

  useEffect(() => {
    let sectionOffsets: { id: string; top: number }[] = [];

    // Cache section top offsets to prevent layout thrashing on scroll
    const updateOffsets = () => {
      sectionOffsets = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter((item): item is { id: string; top: number } => item !== null);
    };

    updateOffsets();
    window.addEventListener('resize', updateOffsets, { passive: true });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + offset;
          for (let i = sectionOffsets.length - 1; i >= 0; i--) {
            if (scrollPosition >= sectionOffsets[i].top) {
              setActiveSection(sectionOffsets[i].id);
              ticking = false;
              return;
            }
          }
          setActiveSection(sectionIds[0] || 'hero');
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateOffsets);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
