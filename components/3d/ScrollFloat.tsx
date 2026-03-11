"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/* ── Individual floating geometry ── */
function FloatMesh({
  geometry,
  color,
  position,
  speed,
  rotateDir,
}: {
  geometry: "octahedron" | "icosahedron" | "tetrahedron" | "torus" | "dodecahedron";
  color: string;
  position: [number, number, number];
  speed: number;
  rotateDir: 1 | -1;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * speed * rotateDir * 0.4;
    ref.current.rotation.y = clock.elapsedTime * speed * 0.55;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.6} position={position}>
      <mesh ref={ref}>
        {geometry === "octahedron" && <octahedronGeometry args={[0.4, 0]} />}
        {geometry === "icosahedron" && <icosahedronGeometry args={[0.45, 0]} />}
        {geometry === "tetrahedron" && <tetrahedronGeometry args={[0.5, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.32, 0.12, 10, 24]} />}
        {geometry === "dodecahedron" && <dodecahedronGeometry args={[0.38, 0]} />}
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

/* ── Scene configs per variant ── */
const SCENE_CONFIGS = {
  divider: [
    { geometry: "octahedron" as const,  color: "#C9A655", position: [-4,  0.5, 0] as [number,number,number], speed: 1.2, rotateDir:  1 as const },
    { geometry: "tetrahedron" as const, color: "#45E3D3", position: [ 0, -0.3, 0] as [number,number,number], speed: 0.8, rotateDir: -1 as const },
    { geometry: "dodecahedron" as const,color: "#B39148", position: [ 4,  0.4, 0] as [number,number,number], speed: 1.0, rotateDir:  1 as const },
  ],
  corner: [
    { geometry: "icosahedron" as const, color: "#C9A655", position: [ 0, 0, 0] as [number,number,number], speed: 0.9, rotateDir: 1 as const },
    { geometry: "torus" as const,       color: "#9375B5", position: [ 1.2, -0.8, -0.5] as [number,number,number], speed: 1.3, rotateDir: -1 as const },
  ],
  projects: [
    { geometry: "dodecahedron" as const, color: "#C9A655", position: [-3,  0,  0] as [number,number,number], speed: 0.7, rotateDir:  1 as const },
    { geometry: "octahedron" as const,   color: "#45E3D3", position: [ 0,  0.5, 0] as [number,number,number], speed: 1.1, rotateDir: -1 as const },
    { geometry: "tetrahedron" as const,  color: "#9375B5", position: [ 3, -0.2, 0] as [number,number,number], speed: 0.9, rotateDir:  1 as const },
    { geometry: "torus" as const,        color: "#B39148", position: [ 1.5, 1.0, 0] as [number,number,number], speed: 1.4, rotateDir: -1 as const },
  ],
};

type SceneVariant = keyof typeof SCENE_CONFIGS;

interface ScrollFloatProps {
  variant?: SceneVariant;
  height?: number;
  className?: string;
  scrollFactor?: number;
  bgFrom?: string;
  bgTo?: string;
}

export default function ScrollFloat({
  variant = "divider",
  height = 120,
  className = "",
  scrollFactor = 0.3,
  bgFrom,
  bgTo,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 15 * scrollFactor]);

  const shapes = SCENE_CONFIGS[variant];

  const bgStyle = bgFrom && bgTo
    ? { background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})` }
    : bgFrom
    ? { backgroundColor: bgFrom }
    : {};

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, height, ...bgStyle }}
      className={`relative w-full pointer-events-none select-none ${className}`}
    >
      <motion.div style={{ rotateZ }} className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "default" }}
          dpr={1}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} color="#C9A655" intensity={1.8} />
          <pointLight position={[-5, -3, 3]} color="#45E3D3" intensity={0.6} />
          <Suspense fallback={null}>
            {shapes.map((s, i) => (
              <FloatMesh key={i} {...s} />
            ))}
          </Suspense>
        </Canvas>
      </motion.div>
    </motion.div>
  );
}
