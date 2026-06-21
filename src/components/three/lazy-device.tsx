"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

// chunk only loads when rendered, so low-power devices never download three
const PcScene = dynamic(() => import("./pc-scene"), { ssr: false });

function lowPower() {
  return (
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !window.matchMedia("(pointer: fine)").matches
  );
}

// if the 3d chunk or webgl context fails, show the poster instead of crashing the hero
class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// reserved-height parent + absolute fill so mounting the canvas never shifts layout
export function LazyDevice({ poster }: { poster: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"loading" | "static" | "3d">("loading");
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => setMode(lowPower() ? "static" : "3d"), []);

  useEffect(() => {
    if (mode !== "3d" || !ref.current) return;
    const el = ref.current;
    let inView = false;
    const recompute = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (entry.isIntersecting) setShow(true);
        recompute();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", recompute);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", recompute);
    };
  }, [mode]);

  const posterImg = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={poster}
      alt="A 3D render of Sunny's desktop rig"
      className="h-full w-full object-contain"
    />
  );

  return (
    <div ref={ref} className="absolute inset-0">
      {mode === "static" && posterImg}
      {mode === "3d" && show && (
        <SceneBoundary fallback={posterImg}>
          <PcScene active={active} />
        </SceneBoundary>
      )}
    </div>
  );
}
