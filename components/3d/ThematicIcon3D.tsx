"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type ThemeType =
  | "lock"        // Security & Auditability  → padlock shape
  | "layers"      // Scalability             → stacked platforms
  | "token"       // Token Standards         → hexagonal coin
  | "chart"       // Data/Analytics          → bar chart
  | "rocket"      // Developer Velocity      → rocket
  | "chain"       // Blockchain              → chain links
  | "swap"        // DeFi / Exchange         → swap arrows
  | "stack"       // Full-Stack              → layered code blocks
  | "contract"    // Smart Contracts         → code scroll
  | "neural"      // AI / Machine Learning   → neural node
  | "device";     // Mobile / UI             → screen frame

// ── Padlock ──────────────────────────────────────────────────────────────────
function PadlockMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame(() => { if (g.current) g.current.rotation.y += 0.01; });
  return (
    <group ref={g}>
      {/* Body */}
      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.38]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Shackle arc */}
      <mesh position={[0, 0.24, 0]}>
        <torusGeometry args={[0.28, 0.08, 12, 32, Math.PI]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Keyhole circle */}
      <mesh position={[0, -0.18, 0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 10]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

// ── Stacked Layers ────────────────────────────────────────────────────────────
function LayersMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = s.clock.elapsedTime * 0.5;
    }
  });
  return (
    <group ref={g}>
      {[
        { y: 0.42, w: 0.5, d: 0.5, c: accent },
        { y: 0.14, w: 0.72, d: 0.72, c: color },
        { y: -0.14, w: 0.94, d: 0.94, c: color },
        { y: -0.42, w: 1.1, d: 1.1, c: color },
      ].map(({ y, w, d, c }, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[w, 0.15, d]} />
          <meshStandardMaterial color={c} metalness={0.7} roughness={0.2} opacity={1 - i * 0.05} transparent />
        </mesh>
      ))}
    </group>
  );
}

// ── Hexagonal Token/Coin ─────────────────────────────────────────────────────
function TokenMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = s.clock.elapsedTime * 0.6;
      g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.2;
    }
  });
  return (
    <group ref={g}>
      {/* Coin body (6-sided) */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.14, 6]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.16, 6]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Inner circle */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.18, 6]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function ChartMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => { if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.4; });
  const bars = [
    { x: -0.38, h: 0.6, c: accent },
    { x: 0,     h: 1.0, c: color  },
    { x: 0.38,  h: 0.75, c: color },
  ];
  return (
    <group ref={g}>
      {bars.map(({ x, h, c }, i) => (
        <mesh key={i} position={[x, (h / 2) - 0.5, 0]}>
          <boxGeometry args={[0.24, h, 0.24]} />
          <meshStandardMaterial color={c} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
      {/* Base line */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.1, 0.05, 0.06]} />
        <meshStandardMaterial color={accent} metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ── Rocket ────────────────────────────────────────────────────────────────────
function RocketMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = s.clock.elapsedTime * 0.3;
      g.current.position.y = Math.sin(s.clock.elapsedTime * 1.2) * 0.06;
    }
  });
  return (
    <group ref={g} rotation={[0.3, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0.56, 0]}>
        <coneGeometry args={[0.2, 0.4, 12]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Left fin */}
      <mesh position={[-0.3, -0.3, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.24, 0.36, 0.06]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Right fin */}
      <mesh position={[0.3, -0.3, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.24, 0.36, 0.06]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Engine glow */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.16, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} metalness={0.5} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ── Chain Links ───────────────────────────────────────────────────────────────
function ChainMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => { if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.5; });
  return (
    <group ref={g}>
      {/* Link 1 — horizontal */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.1, 12, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Link 2 — vertical, interlocked */}
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.1, 12, 32]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ── Swap/Exchange Arrows ──────────────────────────────────────────────────────
function SwapMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.5;
  });
  return (
    <group ref={g}>
      {/* Left sphere */}
      <mesh position={[-0.45, 0, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Right sphere */}
      <mesh position={[0.45, 0, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={accent} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Arrow top (L→R) */}
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0.32, 0.18, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.08, 0.18, 8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Arrow bottom (R→L) */}
      <mesh position={[0, -0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color={accent} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[-0.32, -0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.08, 0.18, 8]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ── Code Stack ────────────────────────────────────────────────────────────────
function StackMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.4;
  });
  const layers = [
    { y: 0.42, c: accent,  label: "UI" },
    { y: 0.14, c: color,   label: "API" },
    { y: -0.14, c: color,  label: "DB" },
    { y: -0.42, c: accent, label: "Chain" },
  ];
  return (
    <group ref={g}>
      {layers.map(({ y, c }, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[1.0, 0.2, 0.6]} />
          <meshStandardMaterial color={c} metalness={0.7} roughness={0.2} opacity={0.95 - i * 0.03} transparent />
        </mesh>
      ))}
    </group>
  );
}

