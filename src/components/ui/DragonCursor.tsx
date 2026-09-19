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
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let lastMouseMoveTime = performance.now();
    let isMouseMoving = false;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      if (dx * dx + dy * dy > 4) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        lastMouseMoveTime = performance.now();
        isMouseMoving = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseX = t.clientX;
        mouseY = t.clientY;
        lastMouseMoveTime = performance.now();
        isMouseMoving = true;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- COMPACT DRAGON SPINE (26 Segments) ---
    const NUM_SEGMENTS = 26;
    const SEGMENT_DIST = 7.2;
    const segments: Segment[] = [];

    let posX = width / 2;
    let posY = height / 2;
    let currentAngle = -Math.PI / 4;
    let currentSpeed = 5.2;

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      let r = 7.5;
      if (i < 3) r = 4.8 + i * 1.4;
      else if (i < 8) r = 8.5 - (i - 3) * 0.35;
      else r = Math.max(6.8 - (i - 8) * 0.32, 1.2);

      segments.push({
        x: posX - i * SEGMENT_DIST,
        y: posY,
        angle: currentAngle,
        radius: r,
      });
    }

    // --- CLASSIC DRACONIC WINGS (Pair of Sleek Wings with 4 Webbed Struts) ---
    const createWingRays = (side: 1 | -1): WingRay[] => {
      const rays: WingRay[] = [];
      const NUM_RAYS = 4;

      for (let i = 0; i < NUM_RAYS; i++) {
        const progress = i / (NUM_RAYS - 1);
        const segIdx = Math.floor(3 + progress * 2);
        const baseOffset = (Math.PI * 0.35 + progress * Math.PI * 0.42) * side;

        const rayLen = 28 + (1 - progress * 0.35) * 36;
        const curve = (0.28 + progress * 0.32) * side;

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

    // --- DRAGON TACTILE WHISKERS ---
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

    // Embers
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

    // --- CONTINUOUS WHOLE-PAGE ROAMING ENGINE ---
    // Quadrant-based roaming targets ensuring full screen coverage
    let targetX = width * 0.25;
    let targetY = height * 0.25;
    let currentQuadrant = 0;
    let waypointSetTime = performance.now();

    const pickNextQuadrantWaypoint = () => {
      // Pick a distant quadrant across the screen
      currentQuadrant = (currentQuadrant + 1 + Math.floor(Math.random() * 2)) % 4;
      const marginX = width * 0.12;
      const marginY = height * 0.12;

      let qMinX = marginX;
      let qMaxX = width * 0.5;
      let qMinY = marginY;
      let qMaxY = height * 0.5;

      if (currentQuadrant === 1) {
        // Top Right
        qMinX = width * 0.5;
        qMaxX = width - marginX;
        qMinY = marginY;
        qMaxY = height * 0.5;
      } else if (currentQuadrant === 2) {
        // Bottom Right
        qMinX = width * 0.5;
        qMaxX = width - marginX;
        qMinY = height * 0.5;
        qMaxY = height - marginY;
      } else if (currentQuadrant === 3) {
        // Bottom Left
        qMinX = marginX;
        qMaxX = width * 0.5;
        qMinY = height * 0.5;
        qMaxY = height - marginY;
      }

      targetX = qMinX + Math.random() * (qMaxX - qMinX);
      targetY = qMinY + Math.random() * (qMaxY - qMinY);
      waypointSetTime = performance.now();
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

      ctx.clearRect(0, 0, width, height);

      // Determine whether user is actively guiding with mouse
      if (currentTime - lastMouseMoveTime > 600) {
        isMouseMoving = false;
      }

      // If mouse is still, autonomously roam across the entire page continuously
      if (!isMouseMoving) {
        const dTargetX = targetX - posX;
        const dTargetY = targetY - posY;
        const distSq = dTargetX * dTargetX + dTargetY * dTargetY;

        // If close to current waypoint or time elapsed > 3.2s, smoothly transition to next quadrant
        if (distSq < 120 * 120 || currentTime - waypointSetTime > 3200) {
          pickNextQuadrantWaypoint();
        }
      } else {
        // Active mouse tracking
        targetX = mouseX;
        targetY = mouseY;
      }

      // Flapping state machine
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
          currentSpeed += 0.15;
        }

        if (flapTimer >= flapDuration) {
          flapMode = 'GLIDE';
          nextFlapBurstTime = currentTime + 2000 + Math.random() * 3500;
        }
      } else {
        flapAngleDelta = Math.sin(time * 2.5) * 0.14;
      }

      // Smooth forward cruising speed (Never stops!)
      const targetCruisingSpeed = isMouseMoving ? 6.0 : 4.8;
      currentSpeed += (targetCruisingSpeed - currentSpeed) * 0.05;
      currentSpeed = Math.min(Math.max(currentSpeed, 4.0), 8.0);

      // Steering towards target
      const toTargetX = targetX - posX;
      const toTargetY = targetY - posY;
      const distToTarget = Math.sqrt(toTargetX * toTargetX + toTargetY * toTargetY);

      if (distToTarget > 20) {
        const desiredAngle = Math.atan2(toTargetY, toTargetX);
        let angleDiff = desiredAngle - currentAngle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

        const turnRate = isMouseMoving ? 0.09 : 0.05;
        currentAngle += angleDiff * turnRate;
      }

      // Smooth edge repellent steering so dragon never bounces or stalls on edges
      const edgePadding = 70;
      if (posX < edgePadding) currentAngle += 0.06;
      if (posX > width - edgePadding) currentAngle -= 0.06;
      if (posY < edgePadding) currentAngle += 0.06;
      if (posY > height - edgePadding) currentAngle -= 0.06;

      // Sinuous undulating swimming motion
      const waveAmplitude = Math.min(currentSpeed * 0.3, 2.8);
      const waveAngle = Math.sin(time * 4.2) * (waveAmplitude * 0.04);

      // Move forward continuously
      posX += Math.cos(currentAngle + waveAngle) * currentSpeed;
      posY += Math.sin(currentAngle + waveAngle) * currentSpeed;

      // Soft clamp within visible viewport
      posX = Math.max(30, Math.min(width - 30, posX));
      posY = Math.max(30, Math.min(height - 30, posY));

      // --- SPINE PROPAGATION (Inverse Kinematics) ---
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

      // Spawn tail stardust embers
      const tail = segments[NUM_SEGMENTS - 1];
      if (Math.random() < 0.35) {
        spawnEmber(tail.x, tail.y, -Math.cos(tail.angle) * 0.9, -Math.sin(tail.angle) * 0.9);
      }

      // --- RENDER STARDUST EMBERS ---
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

      // --- RENDER CLASSIC DRACONIC WINGS (Pair of Sleek Wings) ---
      const updateAndDrawWings = (rays: WingRay[], side: 1 | -1) => {
        // 1. Calculate joint positions for all struts
        rays.forEach((ray) => {
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
        });

        // 2. Draw scalloped wing membrane webbing between struts
        for (let rIdx = 1; rIdx < rays.length; rIdx++) {
          const currRay = rays[rIdx];
          const prevRay = rays[rIdx - 1];

          // Scalloped arched web edge
          const midTipX = (currRay.joints[2].x + prevRay.joints[2].x) * 0.5 - Math.cos(segments[3].angle) * (6 * side);
          const midTipY = (currRay.joints[2].y + prevRay.joints[2].y) * 0.5 - Math.sin(segments[3].angle) * (6 * side);

          ctx.beginPath();
          ctx.moveTo(prevRay.joints[0].x, prevRay.joints[0].y);
          ctx.lineTo(prevRay.joints[2].x, prevRay.joints[2].y);
          ctx.quadraticCurveTo(midTipX, midTipY, currRay.joints[2].x, currRay.joints[2].y);
          ctx.lineTo(currRay.joints[0].x, currRay.joints[0].y);
          ctx.closePath();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
          ctx.fill();

          // Delicate scalloped edge stroke
          ctx.beginPath();
          ctx.moveTo(prevRay.joints[2].x, prevRay.joints[2].y);
          ctx.quadraticCurveTo(midTipX, midTipY, currRay.joints[2].x, currRay.joints[2].y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // 3. Draw clean wing bone struts & leading elbow claw
        rays.forEach((ray, rIdx) => {
          ctx.beginPath();
          ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
          ctx.quadraticCurveTo(
            ray.joints[1].x,
            ray.joints[1].y,
            ray.joints[2].x,
            ray.joints[2].y
          );
          ctx.strokeStyle = rIdx === 0 ? '#FFFFFF' : '#D4D4D8';
          ctx.lineWidth = rIdx === 0 ? 1.4 : 0.9;
          ctx.stroke();

          // Sharp wing thumb / elbow claw on leading edge spar
          if (rIdx === 0) {
            const elbowX = ray.joints[1].x;
            const elbowY = ray.joints[1].y;
            const clawAngle = segments[3].angle + (Math.PI * 0.75) * side;
            ctx.beginPath();
            ctx.moveTo(elbowX, elbowY);
            ctx.lineTo(elbowX + Math.cos(clawAngle) * 4.5, elbowY + Math.sin(clawAngle) * 4.5);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        });
      };

      updateAndDrawWings(leftWingRays, -1);
      updateAndDrawWings(rightWingRays, 1);

      // --- RENDER CHEVRON DORSAL SCALES & VERTEBRAE ---
      for (let i = NUM_SEGMENTS - 1; i >= 0; i--) {
        const seg = segments[i];
        const r = seg.radius;
        const cosA = Math.cos(seg.angle);
        const sinA = Math.sin(seg.angle);

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

      // --- RENDER CRESCENT SPLIT TAIL FIN ---
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

      // --- RENDER UNIQUE SLEEK DRAGON HEAD & HORNS ---
      const head = segments[0];
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);

      ctx.beginPath();
      ctx.moveTo(13, 0);
      ctx.quadraticCurveTo(9, -5, 0, -6);
      ctx.lineTo(-8, -12);
      ctx.lineTo(-4, -4);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-4, 4);
      ctx.lineTo(-8, 12);
      ctx.lineTo(0, 6);
      ctx.quadraticCurveTo(9, 5, 13, 0);
      ctx.closePath();

      ctx.fillStyle = '#18181B';
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, -4);
      ctx.lineTo(-8, -12);
      ctx.moveTo(-2, 4);
      ctx.lineTo(-8, 12);
      ctx.strokeStyle = '#E4E4E7';
      ctx.lineWidth = 1.0;
      ctx.stroke();

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

      ctx.beginPath();
      ctx.arc(10.5, -1.2, 0.8, 0, Math.PI * 2);
      ctx.arc(10.5, 1.2, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      // --- RENDER FLOWING SINUOUS DRAGON WHISKERS ---
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
