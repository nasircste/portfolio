import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Section } from "@/components/ui/Section";

const card =
  "flex h-full items-center gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-accent";
const iconBox =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface text-accent";

export function Contact() {
  return (
    <Section id="contact" index="07" eyebrow="Contact" title="Get in touch">
      <Reveal>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Open to full stack and backend opportunities. The best way to reach me
          is by email.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li>
            <TiltCard><a href={`mailto:${profile.email}`} className={card}>
              <span className={iconBox}>
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Email</span>
                <span className="block break-all font-medium">
                  {profile.email}
                </span>
              </span>
            </a></TiltCard>
          </li>
          <li>
            <TiltCard><a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={card}
            >
              <span className={iconBox}>
                <GitHubIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">GitHub</span>
                <span className="block break-all font-medium">nasircste</span>
              </span>
            </a></TiltCard>
          </li>
          <li>
            <TiltCard><a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={card}
            >
              <span className={iconBox}>
                <LinkedInIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">LinkedIn</span>
                <span className="block font-medium">Nasir Ahmed</span>
              </span>
            </a></TiltCard>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
