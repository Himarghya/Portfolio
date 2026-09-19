import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface CoreSceneProps {
  mouse: { x: number; y: number };
}

const HolographicGlobe: React.FC<CoreSceneProps> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireGridRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // 1. Fibonacci Sphere Surface Nodes (Simulating real geospatial telemetry feeds)
  const nodeCount = 280;
  const { nodePositions, nodeColors } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const crimson = new THREE.Color('#E50914');
    const ruby = new THREE.Color('#FF3B47');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const r = 1.32;
      positions[i * 3] = Math.cos(theta) * radius * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * radius * r;

      const pick = Math.random();
      const c = pick > 0.85 ? white : pick > 0.4 ? crimson : ruby;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { nodePositions: positions, nodeColors: colors };
  }, []);

  // 2. Ambient Space Dust Swarm
  const dustCount = 120;
  const dustPositions = useMemo(() => {
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.1 + Math.random() * 0.9;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Smooth continuous auto-rotation
    if (groupRef.current) {
      const targetX = mouse.y * 0.35;
      const targetY = mouse.x * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY + time * 0.15, 0.05);
    }

    // Precision Gyroscopic Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(time * 0.4) * 0.4;
      ring1Ref.current.rotation.y += delta * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.45;
      ring2Ref.current.rotation.z = Math.cos(time * 0.3) * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.5;
      ring3Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.25) * 0.2;
    }

    // Subtle Core Pulse
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.02;
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (wireGridRef.current) {
      wireGridRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Deep Obsidian Metallic Core with Specular Reflections */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshPhysicalMaterial
          color="#0d0e12"
          emissive="#1a0406"
          emissiveIntensity={0.6}
          roughness={0.12}
          metalness={0.88}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Holographic Geospatial Wireframe Sphere */}
      <mesh ref={wireGridRef}>
        <sphereGeometry args={[1.28, 28, 28]} />
        <meshBasicMaterial
          color="#E50914"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Primary Equator Gyro Ring (Crimson Luminous) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.72, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#E50914"
          emissive="#E50914"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Meridian Gyro Ring (Titanium Silver) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.92, 0.014, 16, 100]} />
        <meshStandardMaterial
          color="#E2E8F0"
          emissive="#64748B"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Tertiary Inclined Orbit Ring (Deep Ruby) */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.15, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#991B1B"
          emissive="#E50914"
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Satellite Data Beacons (Small, Elegant Diamonds) */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[1.45, 0.6, 0.8]}>
          <octahedronGeometry args={[0.08]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2.5} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.2} floatIntensity={1}>
        <mesh position={[-1.35, -0.7, 0.7]}>
          <octahedronGeometry args={[0.07]} />
          <meshStandardMaterial color="#E50914" emissive="#FF4D58" emissiveIntensity={3} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.7}>
        <mesh position={[0.4, -1.4, -0.6]}>
          <octahedronGeometry args={[0.06]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={3} />
        </mesh>
      </Float>

      {/* Geospatial Surface Telemetry Node Points */}
      <Points positions={nodePositions} colors={nodeColors} stride={3}>
        <PointMaterial
          vertexColors
          transparent
          size={0.038}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.85}
        />
      </Points>

      {/* Ambient Outer Cyber Dust */}
      <Points positions={dustPositions} stride={3}>
        <PointMaterial
          transparent
          color="#FF4D58"
          size={0.022}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.45}
        />
      </Points>
    </group>
  );
};

export const HeroQuantumCore: React.FC = () => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[460px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-6, -4, 4]} intensity={2.8} color="#E50914" />
        <pointLight position={[0, -5, -4]} intensity={1.5} color="#991B1B" />
        <directionalLight position={[0, 6, 2]} intensity={1.2} color="#FFFFFF" />
        <HolographicGlobe mouse={mouse} />
      </Canvas>
    </div>
  );
};
