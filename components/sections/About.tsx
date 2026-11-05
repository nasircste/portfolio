import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Career objective">
      <Reveal>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          {profile.objective}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {profile.stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-2xl border border-border bg-surface px-4 py-5"
            >
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
