import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

export type CoreMode = 'globe' | 'quantum' | 'nexus';

// 1. HOLO-RADAR GLOBE MODE
const HoloRadarGlobe: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number; isDown: boolean }>;
  activeHighlight: string | null;
}> = ({ mouseRef, activeHighlight }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const radarSweepRef = useRef<THREE.Mesh>(null);
  const ringAlphaRef = useRef<THREE.Mesh>(null);
  const ringBetaRef = useRef<THREE.Mesh>(null);
  const ringGammaRef = useRef<THREE.Mesh>(null);

  // Surface Nodes
  const nodeCount = 380;
  const { nodePositions, nodeColors } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));

    const cyan = new THREE.Color('#00E5FF');
    const crimson = new THREE.Color('#E50914');
    const emerald = new THREE.Color('#10B981');
    const purple = new THREE.Color('#A855F7');
    const white = new THREE.Color('#FFFFFF');

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const r = 1.34;
      positions[i * 3] = Math.cos(theta) * radius * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * radius * r;

      const pick = Math.random();
      const c =
        pick > 0.88
          ? white
          : pick > 0.65
          ? cyan
          : pick > 0.4
          ? crimson
          : pick > 0.2
          ? emerald
          : purple;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { nodePositions: positions, nodeColors: colors };
  }, []);

  // 3D Geospatial Bezier Data Arcs (Connecting telemetry hubs)
  const arcCurves = useMemo(() => {
    const hubs = [
      new THREE.Vector3(0.4, 0.8, 1.0).normalize().multiplyScalar(1.34), // Asia/India
      new THREE.Vector3(-0.9, 0.6, 0.4).normalize().multiplyScalar(1.34), // Europe
      new THREE.Vector3(-0.8, 0.2, -0.9).normalize().multiplyScalar(1.34), // Americas
      new THREE.Vector3(0.8, -0.6, 0.5).normalize().multiplyScalar(1.34), // Australia
      new THREE.Vector3(0.1, 0.9, -0.8).normalize().multiplyScalar(1.34), // Arctic/Polaris
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
      mid.normalize().multiplyScalar(1.34 + distance * 0.45); // Arch out above sphere
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(24);
    });
  }, []);

  // Cosmic Dust Cloud
  const dustPositions = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 1.2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
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

    // Radar scan beam rotation
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z -= delta * 1.8;
    }

    // Orbiting rings animation
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

    // Breathing inner core
    if (coreRef.current) {
      const pulseSpeed = activeHighlight ? 4.0 : 2.0;
      const s = 1 + Math.sin(time * pulseSpeed) * 0.03;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 🔮 Deep Glowing Translucent Core Sphere */}
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

      {/* 🌐 Glowing Neon Wireframe Lattice */}
      <mesh>
        <sphereGeometry args={[1.32, 28, 28]} />
        <meshBasicMaterial
          color={activeHighlight === 'polaris' ? '#38BDF8' : '#00E5FF'}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* 📡 Radar Sweeping Scanner Disc */}
      <mesh ref={radarSweepRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 1.45, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ⚡ Dynamic Flight / Data Arcs */}
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

      {/* 💫 Equatorial Laser Ring Alpha */}
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

      {/* 💫 Polar Ring Beta */}
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

      {/* 💫 Outer Horizon Ring Gamma */}
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

      {/* ✨ Surface Telemetry Nodes */}
      <Points positions={nodePositions} colors={nodeColors}>
        <PointMaterial
          vertexColors
          size={0.045}
          sizeAttenuation={true}
          depthWrite={false}
          transparent
          opacity={0.95}
        />
      </Points>

      {/* 🌌 Atmospheric Stellar Dust */}
      <Points positions={dustPositions}>
        <PointMaterial
          color="#FF3B47"
          size={0.024}
          sizeAttenuation={true}
          depthWrite={false}
          transparent
          opacity={0.5}
        />
      </Points>
    </group>
  );
};

