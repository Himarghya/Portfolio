import React from 'react';

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora Ambient Atmosphere */}
      <div className="absolute top-[-15%] left-[10%] w-[650px] h-[650px] rounded-full bg-[#00F2FE]/08 blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/09 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-[#D946EF]/07 blur-[180px] pointer-events-none" />
      <div className="absolute top-[70%] right-[15%] w-[550px] h-[550px] rounded-full bg-[#00F5D4]/06 blur-[150px] pointer-events-none" />

      {/* Subtle Geometric Dot Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 242, 254, 0.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 90%)'
        }}
      />
    </div>
  );
};
