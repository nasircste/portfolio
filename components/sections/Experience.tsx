import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollLine } from "@/components/ui/ScrollLine";
import { Section } from "@/components/ui/Section";

export function Experience() {
  return (
    <Section id="experience" index="03" eyebrow="Experience" title="My career & experience">
      <div className="relative">
        <ScrollLine />
        <ol className="space-y-16 pl-8 sm:pl-12">
          {experience.map((job, idx) => (
            <li
              key={`${job.company}-${job.period}`}
              className="relative grid gap-4 lg:grid-cols-[14rem_1fr] lg:gap-12"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[37px] top-2 size-3 rounded-full bg-accent shadow-[0_0_20px_4px] shadow-accent/40 sm:-left-[53px]"
              />
              <Reveal>
                <p className="font-mono text-sm text-muted">{job.period}</p>
                <p className="mt-1 font-mono text-xs text-accent">
                  {idx === 0 ? "Current" : "Previous"}
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h3 className="text-2xl font-medium uppercase tracking-tight sm:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-1 font-medium text-accent">{job.company}</p>
                <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5 leading-relaxed text-muted marker:text-accent/60">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
