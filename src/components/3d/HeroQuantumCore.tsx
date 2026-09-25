import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 👾 Clean Full-Size Pixel Art Avatar with Smooth 3D Parallax Tilt
const FullSizePixelAvatar: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ mouseRef }) => {
  const meshGroup = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load avatar texture with sharp nearest-neighbor pixel filtering
  const texture = useTexture('/profile/himarghya-pixel.png');
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    if (meshGroup.current) {
      // Fluid, natural 3D tilt responding to cursor movement
      const targetRotY = mouse.x * 0.28 + Math.sin(time * 0.6) * 0.03;
      const targetRotX = -mouse.y * 0.22 + Math.cos(time * 0.5) * 0.02;
      const targetY = (hovered ? 0.04 : 0) + Math.sin(time * 1.2) * 0.04;

      meshGroup.current.rotation.y = THREE.MathUtils.lerp(meshGroup.current.rotation.y, targetRotY, 0.08);
      meshGroup.current.rotation.x = THREE.MathUtils.lerp(meshGroup.current.rotation.x, targetRotX, 0.08);
      meshGroup.current.position.y = THREE.MathUtils.lerp(meshGroup.current.position.y, targetY, 0.08);
    }
  });

  return (
    <group
      ref={meshGroup}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Full-Size Clean Pixel Avatar Plane without Borders or Rings */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

// Fallback while texture loads
const FullSizeAvatarFallback: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <planeGeometry args={[2.5, 2.5]} />
    <meshStandardMaterial color="#18181b" wireframe />
  </mesh>
);

// 🌟 Main Hero 3D Component
export const HeroQuantumCore: React.FC<{ activeHighlight?: string | null }> = () => {
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
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none overflow-hidden rounded-2xl group cursor-grab active:cursor-grabbing"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#ffffff" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
          <Suspense fallback={<FullSizeAvatarFallback />}>
            <FullSizePixelAvatar mouseRef={mouseRef} />
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroQuantumCore;
