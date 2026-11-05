import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="About me">
      {/* On large screens the right half is left free for the 3D robot */}
      <div className="lg:w-[52%]">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            {profile.objective}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {profile.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl border border-border bg-surface/80 px-5 py-6 backdrop-blur"
              >
                <p className="text-3xl font-medium tracking-tight sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
