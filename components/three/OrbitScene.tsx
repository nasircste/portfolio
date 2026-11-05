"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Group } from "three";

type SceneProps = {
  color: string;
  animate: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
};

// Units: the avatar disc has radius 1, the camera is tuned so the canvas
// shows about 1.45 units from the centre in every direction.
const RING_A = 1.2;
const RING_B = 1.33;

function Scene({ color, animate, pointer }: SceneProps) {
  const root = useRef<Group>(null);
  const core = useRef<Group>(null);
  const ringA = useRef<Group>(null);
  const ringB = useRef<Group>(null);
  const dots = useRef<Group>(null);

  // A sparse shell of particles around the avatar, generated once.
  const particles = useMemo(() => {
    const n = 70;
    const arr = new Float32Array(n * 3);
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < n; i++) {
      const r = 1.15 + rand() * 0.28;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!animate) return;
    const p = pointer.current;
    if (root.current) {
      // Ease the whole scene toward the pointer
      root.current.rotation.y += (p.x * 0.5 - root.current.rotation.y) * 0.05;
      root.current.rotation.x += (-p.y * 0.35 - root.current.rotation.x) * 0.05;
    }
    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x += delta * 0.05;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.35;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.22;
    if (dots.current) dots.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={root}>
      {/* Wireframe sphere behind the avatar */}
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[1.12, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
        </mesh>
      </group>

      {/* Orbit ring A with one node */}
      <group rotation={[1.25, 0.2, 0]}>
        <group ref={ringA}>
          <mesh>
            <torusGeometry args={[RING_A, 0.006, 8, 160]} />
            <meshBasicMaterial color={color} transparent opacity={0.55} />
          </mesh>
          <mesh position={[RING_A, 0, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      </group>

      {/* Orbit ring B with two nodes */}
      <group rotation={[0.55, -0.5, 0]}>
        <group ref={ringB}>
          <mesh>
            <torusGeometry args={[RING_B, 0.005, 8, 160]} />
            <meshBasicMaterial color={color} transparent opacity={0.35} />
          </mesh>
          <mesh position={[RING_B, 0, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh position={[-RING_B, 0, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Particles */}
      <group ref={dots}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color={color}
            size={0.022}
            sizeAttenuation
            transparent
            opacity={0.7}
          />
        </points>
      </group>
    </group>
  );
}

type OrbitSceneProps = {
  color: string;
  animate: boolean;
  active: boolean;
};

export default function OrbitScene({ color, animate, active }: OrbitSceneProps) {
  const pointer = useRef({ x: 0, y: 0 });

  // Track the mouse across the whole window (the canvas itself ignores pointer events)
  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  return (
    <Canvas
      // Render continuously only while visible and motion is allowed
      frameloop={animate && active ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 27.2 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <Scene color={color} animate={animate} pointer={pointer} />
    </Canvas>
  );
}
