import React, { useEffect, useRef } from 'react';

interface WarpSpeedCanvasProps {
  onVelocityChange?: (velocity: number) => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  color: string;
  size: number;
}

export const WarpSpeedCanvas: React.FC<WarpSpeedCanvasProps> = ({ onVelocityChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(performance.now());

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

    // Initialize Starfield
    const numStars = 280;
    const stars: Star[] = [];
    const colors = ['#00E5FF', '#38BDF8', '#7C3AED', '#A3FF12', '#FFFFFF'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        prevZ: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 0.5
      });
    }

    // Track scroll velocity
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime.current);
      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY.current;

      const rawVel = (dy / dt) * 15;
      scrollVelocity.current = THREE_Clamp(rawVel, -65, 65);

      if (onVelocityChange) {
        onVelocityChange(scrollVelocity.current);
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
    };

    const THREE_Clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    window.addEventListener('scroll', handleScroll, { passive: true });

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      // Decay velocity back to base cruise speed
      scrollVelocity.current *= 0.92;
      const absVel = Math.abs(scrollVelocity.current);
      const baseSpeed = 0.8;
      const effectiveSpeed = baseSpeed + absVel * 1.2;

      ctx.fillStyle = 'rgba(5, 7, 13, 0.35)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= effectiveSpeed;

        if (star.z <= 0) {
          star.z = width;
          star.prevZ = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const prevK = 250 / Math.max(1, star.prevZ);
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;

          const alpha = THREE_Clamp((1 - star.z / width) * (0.4 + absVel * 0.03), 0.1, 1);

          ctx.beginPath();
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = star.size * (1 + absVel * 0.08);

          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Particle head
          ctx.beginPath();
          ctx.fillStyle = '#FFFFFF';
          ctx.arc(px, py, star.size * (0.8 + absVel * 0.04), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onVelocityChange]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-60"
    />
  );
};
