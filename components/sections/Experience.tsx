import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Where I have worked">
      <ol className="relative ml-2 border-l border-border">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="pb-12 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] mt-2 size-3.5 rounded-full border-2 border-accent bg-background"
            />
            <Reveal>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-xl font-semibold tracking-tight">
                  {job.role}
                </h3>
                <p className="shrink-0 text-sm text-muted">{job.period}</p>
              </div>
              <p className="mt-1 font-medium text-accent">{job.company}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-border">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
