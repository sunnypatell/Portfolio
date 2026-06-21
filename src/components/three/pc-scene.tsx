"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";

const URL = "/models/retro_computer.glb?v=5"; // swap this one path to use a different rig

function Model({ scale }: { scale: number }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(URL);

  // sketchfab ships every material as alphaMode BLEND (renders see-through); force opaque + depth write
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
  // slow idle sway so the crt screen stays readable instead of spinning away
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = 4.4 + Math.sin(t * 0.3) * 0.1;
    g.rotation.x = -0.03 + Math.sin(t * 0.24) * 0.025;
  });
  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} scale={scale} />
      </group>
    </Center>
  );
}
useGLTF.preload(URL);

// transparent canvas; warm key + cool rim grade it into the theme, bloom lifts the crt glow
export default function PcScene({ active = true }: { active?: boolean }) {
  // touch devices get the idle sway only, so a swipe scrolls the page instead of
  // grabbing the model; mouse-drag orbit stays on pointer-fine desktops. slightly
  // bigger model on phones now that the mobile hero has the room.
  const [isTouch, setIsTouch] = useState(false);
  const [scale, setScale] = useState(1.3);
  useEffect(() => {
    setIsTouch(window.matchMedia("(any-pointer: coarse)").matches);
    setScale(window.matchMedia("(max-width: 1024px)").matches ? 1.5 : 1.3);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0.5, 10], fov: 28 }}
      onCreated={({ gl }) => {
        // let a vertical swipe scroll the page instead of being eaten by the canvas
        gl.domElement.style.touchAction = "pan-y";
      }}
    >
      <ambientLight intensity={0.55} />
      <spotLight position={[-6, 7, 7]} angle={0.5} penumbra={1} intensity={130} color="#ffe9d2" />
      <pointLight position={[7, 1, 4]} intensity={45} color="#d9663d" />
      <pointLight position={[0, 1, 7]} intensity={22} color="#ffb27a" />

      <Suspense fallback={null}>
        <Model scale={scale} />
      </Suspense>

      {!isTouch && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 2.05}
        />
      )}

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <BrightnessContrast brightness={-0.01} contrast={0.06} />
        <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
        <Vignette eskil={false} offset={0.3} darkness={0.8} />
      </EffectComposer>
    </Canvas>
  );
}
