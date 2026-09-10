import React from 'react';

export const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft Multi-color Pastel Glows */}
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#E0E7FF] blur-[140px] opacity-70" />
      <div className="absolute top-[20%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#F3E8FF] blur-[150px] opacity-80" />
      <div className="absolute top-[50%] left-[-10%] w-[650px] h-[650px] rounded-full bg-[#E0F2FE] blur-[160px] opacity-60" />
      <div className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#EDE9FE] blur-[140px] opacity-75" />
      <div className="absolute bottom-[20%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#FEF3C7] blur-[150px] opacity-40" />

      {/* Subtle Fluid Ribbon SVG Path */}
      <svg
        className="absolute top-0 right-0 w-full h-full opacity-35"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 1200,-100 C 1400,200 900,400 1100,700 C 1300,1000 800,900 600,1100"
          stroke="url(#silkGradient)"
          strokeWidth="120"
          strokeLinecap="round"
          filter="blur(50px)"
        />
        <defs>
          <linearGradient id="silkGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
