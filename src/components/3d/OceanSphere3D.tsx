import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const OceanCurrents: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const marinePoints = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.25 + Math.sin(theta * 3) * 0.1;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.25;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      sphereRef.current.scale.set(s, s, s);
    }
    if (ringRef1.current) ringRef1.current.rotation.x += delta * 0.4;
    if (ringRef2.current) ringRef2.current.rotation.y -= delta * 0.5;
  });

  return (
    <group>
      {/* Ocean Core */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshStandardMaterial
          color="#021B3A"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Bathymetric Ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.45, 0.02, 16, 64]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
      </mesh>

      {/* Bathymetric Ring 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 16, 64]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.8} />
      </mesh>

      {/* Marine Hydrographic Flow Particles */}
      <Points positions={marinePoints} stride={3}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>

      {/* Deep Sea Sensor Beacons */}
      <mesh position={[1.0, 0.3, 0.7]}>
        <octahedronGeometry args={[0.08]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[-0.9, -0.6, 0.5]}>
        <octahedronGeometry args={[0.08]} />
        <meshStandardMaterial color="#A3FF12" emissive="#A3FF12" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
};

export const OceanSphere3D: React.FC = () => {
  return (
    <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden bg-[#030B17] border border-blue-500/20 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.5} color="#38BDF8" />
        <pointLight position={[-3, -4, -2]} intensity={1} color="#06B6D4" />
        <OceanCurrents />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#0B1120]/80 border border-blue-500/30 text-[10px] font-mono text-blue-400 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        <span>OCEAN TELEMETRY: 3D HYDROGRAPHIC SIM</span>
      </div>
    </div>
  );
};
