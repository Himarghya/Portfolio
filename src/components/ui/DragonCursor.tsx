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

interface Quill {
  segIdx: number;
  side: 1 | -1;
  length: number;
  angleOffset: number;
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

    // Movement & Scroll Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let lastMouseMoveTime = performance.now();
    let isMouseMoving = false;
    let isScrolling = false;
    let lastScrollTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      if (dx * dx + dy * dy > 3) {
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

    const onScroll = () => {
      isScrolling = true;
      lastScrollTime = performance.now();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- CELESTIAL DRAGON SPINE CONFIGURATION ---
    const NUM_SEGMENTS = 28;
    const SEGMENT_DIST = 8.5;
    const segments: Segment[] = [];

    let posX = width / 2;
    let posY = height / 2;
    let currentAngle = -Math.PI / 4;
    let currentSpeed = 5.2;

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      let r = 10;
      if (i < 3) r = 6.5 + i * 1.8;
      else if (i < 9) r = 11.5 - (i - 3) * 0.4;
      else r = Math.max(9.0 - (i - 9) * 0.38, 1.4);

      segments.push({
        x: posX - i * SEGMENT_DIST,
        y: posY,
        angle: currentAngle,
        radius: r,
      });
    }

    // --- FEATHERED RAY WINGS (Lionfish Quills) ---
    const createWingRays = (side: 1 | -1): WingRay[] => {
      const rays: WingRay[] = [];
      const NUM_RAYS = 12;

      for (let i = 0; i < NUM_RAYS; i++) {
        const progress = i / (NUM_RAYS - 1);
        const segIdx = Math.floor(3 + progress * 4);
        const baseOffset = (Math.PI * 0.35 + progress * Math.PI * 0.55) * side;

        const lenMultiplier = Math.sin(progress * Math.PI);
        const rayLen = 30 + lenMultiplier * 75 + (1 - progress) * 15;
        const curve = (0.35 + progress * 0.4) * side;

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
          thickness: Math.max(1.6 - progress * 0.9, 0.7),
          joints,
        });
      }
      return rays;
    };

    const leftWingRays = createWingRays(-1);
    const rightWingRays = createWingRays(1);

    // --- DORSAL & VENTRAL SPINE QUILLS ---
    const spineQuills: Quill[] = [];
    for (let i = 7; i < NUM_SEGMENTS - 2; i += 2) {
      const prog = (i - 7) / (NUM_SEGMENTS - 9);
      const qLen = (1 - prog) * 24 + 6;
      spineQuills.push({ segIdx: i, side: -1, length: qLen, angleOffset: Math.PI * 0.78 });
      spineQuills.push({ segIdx: i, side: 1, length: qLen, angleOffset: -Math.PI * 0.78 });
    }

    // --- SNOUT WHISKERS ---
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
      if (embers.length > 25) return;
      embers.push({
        x,
        y,
        vx: vx + (Math.random() - 0.5) * 0.8,
        vy: vy + (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.4 + 0.5,
        alpha: Math.random() * 0.5 + 0.35,
        decay: Math.random() * 0.03 + 0.02,
      });
    };

    // Continuous Whole-Page Roaming
    let targetX = width * 0.3;
    let targetY = height * 0.3;
    let currentQuadrant = 0;
    let waypointSetTime = performance.now();

    const pickNextQuadrantWaypoint = () => {
      currentQuadrant = (currentQuadrant + 1 + Math.floor(Math.random() * 2)) % 4;
      const marginX = width * 0.12;
      const marginY = height * 0.12;

      let qMinX = marginX;
      let qMaxX = width * 0.5;
      let qMinY = marginY;
      let qMaxY = height * 0.5;

      if (currentQuadrant === 1) {
        qMinX = width * 0.5;
        qMaxX = width - marginX;
        qMinY = marginY;
        qMaxY = height * 0.5;
      } else if (currentQuadrant === 2) {
        qMinX = width * 0.5;
        qMaxX = width - marginX;
        qMinY = height * 0.5;
        qMaxY = height - marginY;
      } else if (currentQuadrant === 3) {
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

      // Check scroll & mouse activity
      if (currentTime - lastScrollTime > 800) {
        isScrolling = false;
      }
      if (currentTime - lastMouseMoveTime > 500) {
        isMouseMoving = false;
      }

      // If scrolling or mouse is still, autonomously roam across the screen
      const isAutonomous = !isMouseMoving || isScrolling;

      if (isAutonomous) {
        const dTargetX = targetX - posX;
        const dTargetY = targetY - posY;
        const distSq = dTargetX * dTargetX + dTargetY * dTargetY;

        if (distSq < 130 * 130 || currentTime - waypointSetTime > 2800) {
          pickNextQuadrantWaypoint();
        }
      } else {
        targetX = mouseX;
        targetY = mouseY;
      }

      // Flapping state machine
      if (currentTime > nextFlapBurstTime && flapMode === 'GLIDE') {
        flapMode = 'FLAPPING';
        flapTimer = 0;
        flapDuration = 1.2 + Math.random() * 0.9;
      }

      let flapAngleDelta = 0;
      if (flapMode === 'FLAPPING') {
        flapTimer += dt * 3.4;
        wingBeatProgress = Math.sin(flapTimer * 8.8);
        flapAngleDelta = wingBeatProgress * 0.7;

        if (wingBeatProgress > 0.15) {
          currentSpeed += 0.15;
        }

        if (flapTimer >= flapDuration) {
          flapMode = 'GLIDE';
          nextFlapBurstTime = currentTime + 2200 + Math.random() * 3800;
        }
      } else {
        flapAngleDelta = Math.sin(time * 2.4) * 0.13;
      }

      // Dynamic Pursuit Acceleration & Cruising Speed
      let targetCruisingSpeed = 5.2;
      let turnRate = 0.06;

      const toTargetX = targetX - posX;
      const toTargetY = targetY - posY;
      const distToTarget = Math.sqrt(toTargetX * toTargetX + toTargetY * toTargetY);

      if (!isAutonomous) {
        // Active mouse chasing
        targetCruisingSpeed = Math.min(16.0, 5.5 + distToTarget * 0.038);
        turnRate = Math.min(0.20, 0.09 + distToTarget * 0.0005);
      } else {
        // Smooth continuous cruising flight during scroll or idle
        targetCruisingSpeed = isScrolling ? 6.2 : 5.2;
        turnRate = 0.06;
      }

      currentSpeed += (targetCruisingSpeed - currentSpeed) * 0.12;
      currentSpeed = Math.min(Math.max(currentSpeed, 4.2), 18.0);

      // --- SMOOTH TANGENT ORBIT STEERING (Prevents Point-Oscillation Stalls) ---
      const baseAngle = Math.atan2(toTargetY, toTargetX);
      
      // When close to target point, apply a gentle orbital tangent offset so it swoops in a wide circle rather than stalling
      let desiredAngle = baseAngle;
      if (!isAutonomous && distToTarget < 75) {
        const orbitFactor = Math.max(0, 1 - distToTarget / 75);
        desiredAngle = baseAngle + orbitFactor * 0.55;
      }

      let angleDiff = desiredAngle - currentAngle;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

      currentAngle += angleDiff * turnRate;

      // Soft Edge repellent
      const edgePadding = 70;
      if (posX < edgePadding) currentAngle += 0.06;
      if (posX > width - edgePadding) currentAngle -= 0.06;
      if (posY < edgePadding) currentAngle += 0.06;
      if (posY > height - edgePadding) currentAngle -= 0.06;

      // Sinuous swimming wave
      const waveAmplitude = Math.min(currentSpeed * 0.32, 2.8);
      const waveAngle = Math.sin(time * 4.0) * (waveAmplitude * 0.04);

      posX += Math.cos(currentAngle + waveAngle) * currentSpeed;
      posY += Math.sin(currentAngle + waveAngle) * currentSpeed;

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

        const sWave = Math.sin(time * 3.8 - i * 0.34) * (0.06 + (i / NUM_SEGMENTS) * 0.12);
        sAngle += sWave;

        curr.x = prev.x - Math.cos(sAngle) * SEGMENT_DIST;
        curr.y = prev.y - Math.sin(sAngle) * SEGMENT_DIST;
        curr.angle = sAngle;
      }

      // Spawn tail embers
      const tail = segments[NUM_SEGMENTS - 1];
      if (Math.random() < 0.3) {
        spawnEmber(tail.x, tail.y, -Math.cos(tail.angle) * 0.8, -Math.sin(tail.angle) * 0.8);
      }

      // --- 1. BATCHED STARDUST EMBERS ---
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

      // --- 2. BATCHED FEATHERED RAY WINGS (Lionfish Quills) ---
      const updateAndDrawWings = (rays: WingRay[], side: 1 | -1) => {
        rays.forEach((ray) => {
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
            const jointAngle = rayBaseAngle + ray.curveFactor * (j * 0.3) - (flapAngleDelta * 0.22 * j * side);
            const targetJX = ray.joints[j - 1].x + Math.cos(jointAngle) * segLen;
            const targetJY = ray.joints[j - 1].y + Math.sin(jointAngle) * segLen;

            ray.joints[j].x += (targetJX - ray.joints[j].x) * 0.42;
            ray.joints[j].y += (targetJY - ray.joints[j].y) * 0.42;
          }
        });

        // Batched translucent membranes
        ctx.beginPath();
        for (let rIdx = 1; rIdx < rays.length; rIdx++) {
          const curr = rays[rIdx];
          const prev = rays[rIdx - 1];
          ctx.moveTo(curr.joints[0].x, curr.joints[0].y);
          ctx.lineTo(curr.joints[2].x, curr.joints[2].y);
          ctx.lineTo(prev.joints[2].x, prev.joints[2].y);
          ctx.lineTo(prev.joints[0].x, prev.joints[0].y);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
        ctx.fill();

        // Batched Quill Strokes
        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.0;
        rays.forEach((ray, rIdx) => {
          if (rIdx % 2 === 0) {
            ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
            ctx.quadraticCurveTo(ray.joints[1].x, ray.joints[1].y, ray.joints[2].x, ray.joints[2].y);
            ctx.quadraticCurveTo(ray.joints[2].x, ray.joints[2].y, ray.joints[3].x, ray.joints[3].y);
          }
        });
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(212, 212, 216, 0.8)';
        ctx.lineWidth = 0.8;
        rays.forEach((ray, rIdx) => {
          if (rIdx % 2 !== 0) {
            ctx.moveTo(ray.joints[0].x, ray.joints[0].y);
            ctx.quadraticCurveTo(ray.joints[1].x, ray.joints[1].y, ray.joints[2].x, ray.joints[2].y);
            ctx.quadraticCurveTo(ray.joints[2].x, ray.joints[2].y, ray.joints[3].x, ray.joints[3].y);
          }
        });
        ctx.stroke();
      };

      updateAndDrawWings(leftWingRays, -1);
      updateAndDrawWings(rightWingRays, 1);

      // --- 3. BATCHED SPINE NEEDLE QUILLS ---
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
      ctx.lineWidth = 0.8;
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

      // --- 4. BATCHED CHEVRON SCALES & VERTEBRAE ---
      ctx.beginPath();
      for (let i = NUM_SEGMENTS - 1; i >= 0; i--) {
        const seg = segments[i];
        const r = seg.radius;
        const cosA = Math.cos(seg.angle);
        const sinA = Math.sin(seg.angle);

        const p1x = seg.x + cosA * (r * 0.85);
        const p1y = seg.y + sinA * (r * 0.85);
        const leftPerpX = -sinA * r;
        const leftPerpY = cosA * r;

        const p2x = seg.x - cosA * (r * 0.8) + leftPerpX * 0.95;
        const p2y = seg.y - sinA * (r * 0.8) + leftPerpY * 0.95;
        const p3x = seg.x - cosA * (r * 0.35);
        const p3y = seg.y - sinA * (r * 0.35);
        const p4x = seg.x - cosA * (r * 0.8) - leftPerpX * 0.95;
        const p4y = seg.y - sinA * (r * 0.8) - leftPerpY * 0.95;

        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.lineTo(p4x, p4y);
        ctx.closePath();
      }
      ctx.fillStyle = '#18181B';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // --- 5. CRESCENT SPLIT TAIL FIN ---
      const tailSeg = segments[NUM_SEGMENTS - 1];
      const tailCos = Math.cos(tailSeg.angle);
      const tailSin = Math.sin(tailSeg.angle);
      const tailPerpX = -tailSin;
      const tailPerpY = tailCos;

      ctx.beginPath();
      [-1, 1].forEach((side) => {
        const finTipX = tailSeg.x - tailCos * 28 + tailPerpX * (side * 15);
        const finTipY = tailSeg.y - tailSin * 28 + tailPerpY * (side * 15);

        ctx.moveTo(tailSeg.x, tailSeg.y);
        ctx.quadraticCurveTo(
          tailSeg.x - tailCos * 15 + tailPerpX * (side * 7),
          tailSeg.y - tailSin * 15 + tailPerpY * (side * 7),
          finTipX,
          finTipY
        );
        ctx.quadraticCurveTo(
          tailSeg.x - tailCos * 18,
          tailSeg.y - tailSin * 18,
          tailSeg.x - tailCos * 5,
          tailSeg.y - tailSin * 5
        );
        ctx.closePath();
      });
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // --- 6. DRAGON HEAD, HORNS & MASK ---
      const head = segments[0];
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);

      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.quadraticCurveTo(11, -6, 0, -7);
      ctx.lineTo(-9, -14); // Horn tip left
      ctx.lineTo(-4, -4);
      ctx.lineTo(-9, 0);
      ctx.lineTo(-4, 4);
      ctx.lineTo(-9, 14); // Horn tip right
      ctx.lineTo(0, 7);
      ctx.quadraticCurveTo(11, 6, 15, 0);
      ctx.closePath();

      ctx.fillStyle = '#18181B';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Horn ridges
      ctx.beginPath();
      ctx.moveTo(-2, -4);
      ctx.lineTo(-9, -14);
      ctx.moveTo(-2, 4);
      ctx.lineTo(-9, 14);
      ctx.strokeStyle = '#E4E4E7';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // Glowing Slit Eyes
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.ellipse(5.5, 3.8 * side, 2.2, 1.2, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(5.8, 3.8 * side, 1.3, 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#09090B';
        ctx.fill();
      });

      ctx.restore();

      // --- 7. FLOWING SINUOUS WHISKERS ---
      const updateAndDrawWhisker = (whisker: Whisker, side: 1 | -1) => {
        const headCos = Math.cos(head.angle);
        const headSin = Math.sin(head.angle);
        const perpX = -headSin;
        const perpY = headCos;

        const snoutRootX = head.x + headCos * 11 + perpX * (side * 2.2);
        const snoutRootY = head.y + headSin * 11 + perpY * (side * 2.2);

        whisker.joints[0].x = snoutRootX;
        whisker.joints[0].y = snoutRootY;

        ctx.beginPath();
        ctx.moveTo(snoutRootX, snoutRootY);

        for (let j = 1; j < NUM_WHISKER_JOINTS; j++) {
          const wAngle = head.angle + Math.PI + Math.sin(time * 3.5 - j * 0.6) * 0.45 + (side * 0.28);
          const targetX = whisker.joints[j - 1].x + Math.cos(wAngle) * 6.0;
          const targetY = whisker.joints[j - 1].y + Math.sin(wAngle) * 6.0;

          whisker.joints[j].x += (targetX - whisker.joints[j].x) * 0.42;
          whisker.joints[j].y += (targetY - whisker.joints[j].y) * 0.42;

          ctx.lineTo(whisker.joints[j].x, whisker.joints[j].y);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 0.75;
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
