"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";

// Vertical line that draws itself as you scroll past the timeline.
export function ScrollLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-px bg-border"
    >
      <motion.div
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
        className="h-full w-px origin-top bg-gradient-to-b from-[var(--g1)] to-[var(--g3)]"
      />
    </div>
  );
}
