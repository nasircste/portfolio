import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, index, eyebrow, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-24"
    >
      <Reveal>
        <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          <span className="font-mono" aria-hidden="true">
            {index}
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {eyebrow}
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-4 text-4xl font-medium uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}
