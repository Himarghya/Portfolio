import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseAngle: number;
}

interface TrailSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

interface ClickWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const GlassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const orb4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & velocity tracking
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let prevMouseX = width / 2;
    let prevMouseY = height / 2;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;
    let isHovering = false;

    // Parallax orb coordinates
    let orb1X = 0, orb1Y = 0;
    let orb2X = 0, orb2Y = 0;
    let orb3X = 0, orb3Y = 0;
    let orb4X = 0, orb4Y = 0;

    // Palette: Netflix Red, Electric Violet, Cyber Blue, Neon Cyan, Hot Amber
    const palette = [
      { rgb: '229, 9, 20', hex: '#E50914' },    // Crimson
      { rgb: '168, 85, 247', hex: '#A855F7' },  // Purple
      { rgb: '59, 130, 246', hex: '#3B82F6' },  // Electric Blue
      { rgb: '6, 182, 212', hex: '#06B6D4' },   // Cyan
      { rgb: '244, 63, 94', hex: '#F43F5E' },   // Rose
      { rgb: '255, 255, 255', hex: '#FFFFFF' }  // White Spark
    ];

    // Main particle pool
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 110);

    for (let i = 0; i < particleCount; i++) {
      const pColor = palette[Math.floor(Math.random() * palette.length)];
      const baseRadius = Math.random() * 2.2 + 1.0;
      const baseAlpha = Math.random() * 0.45 + 0.35;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: baseRadius,
        baseRadius,
        color: pColor.rgb,
        glowColor: pColor.hex,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }

    // Interactive mouse trail sparks pool
    const trailSparks: TrailSpark[] = [];
    // Click shockwaves pool
    const clickWaves: ClickWave[] = [];

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Mouse move handler
    let lastSpawnTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isHovering = true;

      // Spawn interactive micro-embers on mouse movement
      const now = performance.now();
      if (now - lastSpawnTime > 25 && trailSparks.length < 50) {
        lastSpawnTime = now;
        const pColor = palette[Math.floor(Math.random() * palette.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;

        trailSparks.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed + mouseSpeedX * 0.15,
          vy: Math.sin(angle) * speed + mouseSpeedY * 0.15,
          radius: Math.random() * 2.5 + 1.2,
          color: pColor.rgb,
          alpha: 0.9,
          decay: Math.random() * 0.025 + 0.02
        });
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    // Click explosive ripple & particle burst
    const handleClick = (e: MouseEvent) => {
      // Add primary & secondary shockwave rings
      clickWaves.push(
        {
          x: e.clientX,
          y: e.clientY,
          radius: 5,
          maxRadius: Math.min(width, height) * 0.45,
          alpha: 0.85,
          color: '229, 9, 20'
        },
        {
          x: e.clientX,
          y: e.clientY,
          radius: 2,
          maxRadius: Math.min(width, height) * 0.35,
          alpha: 0.65,
          color: '168, 85, 247'
        }
      );

      // Burst of spark particles on click
      for (let k = 0; k < 18; k++) {
        const pColor = palette[Math.floor(Math.random() * palette.length)];
        const angle = (k / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 5 + 3;

        trailSparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1.5,
          color: pColor.rgb,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick, { passive: true });

    // Main 60fps render loop
    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      // Calculate mouse speed
      mouseSpeedX = targetMouseX - prevMouseX;
      mouseSpeedY = targetMouseY - prevMouseY;
      prevMouseX = targetMouseX;
      prevMouseY = targetMouseY;

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.12;
      currentMouseY += (targetMouseY - currentMouseY) * 0.12;

      // Update Cursor Spotlight DOM Element
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentMouseX}px, ${currentMouseY}px, 0) translate(-50%, -50%)`;
        spotlightRef.current.style.opacity = isHovering ? '1' : '0.4';
      }

      // Parallax Orbs dynamic shifting with inertia
      const centerOffsetX = (currentMouseX - width / 2) / (width / 2);
      const centerOffsetY = (currentMouseY - height / 2) / (height / 2);

      orb1X += (centerOffsetX * 65 - orb1X) * 0.06;
      orb1Y += (centerOffsetY * 65 - orb1Y) * 0.06;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate3d(${orb1X}px, ${orb1Y}px, 0)`;
      }

      orb2X += (-centerOffsetX * 85 - orb2X) * 0.05;
      orb2Y += (-centerOffsetY * 85 - orb2Y) * 0.05;
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate3d(${orb2X}px, ${orb2Y}px, 0)`;
      }

      orb3X += (centerOffsetX * 50 - orb3X) * 0.04;
      orb3Y += (-centerOffsetY * 50 - orb3Y) * 0.04;
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate3d(${orb3X}px, ${orb3Y}px, 0)`;
      }

      orb4X += (-centerOffsetX * 45 - orb4X) * 0.04;
      orb4Y += (centerOffsetY * 45 - orb4Y) * 0.04;
      if (orb4Ref.current) {
        orb4Ref.current.style.transform = `translate3d(${orb4X}px, ${orb4Y}px, 0)`;
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Render & Update Click Shockwaves
      for (let r = clickWaves.length - 1; r >= 0; r--) {
        const wave = clickWaves[r];
        wave.radius += 5.5;
        wave.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${wave.color}, ${wave.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = `rgba(${wave.color}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Push particles outwards with fluid shockwave force
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - wave.x;
          const dy = p.y - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (Math.abs(dist - wave.radius) < 40) {
            const force = (1 - dist / wave.maxRadius) * 1.6;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        if (wave.alpha < 0.01 || wave.radius >= wave.maxRadius) {
          clickWaves.splice(r, 1);
        }
      }

      // 2. Render & Update Mouse Trail Sparks
      for (let s = trailSparks.length - 1; s >= 0; s--) {
        const spark = trailSparks[s];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.95;
        spark.vy *= 0.95;
        spark.alpha -= spark.decay;
        spark.radius *= 0.98;

        if (spark.alpha <= 0.01 || spark.radius <= 0.2) {
          trailSparks.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${spark.color}, ${spark.alpha})`;
        ctx.shadowColor = `rgba(${spark.color}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Render & Update Main Particle Constellation
      const connectionDist = 135;
      const mouseInfluenceDist = 200;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic pulsing alpha & glow
        p.pulseAngle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.2;

        // Apply friction
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Base organic gentle drift
        p.x += p.vx + Math.sin(p.pulseAngle * 0.5) * 0.2;
        p.y += p.vy + Math.cos(p.pulseAngle * 0.5) * 0.2;

        // Boundary wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse Magnetic & Wind Interaction
        if (isHovering) {
          const dx = currentMouseX - p.x;
          const dy = currentMouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist && dist > 2) {
            const normDist = 1 - dist / mouseInfluenceDist;
            
            // Attraction force
            const pullForce = normDist * 0.12;
            p.vx += (dx / dist) * pullForce;
            p.vy += (dy / dist) * pullForce;

            // Wind turbulence from fast mouse swings
            p.vx += mouseSpeedX * normDist * 0.03;
            p.vy += mouseSpeedY * normDist * 0.03;

            // Draw vibrant laser connector from cursor to particle
            const laserAlpha = normDist * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.strokeStyle = `rgba(${p.color}, ${laserAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw particle node with glowing halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.1, p.alpha)})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles with cyber lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
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
      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px'
        }}
      />

      {/* GPU Interactive Ambient Light Orbs with Parallax Springs */}
      {/* 1. Netflix Crimson Orb (Top-Right) */}
      <div
        ref={orb1Ref}
        className="absolute -top-[10%] right-[0%] w-[750px] h-[750px] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.22) 0%, rgba(229, 9, 20, 0.06) 45%, transparent 70%)'
        }}
      />

      {/* 2. Deep Electric Violet Orb (Mid-Left) */}
      <div
        ref={orb2Ref}
        className="absolute top-[28%] -left-[12%] w-[800px] h-[800px] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)'
        }}
      />

      {/* 3. Cyber Cyan & Azure Orb (Bottom-Right) */}
      <div
        ref={orb3Ref}
        className="absolute bottom-[4%] right-[5%] w-[720px] h-[720px] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(229, 9, 20, 0.05) 45%, transparent 70%)'
        }}
      />

      {/* 4. Center-Left Ambient Glow */}
      <div
        ref={orb4Ref}
        className="absolute top-[65%] -left-[5%] w-[600px] h-[600px] pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.14) 0%, rgba(168, 85, 247, 0.04) 45%, transparent 70%)'
        }}
      />

      {/* Dynamic Interactive Cursor Spotlight Torch */}
      <div
        ref={spotlightRef}
        className="absolute w-[550px] h-[550px] rounded-full opacity-60 pointer-events-none transition-opacity duration-300 will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-1000px, -1000px, 0)',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.16) 0%, rgba(168, 85, 247, 0.08) 35%, transparent 70%)'
        }}
      />

      {/* 60fps Interactive Canvas (Particles, Embers, Constellation, Wind & Ripples) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Cinematic Depth Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0e11]/15 to-[#0e0e11]/85 pointer-events-none" />
    </div>
  );
};

export default GlassBackground;
