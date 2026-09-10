import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface CoreSceneProps {
  mouse: { x: number; y: number };
}

const CoreMesh: React.FC<CoreSceneProps> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireCoreRef = useRef<THREE.Mesh>(null);

  // Generate particle cloud positions
  const particleCount = 160;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.4 + Math.random() * 1.2;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Gyroscopic Ring Rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.45;
      ring1Ref.current.rotation.y += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.55;
      ring2Ref.current.rotation.z += delta * 0.35;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.65;
      ring3Ref.current.rotation.x -= delta * 0.3;
    }

    // Pulsing central core
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y += delta * 0.4;
    }

    if (wireCoreRef.current) {
      wireCoreRef.current.rotation.y -= delta * 0.6;
      wireCoreRef.current.rotation.x += delta * 0.3;
    }

    // Mouse Tracking Tilt with smooth damping
    if (groupRef.current) {
      const targetX = (mouse.y * 0.35);
      const targetY = (mouse.x * 0.45);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Inner Energy Orb */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#00FF87"
          emissive="#00FF87"
          emissiveIntensity={1.4}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe Holographic Outer Shell */}
      <mesh ref={wireCoreRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshBasicMaterial
          color="#A3FF12"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Ring 1 - Cyber Emerald Metallic */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#00FF87"
          emissive="#00FF87"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Ring 2 - Toxic Lime Metallic */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.05, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#A3FF12"
          emissive="#A3FF12"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Ring 3 - Mint Green Metallic */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[2.35, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#6EE7B7"
          emissive="#6EE7B7"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Satellite Data Nodes */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[1.8, 0.9, 0.8]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#00FF87" emissive="#00FF87" emissiveIntensity={2} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.8} floatIntensity={1.2}>
        <mesh position={[-1.7, -1.1, 0.6]}>
          <dodecahedronGeometry args={[0.14]} />
          <meshStandardMaterial color="#A3FF12" emissive="#A3FF12" emissiveIntensity={1.5} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2}>
        <mesh position={[0.5, -1.9, -0.9]}>
          <tetrahedronGeometry args={[0.16]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={2} />
        </mesh>
      </Float>

      {/* Surrounding Ambient Particle Swarm */}
      <Points positions={particlePositions} stride={3}>
        <PointMaterial
          transparent
          color="#00FF87"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
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
      className="relative w-full h-[450px] lg:h-[580px] flex items-center justify-center select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00FF87" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#10B981" />
        <pointLight position={[0, 4, -3]} intensity={0.8} color="#A3FF12" />
        <CoreMesh mouse={mouse} />
      </Canvas>

      {/* Floating System HUD Overlays */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="glass-panel px-3 py-1.5 rounded-md border border-[#00FF87]/30 text-[11px] font-mono text-[#00FF87] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-ping" />
          <span>QUANTUM_CORE // STABLE</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="glass-panel px-3 py-1.5 rounded-md border border-emerald-900/60 text-[10px] font-mono text-emerald-400">
          ROT: GYRO_3AXIS // SENSORS: ACTIVE
        </div>
      </div>
    </div>
  );
};
