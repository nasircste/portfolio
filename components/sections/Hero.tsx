import { ArrowDownToLine, FolderGit2, Mail, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { hasProfilePhoto } from "@/lib/photo";
import { Avatar } from "@/components/ui/Avatar";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { SplitText } from "@/components/ui/SplitText";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent";

export function Hero() {
  // Show the real photo only if /public/profile.jpg exists; otherwise initials.
  const hasPhoto = hasProfilePhoto();
  const [first, ...rest] = profile.name.split(" ");
  const current = experience[0];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-svh overflow-x-clip"
    >
      {/* Colour wash */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col justify-center gap-10 px-5 pb-28 pt-28 sm:px-10 lg:grid lg:grid-cols-[1fr_minmax(20rem,32vw)_1fr] lg:items-center lg:gap-6 lg:px-24 lg:pb-32">
        {/* Name */}
        <div className="text-center lg:text-left">
          <p className="text-xl font-light tracking-wide text-accent sm:text-2xl">
            <SplitText text="Hello! I'm" />
          </p>
          <h1
            id="hero-heading"
            className="mt-2 text-5xl font-medium uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-5xl xl:text-7xl"
          >
            <span className="block">
              <SplitText text={first} delay={150} />
            </span>
            <span className="block">
              <SplitText text={rest.join(" ")} delay={300} />
            </span>
          </h1>
        </div>

        {/* Middle: photo on small screens. On capable desktops the 3D robot takes this spot. */}
        <div className="flex justify-center">
          <div className="hero-avatar">
            <Avatar
              src={profile.photo}
              initials={profile.initials}
              alt={`Portrait of ${profile.name}`}
              hasPhoto={hasPhoto}
            />
          </div>
        </div>

        {/* Role */}
        <div className="text-center lg:text-right">
          <p className="text-xl font-light tracking-wide text-accent sm:text-2xl">
            <SplitText text="A" delay={450} />
          </p>
          <h2 className="mt-2 text-3xl font-medium uppercase tracking-tight sm:text-5xl lg:text-3xl xl:text-5xl">
            <span className="sr-only">{profile.title}</span>
            <span className="role-roll block" aria-hidden="true">
              <span className="role-roll-track block">
                {[...profile.heroRoles, profile.heroRoles[0]].map((role, i) => (
                  <span key={i} className="role-item block">
                    <span className="text-gradient">{role}</span>
                  </span>
                ))}
              </span>
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
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

          {/* Social icons (the vertical rail is desktop only) */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={iconLink}>
              <GitHubIcon className="size-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={iconLink}>
              <LinkedInIcon className="size-5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Send an email" className={iconLink}>
              <Mail className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer strip of the hero */}
      <div className="absolute inset-x-0 bottom-6 mx-auto flex w-full max-w-[1600px] flex-col items-center gap-2 px-5 text-xs text-muted sm:px-10 lg:flex-row lg:justify-between lg:px-24">
        <p className="inline-flex items-center gap-2">
          <MapPin className="size-4" aria-hidden="true" />
          {profile.location}
        </p>
        <p className="inline-flex items-center gap-2">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Currently at {current.company}
        </p>
      </div>
    </section>
  );
}
