import { skills } from "@/data/skills";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TechSphere } from "@/components/ui/TechSphere";

export function TechStack() {
  const all = Array.from(new Set(skills.flatMap((g) => g.items)));

  return (
    <Section id="skills" index="05" eyebrow="Skills" title="My tech stack">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        {/* 3D word sphere: drag with the mouse, or let it spin */}
        <Reveal>
          <TechSphere words={all} />
        </Reveal>

        {/* The same skills as plain text: grouped, readable and accessible */}
        <div className="space-y-8">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05}>
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
