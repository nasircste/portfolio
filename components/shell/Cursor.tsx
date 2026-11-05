"use client";

import { useEffect, useRef } from "react";

// Soft glowing follower for mouse users. Grows over links, buttons and [data-cursor].
// The native cursor stays visible, so this is purely decorative.
export function Cursor() {
  const glow = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glowEl = glow.current;
    const dotEl = dot.current;
    if (!fine || reduce || !glowEl || !dotEl) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        gx = x;
        gy = y;
        glowEl.style.opacity = "1";
        dotEl.style.opacity = "1";
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      targetScale = t?.closest("a, button, [data-cursor]") ? 1.9 : 1;
    };
    const onLeave = () => {
      shown = false;
      glowEl.style.opacity = "0";
      dotEl.style.opacity = "0";
    };

    const loop = () => {
      gx += (x - gx) * 0.16;
      gy += (y - gy) * 0.16;
      scale += (targetScale - scale) * 0.15;
      glowEl.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%) scale(${scale})`;
      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] size-12 rounded-full bg-accent/30 opacity-0 blur-md transition-opacity duration-300"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] size-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
      />
    </>
  );
}
