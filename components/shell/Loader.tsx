"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

// Full-screen loading screen with a counter. Marks <html> as `is-loaded` when done
// so the hero text animations can start.
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minDuration = reduce ? 200 : 1500;
    const start = performance.now();
    let raf = 0;
    let pageLoaded = document.readyState === "complete";
    const onLoad = () => (pageLoaded = true);
    window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      const t = Math.min((now - start) / minDuration, 1);
      // Hold at 90% until the page has really finished loading
      const cap = pageLoaded ? 100 : 90;
      const value = Math.min(Math.round(t * 100), cap);
      setProgress(value);
      if (value >= 100) {
        setLeaving(true);
        document.documentElement.classList.add("is-loaded");
        window.setTimeout(() => setGone(true), reduce ? 0 : 700);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`loader fixed inset-0 z-[100] flex flex-col justify-between bg-background p-6 transition-[opacity,transform] duration-700 ease-out sm:p-10 ${
        leaving ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted">
        {profile.name}
      </p>
      <div className="flex items-end justify-between">
        <p className="text-sm uppercase tracking-widest text-muted">
          {profile.title}
        </p>
        <p
          className="text-7xl font-semibold tabular-nums leading-none tracking-tighter text-accent sm:text-9xl"
          aria-hidden="true"
        >
          {progress}
        </p>
      </div>
    </div>
  );
}
