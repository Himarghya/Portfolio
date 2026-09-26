import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const GlassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & state
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let isHovering = false;

    // Parallax orb positions with inertia
    let orb1X = 0, orb1Y = 0;
    let orb2X = 0, orb2Y = 0;
    let orb3X = 0, orb3Y = 0;

    // Particle pool
    const particles: Particle[] = [];
    const particleColors = [
      'rgba(229, 9, 20, ',    // Netflix Crimson
      'rgba(124, 58, 237, ',  // Deep Violet
      'rgba(59, 130, 246, ',  // Electric Blue
      'rgba(16, 185, 129, ',  // Emerald
      'rgba(244, 244, 245, '  // Bright Zinc
    ];

    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 1.6 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: baseRadius,
        baseRadius,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    // Ripple click shockwaves
    const ripples: ClickRipple[] = [];

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Mouse Move with Smooth Interpolation
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    // Click Shockwave
    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.min(width, height) * 0.35,
        alpha: 0.7
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick, { passive: true });

    // Main 60fps Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      // Smooth mouse coordinate easing
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Update interactive Spotlight DOM element
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentMouseX}px, ${currentMouseY}px, 0) translate(-50%, -50%)`;
        spotlightRef.current.style.opacity = isHovering ? '1' : '0.25';
      }

      // Parallax Orbs with differing spring inertia
      const centerOffsetX = (currentMouseX - width / 2) / (width / 2);
      const centerOffsetY = (currentMouseY - height / 2) / (height / 2);

      orb1X += (centerOffsetX * 45 - orb1X) * 0.05;
      orb1Y += (centerOffsetY * 45 - orb1Y) * 0.05;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate3d(${orb1X}px, ${orb1Y}px, 0)`;
      }

      orb2X += (-centerOffsetX * 60 - orb2X) * 0.04;
      orb2Y += (-centerOffsetY * 60 - orb2Y) * 0.04;
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate3d(${orb2X}px, ${orb2Y}px, 0)`;
      }

      orb3X += (centerOffsetX * 35 - orb3X) * 0.03;
      orb3Y += (-centerOffsetY * 35 - orb3Y) * 0.03;
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate3d(${orb3X}px, ${orb3Y}px, 0)`;
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Render & Update Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 4.5;
        rip.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(229, 9, 20, ${rip.alpha * 0.5})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Push nearby particles with ripple force
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - rip.x;
          const dy = p.y - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (Math.abs(dist - rip.radius) < 30) {
            const force = (1 - dist / rip.maxRadius) * 0.9;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        if (rip.alpha < 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Update & Draw Particle Network
      const connectionDist = 110;
      const mouseInteractionDist = 150;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply friction
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse attraction/repulsion
        if (isHovering) {
          const dx = currentMouseX - p.x;
          const dy = currentMouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInteractionDist && dist > 1) {
            const force = (1 - dist / mouseInteractionDist) * 0.08;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;

            // Connect to mouse cursor with subtle laser line
            const mouseLineAlpha = (1 - dist / mouseInteractionDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.strokeStyle = `rgba(229, 9, 20, ${mouseLineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    // Visibility change optimization: pause animation when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Cyber Grid (Glows under spotlight) */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px'
        }}
      />

      {/* GPU Interactive Radial Ambient Light Orbs with Parallax */}
      <div
        ref={orb1Ref}
        className="absolute -top-[12%] right-[2%] w-[680px] h-[680px] pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.16) 0%, rgba(229, 9, 20, 0.04) 45%, transparent 70%)'
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute top-[32%] -left-[10%] w-[720px] h-[720px] pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.13) 0%, rgba(79, 70, 229, 0.04) 50%, transparent 70%)'
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-[8%] right-[10%] w-[640px] h-[640px] pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.10) 0%, rgba(229, 9, 20, 0.03) 45%, transparent 70%)'
        }}
      />

      {/* Dynamic Cursor Spotlight Torch */}
      <div
        ref={spotlightRef}
        className="absolute w-[500px] h-[500px] rounded-full opacity-40 pointer-events-none transition-opacity duration-300 will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-1000px, -1000px, 0)',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.11) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)'
        }}
      />

      {/* Interactive Cyber Particle Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial Depth Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/20 to-[#0e0e11]/85 pointer-events-none" />
    </div>
  );
};

export default GlassBackground;
