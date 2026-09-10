import React from 'react';

interface SectionDeckNavigatorProps {
  sections: { id: string; label: string }[];
  activeSection: string;
}

export const SectionDeckNavigator: React.FC<SectionDeckNavigatorProps> = ({
  sections,
  activeSection,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto select-none">
      <div className="aurora-glass px-2.5 py-3 rounded-full flex flex-col items-center gap-2.5 shadow-2xl border border-white/10">
        {sections.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Dot indicator */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-6 bg-gradient-to-b from-[#00F2FE] to-[#8B5CF6] shadow-[0_0_12px_#00F2FE]'
                    : 'bg-slate-600 hover:bg-slate-300 hover:scale-125'
                }`}
              />

              {/* Hover Tooltip Label */}
              <div className="absolute right-7 px-2.5 py-1 rounded-md aurora-glass text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-[#00F2FE]/30">
                <span className="text-[#00F2FE] mr-1">0{idx + 1}</span>
                {sec.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
