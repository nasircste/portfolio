/* eslint-disable react-hooks/immutability -- three.js scene objects are mutated by design */
"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { charState, pointer } from "./characterState";

// Character: "RobotExpressive" (CC0) from the three.js examples.
const MODEL_URL = "/models/robot.glb";
const ROBOT_HEIGHT = 3.4; // scene units; the model is normalised to this
const GESTURES = ["Wave", "ThumbsUp", "Yes"];

// Soft studio reflections so the metal parts are not black
function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.35;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Robot() {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  const rig = useRef<{
    mixer: THREE.AnimationMixer;
    head: THREE.Object3D | null;
    materials: THREE.Material[];
    opacity: number;
    headY: number;
    headX: number;
  } | null>(null);

  useEffect(() => {
    const scene = gltf.scene;

    // Normalise size and put the feet on y = 0, centred on x/z.
    // Reset first: this effect can run twice (React strict mode) on the same object.
    scene.scale.setScalar(1);
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const k = ROBOT_HEIGHT / size.y;
    scene.scale.setScalar(k);
    scene.position.set(-centre.x * k, -box.min.y * k, -centre.z * k);

    // Own copies of the materials so we can fade them without touching the cache
    const materials: THREE.Material[] = [];
    let head: THREE.Object3D | null = null;
    scene.traverse((o) => {
      if ((o as THREE.Bone).isBone && o.name === "Head") head = o;
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const own = Array.isArray(mesh.material)
          ? mesh.material.map((m) => m.clone())
          : mesh.material.clone();
        mesh.material = own;
        (Array.isArray(own) ? own : [own]).forEach((m) => materials.push(m));
      }
    });

    const mixer = new THREE.AnimationMixer(scene);
    const actions: Record<string, THREE.AnimationAction> = {};
    for (const clip of gltf.animations) actions[clip.name] = mixer.clipAction(clip);

    const idle = actions["Idle"];
    let current: THREE.AnimationAction = idle;
    idle?.play();

    const fadeTo = (name: string, once: boolean) => {
      const next = actions[name];
      if (!next || next === current) return;
      next.reset();
      next.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, once ? 1 : Infinity);
      next.clampWhenFinished = true;
      next.enabled = true;
      next.crossFadeFrom(current, 0.35, false);
      next.play();
      current = next;
    };

    const onFinished = () => fadeTo("Idle", false);
    mixer.addEventListener("finished", onFinished);

    // Wave hello shortly after the page opens, then an occasional gesture
    const timers: number[] = [];
    timers.push(window.setTimeout(() => fadeTo("Wave", true), 2200));
    const loop = () => {
      const delay = 8000 + Math.random() * 6000;
      timers.push(
        window.setTimeout(() => {
          fadeTo(GESTURES[Math.floor(Math.random() * GESTURES.length)], true);
          loop();
        }, delay),
      );
    };
    loop();

    rig.current = { mixer, head, materials, opacity: 1, headY: 0, headX: 0 };
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      mixer.removeEventListener("finished", onFinished);
      mixer.stopAllAction();
      rig.current = null;
    };
  }, [gltf]);

  useFrame((_, delta) => {
    const r = rig.current;
    const g = group.current;
    if (!r || !g) return;

    // Undo last frame's head offset first: if the current clip does not animate the
    // head, the offset would otherwise pile up frame after frame.
    if (r.head) {
      r.head.rotation.y -= r.headY;
      r.head.rotation.x -= r.headX;
    }

    r.mixer.update(delta);

    // Look toward the mouse (smoothed, added on top of the animation)
    if (r.head) {
      r.headY += (pointer.x * 0.5 - r.headY) * 0.08;
      r.headX += (pointer.y * 0.3 - r.headX) * 0.08;
      r.head.rotation.y += r.headY;
      r.head.rotation.x += r.headX;
    }

    // Ease toward the scroll-driven target
    const ease = 1 - Math.pow(0.0015, delta); // frame-rate independent smoothing
    g.position.x += (charState.x * viewport.width * 0.5 - g.position.x) * ease;
    g.position.y += (charState.y - g.position.y) * ease;
    const s = g.scale.x + (charState.scale - g.scale.x) * ease;
    g.scale.setScalar(s);
    g.rotation.y += (charState.rotY + pointer.x * 0.25 - g.rotation.y) * ease;

    r.opacity += (charState.opacity - r.opacity) * ease;
    const fading = r.opacity < 0.99;
    for (const m of r.materials) {
      m.transparent = fading;
      m.opacity = r.opacity;
    }
    g.visible = r.opacity > 0.01;
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  );
}

type CharacterSceneProps = { active: boolean };

export default function CharacterScene({ active }: CharacterSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.9, 10], fov: 30 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ camera }) => camera.lookAt(0, 1.7, 0)}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      {/* lavender key light, pink rim light: matches the site palette */}
      <directionalLight position={[-3, 4, 5]} intensity={2.4} color="#c2a4ff" />
      <directionalLight position={[4, 3, -3]} intensity={3.2} color="#f472b6" />
      <directionalLight position={[0, 2, 6]} intensity={1} color="#ffffff" />
      <Suspense fallback={null}>
        <Environment />
        <Robot />
      </Suspense>
    </Canvas>
  );
}
