"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

const URL = "/models/retro_computer.glb?v=5"; // swap this one path to use a different rig

function Model() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(URL);

  // the sketchfab export ships every material as alphaMode BLEND, which makes the
  // rig render see-through (front faces vanish, the screen bleeds through the back).
  // force opaque + depth write so it reads as a solid object.
  useMemo(() => {
    scene.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (!m) return;
        m.transparent = false;
        m.depthWrite = true;
        m.alphaTest = 0;
        m.needsUpdate = true;
      });
    });
  }, [scene]);
  // screen faces the camera with a slow idle sway, so the personalized crt
  // stays readable instead of spinning out of view.
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = -0.42 + Math.sin(t * 0.3) * 0.1;
    g.rotation.x = -0.03 + Math.sin(t * 0.24) * 0.025;
  });
  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} scale={1.3} />
      </group>
    </Center>
  );
}
useGLTF.preload(URL);

// transparent canvas so the rig floats with no visible container. warm key +
// cool rim grade it into the graphite/amber theme; bloom lifts the crt glow.
export default function PcScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0.5, 10], fov: 28 }}
    >
      <ambientLight intensity={0.55} />
      <spotLight position={[-6, 7, 7]} angle={0.5} penumbra={1} intensity={130} color="#ffe9d2" />
      <pointLight position={[7, 1, 4]} intensity={45} color="#d9663d" />
      <pointLight position={[0, 1, 7]} intensity={22} color="#ffb27a" />

      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2.05}
      />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <BrightnessContrast brightness={-0.01} contrast={0.06} />
        <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
        <Vignette eskil={false} offset={0.3} darkness={0.8} />
      </EffectComposer>
    </Canvas>
  );
}
