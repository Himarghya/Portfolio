import React, { useEffect, useRef } from 'react';

export const GlassBackground: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        spotlightRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0.3';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      {/* GPU Radial Gradient Ambient Light Orbs */}
      <div
        className="absolute -top-[15%] right-[0%] w-[650px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.18) 0%, rgba(229, 9, 20, 0.05) 45%, transparent 70%)'
        }}
      />
      <div
        className="absolute top-[35%] -left-[12%] w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-[5%] right-[8%] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, rgba(153, 27, 27, 0.04) 45%, transparent 70%)'
        }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        ref={spotlightRef}
        className="absolute w-[450px] h-[450px] rounded-full opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-1000px, -1000px, 0)',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, rgba(139, 92, 246, 0.06) 40%, transparent 70%)'
        }}
      />

      {/* Radial Depth Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/30 to-[#0e0e11]/80 pointer-events-none" />
    </div>
  );
};

export default GlassBackground;
