"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 28;
const CONNECTION_DISTANCE = 2.6;

function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate fixed node positions on page load
  const { nodePositions, connectionPairs } = useMemo(() => {
    const seed = (n: number) => {
      // Simple deterministic pseudo-random
      const x = Math.sin(n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(
        new THREE.Vector3(
          (seed(i * 3 + 0) - 0.5) * 12,
          (seed(i * 3 + 1) - 0.5) * 7,
          (seed(i * 3 + 2) - 0.5) * 5 - 1.5
        )
      );
    }

    // Find nearby pairs to connect
    const pairs: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DISTANCE) {
          pairs.push([i, j]);
        }
      }
    }
    return { nodePositions: nodes, connectionPairs: pairs };
  }, []);

  // Line segments geometry for all connections
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    for (const [a, b] of connectionPairs) {
      positions.push(
        nodePositions[a].x, nodePositions[a].y, nodePositions[a].z,
        nodePositions[b].x, nodePositions[b].y, nodePositions[b].z
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodePositions, connectionPairs]);

  // Node spheres - one instanced mesh
  const nodesGeometry = useMemo(() => {
    const positions: number[] = [];
    for (const n of nodePositions) {
      positions.push(n.x, n.y, n.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodePositions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.015;
    groupRef.current.rotation.x = Math.sin(t * 0.008) * 0.06;
  });

  // Pulse: a few nodes glow brighter over time
  const pulsingNodes = useMemo(() => [2, 7, 14, 21, 0], []);

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#B39148"
          transparent
          opacity={0.18}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes rendered as a point cloud */}
      <points geometry={nodesGeometry}>
        <pointsMaterial
          size={0.12}
          color="#C9A655"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      {/* Highlighted "active" nodes */}
      {pulsingNodes.map((idx) => (
        <NodePulse key={idx} position={nodePositions[idx]} />
      ))}

      {/* Floating block cubes */}
      {nodePositions.slice(0, 8).map((pos, i) => (
        <FloatingBlock key={i} position={pos} index={i} />
      ))}
    </group>
  );
}

function NodePulse({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const pulse = (Math.sin(state.clock.elapsedTime * 1.8 + position.x) + 1) / 2;
    ref.current.scale.setScalar(0.8 + pulse * 0.5);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + pulse * 0.4;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.09, 10, 10]} />
      <meshBasicMaterial color="#45E3D3" transparent opacity={0.5} />
    </mesh>
  );
}

function FloatingBlock({ position, index }: { position: THREE.Vector3; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position.y + Math.sin(t * 0.6 + index * 1.2) * 0.15;
    ref.current.rotation.x = t * 0.2 + index;
    ref.current.rotation.y = t * 0.15 + index;
  });
  return (
    <mesh ref={ref} position={[position.x, position.y, position.z - 0.5]}>
      <boxGeometry args={[0.22, 0.22, 0.22]} />
      <meshBasicMaterial
        color={index % 2 === 0 ? "#B39148" : "#2A3A52"}
        transparent
        opacity={0.35}
        wireframe
      />
    </mesh>
  );
}

export default function BlockchainBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={{ transform: "translateZ(0)", willChange: "auto" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
        dpr={1}
        style={{ width: "100%", height: "100%", imageRendering: "auto" }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 5, 5]} color="#C9A655" intensity={0.5} />
        <NodeNetwork />
      </Canvas>
    </div>
  );
}
