import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 🌿 3D Stylized Hanging Potted Plant
const HangingPlantMesh: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  activeHighlight: string | null;
}> = ({ mouseRef, activeHighlight }) => {
  const potGroup = useRef<THREE.Group>(null);
  const foliageGroup = useRef<THREE.Group>(null);

  // Generate lush trailing vines and leaves (Pothos / Jade cascading foliage)
  const { vineLeaves, topLeaves } = useMemo(() => {
    // 1. Top dense cluster leaves
    const top: { position: [number, number, number]; rotation: [number, number, number]; scale: number }[] = [];
    const topCount = 38;
    for (let i = 0; i < topCount; i++) {
      const radius = 0.2 + Math.random() * 0.45;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.15 + (1 - radius / 0.65) * 0.25 + Math.random() * 0.1;
      const rotX = -0.3 + Math.random() * 0.6;
      const rotY = angle + Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      const rotZ = 0.4 + Math.random() * 0.5;
      top.push({ position: [x, y, z], rotation: [rotX, rotY, rotZ], scale: 0.8 + Math.random() * 0.4 });
    }

    // 2. Cascading trailing vine strands
    const vines: { position: [number, number, number]; rotation: [number, number, number]; scale: number }[] = [];
    const strandCount = 10;
    for (let s = 0; s < strandCount; s++) {
      const strandAngle = (s / strandCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const strandLength = 4 + Math.floor(Math.random() * 5); // 4 to 8 leaves per vine
      const rimRadius = 0.58;

      let curX = Math.cos(strandAngle) * rimRadius;
      let curZ = Math.sin(strandAngle) * rimRadius;
      let curY = 0.05;

      for (let l = 0; l < strandLength; l++) {
        curY -= 0.14 + Math.random() * 0.04;
        curX += (Math.cos(strandAngle) * 0.06) + (Math.random() - 0.5) * 0.04;
        curZ += (Math.sin(strandAngle) * 0.06) + (Math.random() - 0.5) * 0.04;

        const leafScale = Math.max(0.45, 0.9 - l * 0.08 + Math.random() * 0.15);
        vines.push({
          position: [curX, curY, curZ],
          rotation: [0.7 + l * 0.12, strandAngle + (l % 2 === 0 ? 0.3 : -0.3), 0.2],
          scale: leafScale,
        });
      }
    }

    return { topLeaves: top, vineLeaves: vines };
  }, []);

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

    // Gentle natural pendulum swaying with mouse parallax
    if (potGroup.current) {
      const targetRotZ = -mouse.x * 0.12 + Math.sin(time * 1.2) * 0.04;
      const targetRotX = mouse.y * 0.1 + Math.cos(time * 0.9) * 0.03;
      const targetRotY = THREE.MathUtils.lerp(potGroup.current.rotation.y, time * 0.15 + mouse.x * 0.3, 0.04);

      potGroup.current.rotation.z = THREE.MathUtils.lerp(potGroup.current.rotation.z, targetRotZ, 0.05);
      potGroup.current.rotation.x = THREE.MathUtils.lerp(potGroup.current.rotation.x, targetRotX, 0.05);
      potGroup.current.rotation.y = targetRotY;

      // Gentle vertical float
      potGroup.current.position.y = Math.sin(time * 1.5) * 0.06 + 0.1;
    }

    // Subtle leaf breeze motion
    if (foliageGroup.current) {
      const s = 1 + Math.sin(time * 2.0) * 0.015;
      foliageGroup.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={potGroup} position={[0, 0.1, 0]}>
      {/* 🧵 3 Suspension Hanging Cords (Reaching up to ceiling) */}
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

      {/* 🏺 Ceramic Hanging Bowl - Base (White / Ivory Matte Porcelain) */}
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

      {/* 🏺 Terracotta / Warm Clay Accent Rim */}
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

      {/* 🌿 Dense Foliage Group */}
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
        camera={{ position: [0, 0.1, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        {/* Harmonized Studio Lighting matching Dark Obsidian Backdrop */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#FFFFFF" />
        <pointLight position={[-4, 3, 3]} intensity={1.2} color="#00E5FF" />
        <pointLight position={[4, -2, 2]} intensity={1.0} color="#E50914" />
        <pointLight position={[0, -4, -2]} intensity={0.8} color="#A855F7" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          {/* 🌿 3D Hanging Plant */}
          <HangingPlantMesh mouseRef={mouseRef} activeHighlight={activeHighlight} />
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroQuantumCore;
