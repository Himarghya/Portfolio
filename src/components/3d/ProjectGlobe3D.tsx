import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const WeatherEarth: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const radarRef = useRef<THREE.Mesh>(null);

  // Storm particle points
  const stormPoints = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.18;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.3;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += delta * 0.4;
    if (radarRef.current) {
      radarRef.current.rotation.z += delta * 1.2;
    }
  });

  return (
    <group>
      {/* Central Weather Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#031525"
          emissive="#0284C7"
          emissiveIntensity={0.4}
          roughness={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Isobar Grids */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.28, 20, 20]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Radar Sweep Ring */}
      <mesh ref={radarRef} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.35, 1.45, 32]} />
        <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Storm Cloud Particle Matrix */}
      <Points positions={stormPoints} stride={3}>
        <PointMaterial
          transparent
          color="#38BDF8"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Weather Station Sensor Nodes */}
      <mesh position={[0.7, 0.9, 0.6]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#A3FF12" emissive="#A3FF12" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-0.8, 0.4, 0.9]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.4, -0.9, 0.8]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#F43F5E" emissive="#F43F5E" emissiveIntensity={3} />
      </mesh>
    </group>
  );
};

export const ProjectGlobe3D: React.FC = () => {
  return (
    <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden bg-[#040814] border border-[#00E5FF]/20 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 3]} intensity={1.5} color="#00E5FF" />
        <pointLight position={[-4, -3, -3]} intensity={1} color="#0284C7" />
        <WeatherEarth />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#0B1120]/80 border border-[#00E5FF]/30 text-[10px] font-mono text-[#00E5FF] flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
        <span>RADAR: 3D PRECIPITATION MAPPER</span>
      </div>
    </div>
  );
};
