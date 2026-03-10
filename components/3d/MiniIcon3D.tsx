"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type ShapeType =
  | "octahedron"
  | "cone"
  | "torus"
  | "icosahedron"
  | "tetrahedron"
  | "dodecahedron"
  | "box"
  | "sphere"
  | "torusKnot"
  | "cylinder";

function RotatingMesh({
  type,
  color,
  accentColor,
}: {
  type: ShapeType;
  color: string;
  accentColor: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.5;
    meshRef.current.rotation.y = clock.elapsedTime * 0.75;
    if (glowRef.current) {
      glowRef.current.rotation.x = -clock.elapsedTime * 0.3;
      glowRef.current.rotation.y = clock.elapsedTime * 0.4;
    }
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      metalness={0.88}
      roughness={0.1}
      emissive={color}
      emissiveIntensity={0.18}
    />
  );

  return (
    <group>
      {/* Main rotating geometry */}
      <mesh ref={meshRef}>
        {type === "octahedron" && <octahedronGeometry args={[0.68, 0]} />}
        {type === "cone" && <coneGeometry args={[0.55, 1.1, 8]} />}
        {type === "torus" && <torusGeometry args={[0.48, 0.2, 12, 28]} />}
        {type === "icosahedron" && <icosahedronGeometry args={[0.72, 0]} />}
        {type === "tetrahedron" && <tetrahedronGeometry args={[0.85, 0]} />}
        {type === "dodecahedron" && <dodecahedronGeometry args={[0.62, 0]} />}
        {type === "box" && <boxGeometry args={[0.95, 0.95, 0.95]} />}
        {type === "sphere" && <sphereGeometry args={[0.68, 24, 24]} />}
        {type === "torusKnot" && <torusKnotGeometry args={[0.38, 0.14, 64, 10]} />}
        {type === "cylinder" && <cylinderGeometry args={[0.48, 0.48, 1.0, 12]} />}
        {mat}
      </mesh>

      {/* Subtle wireframe halo */}
      <mesh ref={glowRef} scale={1.18}>
        {type === "octahedron" && <octahedronGeometry args={[0.68, 0]} />}
        {type === "cone" && <coneGeometry args={[0.55, 1.1, 8]} />}
        {type === "torus" && <torusGeometry args={[0.48, 0.2, 12, 28]} />}
        {type === "icosahedron" && <icosahedronGeometry args={[0.72, 0]} />}
        {type === "tetrahedron" && <tetrahedronGeometry args={[0.85, 0]} />}
        {type === "dodecahedron" && <dodecahedronGeometry args={[0.62, 0]} />}
        {type === "box" && <boxGeometry args={[0.95, 0.95, 0.95]} />}
        {type === "sphere" && <sphereGeometry args={[0.68, 24, 24]} />}
        {type === "torusKnot" && <torusKnotGeometry args={[0.38, 0.14, 64, 10]} />}
        {type === "cylinder" && <cylinderGeometry args={[0.48, 0.48, 1.0, 12]} />}
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

interface MiniIcon3DProps {
  shape: ShapeType;
  color?: string;
  accentColor?: string;
  size?: number;
  className?: string;
}

export default function MiniIcon3D({
  shape,
  color = "#C9A655",
  accentColor = "#45E3D3",
  size = 80,
  className = "",
}: MiniIcon3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMounted(true); },
      { rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 2.6], fov: 44 }}
          gl={{ antialias: false, alpha: true, powerPreference: "default" }}
          dpr={1}
        >
          <ambientLight intensity={0.55} />
          <pointLight position={[3, 3, 3]} color="#C9A655" intensity={2.8} />
          <pointLight position={[-2, -1, 2]} color="#45E3D3" intensity={0.7} />
          <Suspense fallback={null}>
            <RotatingMesh type={shape} color={color} accentColor={accentColor} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
