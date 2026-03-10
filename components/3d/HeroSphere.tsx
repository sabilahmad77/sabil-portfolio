"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, colors } = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 700 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldColor = new THREE.Color("#C9A655");
    const tealColor = new THREE.Color("#45E3D3");

    for (let i = 0; i < count; i++) {
      // Distribute on sphere surface
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const r = 2.2 + (Math.random() - 0.5) * 0.4;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Mostly gold, occasional teal
      const t = Math.random() > 0.85 ? tealColor : goldColor;
      colors[i * 3] = t.r;
      colors[i * 3 + 1] = t.g;
      colors[i * 3 + 2] = t.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x = mouse.y * 0.08;
    pointsRef.current.rotation.z = mouse.x * 0.05;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function GlowSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#0E1D31"
          transparent
          opacity={0.15}
          distort={0.25}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function RingOrbit({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 120]} />
      <meshBasicMaterial color="#B39148" transparent opacity={0.25} />
    </mesh>
  );
}

export default function HeroSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#C9A655" intensity={2} />
        <pointLight position={[-5, -3, -5]} color="#45E3D3" intensity={0.8} />

        <ParticleNetwork />
        <GlowSphere />
        <RingOrbit radius={2.6} speed={0.18} tilt={Math.PI / 4} />
        <RingOrbit radius={3.1} speed={-0.12} tilt={Math.PI / 6} />
        <RingOrbit radius={3.5} speed={0.08} tilt={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
