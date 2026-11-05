"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { CHARACTER_MEDIA, charState, pointer } from "./characterState";

// three.js and the model are only downloaded on capable desktops, after hydration.
const CharacterScene = dynamic(() => import("./CharacterScene"), { ssr: false });

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
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Fixed full-screen layer behind the page content. The robot starts centred in the
// hero, moves beside the About text, then fades out before the cards begin.
export function CharacterLayer() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(true);

  // Decide once on the client (and when the viewport changes)
  useEffect(() => {
    const mq = window.matchMedia(CHARACTER_MEDIA);
    const update = () => {
      const webgl = hasWebGL();
      // Lets the hero fall back to the photo if a desktop has no WebGL
      document.documentElement.classList.toggle("no-character", mq.matches && !webgl);
      setEnabled(mq.matches && webgl);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mouse position for the head/body follow
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  // Scroll choreography
  useEffect(() => {
    if (!enabled) return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = { x: 0, y: 0, scale: 1.18, rotY: 0, opacity: 1 };
    const about = { x: 0.5, y: 0, scale: 0.9, rotY: -0.55, opacity: 1 };
    const gone = { x: 0.5, y: 0, scale: 0.8, rotY: -0.55, opacity: 0 };
    Object.assign(charState, hero);

    const ctx = gsap.context(() => {
      gsap.fromTo(charState, hero, {
        ...about,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top 25%",
          scrub: 1,
        },
      });
      gsap.fromTo(charState, about, {
        ...gone,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#whatido",
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      });
      // Stop rendering entirely once the robot is gone
      ScrollTrigger.create({
        trigger: "#whatido",
        start: "top 20%",
        onEnter: () => setActive(false),
        onLeaveBack: () => setActive(true),
      });
    });
    return () => ctx.revert();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      // When rendering is paused the last frame would stay on screen, so fade it out
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <SceneBoundary>
        <CharacterScene active={active} />
      </SceneBoundary>
    </div>
  );
}
