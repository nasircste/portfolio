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
      className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-accent">
          <span className="font-mono" aria-hidden="true">
            {index}
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {eyebrow}
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}
