import React, { useEffect, useRef } from 'react';
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

    // Initialize interactive particles (optimized count)
    const particleCount = Math.min(Math.floor((width * height) / 28000), 45);
    const particles: Particle[] = [];
    const colors = ['#E50914', '#FF3B47', '#A855F7', '#6366F1', '#00E5FF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.35 + 0.15
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update cursor spotlight directly on the DOM transform without React state re-renders
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

      // Render & connect particles (Zero-shadowBlur high-speed pass)
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

        if (distMouse < 180) {
          // Draw connection beam to cursor
          const alpha = (1 - distMouse / 180) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(229, 9, 20, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Gentle magnetic drift
          p.x -= (dxMouse / distMouse) * 0.5;
          p.y -= (dyMouse / distMouse) * 0.5;
        }

        // Draw inter-particle constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw particle node with crisp alpha (Zero shadowBlur overhead)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (distMouse < 160 ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = distMouse < 160 ? 0.85 : p.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
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

      {/* Interactive Cursor Spotlight Glow (DOM Ref transform for zero React re-render overhead) */}
      <div
        ref={spotlightRef}
        className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-r from-[#E50914]/18 via-[#8B5CF6]/12 to-transparent blur-[120px] opacity-40 pointer-events-none will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-1000px, -1000px, 0)'
        }}
      />

      {/* Interactive 60FPS Constellation Node Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
          contain: 'strict'
        }}
      />

      {/* Primary Crimson Ambient Light Orb */}
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.3, 0.45, 0.3]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute -top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E50914]/40 via-red-600/20 to-transparent blur-[110px] will-change-transform"
      />

      {/* Deep Violet Accent Light Orb */}
      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 30, -15, 0],
          scale: [0.95, 1.1, 1, 0.95],
          opacity: [0.2, 0.32, 0.2]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transform: 'translate3d(0,0,0)' }}
        className="absolute top-[35%] -left-[8%] w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#4f46e5]/25 via-[#7c3aed]/18 to-transparent blur-[115px] will-change-transform"
      />

      {/* Radial Depth Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/35 to-[#0e0e11]/85 pointer-events-none" />
    </div>
  );
};
