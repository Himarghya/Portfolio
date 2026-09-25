import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 🌈 Custom Dynamic Shader Material for 16-Bit Living Pixel Avatar
const PixelAvatarShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // 1. Natural 16-bit RPG idle breathing micro-animation
      float breath = sin(uTime * 2.2);
      if (pos.y > -0.3) {
        pos.y += breath * 0.018;
        pos.x *= 1.0 + breath * 0.008;
      }

      // 2. Subtle 3D dynamic surface curvature towards cursor
      float distToMouse = distance(uv, uMouse * 0.5 + 0.5);
      pos.z += (1.0 - smoothstep(0.0, 0.8, distToMouse)) * 0.08 * (0.4 + uHover * 0.6);

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uClickWave;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Pseudo-random helper
    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;

      // 1. Click Ripple Shockwave Effect
      if (uClickWave > 0.001) {
        float waveDist = distance(uv, uMouse * 0.5 + 0.5);
        float waveRadius = (1.0 - uClickWave) * 0.9;
        float waveThickness = 0.06;
        float waveForce = sin(clamp((waveDist - waveRadius) / waveThickness, -3.1415, 3.1415)) * uClickWave * 0.035;
        if (abs(waveDist - waveRadius) < waveThickness) {
          uv += normalize(uv - (uMouse * 0.5 + 0.5)) * waveForce;
        }
      }

      // 2. Interactive Digital Glitch on Hover or High Impulse
      float glitchTrigger = step(0.92, sin(uTime * 4.0)) * uHover;
      if (glitchTrigger > 0.5) {
        float row = floor(uv.y * 48.0);
        float sliceRand = rand(vec2(row, floor(uTime * 8.0)));
        if (sliceRand > 0.82) {
          uv.x += (sliceRand - 0.5) * 0.03 * uHover;
        }
      }

      // 3. Crisp Nearest-Neighbor UV quantization
      vec2 pixelGrid = vec2(128.0, 128.0);
      vec2 quantizedUv = floor(uv * pixelGrid) / pixelGrid;

      // 4. RGB Chromatic Aberration Split (dynamic with cursor movement & hover)
      float chromaOffset = 0.003 * (0.3 + uHover * 1.5 + uClickWave * 2.0);
      float r = texture2D(uTexture, quantizedUv + vec2(chromaOffset, 0.0)).r;
      float g = texture2D(uTexture, quantizedUv).g;
      float b = texture2D(uTexture, quantizedUv - vec2(chromaOffset, 0.0)).b;
      float a = texture2D(uTexture, quantizedUv).a;

      if (a < 0.05) discard;

      vec3 color = vec3(r, g, b);

      // 5. Glasses & Face Dynamic Specular Sheen (sweeps across periodically)
      float sheenCycle = mod(uTime * 0.6, 5.0);
      if (sheenCycle < 1.2 && uv.y > 0.42 && uv.y < 0.72) {
        float sheenX = (sheenCycle / 1.2) * 1.4 - 0.2;
        float sheenLine = smoothstep(0.08, 0.0, abs((uv.x + uv.y * 0.4) - sheenX));
        color += vec3(0.25, 0.35, 0.45) * sheenLine * (1.0 + uHover);
      }

      // 6. Dynamic Cursor Spotlight (highlights where cursor points)
      vec2 mouseUv = uMouse * 0.5 + 0.5;
      float spot = 1.0 - smoothstep(0.0, 0.7, distance(uv, mouseUv));
      color += color * spot * 0.25;

      // 7. Subtle Retro CRT / Scanline Luma modulation
      float scanline = sin(uv.y * 256.0 * 3.1415) * 0.03;
      color -= scanline;

      gl_FragColor = vec4(color, a);
    }
  `
};

// 👾 Dynamic 3D Pixel Avatar Mesh
const DynamicPixelAvatarMesh: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  onClickTrigger: () => void;
  clickWaveRef: React.MutableRefObject<number>;
}> = ({ mouseRef, onClickTrigger, clickWaveRef }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  // Load avatar texture with sharp filtering
  const texture = useTexture('/profile/himarghya-pixel.png');
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  // Custom Shader Uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      uClickWave: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    // Smoothly decay click wave
    if (clickWaveRef.current > 0) {
      clickWaveRef.current = Math.max(0, clickWaveRef.current - delta * 1.6);
    }

    // Update material uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.1);
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hovered ? 1.0 : 0.0,
        0.1
      );
      materialRef.current.uniforms.uClickWave.value = clickWaveRef.current;
    }

    // 3D smooth tilt physics
    if (groupRef.current) {
      const targetRotY = mouse.x * 0.32 + Math.sin(time * 0.8) * 0.03;
      const targetRotX = -mouse.y * 0.24 + Math.cos(time * 0.6) * 0.02;
      const targetY = (hovered ? 0.05 : 0) + Math.sin(time * 1.5) * 0.04;
      const targetScale = hovered ? 1.03 : 1.0;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      
      const curScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(curScale, targetScale, 0.1);
      groupRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClickTrigger();
      }}
    >
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[2.55, 2.55, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={PixelAvatarShader.vertexShader}
          fragmentShader={PixelAvatarShader.fragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Fallback while texture loads
const DynamicAvatarFallback: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <planeGeometry args={[2.5, 2.5]} />
    <meshStandardMaterial color="#18181b" wireframe />
  </mesh>
);

// 🌟 Main Hero 3D Component with Full-Size Dynamic Pixel Avatar
export const HeroQuantumCore: React.FC<{ activeHighlight?: string | null }> = () => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const clickWaveRef = useRef(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  };

  const handleClick = () => {
    clickWaveRef.current = 1.0;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      title="Click or hover to interact with Himarghya's sprite"
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center select-none overflow-hidden rounded-2xl group cursor-pointer"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.15], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#ffffff" />

        <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.12}>
          <Suspense fallback={<DynamicAvatarFallback />}>
            <DynamicPixelAvatarMesh
              mouseRef={mouseRef}
              onClickTrigger={handleClick}
              clickWaveRef={clickWaveRef}
            />
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroQuantumCore;
