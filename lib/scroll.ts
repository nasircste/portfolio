import type Lenis from "lenis";

// Shared handle to the Lenis instance (set by <SmoothScroll />).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smooth-scroll to a section id (without the #). Falls back to native scrolling. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -64, duration: 1.2 });
  } else {
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }
  history.replaceState(null, "", `#${id}`);
}
