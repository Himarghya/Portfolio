import React from 'react';

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Cyberpunk Grid */}
      <div 
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)'
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#00E5FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#7C3AED]/12 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[650px] h-[650px] rounded-full bg-[#3B82F6]/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-[75%] right-[20%] w-[450px] h-[450px] rounded-full bg-[#A3FF12]/05 blur-[130px] pointer-events-none" />

      {/* Subtle Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
    </div>
  );
};
