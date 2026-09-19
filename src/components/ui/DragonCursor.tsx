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
  joints: { x: number; y: number }[];
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

interface Whisker {
  joints: { x: number; y: number }[];
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

    // Avoid canvas buffer reallocation during mobile address bar hide/reveal
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

    // Scroll airflow deflection to make dragon glide naturally during fast scrolling
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max((now - lastScrollTime) / 1000, 0.016);
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) / dt;
      lastScrollY = currentScrollY;
      lastScrollTime = now;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- COMPACT SLEEK DRAGON CONFIGURATION ---
    const NUM_SEGMENTS = 26;
    const SEGMENT_DIST = 7.2;
    const segments: Segment[] = [];

    let posX = width / 2;
    let posY = height / 2;
    let currentAngle = -Math.PI / 4;
    let currentSpeed = 4.8;

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      let r = 7.5;
      if (i < 3) r = 4.8 + i * 1.4; // Head / neck
      else if (i < 8) r = 8.5 - (i - 3) * 0.35; // Chest / torso
      else r = Math.max(6.8 - (i - 8) * 0.32, 1.2); // Sinuous tail taper

      segments.push({
        x: posX - i * SEGMENT_DIST,
        y: posY,
        angle: currentAngle,
        radius: r,
      });
    }

    // --- COMPACT FEATHERED CELESTIAL WINGS ---
    const createWingRays = (side: 1 | -1): WingRay[] => {
      const rays: WingRay[] = [];
      const NUM_RAYS = 10;

      for (let i = 0; i < NUM_RAYS; i++) {
        const progress = i / (NUM_RAYS - 1);
        const segIdx = Math.floor(3 + progress * 4);
        const baseOffset = (Math.PI * 0.38 + progress * Math.PI * 0.52) * side;

        const lenMultiplier = Math.sin(progress * Math.PI);
        const rayLen = 22 + lenMultiplier * 55 + (1 - progress) * 12;
        const curve = (0.35 + progress * 0.4) * side;

        const joints = [
          { x: posX, y: posY },
          { x: posX, y: posY },
          { x: posX, y: posY },
        ];

        rays.push({
          baseSegIdx: segIdx,
          baseOffsetAngle: baseOffset,
          length: rayLen,
          curveFactor: curve,
          joints,
        });
      }
      return rays;
    };

    const leftWingRays = createWingRays(-1);
    const rightWingRays = createWingRays(1);

    // --- DRAGON TACTILE WHISKERS (Flowing Snout Tendrils) ---
    const NUM_WHISKER_JOINTS = 6;
    const createWhisker = (): Whisker => {
      const joints: { x: number; y: number }[] = [];
      for (let i = 0; i < NUM_WHISKER_JOINTS; i++) {
        joints.push({ x: posX, y: posY });
      }
      return { joints };
    };
    const leftWhisker = createWhisker();
    const rightWhisker = createWhisker();

    // Embers (Micro stardust pool)
    const embers: Ember[] = [];
    const spawnEmber = (x: number, y: number, vx: number, vy: number) => {
      if (embers.length > 30) return;
      embers.push({
        x,
        y,
        vx: vx + (Math.random() - 0.5) * 0.8,
        vy: vy + (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.5 + 0.4,
        decay: Math.random() * 0.03 + 0.02,
      });
    };

    // Autonomous Waypoint & Flight State Machine
    let wanderX = width * 0.5;
    let wanderY = height * 0.5;
    let nextWanderChange = performance.now();

    const pickNewWanderTarget = () => {
      const margin = 80;
      wanderX = margin + Math.random() * (width - margin * 2);
      wanderY = margin + Math.random() * (height - margin * 2);
      nextWanderChange = performance.now() + 2800 + Math.random() * 3500;
    };

    // Realistic Flapping Flight Engine
    let flapMode: 'GLIDE' | 'FLAPPING' = 'GLIDE';
    let flapTimer = 0;
    let nextFlapBurstTime = performance.now() + 1800;
    let flapDuration = 0;
    let wingBeatProgress = 0;

    let time = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      time += dt * 2.4;

      // Damp scroll velocity smoothly
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      const isIdle = currentTime - lastMouseMoveTime > 1200 || !hasInteracted;

      // 1. FLIGHT TARGETING
      let targetX = mouseX;
      let targetY = mouseY;

      if (isIdle) {
        if (currentTime > nextWanderChange) {
          pickNewWanderTarget();
        }
        targetX = wanderX;
        targetY = wanderY;
      }

      // Airflow offset during fast scrolling down
      if (Math.abs(scrollVelocity) > 50) {
        targetY -= Math.min(Math.max(scrollVelocity * 0.03, -120), 120);
      }

      // 2. FLAPPING STATE MACHINE
      if (currentTime > nextFlapBurstTime && flapMode === 'GLIDE') {
        flapMode = 'FLAPPING';
        flapTimer = 0;
        flapDuration = 1.1 + Math.random() * 0.9;
      }

      let flapAngleDelta = 0;
      if (flapMode === 'FLAPPING') {
        flapTimer += dt * 3.5;
        wingBeatProgress = Math.sin(flapTimer * 9.0);
        flapAngleDelta = wingBeatProgress * 0.68;

        if (wingBeatProgress > 0.15) {
          currentSpeed += 0.18;
        }

        if (flapTimer >= flapDuration) {
          flapMode = 'GLIDE';
          nextFlapBurstTime = currentTime + 2200 + Math.random() * 3800;
        }
      } else {
        flapAngleDelta = Math.sin(time * 2.5) * 0.14;
      }

      const targetCruisingSpeed = isIdle ? 4.2 : 5.8;
      currentSpeed += (targetCruisingSpeed - currentSpeed) * 0.05;
      currentSpeed = Math.min(Math.max(currentSpeed, 3.2), 7.8);

      // 3. STEERING & INERTIA
      const dTargetX = targetX - posX;
      const dTargetY = targetY - posY;
      const distToTarget = Math.sqrt(dTargetX * dTargetX + dTargetY * dTargetY);

      if (distToTarget > 18) {
        const desiredAngle = Math.atan2(dTargetY, dTargetX);
        let angleDiff = desiredAngle - currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        const turnRate = isIdle ? 0.055 : 0.092;
        currentAngle += angleDiff * turnRate;
      }

      const waveAmplitude = Math.min(currentSpeed * 0.3, 2.8);
      const waveAngle = Math.sin(time * 4.2) * (waveAmplitude * 0.05);

      posX += Math.cos(currentAngle + waveAngle) * currentSpeed;
      posY += Math.sin(currentAngle + waveAngle) * currentSpeed;

      // Keep within bounds
      if (posX < 40) posX += 1.8;
      if (posX > width - 40) posX -= 1.8;
      if (posY < 40) posY += 1.8;
      if (posY > height - 40) posY -= 1.8;

      // 4. SPINE PROPAGATION (Inverse Kinematics)
      segments[0].x = posX;
      segments[0].y = posY;
      segments[0].angle = currentAngle;

      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const sDx = prev.x - curr.x;
        const sDy = prev.y - curr.y;
        let sAngle = Math.atan2(sDy, sDx);

        const sWave = Math.sin(time * 4.0 - i * 0.38) * (0.06 + (i / NUM_SEGMENTS) * 0.12);
        sAngle += sWave;

        curr.x = prev.x - Math.cos(sAngle) * SEGMENT_DIST;
        curr.y = prev.y - Math.sin(sAngle) * SEGMENT_DIST;
        curr.angle = sAngle;
      }

      // Spawn tail stardust
      const tail = segments[NUM_SEGMENTS - 1];
      if (Math.random() < 0.35) {
        spawnEmber(tail.x, tail.y, -Math.cos(tail.angle) * 0.9, -Math.sin(tail.angle) * 0.9);
      }

      // --- 5. RENDER STARDUST EMBERS (Zero-allocation fast loop) ---
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
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // --- 6. RENDER CELESTIAL RAY WINGS ---
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

          const segLen = ray.length / 2;
          for (let j = 1; j < 3; j++) {
            const jointAngle = rayBaseAngle + ray.curveFactor * (j * 0.35) - (flapAngleDelta * 0.22 * j * side);
            const targetJX = ray.joints[j - 1].x + Math.cos(jointAngle) * segLen;
            const targetJY = ray.joints[j - 1].y + Math.sin(jointAngle) * segLen;

            ray.joints[j].x += (targetJX - ray.joints[j].x) * 0.42;
            ray.joints[j].y += (targetJY - ray.joints[j].y) * 0.42;
          }

          // Ray Quill Stroke
          ctx.beginPath();
          ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
          ctx.quadraticCurveTo(
            ray.joints[1].x,
            ray.joints[1].y,
            ray.joints[2].x,
            ray.joints[2].y
          );
          ctx.strokeStyle = rIdx % 2 === 0 ? '#FFFFFF' : 'rgba(212, 212, 216, 0.85)';
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Delicate Veil Membrane
          if (rIdx > 0) {
            const prevRay = rays[rIdx - 1];
            ctx.beginPath();
            ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
            ctx.lineTo(ray.joints[2].x, ray.joints[2].y);
            ctx.lineTo(prevRay.joints[2].x, prevRay.joints[2].y);
            ctx.lineTo(prevRay.joints[0].x, prevRay.joints[0].y);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fill();
          }
        });
      };

      updateAndDrawWings(leftWingRays, -1);
      updateAndDrawWings(rightWingRays, 1);

      // --- 7. RENDER DIAMOND CHEVRON DORSAL SCALES & VERTEBRAE ---
      for (let i = NUM_SEGMENTS - 1; i >= 0; i--) {
        const seg = segments[i];
        const r = seg.radius;
        const cosA = Math.cos(seg.angle);
        const sinA = Math.sin(seg.angle);

        // Vector scale drawing without save/restore per segment
        const p1x = seg.x + cosA * (r * 0.9);
        const p1y = seg.y + sinA * (r * 0.9);

        const leftPerpX = -sinA * r;
        const leftPerpY = cosA * r;

        const p2x = seg.x - cosA * (r * 0.8) + leftPerpX * 0.9;
        const p2y = seg.y - sinA * (r * 0.8) + leftPerpY * 0.9;

        const p3x = seg.x - cosA * (r * 0.4);
        const p3y = seg.y - sinA * (r * 0.4);

        const p4x = seg.x - cosA * (r * 0.8) - leftPerpX * 0.9;
        const p4y = seg.y - sinA * (r * 0.8) - leftPerpY * 0.9;

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.lineTo(p4x, p4y);
        ctx.closePath();

        ctx.fillStyle = i < 3 ? '#27272A' : '#18181B';
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + (1 - i / NUM_SEGMENTS) * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Small dorsal spine needle
        if (i > 3 && i < NUM_SEGMENTS - 4 && i % 2 === 0) {
          const spineLen = (1 - i / NUM_SEGMENTS) * 14 + 3;
          ctx.beginPath();
          ctx.moveTo(seg.x, seg.y);
          ctx.lineTo(
            seg.x - cosA * spineLen + leftPerpX * 0.35,
            seg.y - sinA * spineLen + leftPerpY * 0.35
          );
          ctx.moveTo(seg.x, seg.y);
          ctx.lineTo(
            seg.x - cosA * spineLen - leftPerpX * 0.35,
            seg.y - sinA * spineLen - leftPerpY * 0.35
          );
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // --- 8. RENDER CRESCENT SPLIT TAIL FIN ---
      const tailSeg = segments[NUM_SEGMENTS - 1];
      const tailCos = Math.cos(tailSeg.angle);
      const tailSin = Math.sin(tailSeg.angle);
      const tailPerpX = -tailSin;
      const tailPerpY = tailCos;

      [-1, 1].forEach((side) => {
        const finTipX = tailSeg.x - tailCos * 26 + tailPerpX * (side * 14);
        const finTipY = tailSeg.y - tailSin * 26 + tailPerpY * (side * 14);

        ctx.beginPath();
        ctx.moveTo(tailSeg.x, tailSeg.y);
        ctx.quadraticCurveTo(
          tailSeg.x - tailCos * 14 + tailPerpX * (side * 6),
          tailSeg.y - tailSin * 14 + tailPerpY * (side * 6),
          finTipX,
          finTipY
        );
        ctx.quadraticCurveTo(
          tailSeg.x - tailCos * 18,
          tailSeg.y - tailSin * 18,
          tailSeg.x - tailCos * 6,
          tailSeg.y - tailSin * 6
        );
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // --- 9. RENDER UNIQUE SLEEK DRAGON HEAD & HORNS ---
      const head = segments[0];
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);

      // Angular Draconic Obsidian Mask (Compact: ~15px length)
      ctx.beginPath();
      ctx.moveTo(13, 0); // Snout tip
      ctx.quadraticCurveTo(9, -5, 0, -6);
      ctx.lineTo(-8, -12); // Left horn tip
      ctx.lineTo(-4, -4);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-4, 4);
      ctx.lineTo(-8, 12); // Right horn tip
      ctx.lineTo(0, 6);
      ctx.quadraticCurveTo(9, 5, 13, 0);
      ctx.closePath();

      ctx.fillStyle = '#18181B';
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // Inner Silver Horn Filigree
      ctx.beginPath();
      ctx.moveTo(-2, -4);
      ctx.lineTo(-8, -12);
      ctx.moveTo(-2, 4);
      ctx.lineTo(-8, 12);
      ctx.strokeStyle = '#E4E4E7';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Glowing Silver/White Slit Eyes
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.ellipse(4.5, 3.2 * side, 2.0, 1.1, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(4.8, 3.2 * side, 1.2, 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#09090B';
        ctx.fill();
      });

      // Snout glow nodes
      ctx.beginPath();
      ctx.arc(10.5, -1.2, 0.8, 0, Math.PI * 2);
      ctx.arc(10.5, 1.2, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      // --- 10. RENDER FLOWING SINUOUS DRAGON WHISKERS ---
      const updateAndDrawWhisker = (whisker: Whisker, side: 1 | -1) => {
        const headCos = Math.cos(head.angle);
        const headSin = Math.sin(head.angle);
        const perpX = -headSin;
        const perpY = headCos;

        const snoutRootX = head.x + headCos * 9 + perpX * (side * 2);
        const snoutRootY = head.y + headSin * 9 + perpY * (side * 2);

        whisker.joints[0].x = snoutRootX;
        whisker.joints[0].y = snoutRootY;

        ctx.beginPath();
        ctx.moveTo(snoutRootX, snoutRootY);

        for (let j = 1; j < NUM_WHISKER_JOINTS; j++) {
          const wAngle = head.angle + Math.PI + Math.sin(time * 3.5 - j * 0.6) * 0.45 + (side * 0.3);
          const targetX = whisker.joints[j - 1].x + Math.cos(wAngle) * 5.5;
          const targetY = whisker.joints[j - 1].y + Math.sin(wAngle) * 5.5;

          whisker.joints[j].x += (targetX - whisker.joints[j].x) * 0.45;
          whisker.joints[j].y += (targetY - whisker.joints[j].y) * 0.45;

          ctx.lineTo(whisker.joints[j].x, whisker.joints[j].y);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      };

      updateAndDrawWhisker(leftWhisker, -1);
      updateAndDrawWhisker(rightWhisker, 1);

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
