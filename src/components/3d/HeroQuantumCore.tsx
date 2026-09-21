import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 🐦 Prominent Stylized 3D Perched Bird
const PerchedBird: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ position = [0.42, 0.20, 0.38], rotation = [0, -0.6, 0], mouseRef }) => {
  const birdRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    // Breathing & subtle bobbing
    if (birdRef.current) {
      birdRef.current.position.y = position[1] + Math.sin(time * 2.8) * 0.008;
    }

    // Curious head tilts & looking at cursor
    if (headRef.current) {
      const targetLookX = mouse.y * 0.3 + Math.sin(time * 1.6) * 0.1;
      const targetLookY = mouse.x * 0.4 + Math.cos(time * 1.1) * 0.15;
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetLookX, 0.1);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetLookY, 0.1);
      headRef.current.rotation.z = Math.sin(time * 2.0) * 0.04;
    }

    // Perky tail flicks
    if (tailRef.current) {
      tailRef.current.rotation.x = 0.4 + Math.sin(time * 3.5) * 0.12 + (Math.sin(time * 8) > 0.85 ? 0.18 : 0);
    }

    // Subtle wing tuck adjustment
    if (wingLeftRef.current && wingRightRef.current) {
      const flutter = Math.sin(time * 5.0) * 0.02;
      wingLeftRef.current.rotation.z = -0.15 + flutter;
      wingRightRef.current.rotation.z = 0.15 - flutter;
    }
  });

  return (
    <group ref={birdRef} position={position} rotation={rotation} scale={1.15}>
      {/* 🐦 Bird Body (Plump & Vivid Azure Plumage) */}
      <mesh position={[0, 0, 0]} rotation={[-0.15, 0, 0]}>
        <sphereGeometry args={[0.13, 28, 28]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* 🐦 High-Contrast Bright Golden Yellow Breast */}
      <mesh position={[0, -0.015, 0.075]} rotation={[-0.15, 0, 0]} scale={[0.88, 0.92, 0.65]}>
        <sphereGeometry args={[0.115, 24, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* 🐦 Left Wing */}
      <mesh
        ref={wingLeftRef}
        position={[0.115, 0.02, -0.02]}
        rotation={[0.2, 0.1, -0.15]}
        scale={[0.28, 0.85, 1.35]}
      >
        <sphereGeometry args={[0.085, 18, 18]} />
        <meshStandardMaterial color="#0369a1" roughness={0.35} />
      </mesh>

      {/* 🐦 Right Wing */}
      <mesh
        ref={wingRightRef}
        position={[-0.115, 0.02, -0.02]}
        rotation={[0.2, -0.1, 0.15]}
        scale={[0.28, 0.85, 1.35]}
      >
        <sphereGeometry args={[0.085, 18, 18]} />
        <meshStandardMaterial color="#0369a1" roughness={0.35} />
      </mesh>

      {/* 🐦 Tail Feathers (Deep Navy / Azure) */}
      <mesh
        ref={tailRef}
        position={[0, 0.03, -0.16]}
        rotation={[0.4, 0, 0]}
        scale={[0.75, 0.22, 1.7]}
      >
        <coneGeometry args={[0.075, 0.24, 14]} />
        <meshStandardMaterial color="#075985" roughness={0.4} />
      </mesh>

      {/* 🐦 Head Group (With Expressive Eyes & Orange Beak) */}
      <group ref={headRef} position={[0, 0.125, 0.07]}>
        {/* Head Sphere */}
        <mesh>
          <sphereGeometry args={[0.095, 28, 28]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </mesh>

        {/* Crown Crest */}
        <mesh position={[0, 0.065, -0.02]} scale={[0.65, 0.55, 0.85]}>
          <sphereGeometry args={[0.065, 18, 18]} />
          <meshStandardMaterial color="#0369a1" roughness={0.35} />
        </mesh>

        {/* Left Eye Black Pupil */}
        <mesh position={[0.068, 0.022, 0.048]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#09090b" roughness={0.05} metalness={0.8} />
        </mesh>
        {/* Left Eye Glint (Catchlight) */}
        <mesh position={[0.078, 0.028, 0.058]}>
          <sphereGeometry args={[0.006, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Right Eye Black Pupil */}
        <mesh position={[-0.068, 0.022, 0.048]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#09090b" roughness={0.05} metalness={0.8} />
        </mesh>
        {/* Right Eye Glint (Catchlight) */}
        <mesh position={[-0.078, 0.028, 0.058]}>
          <sphereGeometry args={[0.006, 10, 10]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Vibrant Orange Beak */}
        <mesh position={[0, 0.005, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.032, 0.09, 14]} />
          <meshStandardMaterial color="#f97316" roughness={0.25} metalness={0.1} />
        </mesh>
      </group>

      {/* 🐦 Little Orange Claws Perched on Rim */}
      <mesh position={[0.045, -0.115, 0.035]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>
      <mesh position={[-0.045, -0.115, 0.035]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 0.06]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>
    </group>
  );
};

// 🌿 3D Stylized Hanging Potted Plant with Foliage Clearance for Bird
const HangingPlantMesh: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  activeHighlight: string | null;
}> = ({ mouseRef }) => {
  const potGroup = useRef<THREE.Group>(null);
  const foliageGroup = useRef<THREE.Group>(null);

  // Bird is stationed at front-right rim: angle ~ 0.73 rad (around 42 degrees)
  const birdPerchAngle = Math.atan2(0.38, 0.42);

  // Generate lush trailing vines and leaves with clearance around the perched bird
  const { vineLeaves, topLeaves } = useMemo(() => {
    // 1. Top dense cluster leaves (avoiding bird perch zone so bird is 100% visible)
    const top: { position: [number, number, number]; rotation: [number, number, number]; scale: number }[] = [];
    const topCount = 34;
    let placed = 0;
    let attempts = 0;

    while (placed < topCount && attempts < 100) {
      attempts++;
      const radius = 0.18 + Math.random() * 0.42;
      const angle = Math.random() * Math.PI * 2;

      // Distance check to bird angle
      const angleDiff = Math.abs(Math.atan2(Math.sin(angle - birdPerchAngle), Math.cos(angle - birdPerchAngle)));
      // If close to bird's perch angle in foreground, don't obstruct
      if (angleDiff < 0.55 && radius > 0.28) {
        continue;
      }

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.14 + (1 - radius / 0.65) * 0.22 + Math.random() * 0.08;
      const rotX = -0.3 + Math.random() * 0.6;
      const rotY = angle + Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      const rotZ = 0.4 + Math.random() * 0.5;

      top.push({ position: [x, y, z], rotation: [rotX, rotY, rotZ], scale: 0.75 + Math.random() * 0.35 });
      placed++;
    }

    // 2. Cascading trailing vine strands (framing the pot)
    const vines: { position: [number, number, number]; rotation: [number, number, number]; scale: number }[] = [];
    const strandCount = 9;
    for (let s = 0; s < strandCount; s++) {
      const strandAngle = (s / strandCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;

      // Keep vines clear of bird perch zone
      const angleDiff = Math.abs(Math.atan2(Math.sin(strandAngle - birdPerchAngle), Math.cos(strandAngle - birdPerchAngle)));
      if (angleDiff < 0.45) {
        continue;
      }

      const strandLength = 3 + Math.floor(Math.random() * 4);
      const rimRadius = 0.58;

      let curX = Math.cos(strandAngle) * rimRadius;
      let curZ = Math.sin(strandAngle) * rimRadius;
      let curY = 0.05;

      for (let l = 0; l < strandLength; l++) {
        curY -= 0.14 + Math.random() * 0.03;
        curX += (Math.cos(strandAngle) * 0.05) + (Math.random() - 0.5) * 0.03;
        curZ += (Math.sin(strandAngle) * 0.05) + (Math.random() - 0.5) * 0.03;

        const leafScale = Math.max(0.42, 0.85 - l * 0.09 + Math.random() * 0.12);
        vines.push({
          position: [curX, curY, curZ],
          rotation: [0.7 + l * 0.12, strandAngle + (l % 2 === 0 ? 0.3 : -0.3), 0.2],
          scale: leafScale,
        });
      }
    }

    return { topLeaves: top, vineLeaves: vines };
  }, [birdPerchAngle]);

  // Single Leaf Shape (Rounded Succulent / Jade Leaf)
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.12, 0.1, 0.18, 0.28, 0.14, 0.42);
    shape.bezierCurveTo(0.1, 0.55, -0.1, 0.55, -0.14, 0.42);
    shape.bezierCurveTo(-0.18, 0.28, -0.12, 0.1, 0, 0);

    const extrudeSettings = {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    // Gentle natural pendulum swaying with mouse parallax (NO full 360 spin, so bird is always visible in front)
    if (potGroup.current) {
      const targetRotZ = -mouse.x * 0.12 + Math.sin(time * 1.2) * 0.04;
      const targetRotX = mouse.y * 0.1 + Math.cos(time * 0.9) * 0.03;
      // Sway back and forth gently (-15 deg to +15 deg) instead of 360 rotation
      const targetRotY = Math.sin(time * 0.6) * 0.18 + mouse.x * 0.25;

      potGroup.current.rotation.z = THREE.MathUtils.lerp(potGroup.current.rotation.z, targetRotZ, 0.05);
      potGroup.current.rotation.x = THREE.MathUtils.lerp(potGroup.current.rotation.x, targetRotX, 0.05);
      potGroup.current.rotation.y = THREE.MathUtils.lerp(potGroup.current.rotation.y, targetRotY, 0.05);

      // Gentle vertical float
      potGroup.current.position.y = Math.sin(time * 1.5) * 0.06 + 0.1;
    }

    // Subtle leaf breeze motion
    if (foliageGroup.current) {
      const s = 1 + Math.sin(time * 2.0) * 0.012;
      foliageGroup.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={potGroup} position={[0, 0.1, 0]}>
      {/* 🧵 3 Suspension Hanging Cords */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => {
        const rimX = Math.cos(angle) * 0.56;
        const rimZ = Math.sin(angle) * 0.56;
        const start = new THREE.Vector3(rimX, 0.12, rimZ);
        const top = new THREE.Vector3(0, 2.6, 0);
        const length = start.distanceTo(top);
        const mid = new THREE.Vector3().addVectors(start, top).multiplyScalar(0.5);

        return (
          <mesh
            key={idx}
            position={[mid.x, mid.y, mid.z]}
            quaternion={
              new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3().subVectors(top, start).normalize()
              )
            }
          >
            <cylinderGeometry args={[0.007, 0.007, length, 8]} />
            <meshStandardMaterial color="#d4d4d8" roughness={0.3} metalness={0.7} />
          </mesh>
        );
      })}

      {/* 🏺 Ceramic Hanging Bowl - Base */}
      <mesh position={[0, -0.15, 0]}>
        <sphereGeometry args={[0.6, 32, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#f4f4f5"
          roughness={0.25}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🏺 Terracotta Warm Clay Accent Rim */}
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.14, 32, 1, true]} />
        <meshStandardMaterial
          color="#c27d48"
          roughness={0.5}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 🏺 Top Rim Lip Ring */}
      <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.59, 0.02, 16, 48]} />
        <meshStandardMaterial color="#c27d48" roughness={0.4} />
      </mesh>

      {/* 🌱 Soil Plane */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.57, 32]} />
        <meshStandardMaterial color="#27272a" roughness={0.9} />
      </mesh>

      {/* 🐦 Highly Visible & Prominent 3D Perched Bird (Stationed clearly on front rim) */}
      <PerchedBird
        position={[0.42, 0.20, 0.38]}
        rotation={[0, -0.6, 0]}
        mouseRef={mouseRef}
      />

      {/* 🌿 Foliage Group (Clear around Bird) */}
      <group ref={foliageGroup}>
        {/* Top Upright Succulent Leaves */}
        {topLeaves.map((leaf, i) => (
          <mesh
            key={`top-${i}`}
            geometry={leafGeometry}
            position={leaf.position}
            rotation={leaf.rotation}
            scale={leaf.scale}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? '#84cc16' : i % 3 === 1 ? '#a3e635' : '#65a30d'}
              roughness={0.35}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Cascading Trailing Vines Leaves */}
        {vineLeaves.map((leaf, i) => (
          <mesh
            key={`vine-${i}`}
            geometry={leafGeometry}
            position={leaf.position}
            rotation={leaf.rotation}
            scale={leaf.scale}
          >
            <meshStandardMaterial
              color={i % 4 === 0 ? '#65a30d' : i % 4 === 1 ? '#84cc16' : '#a3e635'}
              roughness={0.35}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 🌟 Main Hero 3D Component
export const HeroQuantumCore: React.FC<{ activeHighlight?: string | null }> = ({
  activeHighlight = null,
}) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0.15, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        {/* Harmonized Studio Lighting with High Visibility on Foreground Bird */}
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 4]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-2, 3, 4]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[1, 1, 3]} intensity={1.4} color="#38BDF8" />
        <pointLight position={[3, -1, 2]} intensity={1.0} color="#E50914" />
        <pointLight position={[-3, -3, -1]} intensity={0.8} color="#A855F7" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          {/* 🌿 3D Hanging Plant with Perched Bird */}
          <HangingPlantMesh mouseRef={mouseRef} activeHighlight={activeHighlight} />
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroQuantumCore;
