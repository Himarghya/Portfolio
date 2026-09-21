import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface HoloGlobeProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  activeHighlight: string | null;
}

const HoloGlobe: React.FC<HoloGlobeProps> = ({ mouseRef, activeHighlight }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const radarSweepRef = useRef<THREE.Mesh>(null);
  const ringAlphaRef = useRef<THREE.Mesh>(null);
  const ringBetaRef = useRef<THREE.Mesh>(null);
  const ringGammaRef = useRef<THREE.Mesh>(null);

  // 3D Geospatial Bezier Data Arcs
  const arcCurves = useMemo(() => {
    const hubs = [
      new THREE.Vector3(0.4, 0.8, 1.0).normalize().multiplyScalar(1.34),
      new THREE.Vector3(-0.9, 0.6, 0.4).normalize().multiplyScalar(1.34),
      new THREE.Vector3(-0.8, 0.2, -0.9).normalize().multiplyScalar(1.34),
      new THREE.Vector3(0.8, -0.6, 0.5).normalize().multiplyScalar(1.34),
      new THREE.Vector3(0.1, 0.9, -0.8).normalize().multiplyScalar(1.34),
    ];

    const pairs = [
      [hubs[0], hubs[1]],
      [hubs[0], hubs[4]],
      [hubs[1], hubs[2]],
      [hubs[0], hubs[3]],
      [hubs[2], hubs[4]],
    ];

    return pairs.map(([start, end]) => {
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(1.34 + distance * 0.45);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(28);
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    if (groupRef.current) {
      const targetX = mouse.y * 0.4;
      const targetY = mouse.x * 0.6;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY + time * 0.18, 0.05);
    }

    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z -= delta * 1.6;
    }

    if (ringAlphaRef.current) {
      ringAlphaRef.current.rotation.x = Math.sin(time * 0.35) * 0.4 + Math.PI / 4;
      ringAlphaRef.current.rotation.y += delta * 0.4;
    }
    if (ringBetaRef.current) {
      ringBetaRef.current.rotation.y -= delta * 0.5;
      ringBetaRef.current.rotation.z = Math.cos(time * 0.4) * 0.3 - Math.PI / 6;
    }
    if (ringGammaRef.current) {
      ringGammaRef.current.rotation.z += delta * 0.3;
      ringGammaRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    }

    if (coreRef.current) {
      const pulseSpeed = activeHighlight ? 4.0 : 2.0;
      const s = 1 + Math.sin(time * pulseSpeed) * 0.03;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Deep Glowing Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.24, 48, 48]} />
        <meshPhysicalMaterial
          color="#060810"
          emissive="#E50914"
          emissiveIntensity={activeHighlight === 'varshanet' ? 0.7 : 0.25}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.4}
          thickness={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Clean Cyber Wireframe Lattice */}
      <mesh>
        <sphereGeometry args={[1.32, 28, 28]} />
        <meshBasicMaterial
          color={activeHighlight === 'polaris' ? '#38BDF8' : '#00E5FF'}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Radar Sweeping Scanner Disc */}
      <mesh ref={radarSweepRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 1.45, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Data Arcs */}
      {arcCurves.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={i % 2 === 0 ? '#00E5FF' : '#E50914'}
          lineWidth={1.5}
          transparent
          opacity={0.65}
        />
      ))}

      {/* Orbital Laser Rings */}
      <mesh ref={ringAlphaRef}>
        <torusGeometry args={[1.62, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#E50914"
          emissive="#E50914"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ringBetaRef}>
        <torusGeometry args={[1.78, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.0}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={ringGammaRef}>
        <torusGeometry args={[1.98, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#A855F7"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

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
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D WebGL Canvas */}
      <div
        onPointerMove={handlePointerMove}
        className="w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[6, 6, 6]} intensity={2.5} color="#FFFFFF" />
          <pointLight position={[-6, -4, 4]} intensity={3.0} color="#E50914" />
          <pointLight position={[0, -5, -4]} intensity={2.0} color="#00E5FF" />
          <directionalLight position={[0, 6, 2]} intensity={1.5} color="#FFFFFF" />

          <HoloGlobe mouseRef={mouseRef} activeHighlight={activeHighlight} />
        </Canvas>
      </div>
    </div>
  );
};

export default HeroQuantumCore;
