import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}
