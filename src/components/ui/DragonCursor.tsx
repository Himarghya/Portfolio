import React, { useEffect, useRef } from 'react';

interface Segment {
  x: number;
  y: number;
  angle: number;
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

    // Mouse & Movement Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
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

    // Dragon Architecture (Spine, Segments, Lengths)
    const SEGMENT_COUNT = 38;
    const SEGMENT_DIST = 11;
    const segments: Segment[] = [];

    for (let i = 0; i < SEGMENT_COUNT; i++) {
      segments.push({
        x: mouseX - i * SEGMENT_DIST,
        y: mouseY,
        angle: 0,
      });
    }

    // Whiskers (Left & Right Spring Nodes)
    const WHISKER_SEGMENTS = 7;
    const leftWhisker: { x: number; y: number }[] = [];
    const rightWhisker: { x: number; y: number }[] = [];
    for (let i = 0; i < WHISKER_SEGMENTS; i++) {
      leftWhisker.push({ x: mouseX, y: mouseY });
      rightWhisker.push({ x: mouseX, y: mouseY });
    }

    // Fire Embers Array
    const embers: Ember[] = [];
    const EMBER_COLORS = ['#FF2A5F', '#E50914', '#FF6B00', '#FFB800', '#FF0055'];

    const spawnEmber = (x: number, y: number, spread: number, vxOffset = 0, vyOffset = 0) => {
      if (embers.length > 120) return;
      embers.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 1.5 + vxOffset,
        vy: (Math.random() - 0.5) * 1.5 + vyOffset - 0.5,
        radius: Math.random() * 2.5 + 0.8,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.025 + 0.015,
      });
    };

    // Full-Page Random Roaming System (When Mouse is Still)
    let wanderX = Math.random() * (width - 240) + 120;
    let wanderY = Math.random() * (height - 240) + 120;
    let wanderAngle = Math.random() * Math.PI * 2;
    let nextWanderChangeTime = Date.now() + 2000;

    const pickNewWanderTarget = () => {
      const padding = 100;
      wanderX = padding + Math.random() * (width - padding * 2);
      wanderY = padding + Math.random() * (height - padding * 2);
      nextWanderChangeTime = Date.now() + 2800 + Math.random() * 2500;
    };

    let time = 0;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Autonomous Full-Page Exploration when user is idle
      const isIdle = Date.now() - lastMouseMoveTime > 1200 || !hasInteracted;

      let activeTargetX = mouseX;
      let activeTargetY = mouseY;

      if (isIdle) {
        // Check distance to current wander waypoint or timer expiry
        const dWanderX = wanderX - targetX;
        const dWanderY = wanderY - targetY;
        const distToWander = Math.sqrt(dWanderX * dWanderX + dWanderY * dWanderY);

        if (distToWander < 130 || Date.now() > nextWanderChangeTime) {
          pickNewWanderTarget();
        }

        // Steer smoothly towards current wander target
        const desiredAngle = Math.atan2(wanderY - targetY, wanderX - targetX);
        let diffAngle = desiredAngle - wanderAngle;
        while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
        while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;

        wanderAngle += diffAngle * 0.045; // Smooth realistic flight turn

        // Dynamic soaring speed and wave undulation
        const cruiseSpeed = 5.2 + Math.sin(time * 2) * 1.5;
        const flightWave = Math.sin(time * 3) * 0.15;

        // Keep inside screen boundaries with gentle avoidance
        if (targetX < 80 && Math.cos(wanderAngle) < 0) wanderAngle = Math.PI * 0.1;
        if (targetX > width - 80 && Math.cos(wanderAngle) > 0) wanderAngle = Math.PI * 0.9;
        if (targetY < 80 && Math.sin(wanderAngle) < 0) wanderAngle = Math.PI * 0.6;
        if (targetY > height - 80 && Math.sin(wanderAngle) > 0) wanderAngle = -Math.PI * 0.6;

        activeTargetX = targetX + Math.cos(wanderAngle + flightWave) * (cruiseSpeed * 4.5);
        activeTargetY = targetY + Math.sin(wanderAngle + flightWave) * (cruiseSpeed * 4.5);
      }

      // Smooth Head Tracking with Inertia
      const dx = activeTargetX - targetX;
      const dy = activeTargetY - targetY;
      const distToTarget = Math.sqrt(dx * dx + dy * dy);
      const speedFactor = isIdle ? 0.085 : Math.min(Math.max(distToTarget * 0.045, 0.08), 0.22);
      
      targetX += dx * speedFactor;
      targetY += dy * speedFactor;

      const headSpeed = Math.sqrt(dx * dx + dy * dy);

      // Head undulation wave (serpentine motion)
      const waveOffset = Math.sin(time * 3.5) * Math.min(headSpeed * 0.25, 6);
      const currentHeadX = targetX + Math.cos(segments[0].angle + Math.PI / 2) * waveOffset;
      const currentHeadY = targetY + Math.sin(segments[0].angle + Math.PI / 2) * waveOffset;

      // Update Head
      const headAngle = Math.atan2(currentHeadY - segments[0].y, currentHeadX - segments[0].x);
      segments[0].x = currentHeadX;
      segments[0].y = currentHeadY;
      segments[0].angle = headAngle;

      // Update Spine with Inverse Kinematics & Wave Physics
      for (let i = 1; i < SEGMENT_COUNT; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const segDx = prev.x - curr.x;
        const segDy = prev.y - curr.y;
        let angle = Math.atan2(segDy, segDx);

        // Serpentine Lateral S-Curve
        const sWave = Math.sin(time * 4 - i * 0.38) * (0.09 + (i / SEGMENT_COUNT) * 0.16);
        angle += sWave;

        curr.x = prev.x - Math.cos(angle) * SEGMENT_DIST;
        curr.y = prev.y - Math.sin(angle) * SEGMENT_DIST;
        curr.angle = angle;
      }

      // Spawn fiery breath embers from head occasionally or when moving fast
      if (headSpeed > 4 || Math.random() < 0.35) {
        const mouthX = segments[0].x + Math.cos(segments[0].angle) * 16;
        const mouthY = segments[0].y + Math.sin(segments[0].angle) * 16;
        spawnEmber(mouthX, mouthY, 6, Math.cos(segments[0].angle) * 1.5, Math.sin(segments[0].angle) * 1.5);
      }

      // Spawn tail spark embers
      const tail = segments[SEGMENT_COUNT - 1];
      if (Math.random() < 0.6) {
        spawnEmber(tail.x, tail.y, 8, -Math.cos(tail.angle) * 1.2, -Math.sin(tail.angle) * 1.2);
      }

      // --- 1. RENDER EMBERS / DRAGON AURA ---
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
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // --- 2. RENDER WINGS (Attached around segment 6) ---
      const wingRoot = segments[6];
      const wingFlap = Math.sin(time * 6 + headSpeed * 0.05);
      const wingSpan = 46 + Math.min(headSpeed * 0.6, 25);

      const drawWing = (side: 1 | -1) => {
        const perpAngle = wingRoot.angle + (Math.PI / 2) * side;
        const rootX = wingRoot.x + Math.cos(perpAngle) * 5;
        const rootY = wingRoot.y + Math.sin(perpAngle) * 5;

        // Multi-joint wing bones
        const elbowX = rootX + Math.cos(perpAngle + wingFlap * 0.3 * side) * (wingSpan * 0.55);
        const elbowY = rootY + Math.sin(perpAngle + wingFlap * 0.3 * side) * (wingSpan * 0.55) - (wingFlap * 16);

        const tipX1 = elbowX + Math.cos(perpAngle - 0.4 * side) * (wingSpan * 0.65);
        const tipY1 = elbowY + Math.sin(perpAngle - 0.4 * side) * (wingSpan * 0.65) - (wingFlap * 22);

        const tipX2 = elbowX + Math.cos(perpAngle) * (wingSpan * 0.5);
        const tipY2 = elbowY + Math.sin(perpAngle) * (wingSpan * 0.5) - (wingFlap * 18);

        const tipX3 = elbowX + Math.cos(perpAngle + 0.4 * side) * (wingSpan * 0.35);
        const tipY3 = elbowY + Math.sin(perpAngle + 0.4 * side) * (wingSpan * 0.35) - (wingFlap * 12);

        const backAttach = segments[10];

        // Translucent Webbed Dragon Wing Membrane
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        ctx.lineTo(elbowX, elbowY);
        ctx.lineTo(tipX1, tipY1);
        ctx.quadraticCurveTo(elbowX + 5, elbowY, tipX2, tipY2);
        ctx.quadraticCurveTo(elbowX, elbowY + 5, tipX3, tipY3);
        ctx.quadraticCurveTo(elbowX - 5, elbowY + 8, backAttach.x, backAttach.y);
        ctx.closePath();

        const wingGrad = ctx.createLinearGradient(rootX, rootY, tipX1, tipY1);
        wingGrad.addColorStop(0, 'rgba(229, 9, 20, 0.45)');
        wingGrad.addColorStop(0.6, 'rgba(255, 60, 0, 0.35)');
        wingGrad.addColorStop(1, 'rgba(255, 190, 0, 0.15)');
        ctx.fillStyle = wingGrad;
        ctx.fill();

        // Wing Bone Struts (Glowing Outline)
        ctx.strokeStyle = 'rgba(255, 120, 50, 0.7)';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = '#E50914';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        ctx.lineTo(elbowX, elbowY);
        ctx.lineTo(tipX1, tipY1);
        ctx.moveTo(elbowX, elbowY);
        ctx.lineTo(tipX2, tipY2);
        ctx.moveTo(elbowX, elbowY);
        ctx.lineTo(tipX3, tipY3);
        ctx.stroke();
        ctx.restore();
      };

      drawWing(1);  // Right Wing
      drawWing(-1); // Left Wing

      // --- 3. RENDER LEGS & CLAWS (Segment 8 and Segment 22) ---
      const drawLegPair = (segIdx: number, legLen: number) => {
        const seg = segments[segIdx];
        const nextSeg = segments[segIdx + 2];
        if (!seg || !nextSeg) return;

        [-1, 1].forEach((side) => {
          const sideAngle = seg.angle + (Math.PI / 2) * side;
          const hipX = seg.x + Math.cos(sideAngle) * 6;
          const hipY = seg.y + Math.sin(sideAngle) * 6;

          const kneeWave = Math.sin(time * 5 + segIdx) * 0.4;
          const kneeX = hipX + Math.cos(sideAngle + 0.5 * side + kneeWave) * (legLen * 0.6);
          const kneeY = hipY + Math.sin(sideAngle + 0.5 * side + kneeWave) * (legLen * 0.6);

          const clawX = kneeX + Math.cos(seg.angle - 0.6 * side) * (legLen * 0.5);
          const clawY = kneeY + Math.sin(seg.angle - 0.6 * side) * (legLen * 0.5);

          ctx.save();
          ctx.strokeStyle = 'rgba(255, 60, 60, 0.7)';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(hipX, hipY);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(clawX, clawY);
          // 3 Talons
          ctx.lineTo(clawX + Math.cos(seg.angle + 0.4) * 4, clawY + Math.sin(seg.angle + 0.4) * 4);
          ctx.moveTo(clawX, clawY);
          ctx.lineTo(clawX + Math.cos(seg.angle) * 5, clawY + Math.sin(seg.angle) * 5);
          ctx.moveTo(clawX, clawY);
          ctx.lineTo(clawX + Math.cos(seg.angle - 0.4) * 4, clawY + Math.sin(seg.angle - 0.4) * 4);
          ctx.stroke();
          ctx.restore();
        });
      };

      drawLegPair(8, 16);  // Fore Talons
      drawLegPair(22, 14); // Hind Talons

      // --- 4. RENDER DRAGON SPINE BODY & SCALES ---
      for (let i = SEGMENT_COUNT - 1; i >= 0; i--) {
        const seg = segments[i];
        const progress = i / SEGMENT_COUNT; // 0 = head, 1 = tail
        
        // Dynamic Thickness tapering (head = 10px, chest = 13px, tail = 2px)
        let radius = 10;
        if (i < 4) radius = 8 + i * 1.2;
        else if (i < 12) radius = 12 - (i - 4) * 0.3;
        else radius = Math.max(10 - (i - 12) * 0.32, 1.8);

        // Radiant Scale Gradient Shading
        ctx.save();
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2);

        const bodyGrad = ctx.createRadialGradient(
          seg.x - Math.cos(seg.angle) * (radius * 0.3),
          seg.y - Math.sin(seg.angle) * (radius * 0.3),
          radius * 0.2,
          seg.x,
          seg.y,
          radius
        );

        if (i < 3) {
          bodyGrad.addColorStop(0, '#FFFFFF');
          bodyGrad.addColorStop(0.3, '#FF3B47');
          bodyGrad.addColorStop(1, '#990011');
        } else {
          bodyGrad.addColorStop(0, '#FF4B4B');
          bodyGrad.addColorStop(0.5, '#E50914');
          bodyGrad.addColorStop(1, '#4A0008');
        }

        ctx.fillStyle = bodyGrad;
        ctx.shadowColor = '#E50914';
        ctx.shadowBlur = 8;
        ctx.fill();

        // Dorsal Spine Spikes / Flame Crests along the back
        if (i % 2 === 0 && i < SEGMENT_COUNT - 4) {
          const spineLen = (1 - progress) * 11 + 3;
          const spineAngle = seg.angle + Math.PI / 2;

          [-1, 1].forEach((dir) => {
            const sx = seg.x + Math.cos(spineAngle) * (radius * 0.9 * dir);
            const sy = seg.y + Math.sin(spineAngle) * (radius * 0.9 * dir);
            const tipX = sx + Math.cos(seg.angle - Math.PI * 0.8 * dir) * spineLen;
            const tipY = sy + Math.sin(seg.angle - Math.PI * 0.8 * dir) * spineLen;

            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(tipX, tipY);
            ctx.strokeStyle = `rgba(255, ${120 + i * 3}, 0, ${0.8 - progress * 0.4})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          });
        }

        ctx.restore();
      }

      // --- 5. RENDER FLAME TAIL TIP ---
      const tailTip = segments[SEGMENT_COUNT - 1];
      const tailPrev = segments[SEGMENT_COUNT - 3];
      const tailAngle = Math.atan2(tailTip.y - tailPrev.y, tailTip.x - tailPrev.x);

      ctx.save();
      ctx.translate(tailTip.x, tailTip.y);
      ctx.rotate(tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(15, -12, 28, 0);
      ctx.quadraticCurveTo(15, 12, 0, 0);
      const flameGrad = ctx.createLinearGradient(0, 0, 28, 0);
      flameGrad.addColorStop(0, '#E50914');
      flameGrad.addColorStop(0.5, '#FF8800');
      flameGrad.addColorStop(1, '#FFEE00');
      ctx.fillStyle = flameGrad;
      ctx.shadowColor = '#FF8800';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // --- 6. RENDER DRAGON HEAD, HORNS, EYES & WHISKERS ---
      const head = segments[0];
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);

      // Head Crown & Snout
      ctx.beginPath();
      ctx.moveTo(18, 0); // Snout Tip
      ctx.quadraticCurveTo(14, -8, 2, -10); // Upper Jaw Right
      ctx.lineTo(-12, -8); // Back Crown Right
      ctx.quadraticCurveTo(-16, 0, -12, 8); // Crown Back
      ctx.lineTo(2, 10); // Upper Jaw Left
      ctx.quadraticCurveTo(14, 8, 18, 0); // Snout Tip
      ctx.closePath();

      const headGrad = ctx.createRadialGradient(4, 0, 2, 0, 0, 18);
      headGrad.addColorStop(0, '#FF4B4B');
      headGrad.addColorStop(0.6, '#E50914');
      headGrad.addColorStop(1, '#66000C');
      ctx.fillStyle = headGrad;
      ctx.shadowColor = '#FF2A5F';
      ctx.shadowBlur = 14;
      ctx.fill();

      // Sharp Majestic Antler Horns
      const drawHorn = (side: 1 | -1) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-8, 5 * side);
        ctx.quadraticCurveTo(-18, 16 * side, -28, 22 * side);
        ctx.quadraticCurveTo(-22, 12 * side, -10, 2 * side);
        ctx.closePath();
        const hornGrad = ctx.createLinearGradient(-8, 0, -28, 20 * side);
        hornGrad.addColorStop(0, '#FF3B47');
        hornGrad.addColorStop(0.7, '#FFAA00');
        hornGrad.addColorStop(1, '#FFFFFF');
        ctx.fillStyle = hornGrad;
        ctx.shadowColor = '#FFAA00';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      };
      drawHorn(1);
      drawHorn(-1);

      // Piercing Glowing Eyes (Cyan/Golden Blaze)
      [-1, 1].forEach((side) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(6, 5 * side, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#00FFFF';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 12;
        ctx.fill();

        // Eye Slit Pupil
        ctx.beginPath();
        ctx.arc(6.5, 5 * side, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.restore();
      });

      // Snout Nostril Embers
      ctx.beginPath();
      ctx.arc(14, -2.5, 1, 0, Math.PI * 2);
      ctx.arc(14, 2.5, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#FFDD00';
      ctx.fill();

      ctx.restore();

      // --- 7. RENDER DYNAMIC WHISKERS (Spring Nodes) ---
      const whiskerBaseL = {
        x: head.x + Math.cos(head.angle - 0.3) * 14,
        y: head.y + Math.sin(head.angle - 0.3) * 14,
      };
      const whiskerBaseR = {
        x: head.x + Math.cos(head.angle + 0.3) * 14,
        y: head.y + Math.sin(head.angle + 0.3) * 14,
      };

      const updateAndDrawWhisker = (
        chain: { x: number; y: number }[],
        base: { x: number; y: number },
        side: number
      ) => {
        chain[0].x = base.x;
        chain[0].y = base.y;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(base.x, base.y);

        for (let j = 1; j < WHISKER_SEGMENTS; j++) {
          const prev = chain[j - 1];
          const curr = chain[j];

          const wAngle = head.angle + (Math.PI * 0.7 + Math.sin(time * 4 + j * 0.4) * 0.3) * side;
          const targetWX = prev.x + Math.cos(wAngle) * 8;
          const targetWY = prev.y + Math.sin(wAngle) * 8;

          curr.x += (targetWX - curr.x) * 0.25;
          curr.y += (targetWY - curr.y) * 0.25;

          ctx.lineTo(curr.x, curr.y);
        }

        ctx.strokeStyle = 'rgba(255, 200, 100, 0.75)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#FF8800';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();
      };

      updateAndDrawWhisker(leftWhisker, whiskerBaseL, -1);
      updateAndDrawWhisker(rightWhisker, whiskerBaseR, 1);

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
