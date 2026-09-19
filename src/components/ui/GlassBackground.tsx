import React, { useEffect, useRef } from 'react';

export const GlassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Ultra-lightweight background particle nodes
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      color: '#E50914'
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        spotlightRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0.3';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Single-pass connection lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          if (dx * dx + dy * dy < 10000) { // 100px squared
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 2. Single-pass particle nodes
      ctx.beginPath();
      ctx.fillStyle = 'rgba(229, 9, 20, 0.4)';
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      // 3. Mouse connection beam if near
      if (mouseX > 0) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(229, 9, 20, 0.25)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          if (dx * dx + dy * dy < 22500) { // 150px squared
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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

      {/* GPU Zero-Blur Radial Gradient Light Orbs (100% Zero-Blur Filter Overhead) */}
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
        className="absolute w-[450px] h-[450px] rounded-full opacity-40 pointer-events-none"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-1000px, -1000px, 0)',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, rgba(139, 92, 246, 0.06) 40%, transparent 70%)'
        }}
      />

      {/* Single-Pass Constellation Node Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial Depth Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/30 to-[#0e0e11]/80 pointer-events-none" />
    </div>
  );
};
