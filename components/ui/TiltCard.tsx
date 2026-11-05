"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
};

// Gentle 3D tilt that follows the mouse, plus a soft spotlight under the cursor.
// Mouse only: touch and reduced-motion users get a plain card.
export function TiltCard({ children, className = "", max = 5 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 220, damping: 22 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 22 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (reduce || !el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className={`h-full [perspective:900px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: springRx, rotateY: springRy }}
        className="group relative h-full [transform-style:preserve-3d]"
      >
        {children}
        {!reduce && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 [background:radial-gradient(360px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)] group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
}
