import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { hasProfilePhoto } from "@/lib/photo";
import { Avatar } from "@/components/ui/Avatar";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

const card =
  "group flex h-full items-center gap-4 rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur transition-colors hover:border-accent";
const iconBox =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-accent";

export function Contact() {
  const hasPhoto = hasProfilePhoto();

  return (
    <Section id="contact" index="08" eyebrow="Contact" title="Let's work together">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              Open to full stack and backend opportunities. The best way to reach me
              is by email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              data-cursor
              className="mt-6 inline-flex max-w-full items-center gap-3 break-all text-2xl font-medium tracking-tight transition-colors hover:text-accent sm:text-4xl"
            >
              {profile.email}
              <ArrowUpRight className="size-6 shrink-0 sm:size-8" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              <li>
                <TiltCard>
                  <a href={`mailto:${profile.email}`} className={card}>
                    <span className={iconBox}>
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">Email</span>
                      <span className="block font-medium">Say hello</span>
                    </span>
                  </a>
                </TiltCard>
              </li>
              <li>
                <TiltCard>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className={card}>
                    <span className={iconBox}>
                      <GitHubIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">GitHub</span>
                      <span className="block break-all font-medium">nasircste</span>
                    </span>
                  </a>
                </TiltCard>
              </li>
              <li>
                <TiltCard>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={card}>
                    <span className={iconBox}>
                      <LinkedInIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">LinkedIn</span>
                      <span className="block font-medium">Nasir Ahmed</span>
                    </span>
                  </a>
                </TiltCard>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Photo: the hero uses the 3D robot on desktop, so the portrait lives here */}
        <Reveal delay={0.12} className="hidden justify-self-center lg:block">
          <Avatar
            src={profile.photo}
            initials={profile.initials}
            alt={`Portrait of ${profile.name}`}
            hasPhoto={hasPhoto}
          />
        </Reveal>
      </div>
    </Section>
  );
}
