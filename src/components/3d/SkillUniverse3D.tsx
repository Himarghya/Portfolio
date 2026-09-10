import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  name: string;
  category: string;
  pos: [number, number, number];
  color: string;
}

const SKILL_NODES: SkillNode[] = [
  // Programming & Core
  { name: 'C++', category: 'Programming', pos: [0, 0, 0], color: '#00FF87' },
  { name: 'DSA', category: 'Programming', pos: [1.2, 0.6, 0.4], color: '#A3FF12' },
  { name: 'Python', category: 'Programming', pos: [-1.1, 0.8, -0.3], color: '#6EE7B7' },
  { name: 'TypeScript', category: 'Programming', pos: [0.8, -0.9, 0.5], color: '#34D399' },

  // Frontend Cluster
  { name: 'React', category: 'Frontend', pos: [-1.8, -0.8, 1.2], color: '#00FF87' },
  { name: 'Tailwind CSS', category: 'Frontend', pos: [-2.2, 0.5, 0.8], color: '#10B981' },
  { name: 'Three.js', category: 'Frontend', pos: [-1.5, -1.8, 0.6], color: '#A3FF12' },

  // Backend Cluster
  { name: 'Node.js', category: 'Backend', pos: [1.9, 1.2, -0.8], color: '#00FF87' },
  { name: 'FastAPI', category: 'Backend', pos: [2.3, -0.4, -0.7], color: '#10B981' },
  { name: 'Express.js', category: 'Backend', pos: [1.4, 1.8, 0.2], color: '#6EE7B7' },

  // Database Cluster
  { name: 'PostgreSQL', category: 'Database', pos: [0.4, 2.1, -1.1], color: '#34D399' },
  { name: 'PostGIS', category: 'Database', pos: [-0.6, 1.9, -1.4], color: '#10B981' },

  // AI/ML Cluster
  { name: 'Machine Learning', category: 'AI / ML', pos: [-0.5, -2.0, -1.2], color: '#A3FF12' },
  { name: 'Computer Vision', category: 'AI / ML', pos: [0.7, -2.2, -0.8], color: '#00FF87' },
  { name: 'Docker', category: 'Tools', pos: [2.1, -1.6, 0.9], color: '#6EE7B7' },
];

const ConstellationMesh: React.FC<{
  onSelect: (skill: SkillNode) => void;
  activeSkill: SkillNode | null;
}> = ({ onSelect, activeSkill }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  // Generate connection line pairs
  const linePairs = useMemo(() => {
    const pairs: [ [number, number, number], [number, number, number] ][] = [];
    // Connect central node (C++) to nearest neighbors
    const rootPos = new THREE.Vector3(...SKILL_NODES[0].pos);
    for (let i = 1; i < SKILL_NODES.length; i++) {
      const nodePos = new THREE.Vector3(...SKILL_NODES[i].pos);
      if (rootPos.distanceTo(nodePos) < 2.8) {
        pairs.push([SKILL_NODES[0].pos, SKILL_NODES[i].pos]);
      }
    }
    // Connect cluster neighbors
    for (let i = 1; i < SKILL_NODES.length; i++) {
      for (let j = i + 1; j < SKILL_NODES.length; j++) {
        const p1 = new THREE.Vector3(...SKILL_NODES[i].pos);
        const p2 = new THREE.Vector3(...SKILL_NODES[j].pos);
        if (p1.distanceTo(p2) < 1.7) {
          pairs.push([SKILL_NODES[i].pos, SKILL_NODES[j].pos]);
        }
      }
    }
    return pairs;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Laser connection lines using @react-three/drei Line */}
      {linePairs.map((pair, idx) => (
        <Line
          key={idx}
          points={pair}
          color="#00FF87"
          lineWidth={1}
          transparent
          opacity={0.25}
        />
      ))}

      {/* Nodes */}
      {SKILL_NODES.map((skill, idx) => {
        const isHovered = hoveredIdx === idx;
        const isActive = activeSkill?.name === skill.name;
        const isCore = skill.name === 'C++';

        return (
          <group key={skill.name} position={skill.pos}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(skill);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredIdx(idx);
              }}
              onPointerOut={() => setHoveredIdx(null)}
            >
              <sphereGeometry args={[isCore ? 0.22 : (isHovered || isActive ? 0.18 : 0.12), 24, 24]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={isHovered || isActive ? 2.5 : 1.2}
                roughness={0.2}
              />
            </mesh>

            {/* Floating Tag */}
            <Html distanceFactor={8} position={[0, 0.32, 0]} center>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(skill);
                }}
                className={`cursor-pointer px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border transition-all duration-200 ${
                  isHovered || isActive
                    ? 'bg-[#00FF87]/20 border-[#00FF87] text-white shadow-[0_0_12px_#00FF87]'
                    : 'bg-[#040E08]/90 border-emerald-900/60 text-slate-300 hover:text-white'
                }`}
              >
                {skill.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const SkillUniverse3D: React.FC<{
  onSelectSkill?: (skillName: string) => void;
}> = ({ onSelectSkill }) => {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(SKILL_NODES[0]);

  const handleSelect = (skill: SkillNode) => {
    setActiveSkill(skill);
    if (onSelectSkill) onSelectSkill(skill.name);
  };

  return (
    <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-[#00FF87]/20 bg-[#020704] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00FF87" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#10B981" />

        <ConstellationMesh onSelect={handleSelect} activeSkill={activeSkill} />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={9} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Mini HUD Info Tag */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono glass-panel px-3 py-1.5 rounded-lg border border-emerald-900/60 text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-ping" />
          <span>SELECTED: {activeSkill ? activeSkill.name : 'ALL SYSTEMS'}</span>
        </div>
        <span className="text-[#00FF87] text-[10px]">3D INTERACTIVE CONSTELLATION</span>
      </div>
    </div>
  );
};
