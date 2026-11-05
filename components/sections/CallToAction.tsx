import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

// Link to the chess bot page
export function CallToAction() {
  return (
    <section
      id="play"
      aria-labelledby="play-heading"
      className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-10 lg:px-24"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--g1) 50%, transparent), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">
                Take a break
              </p>
              <h2
                id="play-heading"
                className="mt-3 text-3xl font-medium uppercase leading-tight tracking-tight sm:text-5xl"
              >
                Can you beat my
                <br />
                chess bot?
              </h2>
              <p className="mt-4 max-w-md text-muted">
                A small chess engine that runs entirely in your browser. Pick a level and play.
              </p>
            </div>
            <Link
              href="/play"
              data-cursor
              className="bg-brand inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full px-7 text-sm font-medium shadow-lg shadow-[#7c3aed]/30 transition-[filter] hover:brightness-110"
            >
              Play now
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
