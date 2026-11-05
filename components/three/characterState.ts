// Mutable values shared between the scroll animation (GSAP) and the 3D scene.
// Mutated outside React on purpose: they change every frame.

export const charState = {
  /** Horizontal offset as a fraction of the visible width (-1 left ... 1 right) */
  x: 0,
  /** Vertical offset in scene units */
  y: 0,
  scale: 1,
  rotY: 0,
  opacity: 1,
};

/** Normalised pointer position, -1 ... 1 on both axes */
export const pointer = { x: 0, y: 0 };

/** Heavy 3D character only on large screens with a mouse and no reduced-motion preference. */
export const CHARACTER_MEDIA =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
