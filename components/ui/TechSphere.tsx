"use client";

import { useEffect, useRef } from "react";

type TechSphereProps = { words: string[] };

// Words laid out on a sphere (Fibonacci distribution) and rotated in 3D.
// Pure DOM + transforms: no WebGL, so it is light and works everywhere.
// Auto-spins; the mouse (or a finger drag) steers it. Static for reduced motion.
export function TechSphere({ words }: TechSphereProps) {
  const box = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const n = words.length;
    const points = words.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    let angleX = 0.35;
    let angleY = 0;
    let velX = 0.0015;
    let velY = 0.004;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hovering = false;
    let visible = true;
    let raf = 0;

    const render = () => {
      const radius = el.clientWidth * 0.4;
      const sx = Math.sin(angleX);
      const cx = Math.cos(angleX);
      const sy = Math.sin(angleY);
      const cy = Math.cos(angleY);
      points.forEach((p, i) => {
        // rotate around Y, then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 (back) ... 1 (front)
        const scale = 0.55 + depth * 0.75;
        const node = items.current[i];
        if (!node) return;
        node.style.transform = `translate3d(${x1 * radius}px, ${y2 * radius}px, 0) translate(-50%, -50%) scale(${scale})`;
        node.style.opacity = String(0.25 + depth * 0.75);
        node.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const loop = () => {
      if (!dragging) {
        // ease the spin back toward a gentle auto-rotation
        velY += (0.004 - velY) * 0.02;
        velX += (0.0012 - velX) * 0.02;
      }
      angleY += velY;
      angleX += velX;
      render();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (dragging) {
        velY = (e.clientX - lastX) * 0.004;
        velX = -(e.clientY - lastY) * 0.004;
        lastX = e.clientX;
        lastY = e.clientY;
      } else if (hovering && e.pointerType === "mouse") {
        const r = el.getBoundingClientRect();
        velY = ((e.clientX - r.left) / r.width - 0.5) * 0.03;
        velX = -((e.clientY - r.top) / r.height - 0.5) * 0.02;
      }
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => (dragging = false);
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    render();
    if (reduce) {
      // keep it static, but still correctly laid out on resize
      const ro = new ResizeObserver(render);
      ro.observe(el);
      return () => ro.disconnect();
    }

    raf = requestAnimationFrame(loop);
    // pause when off screen
    const io = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting;
      if (next && !visible) raf = requestAnimationFrame(loop);
      if (!next) cancelAnimationFrame(raf);
      visible = next;
    });
    io.observe(el);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [words]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      data-cursor
      className="relative mx-auto aspect-square w-full max-w-[34rem] cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      <div
        className="pointer-events-none absolute inset-[18%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--g1) 45%, transparent), transparent 70%)",
        }}
      />
      {words.map((w, i) => (
        <span
          key={w}
          ref={(node) => {
            items.current[i] = node;
          }}
          className="absolute left-1/2 top-1/2 whitespace-nowrap text-sm font-medium tracking-wide will-change-transform sm:text-base"
        >
          {w}
        </span>
      ))}
    </div>
  );
}
