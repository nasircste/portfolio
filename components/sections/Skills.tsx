import {
  Code2,
  Database,
  LayoutTemplate,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skills, type SkillGroup } from "@/data/skills";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Section } from "@/components/ui/Section";

const icons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  server: Server,
  layout: LayoutTemplate,
  smartphone: Smartphone,
  database: Database,
  wrench: Wrench,
};

export function Skills() {
  return (
    <Section id="skills" index="04" eyebrow="Skills" title="Tools and technologies">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <li key={group.category}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <TiltCard>
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="flex items-center gap-3 text-base font-semibold">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-surface text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    {group.category}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Chip>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
                </TiltCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
