import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

export const GlassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize interactive particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);
    const particles: Particle[] = [];
    const colors = ['#E50914', '#FF3B47', '#A855F7', '#6366F1', '#00E5FF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.4 + 0.2
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setIsHovered(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse magnetic interaction
        const dxMouse = mouseX - p.x;
        const dyMouse = mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 200) {
          // Draw connection beam to cursor
          const alpha = (1 - distMouse / 200) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(229, 9, 20, ${alpha})`;
          ctx.lineWidth = (1 - distMouse / 200) * 1.5;
          ctx.stroke();

          // Gentle magnetic push away
          p.x -= (dxMouse / distMouse) * 0.8;
          p.y -= (dyMouse / distMouse) * 0.8;
        }

        // Draw inter-particle constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (distMouse < 180 ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = distMouse < 180 ? 10 : 4;
        ctx.globalAlpha = distMouse < 180 ? 0.9 : p.baseAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Cyber Grid with Perspective */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className={`absolute w-[560px] h-[560px] rounded-full bg-gradient-to-r from-[#E50914]/22 via-[#8B5CF6]/15 to-transparent blur-[130px] transition-opacity duration-500 ease-out -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-40'
        }`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Interactive 60FPS Constellation Node Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Cyber Scanning Laser Line Accent */}
      <motion.div
        animate={{
          y: ['-10%', '110%'],
          opacity: [0, 0.5, 0.7, 0.5, 0]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/45 to-transparent shadow-[0_0_15px_rgba(229,9,20,0.6)]"
      />

      {/* Primary Crimson Ambient Light Orb (Top-Right Hero Glow) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.35, 0.5, 0.35]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute -top-[12%] right-[5%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#E50914]/45 via-red-600/25 to-transparent blur-[120px] will-change-transform"
      />

      {/* Deep Violet Accent Light Orb (Center-Left) */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [0.94, 1.12, 1, 0.94],
          opacity: [0.22, 0.35, 0.22]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute top-[32%] -left-[10%] w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#4f46e5]/30 via-[#7c3aed]/20 to-transparent blur-[125px] will-change-transform"
      />

      {/* Ruby Ambient Orb (Bottom-Right) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -25, 30, 0],
          scale: [1, 0.94, 1.08, 1],
          opacity: [0.25, 0.38, 0.25]
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute bottom-[8%] right-[10%] w-[580px] h-[580px] rounded-full bg-gradient-to-tl from-[#E50914]/35 via-red-950/25 to-transparent blur-[115px] will-change-transform"
      />

      {/* Radial Depth Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/35 to-[#0e0e11]/85 pointer-events-none" />
    </div>
  );
};
