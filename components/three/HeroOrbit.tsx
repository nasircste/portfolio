"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

// three.js is only downloaded in the browser, after the page is interactive.
const OrbitScene = dynamic(() => import("./OrbitScene"), { ssr: false });

// If WebGL is unavailable the decorative scene simply disappears.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Decorative 3D orbit that sits around the avatar. Lives inside a `relative`
// wrapper and extends beyond it (inset is negative) without affecting layout.
export function HeroOrbit() {
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(hasWebGL());
  }, []);

  // Pause rendering while the hero is scrolled out of view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const color = resolvedTheme === "dark" ? "#818cf8" : "#4f46e5";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-[22%] -z-10"
    >
      {supported && (
        <SceneBoundary>
          <OrbitScene
            color={color}
            animate={!reduceMotion}
            active={visible}
          />
        </SceneBoundary>
      )}
    </div>
  );
}
