import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  flapTimer: number;
  flapSpeed: number;
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  trailHue: string;
}

export const ButterfliesCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Cursor & Interaction Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastMouseMoveTime = performance.now();
    let lastScrollTime = 0;
    let hasInteracted = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMouseMoveTime = performance.now();
      hasInteracted = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        lastMouseMoveTime = performance.now();
        hasInteracted = true;
      }
    };

    const onScroll = () => {
      lastScrollTime = performance.now();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- TWO CELESTIAL BUTTERFLIES (Silver, Obsidian & Pure White) ---
    const butterflies: Butterfly[] = [
      {
        x: width / 2 - 30,
        y: height / 2 - 20,
        vx: 3.5,
        vy: 0,
        angle: 0,
        flapTimer: 0,
        flapSpeed: 16.0,
        orbitAngle: 0,
        orbitRadius: 45,
        orbitSpeed: 1.4,
        size: 9.5, // Wing size
        trailHue: 'rgba(255, 255, 255, 0.8)',
      },
      {
        x: width / 2 + 30,
        y: height / 2 + 20,
        vx: 3.0,
        vy: 0,
        angle: Math.PI / 2,
        flapTimer: Math.PI * 0.5,
        flapSpeed: 17.5,
        orbitAngle: Math.PI * 0.75,
        orbitRadius: 68,
        orbitSpeed: -1.1,
        size: 8.0, // Slightly smaller companion
        trailHue: 'rgba(228, 228, 231, 0.75)',
      },
    ];

    // Sparkle Dust
    const sparkles: Particle[] = [];
    const spawnSparkle = (x: number, y: number) => {
      if (sparkles.length > 35) return;
      sparkles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 + 0.2,
        radius: Math.random() * 1.2 + 0.5,
        alpha: Math.random() * 0.5 + 0.4,
        decay: Math.random() * 0.025 + 0.018,
      });
    };

    // Shared Beacon
    let beaconX = width / 2;
    let beaconY = height / 2;
    let time = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      const timeScale = Math.min(Math.max(dt * 60, 0.35), 2.0);
      time += dt * 1.8;

      ctx.clearRect(0, 0, width, height);

      const isScrolling = currentTime - lastScrollTime < 700;
      const isMouseActive = !isScrolling && (hasInteracted && currentTime - lastMouseMoveTime < 1500);

      // Target anchor calculation
      let targetAnchorX: number;
      let targetAnchorY: number;

      if (isScrolling) {
        // Soar across the screen during scroll
        const spanX = width * 0.35;
        const spanY = height * 0.28;
        targetAnchorX = width * 0.5 + Math.sin(time * 0.75) * spanX;
        targetAnchorY = height * 0.5 + Math.cos(time * 1.05) * spanY;
      } else if (isMouseActive) {
        targetAnchorX = mouseX;
        targetAnchorY = mouseY;
      } else {
        // Idle screen patrol
        const spanX = width * 0.36;
        const spanY = height * 0.28;
        targetAnchorX = width * 0.5 + Math.sin(time * 0.42) * spanX;
        targetAnchorY = height * 0.5 + Math.sin(time * 0.84) * spanY;
      }

      // Smooth anchor blending
      const blendRate = Math.min(dt * 3.5, 0.14);
      beaconX += (targetAnchorX - beaconX) * blendRate;
      beaconY += (targetAnchorY - beaconY) * blendRate;

      // Update and draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        p.x += p.vx * timeScale;
        p.y += p.vy * timeScale;
        p.alpha -= p.decay * timeScale;

        if (p.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Update & Render Each Butterfly
      butterflies.forEach((b, idx) => {
        b.orbitAngle += dt * b.orbitSpeed;
        b.flapTimer += dt * b.flapSpeed;

        // Flutter scale (3D perspective wing folding)
        const wingFlap = Math.cos(b.flapTimer);
        const wingScale = Math.abs(wingFlap);

        // Individual target beacon orbiting around the shared center
        const bTargetX = beaconX + Math.cos(b.orbitAngle + idx * 0.6) * b.orbitRadius;
        const bTargetY = beaconY + Math.sin(b.orbitAngle * 1.2 + idx * 0.6) * (b.orbitRadius * 0.75);

        // Smooth steering
        const dx = bTargetX - b.x;
        const dy = bTargetY - b.y;
        const dist = Math.hypot(dx, dy);

        const targetSpeed = Math.min(5.2, 3.2 + dist * 0.015);
        const desiredVx = (dx / (dist || 1)) * targetSpeed;
        const desiredVy = (dy / (dist || 1)) * targetSpeed;

        const steer = 0.075 * timeScale;
        b.vx += (desiredVx - b.vx) * steer;
        b.vy += (desiredVy - b.vy) * steer;

        const curSpeed = Math.max(2.8, Math.min(5.2, Math.hypot(b.vx, b.vy)));
        const normVx = b.vx / (Math.hypot(b.vx, b.vy) || 1);
        const normVy = b.vy / (Math.hypot(b.vx, b.vy) || 1);
        b.vx = normVx * curSpeed;
        b.vy = normVy * curSpeed;

        b.angle = Math.atan2(b.vy, b.vx);

        // Natural flutter oscillation in flight angle
        const flutterOffset = Math.sin(b.flapTimer * 0.5) * 0.12;
        const moveAngle = b.angle + flutterOffset;

        b.x += Math.cos(moveAngle) * curSpeed * timeScale;
        b.y += Math.sin(moveAngle) * curSpeed * timeScale;

        // Spawn fairy dust trail
        if (Math.random() < 0.28) {
          spawnSparkle(b.x - Math.cos(b.angle) * 6, b.y - Math.sin(b.angle) * 6);
        }

        // --- DRAW CELESTIAL BUTTERFLY ---
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle + Math.PI / 2); // Orient head forward

        const s = b.size;

        // 1. Slender Obsidian Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 1.4, s * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#18181B';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // 2. Glowing Head & Antennae
        ctx.beginPath();
        ctx.arc(0, -s * 0.75, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Antennae
        [-1, 1].forEach((side) => {
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.75);
          ctx.quadraticCurveTo(side * 3, -s * 1.3, side * 4.5, -s * 1.5);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 0.55;
          ctx.stroke();

          // Antenna tip glow
          ctx.beginPath();
          ctx.arc(side * 4.5, -s * 1.5, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        });

        // 3. Ethereal Dual Wings (Forewing & Hindwing with 3D Flap Perspective)
        [-1, 1].forEach((side) => {
          ctx.save();
          // Scale X by side * wingScale for authentic 3D wing folding
          ctx.scale(side * wingScale, 1);

          // Forewing (Upper large wing)
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.2);
          ctx.bezierCurveTo(s * 0.8, -s * 1.2, s * 1.8, -s * 0.8, s * 1.6, 0);
          ctx.bezierCurveTo(s * 1.4, s * 0.4, s * 0.6, s * 0.2, 0, 0);
          ctx.closePath();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 0.85;
          ctx.stroke();

          // Forewing Inner Silver Filigree
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.1);
          ctx.quadraticCurveTo(s * 0.8, -s * 0.5, s * 1.3, -s * 0.2);
          ctx.moveTo(0, -s * 0.1);
          ctx.quadraticCurveTo(s * 0.6, -s * 0.8, s * 1.1, -s * 0.7);
          ctx.strokeStyle = 'rgba(228, 228, 231, 0.7)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Hindwing (Lower delicate teardrop wing)
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(s * 0.8, s * 0.2, s * 1.4, s * 0.8, s * 1.0, s * 1.4);
          ctx.bezierCurveTo(s * 0.6, s * 1.7, s * 0.2, s * 1.1, 0, s * 0.5);
          ctx.closePath();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 0.75;
          ctx.stroke();

          // Hindwing inner vein
          ctx.beginPath();
          ctx.moveTo(0, s * 0.1);
          ctx.quadraticCurveTo(s * 0.5, s * 0.6, s * 0.8, s * 1.2);
          ctx.strokeStyle = 'rgba(228, 228, 231, 0.6)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.restore();
        });

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        contain: 'strict'
      }}
    />
  );
};
