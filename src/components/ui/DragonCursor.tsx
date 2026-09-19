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

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Cursor & Scroll Tracking
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

    // --- DRAGON STATE ---
    const NUM_SEGMENTS = 26;
    const SEG_DIST = 9.0;
    const segments: Segment[] = [];

    let posX = width / 2;
    let posY = height / 2;
    let vx = 5.0;
    let vy = 0;
    let angle = 0;

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      let r = 10;
      if (i < 3) r = 6.5 + i * 1.8;
      else if (i < 9) r = 11.5 - (i - 3) * 0.45;
      else r = Math.max(9.0 - (i - 9) * 0.38, 1.4);

      segments.push({
        x: posX - i * SEG_DIST,
        y: posY,
        angle: 0,
        radius: r,
      });
    }

    // --- LIONFISH FEATHERED WING RAYS ---
    const NUM_RAYS = 10;
    const createWingRays = (side: 1 | -1): WingRay[] => {
      const rays: WingRay[] = [];
      for (let i = 0; i < NUM_RAYS; i++) {
        const prog = i / (NUM_RAYS - 1);
        const segIdx = Math.floor(3 + prog * 4);
        const baseOffset = (Math.PI * 0.35 + prog * Math.PI * 0.55) * side;
        const lenMultiplier = Math.sin(prog * Math.PI);
        const rayLen = 28 + lenMultiplier * 72 + (1 - prog) * 14;
        const curve = (0.35 + prog * 0.4) * side;

        rays.push({
          baseSegIdx: segIdx,
          baseOffsetAngle: baseOffset,
          length: rayLen,
          curveFactor: curve,
          joints: [
            { x: posX, y: posY },
            { x: posX, y: posY },
            { x: posX, y: posY },
            { x: posX, y: posY },
          ],
        });
      }
      return rays;
    };

    const leftRays = createWingRays(-1);
    const rightRays = createWingRays(1);

    // --- SNOUT WHISKERS ---
    const NUM_WHISKER_JOINTS = 6;
    const createWhisker = () => {
      return Array.from({ length: NUM_WHISKER_JOINTS }, () => ({ x: posX, y: posY }));
    };
    const leftWhisker = createWhisker();
    const rightWhisker = createWhisker();

    // --- EMBERS ---
    const embers: Ember[] = [];

    // --- SEAMLESS BEACON FLIGHT ENGINE ---
    let orbitAngle = 0;
    let time = 0;
    let lastTime = performance.now();

    // Continuously interpolated beacon coordinates (NEVER jumps or teleports)
    let beaconX = width / 2;
    let beaconY = height / 2;

    // Flapping flight state
    let flapTimer = 0;
    let flapMode: 'GLIDE' | 'FLAP' = 'GLIDE';
    let nextFlapTime = performance.now() + 2000;
    let flapDuration = 1.0;

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      
      const timeScale = Math.min(Math.max(dt * 60, 0.35), 2.0);
      time += dt * 1.8;

      ctx.clearRect(0, 0, width, height);

      // 1. SEAMLESS DYNAMIC TARGETING (Scroll Soaring & Cursor Tracking)
      const isScrolling = currentTime - lastScrollTime < 750;
      const isMouseActive = !isScrolling && (hasInteracted && currentTime - lastMouseMoveTime < 1400);

      let targetBeaconX: number;
      let targetBeaconY: number;

      if (isScrolling) {
        // While scrolling down: Soar dynamically across the screen in fluid S-curves
        orbitAngle += dt * 1.6;
        const spanX = width * 0.38;
        const spanY = height * 0.30;
        targetBeaconX = width * 0.5 + Math.sin(time * 0.8) * spanX;
        targetBeaconY = height * 0.5 + Math.cos(time * 1.1) * spanY;
      } else if (isMouseActive) {
        // While moving mouse: Orbit smoothly around cursor at 80px
        orbitAngle += dt * 1.3;
        targetBeaconX = mouseX + Math.cos(orbitAngle) * 80;
        targetBeaconY = mouseY + Math.sin(orbitAngle) * 80;
      } else {
        // Idle screen patrol: Elegant continuous Lissajous curves
        orbitAngle += dt * 0.8;
        const spanX = width * 0.36;
        const spanY = height * 0.28;
        targetBeaconX = width * 0.5 + Math.sin(time * 0.45) * spanX;
        targetBeaconY = height * 0.5 + Math.sin(time * 0.9) * spanY;
      }

      // Smooth continuous exponential interpolation (Guarantees zero jerky snaps or lost flow)
      const blendRate = Math.min(dt * 3.2, 0.12);
      beaconX += (targetBeaconX - beaconX) * blendRate;
      beaconY += (targetBeaconY - beaconY) * blendRate;

      // 2. STEERING & CONSTANT CRUISE PROPULSION (Smooth, controlled, never stopping)
      const dx = beaconX - posX;
      const dy = beaconY - posY;
      const distToBeacon = Math.hypot(dx, dy);

      // Flapping state transitions
      if (currentTime > nextFlapTime && flapMode === 'GLIDE') {
        flapMode = 'FLAP';
        flapTimer = 0;
        flapDuration = 1.0 + Math.random() * 0.8;
      }

      let flapWave = 0;
      if (flapMode === 'FLAP') {
        flapTimer += dt * 2.8;
        flapWave = Math.sin(flapTimer * 7.5) * 0.55;
        if (flapTimer >= flapDuration) {
          flapMode = 'GLIDE';
          nextFlapTime = currentTime + 2400 + Math.random() * 3200;
        }
      } else {
        flapWave = Math.sin(time * 1.8) * 0.10;
      }

      // Constant, smooth cruising speed (3.8 to 5.8 px/frame)
      const targetSpeed = Math.min(5.8, 3.8 + distToBeacon * 0.012);
      const desiredVx = (dx / (distToBeacon || 1)) * targetSpeed;
      const desiredVy = (dy / (distToBeacon || 1)) * targetSpeed;

      // Reynolds steering force (smooth banking arcs)
      const steerFactor = (isScrolling ? 0.065 : (isMouseActive ? 0.075 : 0.045)) * timeScale;
      vx += (desiredVx - vx) * steerFactor;
      vy += (desiredVy - vy) * steerFactor;

      // Maintain steady cruising momentum (unbroken forward velocity)
      const currentSpeed = Math.max(3.6, Math.min(5.8, Math.hypot(vx, vy)));
      const normVx = vx / (Math.hypot(vx, vy) || 1);
      const normVy = vy / (Math.hypot(vx, vy) || 1);
      vx = normVx * currentSpeed;
      vy = normVy * currentSpeed;

      angle = Math.atan2(vy, vx);

      // Gentle screen edge bounce
      const pad = 40;
      if (posX < pad) vx += 0.3 * timeScale;
      if (posX > width - pad) vx -= 0.3 * timeScale;
      if (posY < pad) vy += 0.3 * timeScale;
      if (posY > height - pad) vy -= 0.3 * timeScale;

      // Sinuous swimming wave
      const swimWave = Math.sin(time * 3.4) * 0.06;
      const swimAngle = angle + swimWave;

      // Frame-rate independent constant velocity update
      posX += Math.cos(swimAngle) * currentSpeed * timeScale;
      posY += Math.sin(swimAngle) * currentSpeed * timeScale;

      posX = Math.max(20, Math.min(width - 20, posX));
      posY = Math.max(20, Math.min(height - 20, posY));

      // 3. INVERSE KINEMATICS SPINE
      segments[0].x = posX;
      segments[0].y = posY;
      segments[0].angle = angle;

      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const sDx = prev.x - curr.x;
        const sDy = prev.y - curr.y;
        let sAngle = Math.atan2(sDy, sDx);

        const spineSine = Math.sin(time * 3.8 - i * 0.32) * (0.05 + (i / NUM_SEGMENTS) * 0.1);
        sAngle += spineSine;

        curr.x = prev.x - Math.cos(sAngle) * SEG_DIST;
        curr.y = prev.y - Math.sin(sAngle) * SEG_DIST;
        curr.angle = sAngle;
      }

      // Embers
      const tail = segments[NUM_SEGMENTS - 1];
      if (Math.random() < 0.35 && embers.length < 24) {
        embers.push({
          x: tail.x,
          y: tail.y,
          vx: -Math.cos(tail.angle) * 0.8 + (Math.random() - 0.5) * 0.6,
          vy: -Math.sin(tail.angle) * 0.8 + (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.3 + 0.6,
          alpha: 0.75,
          decay: Math.random() * 0.03 + 0.02,
        });
      }

      // Draw embers
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

      // 4. DRAW LIONFISH WINGS
      const drawWings = (rays: WingRay[], side: 1 | -1) => {
        rays.forEach((ray) => {
          const baseSeg = segments[ray.baseSegIdx];
          if (!baseSeg) return;

          const ribAngle = baseSeg.angle + (Math.PI / 2) * side;
          const rootX = baseSeg.x + Math.cos(ribAngle) * (baseSeg.radius * 0.85);
          const rootY = baseSeg.y + Math.sin(ribAngle) * (baseSeg.radius * 0.85);

          const rayBaseAngle = baseSeg.angle + ray.baseOffsetAngle + flapWave * side;

          ray.joints[0].x = rootX;
          ray.joints[0].y = rootY;

          const segLen = ray.length / 3;
          for (let j = 1; j < 4; j++) {
            const jointAngle = rayBaseAngle + ray.curveFactor * (j * 0.3) - (flapWave * 0.2 * j * side);
            const targetJX = ray.joints[j - 1].x + Math.cos(jointAngle) * segLen;
            const targetJY = ray.joints[j - 1].y + Math.sin(jointAngle) * segLen;

            ray.joints[j].x += (targetJX - ray.joints[j].x) * 0.42;
            ray.joints[j].y += (targetJY - ray.joints[j].y) * 0.42;
          }
        });

        // Translucent membranes
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

        // White quill strokes
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

        // Silver quill strokes
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(212, 212, 216, 0.85)';
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

      drawWings(leftRays, -1);
      drawWings(rightRays, 1);

      // 5. DRAW VERTEBRAE & SCALES
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
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // 6. DRAW CRESCENT SPLIT TAIL FIN
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
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // 7. DRAGON HEAD, HORNS & EYES
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

      // Silver Horn ridges
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

      // 8. FLOWING SINUOUS WHISKERS
      const drawWhisker = (joints: { x: number; y: number }[], side: 1 | -1) => {
        const headCos = Math.cos(head.angle);
        const headSin = Math.sin(head.angle);
        const perpX = -headSin;
        const perpY = headCos;

        const snoutRootX = head.x + headCos * 11 + perpX * (side * 2.2);
        const snoutRootY = head.y + headSin * 11 + perpY * (side * 2.2);

        joints[0].x = snoutRootX;
        joints[0].y = snoutRootY;

        ctx.beginPath();
        ctx.moveTo(snoutRootX, snoutRootY);

        for (let j = 1; j < NUM_WHISKER_JOINTS; j++) {
          const wAngle = head.angle + Math.PI + Math.sin(time * 3.5 - j * 0.6) * 0.45 + (side * 0.28);
          const targetX = joints[j - 1].x + Math.cos(wAngle) * 6.0;
          const targetY = joints[j - 1].y + Math.sin(wAngle) * 6.0;

          joints[j].x += (targetX - joints[j].x) * 0.42;
          joints[j].y += (targetY - joints[j].y) * 0.42;

          ctx.lineTo(joints[j].x, joints[j].y);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      };

      drawWhisker(leftWhisker, -1);
      drawWhisker(rightWhisker, 1);

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
