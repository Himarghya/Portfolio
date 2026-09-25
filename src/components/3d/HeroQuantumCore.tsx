import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Terminal, Activity } from 'lucide-react';

interface ProjectNode {
  id: string;
  name: string;
  color: string;
  angle: number;
  radius: number;
  y: number;
  tag: string;
}

const PROJECT_NODES: ProjectNode[] = [
  { id: 'varshanet', name: 'VarshaNet', color: '#10B981', angle: 0, radius: 1.8, y: 0.3, tag: 'GIS / AI' },
  { id: 'polaris', name: 'Polaris', color: '#38BDF8', angle: Math.PI / 2, radius: 1.9, y: -0.2, tag: 'Offline CRDT' },
  { id: 'pulsemesh', name: 'PulseMesh', color: '#A855F7', angle: Math.PI, radius: 1.8, y: 0.4, tag: 'Distributed Engine' },
  { id: 'campusos', name: 'CampusOS', color: '#E50914', angle: (3 * Math.PI) / 2, radius: 1.9, y: -0.3, tag: 'Full-Stack ERP' },
];

// 👾 3D Pixel Art Avatar Mesh with Sharp Nearest-Neighbor Texture Filtering
const PixelAvatarPortraitMesh: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  activeHighlight: string | null;
}> = ({ mouseRef, activeHighlight }) => {
  const cardGroup = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load avatar texture and ensure strict pixel art crispness
  const texture = useTexture('/profile/himarghya-pixel.png');
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    // Smooth 3D tilt tracking mouse
    if (cardGroup.current) {
      const targetRotY = mouse.x * 0.35 + Math.sin(time * 0.8) * 0.05;
      const targetRotX = -mouse.y * 0.25 + Math.cos(time * 0.6) * 0.04;
      const targetY = (hovered ? 0.05 : 0) + Math.sin(time * 1.5) * 0.06;

      cardGroup.current.rotation.y = THREE.MathUtils.lerp(cardGroup.current.rotation.y, targetRotY, 0.08);
      cardGroup.current.rotation.x = THREE.MathUtils.lerp(cardGroup.current.rotation.x, targetRotX, 0.08);
      cardGroup.current.position.y = THREE.MathUtils.lerp(cardGroup.current.position.y, targetY, 0.08);
    }

    // Orbiting holographic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.3;
      ring2Ref.current.rotation.z = Math.PI / 4 + Math.cos(time * 0.5) * 0.1;
    }
  });

  return (
    <group
      ref={cardGroup}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 🖼️ Main Floating Pixel Avatar Card */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.75, 1.75, 0.08]} />
        <meshStandardMaterial
          color="#0d1117"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pixel Avatar Front Face Image */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.65, 1.65]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
        />
      </mesh>

      {/* Cyber Glass Bevel Border */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[1.18, 1.22, 4, 1, Math.PI / 4]} />
        <meshBasicMaterial
          color={activeHighlight ? '#38BDF8' : '#00FF87'}
          transparent
          opacity={hovered ? 0.9 : 0.6}
        />
      </mesh>

      {/* Top Left / Bottom Right Corner Cyber Bracket Accents */}
      <mesh position={[-0.85, 0.85, 0.06]}>
        <planeGeometry args={[0.2, 0.04]} />
        <meshBasicMaterial color="#00FF87" />
      </mesh>
      <mesh position={[-0.85, 0.85, 0.06]}>
        <planeGeometry args={[0.04, 0.2]} />
        <meshBasicMaterial color="#00FF87" />
      </mesh>
      <mesh position={[0.85, -0.85, 0.06]}>
        <planeGeometry args={[0.2, 0.04]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
      <mesh position={[0.85, -0.85, 0.06]}>
        <planeGeometry args={[0.04, 0.2]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>

      {/* Orbiting Telemetry Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.45, 0.012, 16, 64]} />
        <meshBasicMaterial
          color="#00FF87"
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.6, 0.01, 16, 64]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbiting Project Nodes */}
      {PROJECT_NODES.map((node) => {
        const isHighlighted = activeHighlight === node.id;
        const x = Math.cos(node.angle) * node.radius;
        const z = Math.sin(node.angle) * node.radius;

        return (
          <group key={node.id} position={[x, node.y, z]}>
            {/* 3D Geometric Crystal */}
            <mesh scale={isHighlighted ? [1.4, 1.4, 1.4] : [1, 1, 1]}>
              <octahedronGeometry args={[0.12]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHighlighted ? 3 : 1.2}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>

            {/* Orbiting node aura ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.18, 0.22, 24]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isHighlighted ? 0.8 : 0.25}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Fallback skeleton while texture loads
const PixelAvatarFallback: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1.7, 1.7, 0.08]} />
    <meshStandardMaterial color="#18181b" wireframe />
  </mesh>
);

// 🌟 Main Export Component
export const HeroQuantumCore: React.FC<{ activeHighlight?: string | null }> = ({
  activeHighlight = null,
}) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none overflow-hidden rounded-2xl group"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={1.2} color="#00FF87" />
        <pointLight position={[3, -2, 2]} intensity={1.2} color="#38BDF8" />
        <Stars radius={40} depth={20} count={600} factor={2} saturation={0.5} fade speed={1.5} />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
          <Suspense fallback={<PixelAvatarFallback />}>
            <PixelAvatarPortraitMesh
              mouseRef={mouseRef}
              activeHighlight={activeHighlight}
            />
          </Suspense>
        </Float>
      </Canvas>

      {/* Cyberpunk HUD Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent opacity-40 bg-[length:100%_4px]" />

      {/* Status Overlay Badge */}
      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>HIMARGHYA_SPRITE // 16-BIT</span>
      </div>

      {/* Active Project Indicator if Hovered */}
      {activeHighlight && (
        <div className="absolute bottom-3 right-3 pointer-events-none px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200">
          LINK: <span className="text-emerald-400 font-bold uppercase">{activeHighlight}</span>
        </div>
      )}
    </div>
  );
};

export default HeroQuantumCore;