// 2. QUANTUM REACTOR / POLYHEDRON MODE
const QuantumReactor: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number; isDown: boolean }>;
  activeHighlight: string | null;
}> = ({ mouseRef }) => {
  const outerIcosaRef = useRef<THREE.Mesh>(null);
  const innerOctaRef = useRef<THREE.Mesh>(null);
  const coreSingularityRef = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  const particlePositions = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const mouse = mouseRef.current;

    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.x += delta * 0.4 + mouse.y * 0.02;
      outerIcosaRef.current.rotation.y += delta * 0.35 + mouse.x * 0.02;
    }
    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.x -= delta * 0.5;
      innerOctaRef.current.rotation.z += delta * 0.6;
    }
    if (coreSingularityRef.current) {
      const scale = 0.55 + Math.sin(time * 3) * 0.08;
      coreSingularityRef.current.scale.set(scale, scale, scale);
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.8;
    if (ring2.current) ring2.current.rotation.x -= delta * 0.6;
  });

  return (
    <group>
      {/* Outer Floating Holographic Icosahedron */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[1.45, 0]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* Inner Glowing Red Octahedron */}
      <mesh ref={innerOctaRef}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshPhysicalMaterial
          color="#E50914"
          emissive="#E50914"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Central High-Energy Singularity */}
      <mesh ref={coreSingularityRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Dual Quantum Containment Rings */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.75, 0.015, 16, 80]} />
        <meshStandardMaterial color="#E50914" emissive="#E50914" emissiveIntensity={1.2} />
      </mesh>

      <mesh ref={ring2} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.012, 16, 80]} />
        <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={1.0} />
      </mesh>

      {/* Swirling Quantum Dust */}
      <Points positions={particlePositions}>
        <PointMaterial
          color="#00E5FF"
          size={0.032}
          sizeAttenuation={true}
          transparent
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// 3. NEURAL NEXUS MODE
const NeuralNexus: React.FC<{
  mouseRef: React.MutableRefObject<{ x: number; y: number; isDown: boolean }>;
}> = ({ mouseRef }) => {
  const nexusRef = useRef<THREE.Group>(null);

  const { positions, lines } = useMemo(() => {
    const count = 45;
    const pts: THREE.Vector3[] = [];
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2.8,
        (Math.random() - 0.5) * 2.8,
        (Math.random() - 0.5) * 2.8
      );
      pts.push(v);
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
    }

    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.1) {
          segments.push([pts[i], pts[j]]);
        }
      }
    }
    return { positions: pos, lines: segments };
  }, []);

  useFrame((state, delta) => {
    if (nexusRef.current) {
      const mouse = mouseRef.current;
      nexusRef.current.rotation.y += delta * 0.2 + mouse.x * 0.01;
      nexusRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + mouse.y * 0.01;
    }
  });

  return (
    <group ref={nexusRef}>
      <Points positions={positions}>
        <PointMaterial color="#00E5FF" size={0.07} sizeAttenuation={true} />
      </Points>
      {lines.map((pair, idx) => (
        <Line
          key={idx}
          points={[pair[0], pair[1]]}
          color={idx % 3 === 0 ? '#E50914' : idx % 3 === 1 ? '#00E5FF' : '#A855F7'}
          lineWidth={1.2}
          transparent
          opacity={0.45}
        />
      ))}
    </group>
  );
};

// MAIN CONTROLLER WITH INTERACTIVE HUD & MODE SWITCHER
export const HeroQuantumCore: React.FC<{ activeHighlight?: string | null }> = ({
  activeHighlight = null,
}) => {
  const [mode, setMode] = useState<CoreMode>('globe');
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 🎛️ Interactive Mode Switcher Pill Bar */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-xl p-1 rounded-xl border border-white/10 shadow-lg">
        {(
          [
            { id: 'globe', label: '🛰️ HOLO-RADAR' },
            { id: 'quantum', label: '⚛️ QUANTUM' },
            { id: 'nexus', label: '🌐 NEXUS' },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold transition-all cursor-pointer ${
              mode === m.id
                ? 'bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.5)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 🧭 Live Telemetry Coordinates Overlay */}
      <div className="absolute top-2 right-2 z-20 text-[9px] font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 pointer-events-none hidden sm:block">
        <span className="text-[#00E5FF] font-bold">LAT:</span> 24.18°N{' '}
        <span className="text-[#00E5FF] font-bold">LON:</span> 88.27°E
      </div>

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

          {mode === 'globe' && (
            <HoloRadarGlobe mouseRef={mouseRef} activeHighlight={activeHighlight} />
          )}
          {mode === 'quantum' && (
            <QuantumReactor mouseRef={mouseRef} activeHighlight={activeHighlight} />
          )}
          {mode === 'nexus' && <NeuralNexus mouseRef={mouseRef} />}
        </Canvas>
      </div>
    </div>
  );
};

export default HeroQuantumCore;
