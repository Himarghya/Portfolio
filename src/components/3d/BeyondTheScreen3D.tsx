import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  role: string;
  pos: [number, number, number];
  color: string;
  tech: string;
}

const NODES: NodeData[] = [
  { id: 'n1', name: 'VarshaNet Core', role: 'Weather Big Data GIS', pos: [2.5, 0.8, 1.2], color: '#00FF87', tech: 'PostGIS + FastAPI' },
  { id: 'n2', name: 'Ocean Telemetry', role: 'Marine Observation', pos: [-2.6, -0.6, 1.0], color: '#6EE7B7', tech: 'Docker + Analytics' },
  { id: 'n3', name: 'C++ Systems Engine', role: 'Algorithms & Structures', pos: [1.2, -2.2, -1.0], color: '#A3FF12', tech: 'C++20 / STL / Graph' },
  { id: 'n4', name: 'AI / Neural Model', role: 'Computer Vision & ML', pos: [-1.4, 2.3, -0.8], color: '#10B981', tech: 'PyTorch / Scikit' },
  { id: 'n5', name: 'Full-Stack React Hub', role: 'Interactive UIs', pos: [0.2, 2.7, 1.5], color: '#34D399', tech: 'React / TypeScript' },
];

const InteractiveNode: React.FC<{
  node: NodeData;
  onSelect: (node: NodeData) => void;
  isSelected: boolean;
}> = ({ node, onSelect, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.6);
      meshRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <dodecahedronGeometry args={[hovered || isSelected ? 0.32 : 0.24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered || isSelected ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Mini Pulse Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.42, 32]} />
        <meshBasicMaterial color={node.color} transparent opacity={hovered ? 0.8 : 0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML Floating Tooltip on Hover */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10} position={[0, 0.5, 0]} center>
          <div className="glass-panel px-3 py-2 rounded-lg border border-[#00FF87]/40 bg-[#040E08]/95 text-left min-w-[150px] shadow-2xl pointer-events-none transform -translate-y-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
              <span className="font-mono font-bold text-xs text-white">{node.name}</span>
            </div>
            <div className="text-[10px] text-slate-300 font-mono">{node.role}</div>
            <div className="text-[9px] text-[#00FF87] font-mono mt-1 pt-1 border-t border-emerald-900/60">{node.tech}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

const NeuralCosmos: React.FC<{
  isPaused: boolean;
  selectedNode: NodeData | null;
  onSelectNode: (node: NodeData) => void;
}> = ({ isPaused, selectedNode, onSelectNode }) => {
  const centralGlobeRef = useRef<THREE.Mesh>(null);
  const orbitalRing1Ref = useRef<THREE.Mesh>(null);
  const orbitalRing2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (isPaused) return;
    if (centralGlobeRef.current) {
      centralGlobeRef.current.rotation.y += delta * 0.2;
    }
    if (orbitalRing1Ref.current) {
      orbitalRing1Ref.current.rotation.z += delta * 0.15;
      orbitalRing1Ref.current.rotation.x += delta * 0.1;
    }
    if (orbitalRing2Ref.current) {
      orbitalRing2Ref.current.rotation.y -= delta * 0.2;
      orbitalRing2Ref.current.rotation.z -= delta * 0.12;
    }
  });

  return (
    <group>
      {/* Central Neural Digital Planet */}
      <mesh ref={centralGlobeRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#031208"
          emissive="#00FF87"
          emissiveIntensity={0.35}
          wireframe={false}
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* Wireframe Holographic Overlay */}
      <mesh>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshBasicMaterial color="#00FF87" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Ring 1 */}
      <mesh ref={orbitalRing1Ref}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#A3FF12" emissive="#A3FF12" emissiveIntensity={0.9} />
      </mesh>

      {/* Orbiting Ring 2 */}
      <mesh ref={orbitalRing2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.8, 0.02, 16, 100]} />
        <meshStandardMaterial color="#00FF87" emissive="#00FF87" emissiveIntensity={0.8} />
      </mesh>

      {/* Glowing Connection Beams using @react-three/drei Line */}
      {NODES.map((node) => (
        <Line
          key={node.id}
          points={[[0, 0, 0], node.pos]}
          color={node.color}
          lineWidth={1.5}
          transparent
          opacity={0.45}
        />
      ))}

      {/* Interactive System Nodes */}
      {NODES.map((node) => (
        <InteractiveNode
          key={node.id}
          node={node}
          onSelect={onSelectNode}
          isSelected={selectedNode?.id === node.id}
        />
      ))}
    </group>
  );
};

export const BeyondTheScreen3D: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(NODES[0]);
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[550px] lg:h-[700px] rounded-2xl overflow-hidden border border-[#00FF87]/20 bg-[#020704] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2, 7.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00FF87" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#10B981" />
        <Stars radius={60} depth={40} count={2500} factor={3} saturation={0.5} fade speed={1.2} />

        <NeuralCosmos
          isPaused={isPaused}
          selectedNode={selectedNode}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          autoRotate={!isPaused}
          autoRotateSpeed={0.6}
        />
      </Canvas>

      {/* Top HUD Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="glass-panel px-3.5 py-1.5 rounded-lg border border-[#00FF87]/30 text-xs font-mono text-[#00FF87] flex items-center gap-2 pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>INTERACTIVE 3D NEURAL ENVIRONMENT</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-lg glass-panel border border-emerald-900/60 hover:border-[#00FF87]/50 text-slate-300 hover:text-[#00FF87] transition-all"
            title={isPaused ? "Resume Orbit" : "Pause Orbit"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-lg glass-panel border border-emerald-900/60 hover:border-[#00FF87]/50 text-slate-300 hover:text-[#00FF87] transition-all"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom HUD Active Node Inspector */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md pointer-events-auto">
          <div className="glass-panel p-4 rounded-xl border border-[#00FF87]/30 bg-[#040E08]/90 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: selectedNode.color }} />
                <h4 className="font-mono font-bold text-sm text-white">{selectedNode.name}</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-emerald-900/60 text-slate-300">
                ACTIVE_NODE
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mb-2">{selectedNode.role}</p>
            <div className="flex items-center justify-between pt-2 border-t border-emerald-900/60 text-[11px] font-mono text-[#00FF87]">
              <span>STACK: {selectedNode.tech}</span>
              <span className="text-slate-400">DRAG / SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
