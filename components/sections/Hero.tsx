import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowDownToLine, FolderGit2, Mail, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { Avatar } from "@/components/ui/Avatar";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent";

export function Hero() {
  // Show the real photo only if /public/profile.jpg exists; otherwise initials.
  const hasPhoto = existsSync(join(process.cwd(), "public", "profile.jpg"));

  const current = experience[0];

  return (
    <div className="relative isolate overflow-x-clip">
      {/* Subtle grid + accent glow, fading out toward the bottom */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]"
      />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem]"
      />
      <div
        aria-hidden="true"
        className="glow-ring pointer-events-none absolute -right-48 top-6 -z-10 hidden size-[40rem] rounded-full lg:block"
      />
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-5xl px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24"
    >
      <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:justify-between md:gap-16">
        <Reveal className="w-full text-center md:text-left">
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted backdrop-blur md:mx-0">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Currently at {current.company}
          </p>
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted md:justify-start">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>
          <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-gradient inline-block pb-1">
              {profile.title}
            </span>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted md:mx-0">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="bg-brand inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium shadow-lg shadow-[#7c3aed]/30 transition-[filter] hover:brightness-110"
            >
              <FolderGit2 className="size-4" aria-hidden="true" />
              View Projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={iconLink}
            >
              <GitHubIcon className="size-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={iconLink}
            >
              <LinkedInIcon className="size-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send an email"
              className={iconLink}
            >
              <Mail className="size-5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="shrink-0">
          <Avatar
            src={profile.photo}
            initials={profile.initials}
            alt={`Portrait of ${profile.name}`}
            hasPhoto={hasPhoto}
          />
        </Reveal>
      </div>
    </section>
    </div>
  );
}
