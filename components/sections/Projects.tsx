"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { Chip } from "@/components/ui/Chip";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

// Horizontal scroll-snap carousel: swipeable, keyboard friendly, no layout JS.
export function Projects() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () =>
      setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(projects.length - 1, i));
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <Section id="projects" index="04" eyebrow="Projects" title="My work">
      <Reveal>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goTo(index + 1);
            if (e.key === "ArrowLeft") goTo(index - 1);
          }}
        >
          <ul
            ref={track}
            data-lenis-prevent
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-3xl border border-border bg-surface/60 backdrop-blur"
          >
            {projects.map((project, i) => (
              <li
                key={project.title}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${projects.length}`}
                className="grid min-w-full snap-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-14"
              >
                <div className="flex flex-col">
                  <p className="text-outline text-7xl font-semibold leading-none tracking-tighter sm:text-8xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  {project.featured && (
                    <p className="bg-brand mt-6 inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider">
                      Featured
                    </p>
                  )}
                  <h3 className="mt-5 text-3xl font-medium uppercase leading-tight tracking-tight sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <ul
                    aria-label={`${project.title} technologies`}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {project.tech.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      <GitHubIcon className="size-4" />
                      View on GitHub
                      <span className="sr-only"> ({project.title})</span>
                    </a>
                  )}
                </div>

                {/* Generated artwork (no screenshots, so nothing confidential is shown) */}
                <div
                  aria-hidden="true"
                  className="relative hidden min-h-72 overflow-hidden rounded-2xl border border-border lg:block"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${20 + i * 18}% 25%, color-mix(in srgb, var(--g1) 45%, transparent), transparent 55%), radial-gradient(circle at ${85 - i * 12}% 85%, color-mix(in srgb, var(--g3) 35%, transparent), transparent 55%)`,
                    }}
                  />
                  <div className="bg-grid absolute inset-0 opacity-60" />
                  <div className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-3 p-8">
                    {project.tech.slice(0, 6).map((t, k) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-background/60 px-4 py-2 text-sm backdrop-blur"
                        style={{ transform: `translateY(${(k % 3) * 10 - 10}px)` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-mono text-sm text-muted" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Previous project"
                className="inline-flex size-12 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === projects.length - 1}
                aria-label="Next project"
                className="inline-flex size-12 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
