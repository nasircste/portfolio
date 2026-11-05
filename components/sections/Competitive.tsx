import { ArrowUpRight, Trophy } from "lucide-react";
import {
  achievements,
  alsoSolvedOn,
  competitiveSummary,
  platforms,
} from "@/data/competitive";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Section } from "@/components/ui/Section";

export function Competitive() {
  return (
    <Section
      id="coding"
      index="05"
      eyebrow="Competitive Programming"
      title="Problem solving"
    >
      <Reveal>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          <strong className="font-semibold text-foreground">
            {competitiveSummary.totalProblems} problems solved
          </strong>{" "}
          across platforms, with{" "}
          <strong className="font-semibold text-foreground">
            {competitiveSummary.contests}
          </strong>{" "}
          {competitiveSummary.contestsNote}.
        </p>
      </Reveal>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platforms.map((p, i) => (
          <li key={p.name}>
            <Reveal delay={i * 0.06} className="h-full">
              <TiltCard>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <span className="flex items-center justify-between text-sm font-medium text-muted">
                  {p.name}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-4 text-4xl font-semibold tracking-tight">
                  {p.solved}
                </span>
                <span className="text-sm text-muted">problems solved</span>
                {p.rating && (
                  <span className="mt-4 text-sm font-medium text-accent">
                    {p.rating}
                  </span>
                )}
                <span className="mt-auto pt-4 text-xs text-muted">
                  @{p.handle}
                  <span className="sr-only">
                    , opens {p.name} profile in a new tab
                  </span>
                </span>
              </a>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <p className="mt-6 text-sm text-muted">
          Also solved problems on {alsoSolvedOn.join(", ")}.
        </p>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h3 className="text-xl font-semibold tracking-tight">Achievements</h3>
        </Reveal>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border">
          {achievements.map((a, i) => (
            <li key={a.event}>
              <Reveal delay={i * 0.06}>
                <div className="flex items-start gap-4 p-5">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                    <Trophy className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{a.place}</p>
                    <p className="text-muted">{a.event}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