// ── Smart Contract Scroll ─────────────────────────────────────────────────────
function ContractMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.4;
  });
  return (
    <group ref={g}>
      {/* Document body */}
      <mesh>
        <boxGeometry args={[0.72, 1.0, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Code lines */}
      {[-0.3, -0.1, 0.1, 0.3].map((y, i) => (
        <mesh key={i} position={[i % 2 === 0 ? -0.05 : 0.05, y, 0.06]}>
          <boxGeometry args={[i % 2 === 0 ? 0.42 : 0.3, 0.06, 0.02]} />
          <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} emissive={accent} emissiveIntensity={0.2} />
        </mesh>
      ))}
      {/* Top fold corner */}
      <mesh position={[0.26, 0.4, 0.04]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <meshStandardMaterial color={accent} metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ── Neural Node ───────────────────────────────────────────────────────────────
function NeuralMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => { if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.3; });
  const satellites = [
    [0, 0.55, 0], [0.55, 0, 0], [0, -0.55, 0], [-0.55, 0, 0],
    [0, 0, 0.55], [0, 0, -0.55],
  ] as [number, number, number][];
  return (
    <group ref={g}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Satellites */}
      {satellites.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={i % 2 === 0 ? accent : color} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// ── Device Screen ─────────────────────────────────────────────────────────────
function DeviceMesh({ color, accent }: { color: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.4;
    }
  });
  return (
    <group ref={g}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.68, 1.1, 0.09]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.03, 0.05]}>
        <boxGeometry args={[0.5, 0.82, 0.02]} />
        <meshStandardMaterial color={accent} metalness={0.3} roughness={0.1} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      {/* Home button */}
      <mesh position={[0, -0.45, 0.05]}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 14]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ── Scene dispatcher ─────────────────────────────────────────────────────────
function ThematicShape({ theme, color, accent }: { theme: ThemeType; color: string; accent: string }) {
  const map: Record<ThemeType, React.ReactElement> = {
    lock:     <PadlockMesh color={color} accent={accent} />,
    layers:   <LayersMesh color={color} accent={accent} />,
    token:    <TokenMesh color={color} accent={accent} />,
    chart:    <ChartMesh color={color} accent={accent} />,
    rocket:   <RocketMesh color={color} accent={accent} />,
    chain:    <ChainMesh color={color} accent={accent} />,
    swap:     <SwapMesh color={color} accent={accent} />,
    stack:    <StackMesh color={color} accent={accent} />,
    contract: <ContractMesh color={color} accent={accent} />,
    neural:   <NeuralMesh color={color} accent={accent} />,
    device:   <DeviceMesh color={color} accent={accent} />,
  };
  return map[theme] ?? <PadlockMesh color={color} accent={accent} />;
}

// ── Public Component ──────────────────────────────────────────────────────────
export default function ThematicIcon3D({
  theme,
  color = "#C9A655",
  accentColor = "#45E3D3",
  size = 80,
  className = "",
}: {
  theme: ThemeType;
  color?: string;
  accentColor?: string;
  size?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMounted(true); },
      { rootMargin: "200px" }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
    >
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 2.2], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "default" }}
          dpr={1}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} color="#C9A655" intensity={2.5} />
          <pointLight position={[-3, -2, -3]} color="#45E3D3" intensity={1.2} />
          <Suspense fallback={null}>
            <ThematicShape theme={theme} color={color} accent={accentColor} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
