import { FlaskConical, GraduationCap, Languages } from "lucide-react";
import { education, languages, research } from "@/data/education";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function EducationResearch() {
  return (
    <Section
      id="education"
      index="07"
      eyebrow="Education"
      title="Education and research"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <Reveal>
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <GraduationCap className="size-5 text-accent" aria-hidden="true" />
              Education
            </h3>
          </Reveal>
          <ol className="mt-6 space-y-4">
            {education.map((e, i) => (
              <li key={e.institution}>
                <Reveal delay={i * 0.06}>
                  <div className="rounded-2xl border border-border p-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h4 className="font-semibold">{e.institution}</h4>
                      <p className="shrink-0 text-sm text-muted">{e.period}</p>
                    </div>
                    <p className="mt-1 text-muted">{e.degree}</p>
                    <p className="mt-2 text-sm font-medium text-accent">
                      {e.score}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <Reveal>
            <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <FlaskConical className="size-5 text-accent" aria-hidden="true" />
              Research
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="mt-6 rounded-2xl border border-border bg-surface p-6">
              <p className="text-sm font-medium uppercase tracking-wider text-accent">
                {research.label}
              </p>
              <h4 className="mt-2 text-lg font-semibold leading-snug">
                {research.title}
              </h4>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
                {research.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-10 flex items-center gap-2 text-xl font-semibold tracking-tight">
              <Languages className="size-5 text-accent" aria-hidden="true" />
              Languages
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {languages.map((l) => (
                <li key={l.name}>
                  <span className="font-medium">{l.name}</span>
                  <span className="text-muted">: {l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
