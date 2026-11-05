import type { ReactNode } from "react";

// Text that rolls up to a second copy when its parent <a>/<button> is hovered (see .roll in globals.css)
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>
        <span className="block">{children}</span>
        <span className="block" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
