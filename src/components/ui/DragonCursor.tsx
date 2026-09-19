import React, { useEffect, useRef } from 'react';

interface Segment {
  x: number;
  y: number;
  angle: number;
  radius: number;
}

interface WingRay {
  baseSegIdx: number;
  baseOffsetAngle: number;
  length: number;
  curveFactor: number;
  thickness: number;
  joints: { x: number; y: number }[];
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
}

export const DragonCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let prevW = width;
    let prevH = height;

    // Avoid canvas buffer reset on minor mobile address bar scrolls
    const onResize = () => {
      if (!canvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      if (Math.abs(newW - prevW) > 60 || Math.abs(newH - prevH) > 90) {
        width = canvas.width = newW;
        height = canvas.height = newH;
        prevW = newW;
        prevH = newH;
      }
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Mouse & Movement Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastMouseMoveTime = performance.now();
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

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- DRAGON SPINE CONFIGURATION ---
    const NUM_SEGMENTS = 40;
    const SEGMENT_DIST = 11.5;
    const segments: Segment[] = [];

    let posX = width / 2;
    let posY = height / 2;
    let currentAngle = -Math.PI / 4;
    let currentSpeed = 5.0;

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      let r = 16;
      if (i < 4) r = 10 + i * 2.5; // Head/neck
      else if (i < 12) r = 18 - (i - 4) * 0.4; // Chest
      else r = Math.max(15 - (i - 12) * 0.45, 1.8); // Serpentine taper

      segments.push({
        x: posX - i * SEGMENT_DIST,
        y: posY,
        angle: currentAngle,
        radius: r,
      });
    }

    // --- FEATHERED RAY WINGS (Lionfish Celestial Wing Quills) ---
    const createWingRays = (side: 1 | -1): WingRay[] => {
      const rays: WingRay[] = [];
      const NUM_RAYS = 18;

      for (let i = 0; i < NUM_RAYS; i++) {
        const progress = i / (NUM_RAYS - 1);
        const segIdx = Math.floor(4 + progress * 7);
        const baseOffset = (Math.PI * 0.35 + progress * Math.PI * 0.55) * side;
        
        const lenMultiplier = Math.sin(progress * Math.PI);
        const rayLen = 45 + lenMultiplier * 125 + (1 - progress) * 25;
        const curve = (0.4 + progress * 0.45) * side;

        const joints = [
          { x: posX, y: posY },
          { x: posX, y: posY },
          { x: posX, y: posY },
          { x: posX, y: posY },
        ];

        rays.push({
          baseSegIdx: segIdx,
          baseOffsetAngle: baseOffset,
          length: rayLen,
          curveFactor: curve,
          thickness: Math.max(2.2 - progress * 1.5, 0.7),
          joints,
        });
      }
      return rays;
    };

    const leftWingRays = createWingRays(-1);
    const rightWingRays = createWingRays(1);

    // --- DORSAL & VENTRAL SPINE NEEDLE QUILLS ---
    interface Quill {
      segIdx: number;
      side: 1 | -1;
      length: number;
      angleOffset: number;
    }
    const spineQuills: Quill[] = [];
    for (let i = 9; i < NUM_SEGMENTS - 2; i += 2) {
      const prog = (i - 9) / (NUM_SEGMENTS - 11);
      const qLen = (1 - prog) * 40 + 10;
      spineQuills.push({ segIdx: i, side: -1, length: qLen, angleOffset: Math.PI * 0.78 });
      spineQuills.push({ segIdx: i, side: 1, length: qLen, angleOffset: -Math.PI * 0.78 });
    }

    // Soft Stardust Embers
    const embers: Ember[] = [];
    const EMBER_COLORS = ['#FFFFFF', '#F4F4F5', '#E4E4E7', '#D4D4D8', '#A1A1AA'];

    const spawnEmber = (x: number, y: number, spread: number, vx: number, vy: number) => {
      if (embers.length > 50) return;
      embers.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: vx + (Math.random() - 0.5) * 1.2,
        vy: vy + (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 1.8 + 0.6,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        alpha: Math.random() * 0.6 + 0.3,
        decay: Math.random() * 0.025 + 0.02,
      });
    };

    // Autonomous Waypoint & Flight State Machine
    let wanderX = width * 0.5;
    let wanderY = height * 0.5;
    let nextWanderChange = performance.now();

    const pickNewWanderTarget = () => {
      const margin = 100;
      wanderX = margin + Math.random() * (width - margin * 2);
      wanderY = margin + Math.random() * (height - margin * 2);
      nextWanderChange = performance.now() + 3000 + Math.random() * 4000;
    };

    // Realistic Flapping Event State Machine
    let flapMode: 'GLIDE' | 'FLAPPING' = 'GLIDE';
    let flapTimer = 0;
    let nextFlapBurstTime = performance.now() + 2000;
    let flapDuration = 0;
    let wingBeatProgress = 0;

    let time = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      time += dt * 2.2;

      ctx.clearRect(0, 0, width, height);

      const isIdle = currentTime - lastMouseMoveTime > 1400 || !hasInteracted;

      // 1. DETERMINE FLIGHT TARGET
      let targetX = mouseX;
      let targetY = mouseY;

      if (isIdle) {
        if (currentTime > nextWanderChange) {
          pickNewWanderTarget();
        }
        targetX = wanderX;
        targetY = wanderY;
      }

      // 2. WING FLAPPING STATE MACHINE (Smooth Non-Blocking Flap Bursts)
      if (currentTime > nextFlapBurstTime && flapMode === 'GLIDE') {
        flapMode = 'FLAPPING';
        flapTimer = 0;
        flapDuration = 1.3 + Math.random() * 1.1;
      }

      let flapAngleDelta = 0;
      if (flapMode === 'FLAPPING') {
        flapTimer += dt * 3.2;
        wingBeatProgress = Math.sin(flapTimer * 8.5);
        flapAngleDelta = wingBeatProgress * 0.72;

        if (wingBeatProgress > 0.2) {
          currentSpeed += 0.16;
        }

        if (flapTimer >= flapDuration) {
          flapMode = 'GLIDE';
          nextFlapBurstTime = currentTime + 2500 + Math.random() * 4500;
        }
      } else {
        flapAngleDelta = Math.sin(time * 2.2) * 0.12;
      }

      const targetCruisingSpeed = isIdle ? 4.8 : 6.2;
      currentSpeed += (targetCruisingSpeed - currentSpeed) * 0.04;
      currentSpeed = Math.min(Math.max(currentSpeed, 3.5), 8.5);

      // 3. STEERING & INERTIA TOWARDS TARGET
      const dTargetX = targetX - posX;
      const dTargetY = targetY - posY;
      const distToTarget = Math.sqrt(dTargetX * dTargetX + dTargetY * dTargetY);

      if (distToTarget > 25) {
        const desiredAngle = Math.atan2(dTargetY, dTargetX);
        let angleDiff = desiredAngle - currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        const turnRate = isIdle ? 0.045 : 0.078;
        currentAngle += angleDiff * turnRate;
      }

      const waveAmplitude = Math.min(currentSpeed * 0.35, 3.5);
      const waveAngle = Math.sin(time * 4) * (waveAmplitude * 0.05);

      posX += Math.cos(currentAngle + waveAngle) * currentSpeed;
      posY += Math.sin(currentAngle + waveAngle) * currentSpeed;

      if (posX < 60) posX += 2;
      if (posX > width - 60) posX -= 2;
      if (posY < 60) posY += 2;
      if (posY > height - 60) posY -= 2;

      // 4. INVERSE KINEMATICS SPINE PROPAGATION
      segments[0].x = posX;
      segments[0].y = posY;
      segments[0].angle = currentAngle;

      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const sDx = prev.x - curr.x;
        const sDy = prev.y - curr.y;
        let sAngle = Math.atan2(sDy, sDx);

        const sWave = Math.sin(time * 3.8 - i * 0.32) * (0.07 + (i / NUM_SEGMENTS) * 0.14);
        sAngle += sWave;

        curr.x = prev.x - Math.cos(sAngle) * SEGMENT_DIST;
        curr.y = prev.y - Math.sin(sAngle) * SEGMENT_DIST;
        curr.angle = sAngle;
      }

      // Spawn breath sparks & tail embers
      if (Math.random() < 0.35 || flapMode === 'FLAPPING') {
        const mouthX = posX + Math.cos(currentAngle) * 18;
        const mouthY = posY + Math.sin(currentAngle) * 18;
        spawnEmber(mouthX, mouthY, 5, Math.cos(currentAngle) * 1.4, Math.sin(currentAngle) * 1.4);
      }
      const tail = segments[NUM_SEGMENTS - 1];
      if (Math.random() < 0.4) {
        spawnEmber(tail.x, tail.y, 6, -Math.cos(tail.angle) * 1.0, -Math.sin(tail.angle) * 1.0);
      }

      // --- 5. RENDER EMBERS (Ultra-Fast 0-Shadow Drawing) ---
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= e.decay;
        if (e.alpha <= 0) {
          embers.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // --- 6. RENDER FEATHERED RAY WINGS (Lag-Free Lionfish Quills) ---
      const updateAndDrawWings = (rays: WingRay[], side: 1 | -1) => {
        rays.forEach((ray, rIdx) => {
          const baseSeg = segments[ray.baseSegIdx];
          if (!baseSeg) return;

          const ribAngle = baseSeg.angle + (Math.PI / 2) * side;
          const rootX = baseSeg.x + Math.cos(ribAngle) * (baseSeg.radius * 0.85);
          const rootY = baseSeg.y + Math.sin(ribAngle) * (baseSeg.radius * 0.85);

          const rayBaseAngle = baseSeg.angle + ray.baseOffsetAngle + flapAngleDelta * side;

          ray.joints[0].x = rootX;
          ray.joints[0].y = rootY;

          const segLen = ray.length / 3;
          for (let j = 1; j < 4; j++) {
            const jointAngle = rayBaseAngle + ray.curveFactor * (j * 0.3) - (flapAngleDelta * 0.25 * j * side);
            const targetJX = ray.joints[j - 1].x + Math.cos(jointAngle) * segLen;
            const targetJY = ray.joints[j - 1].y + Math.sin(jointAngle) * segLen;

            ray.joints[j].x += (targetJX - ray.joints[j].x) * 0.38;
            ray.joints[j].y += (targetJY - ray.joints[j].y) * 0.38;
          }

          // Draw graceful needle ray
          ctx.beginPath();
          ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
          ctx.quadraticCurveTo(
            ray.joints[1].x,
            ray.joints[1].y,
            ray.joints[2].x,
            ray.joints[2].y
          );
          ctx.quadraticCurveTo(
            ray.joints[2].x,
            ray.joints[2].y,
            ray.joints[3].x,
            ray.joints[3].y
          );

          // Fast direct stroke styling
          ctx.strokeStyle = rIdx % 2 === 0 ? '#FFFFFF' : 'rgba(212, 212, 216, 0.85)';
          ctx.lineWidth = ray.thickness;
          ctx.stroke();

          // Translucent membrane veil between adjacent rays
          if (rIdx > 0 && rIdx < rays.length) {
            const prevRay = rays[rIdx - 1];
            ctx.beginPath();
            ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
            ctx.lineTo(ray.joints[2].x, ray.joints[2].y);
            ctx.lineTo(prevRay.joints[2].x, prevRay.joints[2].y);
            ctx.lineTo(prevRay.joints[0].x, prevRay.joints[0].y);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fill();
          }
        });
      };

      updateAndDrawWings(leftWingRays, -1);
      updateAndDrawWings(rightWingRays, 1);

      // --- 7. RENDER DORSAL & VENTRAL SPINE NEEDLE QUILLS ---
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      spineQuills.forEach((q) => {
        const seg = segments[q.segIdx];
        if (!seg) return;

        const qAngle = seg.angle + q.angleOffset;
        const qRootX = seg.x + Math.cos(seg.angle + (Math.PI / 2) * q.side) * (seg.radius * 0.7);
        const qRootY = seg.y + Math.sin(seg.angle + (Math.PI / 2) * q.side) * (seg.radius * 0.7);

        const tipX = qRootX + Math.cos(qAngle) * q.length;
        const tipY = qRootY + Math.sin(qAngle) * q.length;

        ctx.moveTo(qRootX, qRootY);
        ctx.quadraticCurveTo(
          qRootX + Math.cos(qAngle + 0.3 * q.side) * (q.length * 0.5),
          qRootY + Math.sin(qAngle + 0.3 * q.side) * (q.length * 0.5),
          tipX,
          tipY
        );
      });
      ctx.stroke();

      // --- 8. RENDER ARTICULATED CHEVRON SCALE BODY (Segment Vertebrae) ---
      for (let i = NUM_SEGMENTS - 1; i >= 0; i--) {
        const seg = segments[i];
        const r = seg.radius;

        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(seg.angle);

        ctx.beginPath();
        ctx.moveTo(r * 0.8, 0);
        ctx.quadraticCurveTo(0, -r, -r * 0.9, -r * 1.1);
        ctx.quadraticCurveTo(-r * 0.3, 0, -r * 0.9, r * 1.1);
        ctx.quadraticCurveTo(0, r, r * 0.8, 0);
        ctx.closePath();

        // Shading without expensive shadowBlur
        ctx.fillStyle = i < 4 ? '#27272A' : '#18181B';
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + (1 - i / NUM_SEGMENTS) * 0.55})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.restore();
      }

      // --- 9. RENDER DRAGON HEAD, CROWN & PIERCING EYE ---
      const head = segments[0];
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);

      // Sleek Charcoal Dragon Mask
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.quadraticCurveTo(16, -10, 0, -12);
      ctx.quadraticCurveTo(-14, -18, -26, -22);
      ctx.quadraticCurveTo(-16, -8, -12, -4);
      ctx.lineTo(-18, 0);
      ctx.lineTo(-12, 4);
      ctx.quadraticCurveTo(-16, 8, -26, 22);
      ctx.quadraticCurveTo(-14, 18, 0, 12);
      ctx.quadraticCurveTo(16, 10, 22, 0);
      ctx.closePath();

      ctx.fillStyle = '#18181B';
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Piercing White Eye
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(8, 6 * side, 3.0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(8.5, 6 * side, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#09090B';
        ctx.fill();
      });

      // Snout Whisker White Sparks
      ctx.beginPath();
      ctx.arc(18, -2.5, 1.2, 0, Math.PI * 2);
      ctx.arc(18, 2.5, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
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
