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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Mouse & Roaming Flight Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastMouseMoveTime = Date.now();
    let hasInteracted = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMouseMoveTime = Date.now();
      hasInteracted = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        lastMouseMoveTime = Date.now();
        hasInteracted = true;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- DRAGON SPINE INITIALIZATION ---
    const NUM_SEGMENTS = 44;
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
      else r = Math.max(15 - (i - 12) * 0.42, 1.8); // Serpentine taper

      segments.push({
        x: posX - i * SEGMENT_DIST,
        y: posY,
        angle: currentAngle,
        radius: r,
      });
    }

    // --- FEATHERED RAY WINGS (Lionfish / Celestial Wings) ---
    // Multiple long quill rays attached to segments 4 through 12 on each side
    const createWingRays = (side: 1 | -1): WingRay[] => {
      const rays: WingRay[] = [];
      const NUM_RAYS = 20;

      for (let i = 0; i < NUM_RAYS; i++) {
        const progress = i / (NUM_RAYS - 1);
        const segIdx = Math.floor(4 + progress * 8); // Attached across chest
        const baseOffset = (Math.PI * 0.35 + progress * Math.PI * 0.55) * side;
        
        // Bell-curve length for majestic wing silhouette
        const lenMultiplier = Math.sin(progress * Math.PI);
        const rayLen = 50 + lenMultiplier * 130 + (1 - progress) * 30;
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
          thickness: Math.max(2.4 - progress * 1.6, 0.8),
          joints,
        });
      }
      return rays;
    };

    const leftWingRays = createWingRays(-1);
    const rightWingRays = createWingRays(1);

    // --- DORSAL & VENTRAL SPINE QUILLS ---
    interface Quill {
      segIdx: number;
      side: 1 | -1;
      length: number;
      angleOffset: number;
    }
    const spineQuills: Quill[] = [];
    for (let i = 10; i < NUM_SEGMENTS - 2; i += 2) {
      const prog = (i - 10) / (NUM_SEGMENTS - 12);
      const qLen = (1 - prog) * 45 + 12;
      spineQuills.push({ segIdx: i, side: -1, length: qLen, angleOffset: Math.PI * 0.78 });
      spineQuills.push({ segIdx: i, side: 1, length: qLen, angleOffset: -Math.PI * 0.78 });
    }

    // Soft Silver & White Stardust Embers
    const embers: Ember[] = [];
    const EMBER_COLORS = ['#FFFFFF', '#F4F4F5', '#E4E4E7', '#D4D4D8', '#A1A1AA'];

    const spawnEmber = (x: number, y: number, spread: number, vx: number, vy: number) => {
      if (embers.length > 90) return;
      embers.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: vx + (Math.random() - 0.5) * 1.2,
        vy: vy + (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2.0 + 0.6,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        alpha: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.025 + 0.015,
      });
    };

    // Autonomous Waypoint & Flight State Machine
    let wanderX = width * 0.5;
    let wanderY = height * 0.5;
    let nextWanderChange = Date.now();

    const pickNewWanderTarget = () => {
      const margin = 120;
      wanderX = margin + Math.random() * (width - margin * 2);
      wanderY = margin + Math.random() * (height - margin * 2);
      nextWanderChange = Date.now() + 3000 + Math.random() * 4000;
    };

    // Realistic Flapping Event State Machine
    let flapMode: 'GLIDE' | 'FLAPPING' = 'GLIDE';
    let flapTimer = 0;
    let nextFlapBurstTime = Date.now() + 2000;
    let flapDuration = 0;
    let wingBeatProgress = 0;

    let time = 0;

    const render = () => {
      time += 0.035;
      ctx.clearRect(0, 0, width, height);

      const isIdle = Date.now() - lastMouseMoveTime > 1400 || !hasInteracted;

      // 1. DETERMINE FLIGHT TARGET (CURSOR vs WANDER)
      let targetX = mouseX;
      let targetY = mouseY;

      if (isIdle) {
        if (Date.now() > nextWanderChange) {
          pickNewWanderTarget();
        }
        targetX = wanderX;
        targetY = wanderY;
      }

      // 2. WING FLAPPING STATE MACHINE (Dynamic Real Flight Events)
      if (Date.now() > nextFlapBurstTime && flapMode === 'GLIDE') {
        flapMode = 'FLAPPING';
        flapTimer = 0;
        flapDuration = 1.4 + Math.random() * 1.2; // 3 to 4 full wing beats
      }

      let flapAngleDelta = 0;
      if (flapMode === 'FLAPPING') {
        flapTimer += 0.055;
        // Strong wing stroke down and up
        wingBeatProgress = Math.sin(flapTimer * 10);
        flapAngleDelta = wingBeatProgress * 0.75;
        // Acceleration thrust boost during wing beat downstrokes
        if (wingBeatProgress > 0.2) {
          currentSpeed += 0.18;
        }

        if (flapTimer >= flapDuration) {
          flapMode = 'GLIDE';
          nextFlapBurstTime = Date.now() + 2500 + Math.random() * 4500;
        }
      } else {
        // Subtle natural soaring breathing oscillation during glide
        flapAngleDelta = Math.sin(time * 2.2) * 0.12;
      }

      // Decelerate smoothly towards cruising speed
      const targetCruisingSpeed = isIdle ? 4.8 : 6.2;
      currentSpeed += (targetCruisingSpeed - currentSpeed) * 0.04;
      currentSpeed = Math.min(Math.max(currentSpeed, 3.5), 9.0);

      // 3. STEERING & INERTIA TOWARDS TARGET
      const dTargetX = targetX - posX;
      const dTargetY = targetY - posY;
      const distToTarget = Math.sqrt(dTargetX * dTargetX + dTargetY * dTargetY);

      if (distToTarget > 25) {
        const desiredAngle = Math.atan2(dTargetY, dTargetX);
        let angleDiff = desiredAngle - currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        const turnRate = isIdle ? 0.042 : 0.075;
        currentAngle += angleDiff * turnRate;
      }

      // Sinuous swimming lateral wave
      const waveAmplitude = Math.min(currentSpeed * 0.35, 3.5);
      const waveAngle = Math.sin(time * 4) * (waveAmplitude * 0.05);

      posX += Math.cos(currentAngle + waveAngle) * currentSpeed;
      posY += Math.sin(currentAngle + waveAngle) * currentSpeed;

      // Soft screen border wrap / bounce
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

        // Natural serpentine S-curve undulation along spine
        const sWave = Math.sin(time * 3.8 - i * 0.32) * (0.07 + (i / NUM_SEGMENTS) * 0.14);
        sAngle += sWave;

        curr.x = prev.x - Math.cos(sAngle) * SEGMENT_DIST;
        curr.y = prev.y - Math.sin(sAngle) * SEGMENT_DIST;
        curr.angle = sAngle;
      }

      // Spawn breath sparks & tail embers
      if (Math.random() < 0.45 || flapMode === 'FLAPPING') {
        const mouthX = posX + Math.cos(currentAngle) * 18;
        const mouthY = posY + Math.sin(currentAngle) * 18;
        spawnEmber(mouthX, mouthY, 6, Math.cos(currentAngle) * 1.5, Math.sin(currentAngle) * 1.5);
      }
      const tail = segments[NUM_SEGMENTS - 1];
      if (Math.random() < 0.5) {
        spawnEmber(tail.x, tail.y, 8, -Math.cos(tail.angle) * 1.2, -Math.sin(tail.angle) * 1.2);
      }

      // --- 5. RENDER EMBERS ---
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= e.decay;
        if (e.alpha <= 0) {
          embers.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      // --- 6. RENDER FEATHERED RAY WINGS (Lionfish Celestial Wing Quills in Silver/White) ---
      const updateAndDrawWings = (rays: WingRay[], side: 1 | -1) => {
        rays.forEach((ray, rIdx) => {
          const baseSeg = segments[ray.baseSegIdx];
          if (!baseSeg) return;

          // Compute root position on segment rib
          const ribAngle = baseSeg.angle + (Math.PI / 2) * side;
          const rootX = baseSeg.x + Math.cos(ribAngle) * (baseSeg.radius * 0.85);
          const rootY = baseSeg.y + Math.sin(ribAngle) * (baseSeg.radius * 0.85);

          // Ray base orientation + dynamic wing flap deflection
          const rayBaseAngle = baseSeg.angle + ray.baseOffsetAngle + flapAngleDelta * side;

          // Multi-joint spring simulation for fluid curved quill flex
          ray.joints[0].x = rootX;
          ray.joints[0].y = rootY;

          const segLen = ray.length / 3;
          for (let j = 1; j < 4; j++) {
            const jointAngle = rayBaseAngle + ray.curveFactor * (j * 0.3) - (flapAngleDelta * 0.25 * j * side);
            const targetJX = ray.joints[j - 1].x + Math.cos(jointAngle) * segLen;
            const targetJY = ray.joints[j - 1].y + Math.sin(jointAngle) * segLen;

            ray.joints[j].x += (targetJX - ray.joints[j].x) * 0.35;
            ray.joints[j].y += (targetJY - ray.joints[j].y) * 0.35;
          }

          // Draw graceful needle ray with bezier curves
          ctx.save();
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

          // Monochromatic Grayscale Quill Gradient: Deep Charcoal -> Smoke Grey -> Luminous White Needle
          const quillGrad = ctx.createLinearGradient(
            ray.joints[0].x,
            ray.joints[0].y,
            ray.joints[3].x,
            ray.joints[3].y
          );
          quillGrad.addColorStop(0, '#27272A');
          quillGrad.addColorStop(0.3, '#71717A');
          quillGrad.addColorStop(0.7, '#D4D4D8');
          quillGrad.addColorStop(1, '#FFFFFF');

          ctx.strokeStyle = quillGrad;
          ctx.lineWidth = ray.thickness;
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = rIdx % 3 === 0 ? 6 : 2;
          ctx.stroke();

          // Delicate misty translucent white membrane between adjacent rays
          if (rIdx > 0 && rIdx < rays.length) {
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

          ctx.restore();
        });
      };

      updateAndDrawWings(leftWingRays, -1);
      updateAndDrawWings(rightWingRays, 1);

      // --- 7. RENDER DORSAL & VENTRAL SPINE NEEDLE QUILLS (Silver/White) ---
      spineQuills.forEach((q) => {
        const seg = segments[q.segIdx];
        if (!seg) return;

        const qAngle = seg.angle + q.angleOffset;
        const qRootX = seg.x + Math.cos(seg.angle + (Math.PI / 2) * q.side) * (seg.radius * 0.7);
        const qRootY = seg.y + Math.sin(seg.angle + (Math.PI / 2) * q.side) * (seg.radius * 0.7);

        const tipX = qRootX + Math.cos(qAngle) * q.length;
        const tipY = qRootY + Math.sin(qAngle) * q.length;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(qRootX, qRootY);
        ctx.quadraticCurveTo(
          qRootX + Math.cos(qAngle + 0.3 * q.side) * (q.length * 0.5),
          qRootY + Math.sin(qAngle + 0.3 * q.side) * (q.length * 0.5),
          tipX,
          tipY
        );

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.0;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 3;
        ctx.stroke();
        ctx.restore();
      });

      // --- 8. RENDER ARTICULATED CHEVRON SCALE BODY (Gray/White Translucent Shells) ---
      for (let i = NUM_SEGMENTS - 1; i >= 0; i--) {
        const seg = segments[i];
        const r = seg.radius;

        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(seg.angle);

        // Chevron Scale / Vertebra Leaf Shell
        ctx.beginPath();
        ctx.moveTo(r * 0.8, 0); // Front apex
        ctx.quadraticCurveTo(0, -r, -r * 0.9, -r * 1.1); // Left flared wing
        ctx.quadraticCurveTo(-r * 0.3, 0, -r * 0.9, r * 1.1); // Back notch to right flared wing
        ctx.quadraticCurveTo(0, r, r * 0.8, 0); // Right side to front
        ctx.closePath();

        const segGrad = ctx.createRadialGradient(0, 0, r * 0.15, 0, 0, r * 1.2);
        if (i < 4) {
          segGrad.addColorStop(0, '#FFFFFF');
          segGrad.addColorStop(0.4, '#D4D4D8');
          segGrad.addColorStop(0.85, '#27272A');
          segGrad.addColorStop(1, '#09090B');
        } else {
          segGrad.addColorStop(0, '#E4E4E7');
          segGrad.addColorStop(0.35, '#71717A');
          segGrad.addColorStop(0.75, '#27272A');
          segGrad.addColorStop(1, 'rgba(9, 9, 11, 0.9)');
        }

        ctx.fillStyle = segGrad;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 5;
        ctx.fill();

        // Crisp White Edge Highlight Stroke
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 + (1 - i / NUM_SEGMENTS) * 0.55})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.restore();
      }

      // --- 9. RENDER DRAGON HEAD, CROWN & PIERCING EYE (Ink Charcoal & Luminous White) ---
      const head = segments[0];
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);

      // Sleek Obsidian/Charcoal Dragon Mask & Swept Crests
      ctx.beginPath();
      ctx.moveTo(22, 0); // Snout Tip
      ctx.quadraticCurveTo(16, -10, 0, -12); // Upper Jaw
      ctx.quadraticCurveTo(-14, -18, -26, -22); // Swept Ear Horn Left
      ctx.quadraticCurveTo(-16, -8, -12, -4);
      ctx.lineTo(-18, 0); // Crown Center
      ctx.lineTo(-12, 4);
      ctx.quadraticCurveTo(-16, 8, -26, 22); // Swept Ear Horn Right
      ctx.quadraticCurveTo(-14, 18, 0, 12);
      ctx.quadraticCurveTo(16, 10, 22, 0);
      ctx.closePath();

      const headGrad = ctx.createRadialGradient(6, 0, 2, 0, 0, 24);
      headGrad.addColorStop(0, '#FFFFFF');
      headGrad.addColorStop(0.3, '#E4E4E7');
      headGrad.addColorStop(0.7, '#27272A');
      headGrad.addColorStop(1, '#09090B');
      ctx.fillStyle = headGrad;
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Sharp White Crest Highlights
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Piercing Glowing White Eye with Dark Slit Pupil
      [-1, 1].forEach((side) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(8, 6 * side, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 12;
        ctx.fill();

        // Eye Slit Pupil
        ctx.beginPath();
        ctx.arc(8.5, 6 * side, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = '#09090B';
        ctx.fill();
        ctx.restore();
      });

      // Snout Whisker White Sparks
      ctx.beginPath();
      ctx.arc(18, -2.5, 1.2, 0, Math.PI * 2);
      ctx.arc(18, 2.5, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 6;
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

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
      style={{ willChange: 'transform' }}
    />
  );
};
